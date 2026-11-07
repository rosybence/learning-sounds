// Learning Sounds — Web Audio sound engine.
// Every sound is synthesised live from oscillators, noise and filters.
// Each recipe is a function (ac, out, t) that schedules audio from time t
// and returns its length in seconds.

(function () {
  let ctx = null, master = null, analyser = null, current = null;

  function getCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -14; comp.ratio.value = 4; comp.attack.value = 0.003; comp.release.value = 0.2;
      analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      comp.connect(analyser); analyser.connect(ctx.destination);
      master = comp;
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  // ---------- shared helpers ----------
  const noiseCache = new WeakMap();
  function noise(ac) {
    if (!noiseCache.has(ac)) {
      const b = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
      const d = b.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      noiseCache.set(ac, b);
    }
    const s = ac.createBufferSource();
    s.buffer = noiseCache.get(ac); s.loop = true;
    return s;
  }
  const verbCache = new WeakMap();
  function reverb(ac, out, seconds = 2.2, wet = 0.35) {
    const key = seconds;
    let c = verbCache.get(ac); if (!c) { c = {}; verbCache.set(ac, c); }
    if (!c[key]) {
      const len = Math.floor(ac.sampleRate * seconds);
      const b = ac.createBuffer(2, len, ac.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const d = b.getChannelData(ch);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
      }
      c[key] = b;
    }
    const conv = ac.createConvolver(); conv.buffer = c[key];
    const input = ac.createGain();
    const w = ac.createGain(); w.gain.value = wet;
    input.connect(out); input.connect(conv); conv.connect(w); w.connect(out);
    return input;
  }
  function delay(ac, out, time, feedback, tone = 2500, wet = 0.5) {
    const input = ac.createGain();
    const d = ac.createDelay(4); d.delayTime.value = time;
    const fb = ac.createGain(); fb.gain.value = feedback;
    const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = tone;
    const w = ac.createGain(); w.gain.value = wet;
    input.connect(out); input.connect(d); d.connect(lp); lp.connect(fb); fb.connect(d); lp.connect(w); w.connect(out);
    return input;
  }
  function drive(ac, out, amount = 2) {
    const ws = ac.createWaveShaper();
    const n = 1024, curve = new Float32Array(n);
    for (let i = 0; i < n; i++) { const x = i / (n - 1) * 2 - 1; curve[i] = Math.tanh(x * amount) / Math.tanh(amount); }
    ws.curve = curve; ws.connect(out);
    return ws;
  }
  function gainNode(ac, out, v) { const g = ac.createGain(); g.gain.value = v; g.connect(out); return g; }
  function env(param, t, peak, attack, decay, sustain = 0.0001, release = null) {
    param.setValueAtTime(0.0001, t);
    param.exponentialRampToValueAtTime(peak, t + attack);
    param.exponentialRampToValueAtTime(Math.max(sustain, 0.0001), t + attack + decay);
    if (release !== null) param.exponentialRampToValueAtTime(0.0001, release);
  }
  const midi = n => 440 * Math.pow(2, (n - 69) / 12);
  function osc(ac, type, freq, out, t, stop, detune = 0) {
    const o = ac.createOscillator(); o.type = type; o.frequency.value = freq; o.detune.value = detune;
    o.connect(out); o.start(t); o.stop(stop); return o;
  }

  // ---------- drum kit ----------
  function kick(ac, out, t, { f0 = 150, f1 = 48, pitchTime = 0.08, decay = 0.35, vol = 1, click = true } = {}) {
    const o = ac.createOscillator(); o.type = "sine";
    o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + pitchTime);
    const g = ac.createGain(); env(g.gain, t, vol, 0.002, decay);
    o.connect(g); g.connect(out); o.start(t); o.stop(t + decay + 0.1);
    if (click) {
      const n = noise(ac); const hp = ac.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 3000;
      const ng = ac.createGain(); env(ng.gain, t, vol * 0.25, 0.001, 0.01);
      n.connect(hp); hp.connect(ng); ng.connect(out); n.start(t); n.stop(t + 0.03);
    }
  }
  function snare(ac, out, t, { vol = 0.8, tone = 190, decay = 0.18, bright = 1800 } = {}) {
    const n = noise(ac); const bp = ac.createBiquadFilter(); bp.type = "highpass"; bp.frequency.value = bright;
    const ng = ac.createGain(); env(ng.gain, t, vol, 0.001, decay);
    n.connect(bp); bp.connect(ng); ng.connect(out); n.start(t, Math.random()); n.stop(t + decay + 0.05);
    const o = ac.createOscillator(); o.type = "triangle"; o.frequency.setValueAtTime(tone * 1.4, t); o.frequency.exponentialRampToValueAtTime(tone, t + 0.03);
    const og = ac.createGain(); env(og.gain, t, vol * 0.6, 0.001, 0.09);
    o.connect(og); og.connect(out); o.start(t); o.stop(t + 0.15);
  }
  function hat(ac, out, t, { open = false, vol = 0.3, freq = 7500 } = {}) {
    const n = noise(ac); const hp = ac.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = freq;
    const g = ac.createGain(); const d = open ? 0.28 : 0.045; env(g.gain, t, vol, 0.001, d);
    n.connect(hp); hp.connect(g); g.connect(out); n.start(t, Math.random()); n.stop(t + d + 0.05);
  }
  // ride: filtered noise only (no steady tones, so no whistle)
  function ride(ac, out, t, vol = 0.18) {
    const hp = ac.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 6000;
    const pk = ac.createBiquadFilter(); pk.type = "peaking"; pk.frequency.value = 9000; pk.gain.value = 4; pk.Q.value = 0.7;
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.002);
    g.gain.exponentialRampToValueAtTime(vol * 0.35, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
    const n = noise(ac); n.connect(hp); hp.connect(pk); pk.connect(g); g.connect(out); n.start(t, Math.random()); n.stop(t + 0.35);
  }
  function clap(ac, out, t, vol = 0.7) {
    const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1300; bp.Q.value = 1.2;
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t);
    [0, 0.011, 0.022].forEach(o => { g.gain.setValueAtTime(vol, t + o); g.gain.exponentialRampToValueAtTime(vol * 0.15, t + o + 0.009); });
    g.gain.setValueAtTime(vol * 0.8, t + 0.033); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    const n = noise(ac); n.connect(bp); bp.connect(g); g.connect(out); n.start(t, Math.random()); n.stop(t + 0.3);
  }
  function rim(ac, out, t, vol = 0.4) {
    const g = ac.createGain(); env(g.gain, t, vol, 0.001, 0.035);
    const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1700; bp.Q.value = 4;
    osc(ac, "square", 1700, bp, t, t + 0.06); osc(ac, "triangle", 460, g, t, t + 0.06); bp.connect(g); g.connect(out);
  }
  function cowbell(ac, out, t, vol = 0.35) {
    const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1000; bp.Q.value = 1.5;
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.002); g.gain.exponentialRampToValueAtTime(vol * 0.3, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
    osc(ac, "square", 540, bp, t, t + 0.4); osc(ac, "square", 800, bp, t, t + 0.4);
    bp.connect(g); g.connect(out);
  }

  // ---------- recipes ----------
  const R = {};

  R.amen = (ac, out, t) => {
    const s = 60 / 168 / 4, bus = gainNode(ac, out, 0.9);
    const dusty = ac.createBiquadFilter(); dusty.type = "lowpass"; dusty.frequency.value = 7000; dusty.connect(bus);
    // two-bar pattern loosely in the style of the classic break, then a chopped variation
    const bars = [
      { k: [0, 2, 10, 11], s: [4, 7, 9, 12, 15] },
      { k: [0, 2, 10], s: [4, 7, 9, 14] },
      { k: [0, 2, 10, 11], s: [4, 7, 9, 12, 15] },
      { k: [2, 10], s: [4, 6, 7, 9, 12, 13, 14, 15] }
    ];
    bars.forEach((b, bi) => {
      const bt = t + bi * 16 * s;
      for (let i = 0; i < 16; i += 2) ride(ac, dusty, bt + i * s, 0.12);
      b.k.forEach(i => kick(ac, dusty, bt + i * s, { f0: 120, f1: 55, decay: 0.22, vol: 0.9 }));
      b.s.forEach(i => snare(ac, dusty, bt + i * s, { vol: (i % 4 === 0) ? 0.85 : 0.5, tone: 220, decay: 0.14, bright: 1500 }));
    });
    return 64 * s + 0.4;
  };

  R.reese = (ac, out, t) => {
    const dur = 4;
    const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 700; lp.Q.value = 2;
    const g = ac.createGain(); env(g.gain, t, 0.35, 0.05, 0.2, 0.3, t + dur);
    lp.connect(g); g.connect(drive(ac, out, 1.8));
    const notes = [[0, 40], [2, 40], [2.6, 38], [3.2, 43]];
    const oscs = [-14, 14, -5].map(dt => { const o = osc(ac, "sawtooth", midi(40), lp, t, t + dur, dt); return o; });
    // slow movement in detune makes it churn
    const lfo = ac.createOscillator(); lfo.frequency.value = 0.35; const lg = ac.createGain(); lg.gain.value = 9;
    lfo.connect(lg); lg.connect(oscs[1].detune); lfo.start(t); lfo.stop(t + dur);
    lp.frequency.setValueAtTime(400, t); lp.frequency.linearRampToValueAtTime(1100, t + 2); lp.frequency.linearRampToValueAtTime(600, t + dur);
    const sub = ac.createGain(); sub.gain.value = 0.5; sub.connect(g);
    const so = osc(ac, "sine", midi(28), sub, t, t + dur);
    notes.forEach(([at, n]) => {
      oscs.forEach(o => o.frequency.setTargetAtTime(midi(n), t + at, 0.03));
      so.frequency.setTargetAtTime(midi(n - 12), t + at, 0.03);
    });
    return dur + 0.1;
  };

  R.hoover = (ac, out, t) => {
    const dur = 3.6, bus = reverb(ac, out, 2.5, 0.25);
    const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 3200;
    const g = ac.createGain(); g.gain.value = 0.0001; lp.connect(g);
    // chorus: two modulated short delays
    const dry = gainNode(ac, bus, 0.6);
    g.connect(dry);
    [0.012, 0.019].forEach((dt, i) => {
      const d = ac.createDelay(0.05); d.delayTime.value = dt;
      const l = ac.createOscillator(); l.frequency.value = 0.6 + i * 0.3; const lg = ac.createGain(); lg.gain.value = 0.004;
      l.connect(lg); lg.connect(d.delayTime); l.start(t); l.stop(t + dur);
      g.connect(d); d.connect(gainNode(ac, bus, 0.45));
    });
    const voices = [];
    [-28, -12, 0, 12, 28].forEach(dt => voices.push({ o: osc(ac, "sawtooth", midi(55), lp, t, t + dur, dt), m: 1 }));
    voices.push({ o: osc(ac, "sawtooth", midi(43), lp, t, t + dur, 6), m: 0.5 });
    const seq = [[0, 55, 1.1], [1.2, 53, 0.45], [1.7, 58, 0.45], [2.2, 55, 1.2]];
    seq.forEach(([at, n, len]) => {
      const st = t + at;
      voices.forEach(v => {
        const f = midi(n) * v.m;
        v.o.frequency.setValueAtTime(f * 0.84, st);           // dip below…
        v.o.frequency.exponentialRampToValueAtTime(f, st + 0.18); // …swoop up into the note
      });
      g.gain.setValueAtTime(0.0001, st); g.gain.exponentialRampToValueAtTime(0.16, st + 0.03);
      g.gain.setValueAtTime(0.16, st + len - 0.05); g.gain.exponentialRampToValueAtTime(0.0001, st + len);
    });
    return dur + 1;
  };

  R.siren = (ac, out, t) => {
    const dur = 3.2;
    const bus = delay(ac, out, 60 / 140 * 0.75, 0.6, 2200, 0.6);
    const g = ac.createGain(); env(g.gain, t, 0.18, 0.02, 0.1, 0.18, t + dur - 0.5); g.connect(bus);
    const o = osc(ac, "square", 600, g, t, t + dur);
    const lp = ac.createBiquadFilter(); // soften
    const lfo = ac.createOscillator(); lfo.type = "sawtooth"; lfo.frequency.setValueAtTime(2, t); lfo.frequency.linearRampToValueAtTime(7, t + dur);
    const lg = ac.createGain(); lg.gain.value = 260; lfo.connect(lg); lg.connect(o.frequency); lfo.start(t); lfo.stop(t + dur);
    o.frequency.setValueAtTime(500, t); o.frequency.linearRampToValueAtTime(900, t + dur);
    return dur + 3;
  };

  R.sub = (ac, out, t) => {
    const s = 60 / 140, bus = drive(ac, out, 1.6);
    kick(ac, out, t, { vol: 0.8 }); kick(ac, out, t + 4 * s, { vol: 0.8 });
    snare(ac, out, t + 2 * s, { vol: 0.5 }); snare(ac, out, t + 6 * s, { vol: 0.5 });
    const notes = [[0, 33, 1.4], [1.5, 33, 0.4], [2, 31, 1.4], [3.5, 36, 0.4], [4, 33, 1.8], [6, 29, 1.8]];
    notes.forEach(([at, n, len]) => {
      const st = t + at * s, g = ac.createGain();
      env(g.gain, st, 0.7, 0.01, 0.05, 0.6, st + len * s);
      g.connect(bus); osc(ac, "sine", midi(n), g, st, st + len * s + 0.05);
    });
    return 8 * s + 0.2;
  };

  R.wobble = (ac, out, t) => {
    const s = 60 / 140, dur = 8 * s;
    const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.Q.value = 9; lp.frequency.value = 350;
    const g = ac.createGain(); env(g.gain, t, 0.3, 0.01, 0.05, 0.3, t + dur);
    lp.connect(g); g.connect(drive(ac, out, 2.5));
    const o1 = osc(ac, "sawtooth", midi(28), lp, t, t + dur), o2 = osc(ac, "square", midi(28), lp, t, t + dur, 7);
    const sub = gainNode(ac, g, 0.6); const so = osc(ac, "sine", midi(28), sub, t, t + dur);
    const lfo = ac.createOscillator(); lfo.type = "sine";
    const depth = ac.createGain(); depth.gain.value = 1300; lfo.connect(depth); depth.connect(lp.frequency);
    lp.frequency.value = 1400;
    // rate changes: 1/4, 1/8, triplet, 1/16 — in Hz at 140 BPM
    const q = 140 / 60;
    [[0, q], [2, q * 2], [4, q * 3], [5, q * 1], [6, q * 4], [7, q * 2]].forEach(([b, r]) => lfo.frequency.setValueAtTime(r, t + b * s));
    lfo.start(t); lfo.stop(t + dur);
    [[0, 28], [4, 31], [6, 26]].forEach(([b, n]) => [o1, o2, so].forEach(o => o.frequency.setValueAtTime(midi(n), t + b * s)));
    kick(ac, out, t, { vol: 0.7 }); snare(ac, out, t + 2 * s, { vol: 0.5 }); kick(ac, out, t + 4 * s, { vol: 0.7 }); snare(ac, out, t + 6 * s, { vol: 0.5 });
    return dur + 0.2;
  };

  R.halfstep = (ac, out, t) => {
    const st = 60 / 140 / 4, bus = reverb(ac, out, 1.4, 0.2);
    for (let bar = 0; bar < 2; bar++) {
      const b = t + bar * 16 * st;
      kick(ac, out, b, { vol: 1, f1: 45, decay: 0.45 });
      if (bar === 1) kick(ac, out, b + 11 * st, { vol: 0.7 });
      snare(ac, bus, b + 8 * st, { vol: 0.9, tone: 200, decay: 0.25, bright: 1200 });
      clap(ac, bus, b + 8 * st, 0.4);
      [0, 3, 4, 6, 8, 10, 12, 14, 15].forEach(i => hat(ac, out, b + i * st + (i % 2 ? st * 0.15 : 0), { vol: i % 4 === 0 ? 0.22 : 0.12 }));
      rim(ac, out, b + 13 * st, 0.25);
    }
    // sub underneath
    const g = ac.createGain(); env(g.gain, t, 0.5, 0.01, 0.1, 0.45, t + 32 * st);
    g.connect(out); osc(ac, "sine", midi(31), g, t, t + 32 * st);
    return 32 * st + 0.4;
  };

  R.dubdelay = (ac, out, t) => {
    const echo = delay(ac, out, 60 / 140 * 0.75, 0.72, 1600, 0.75);
    const spring = reverb(ac, echo, 1.2, 0.5);
    snare(ac, spring, t, { vol: 0.8, tone: 210, decay: 0.12, bright: 1500 });
    rim(ac, spring, t + 0.6, 0.35);
    // skank chord stab
    const st = t + 1.3, g = ac.createGain(); env(g.gain, st, 0.12, 0.003, 0.15);
    const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1200; bp.connect(g); g.connect(spring);
    [62, 65, 69].forEach(n => osc(ac, "square", midi(n), bp, st, st + 0.25));
    return 6;
  };

  R.crackle = (ac, out, t) => {
    const dur = 5;
    // rain: filtered noise
    const rn = noise(ac); const rbp = ac.createBiquadFilter(); rbp.type = "bandpass"; rbp.frequency.value = 2500; rbp.Q.value = 0.4;
    const rg = ac.createGain(); env(rg.gain, t, 0.12, 0.8, 0.2, 0.12, t + dur);
    rn.connect(rbp); rbp.connect(rg); rg.connect(out); rn.start(t); rn.stop(t + dur);
    // hiss
    const hn = noise(ac); const hhp = ac.createBiquadFilter(); hhp.type = "highpass"; hhp.frequency.value = 6000;
    const hg = gainNode(ac, out, 0.025); hn.connect(hhp); hhp.connect(hg); hn.start(t); hn.stop(t + dur);
    // pops and clicks
    for (let i = 0; i < 70; i++) {
      const ct = t + Math.random() * dur, g = ac.createGain(), v = Math.random() * 0.35 + 0.05;
      env(g.gain, ct, v, 0.0005, 0.004 + Math.random() * 0.01);
      const n = noise(ac); const f = ac.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = 1500 + Math.random() * 4000;
      n.connect(f); f.connect(g); g.connect(out); n.start(ct, Math.random()); n.stop(ct + 0.03);
    }
    // distant muffled pad
    const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 700;
    const pg = ac.createGain(); env(pg.gain, t + 0.3, 0.09, 1.2, 0.5, 0.08, t + dur);
    lp.connect(pg); pg.connect(reverb(ac, out, 3, 0.5));
    [57, 60, 64, 67].forEach((n, i) => osc(ac, "sawtooth", midi(n), lp, t + 0.3, t + dur, i * 4 - 6));
    return dur + 0.5;
  };

  R.twostep = (ac, out, t) => {
    const st = 60 / 132 / 4, sw = st * 0.3;
    const at = (bar, i) => t + (bar * 16 + i) * st + (i % 2 ? sw : 0);
    for (let bar = 0; bar < 2; bar++) {
      kick(ac, out, at(bar, 0), { vol: 0.95, decay: 0.3 });
      kick(ac, out, at(bar, 9), { vol: 0.7, decay: 0.25 });
      if (bar === 1) kick(ac, out, at(bar, 11), { vol: 0.55, decay: 0.2 });
      snare(ac, out, at(bar, 4), { vol: 0.7, tone: 230, bright: 2000 }); clap(ac, out, at(bar, 4), 0.35);
      snare(ac, out, at(bar, 12), { vol: 0.7, tone: 230, bright: 2000 }); clap(ac, out, at(bar, 12), 0.35);
      [2, 6, 10, 14].forEach(i => hat(ac, out, at(bar, i), { open: i === 14, vol: 0.2 }));
      [1, 3, 5, 7, 11, 13, 15].forEach(i => hat(ac, out, at(bar, i), { vol: 0.1 }));
      rim(ac, out, at(bar, 7), 0.25); rim(ac, out, at(bar, 15), 0.2);
    }
    return 32 * st + 0.3;
  };

  function organNote(ac, out, n, st, len, vol = 0.35) {
    const g = ac.createGain(); env(g.gain, st, vol, 0.004, 0.12, vol * 0.4, st + len);
    g.connect(out);
    [[1, 1], [2, 0.55], [3, 0.2], [4, 0.25]].forEach(([h, a]) => osc(ac, "sine", midi(n) * h, gainNode(ac, g, a), st, st + len + 0.05));
  }
  R.organ = (ac, out, t) => {
    const st = 60 / 132 / 4, sw = st * 0.25, bus = drive(ac, out, 1.3);
    const pat = [[0, 41, 2], [3, 41, 1], [4, 53, 1], [6, 41, 2], [10, 44, 1], [11, 46, 2], [14, 48, 1],
                 [16, 41, 2], [19, 41, 1], [20, 53, 1], [22, 41, 2], [26, 39, 1], [27, 39, 1], [28, 51, 2]];
    pat.forEach(([i, n, l]) => organNote(ac, bus, n, t + i * st + (i % 2 ? sw : 0), l * st * 0.9));
    for (let b = 0; b < 2; b++) { kick(ac, out, t + b * 16 * st, { vol: 0.6 }); kick(ac, out, t + (b * 16 + 9) * st + sw, { vol: 0.45 });
      clap(ac, out, t + (b * 16 + 4) * st, 0.35); clap(ac, out, t + (b * 16 + 12) * st, 0.35); }
    return 32 * st + 0.3;
  };

  // simple formant "voice": carrier through 3 band-pass filters
  const VOWELS = { a: [800, 1150, 2900], e: [400, 2000, 2550], i: [300, 2300, 3000], o: [450, 800, 2830], u: [325, 700, 2530] };
  function voice(ac, out, carrierFreqs, syllables, { type = "sawtooth", vib = 0, vol = 0.3, noiseAmt = 0 } = {}) {
    syllables.forEach(([st, len, vowel, pitchMul = 1]) => {
      const g = ac.createGain(); env(g.gain, st, vol, 0.015, 0.05, vol * 0.8, st + len); g.connect(out);
      const sum = ac.createGain();
      VOWELS[vowel].forEach((f, i) => {
        const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = f; bp.Q.value = 9 - i * 2;
        sum.connect(bp); bp.connect(gainNode(ac, g, [1.2, 0.7, 0.35][i] * 3));
      });
      carrierFreqs.forEach(cf => {
        const o = osc(ac, type, cf * pitchMul, sum, st, st + len + 0.05);
        if (vib) { const l = ac.createOscillator(); l.frequency.value = 5.5; const lg = ac.createGain(); lg.gain.value = vib; l.connect(lg); lg.connect(o.detune); l.start(st); l.stop(st + len + 0.05); }
      });
      if (noiseAmt) { const n = noise(ac); const ng = ac.createGain(); env(ng.gain, st, noiseAmt, 0.002, 0.04); n.connect(ng); ng.connect(sum); n.start(st, Math.random()); n.stop(st + 0.06); }
    });
  }
  R.stabs = (ac, out, t) => {
    const st = 60 / 132 / 4, sw = st * 0.25, bus = delay(ac, reverb(ac, out, 1.8, 0.25), st * 3, 0.3, 3000, 0.3);
    const chords = { cm9: [48, 51, 55, 58, 62], fm9: [53, 56, 60, 63, 67], abmaj7: [44, 51, 55, 60, 63], gm7: [43, 50, 53, 58, 62] };
    const hits = [[0, "cm9"], [3, "cm9"], [6, "cm9"], [10, "fm9"], [16, "abmaj7"], [19, "abmaj7"], [22, "gm7"], [26, "gm7"], [28, "gm7"]];
    hits.forEach(([i, c]) => {
      const s0 = t + i * st + (i % 2 ? sw : 0);
      const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.Q.value = 3;
      lp.frequency.setValueAtTime(4000, s0); lp.frequency.exponentialRampToValueAtTime(500, s0 + 0.2);
      const g = ac.createGain(); env(g.gain, s0, 0.11, 0.003, 0.22); lp.connect(g); g.connect(bus);
      chords[c].forEach(n => { osc(ac, "sawtooth", midi(n), lp, s0, s0 + 0.3, -6); osc(ac, "square", midi(n), lp, s0, s0 + 0.3, 6); });
    });
    for (let b = 0; b < 2; b++) { kick(ac, out, t + b * 16 * st, { vol: 0.5 }); kick(ac, out, t + (b * 16 + 9) * st + sw, { vol: 0.4 }); clap(ac, out, t + (b * 16 + 4) * st, 0.25); clap(ac, out, t + (b * 16 + 12) * st, 0.25); }
    return 32 * st + 1;
  };

  // rewind: render a bar offline, play it, then spin it backwards
  function loopBar(ac, out, t) {
    const st = 60 / 132 / 4;
    kick(ac, out, t, { vol: 0.9 }); kick(ac, out, t + 9 * st, { vol: 0.7 });
    snare(ac, out, t + 4 * st, { vol: 0.6 }); snare(ac, out, t + 12 * st, { vol: 0.6 });
    for (let i = 2; i < 16; i += 4) hat(ac, out, t + i * st, { vol: 0.2 });
    [[0, 41], [6, 44], [10, 46], [12, 48]].forEach(([i, n]) => organNote(ac, out, n, t + i * st, st * 2.5, 0.3));
    return 16 * st;
  }
  let rewindBuf = null;
  async function getRewindBuf(sr) {
    if (rewindBuf) return rewindBuf;
    const len = 60 / 132 * 4 + 0.3;
    const oac = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, Math.ceil(sr * len), sr);
    loopBar(oac, oac.destination, 0);
    rewindBuf = await oac.startRendering();
    return rewindBuf;
  }
  R.rewind = async (ac, out, t) => {
    const buf = await getRewindBuf(ac.sampleRate);
    t = Math.max(t, ac.currentTime + 0.02);
    const fwd = ac.createBufferSource(); fwd.buffer = buf; fwd.connect(out); fwd.start(t);
    const playLen = buf.duration - 0.3;
    // reversed copy
    const rev = ac.createBuffer(1, buf.length, buf.sampleRate);
    const src = buf.getChannelData(0), dst = rev.getChannelData(0);
    for (let i = 0; i < src.length; i++) dst[i] = src[src.length - 1 - i];
    const r = ac.createBufferSource(); r.buffer = rev;
    const rt = t + playLen * 0.75;
    fwd.stop(rt);
    r.playbackRate.setValueAtTime(0.3, rt); r.playbackRate.exponentialRampToValueAtTime(3.2, rt + 0.45); r.playbackRate.exponentialRampToValueAtTime(0.2, rt + 0.9);
    const rg = ac.createGain(); rg.gain.setValueAtTime(1, rt); rg.gain.setValueAtTime(1, rt + 0.75); rg.gain.exponentialRampToValueAtTime(0.0001, rt + 0.95);
    r.connect(rg); rg.connect(out); r.start(rt, buf.duration * 0.25); r.stop(rt + 1);
    // drop it again
    const again = ac.createBufferSource(); again.buffer = buf; again.connect(out); again.start(rt + 1.25);
    return (rt - ac.currentTime) + 1.25 + buf.duration;
  };

  R.kick808 = (ac, out, t) => {
    const st = 60 / 110 / 4, bus = drive(ac, out, 1.4);
    kick(ac, bus, t, { f0: 140, f1: 49, pitchTime: 0.1, decay: 1.6, vol: 1 });
    const b = t + 1.8;
    [0, 3, 6, 10, 16, 19, 22, 27].forEach(i => kick(ac, bus, b + i * st, { f0: 140, f1: 49, pitchTime: 0.1, decay: 0.9, vol: 0.9 }));
    [4, 12, 20, 28].forEach(i => clap(ac, out, b + i * st, 0.35));
    for (let i = 0; i < 32; i += 2) hat(ac, out, b + i * st, { vol: 0.12, freq: 8000 });
    return 1.8 + 32 * st + 0.9;
  };

  R.cowbell = (ac, out, t) => {
    const st = 60 / 112 / 4;
    for (let bar = 0; bar < 2; bar++) {
      const b = t + bar * 16 * st;
      [0, 3, 6, 8, 11, 14].forEach(i => cowbell(ac, out, b + i * st, i === 0 ? 0.4 : 0.28));
      [4, 12].forEach(i => clap(ac, out, b + i * st, 0.6));
      if (bar === 1) clap(ac, out, b + 15 * st, 0.3);
      [0, 7, 10].forEach(i => kick(ac, out, b + i * st, { f0: 130, f1: 50, decay: 0.6, vol: 0.7 }));
      for (let i = 0; i < 16; i += 2) hat(ac, out, b + i * st, { vol: 0.1 });
    }
    return 32 * st + 0.5;
  };

  R.vocoder = (ac, out, t) => {
    const st = 60 / 110 / 4, bus = reverb(ac, out, 1.2, 0.15);
    const syl = [[0, 3, "o"], [4, 3, "e"], [8, 2, "a"], [10, 2, "i"], [12, 4, "o"], [16, 3, "u"], [20, 3, "a"], [24, 2, "e"], [26, 6, "o"]];
    // chord carrier (vocoder feel) — flat, robotic, no vibrato
    voice(ac, bus, [midi(45), midi(52), midi(57)], syl.map(([i, l, v]) => [t + i * st, l * st * 0.9, v, 1]), { type: "sawtooth", vol: 0.22, noiseAmt: 0.15 });
    return 32 * st + 0.6;
  };

  R.orchhit = (ac, out, t) => {
    const bus = reverb(ac, out, 2.4, 0.45);
    [[0, 48], [0.9, 51], [1.4, 46], [2.2, 48]].forEach(([at, root]) => {
      const st = t + at;
      const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.setValueAtTime(6000, st); lp.frequency.exponentialRampToValueAtTime(900, st + 0.4);
      const g = ac.createGain(); env(g.gain, st, 0.08, 0.004, 0.45); lp.connect(g); g.connect(bus);
      [-12, 0, 7, 12, 16, 19, 24].forEach(iv => { osc(ac, "sawtooth", midi(root + iv), lp, st, st + 0.6, -8); osc(ac, "square", midi(root + iv), lp, st, st + 0.6, 8); });
      const n = noise(ac); const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 2500;
      const ng = ac.createGain(); env(ng.gain, st, 0.25, 0.002, 0.12); n.connect(bp); bp.connect(ng); ng.connect(bus); n.start(st); n.stop(st + 0.2);
      kick(ac, bus, st, { f0: 110, f1: 60, decay: 0.5, vol: 0.6, click: false });
    });
    return 3.8;
  };

  R.acid = (ac, out, t) => {
    const st = 60 / 126 / 4, steps = 32, dur = steps * st;
    const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.Q.value = 18;
    const g = ac.createGain(); g.gain.value = 0.0001;
    lp.connect(g); g.connect(drive(ac, out, 2.2));
    const o = osc(ac, "sawtooth", midi(45), lp, t, t + dur + 0.1);
    // [note, accent, slide] per 16th (null = rest)
    const pat = [[45, 1, 0], [45, 0, 0], [57, 0, 1], [45, 0, 0], null, [48, 1, 0], [45, 0, 0], [60, 0, 1],
                 [45, 0, 0], [43, 1, 0], null, [45, 0, 1], [57, 0, 0], [45, 1, 0], [48, 0, 1], [50, 0, 0]];
    for (let i = 0; i < steps; i++) {
      const p = pat[i % 16], s0 = t + i * st;
      const sweep = 300 + 2200 * (i / steps); // squelch opens up
      if (!p) { g.gain.setTargetAtTime(0.0001, s0, 0.01); continue; }
      const [n, acc, slide] = p;
      if (slide) o.frequency.setTargetAtTime(midi(n), s0, 0.04); else o.frequency.setValueAtTime(midi(n), s0);
      g.gain.setTargetAtTime(acc ? 0.32 : 0.22, s0, 0.003);
      g.gain.setTargetAtTime(0.12, s0 + st * 0.6, 0.02);
      lp.frequency.setValueAtTime(sweep * (acc ? 2.4 : 1.6), s0);
      lp.frequency.exponentialRampToValueAtTime(Math.max(180, sweep * 0.35), s0 + st * 0.9);
    }
    g.gain.setTargetAtTime(0.0001, t + dur, 0.02);
    for (let i = 0; i < steps; i += 4) kick(ac, out, t + i * st, { vol: 0.6, decay: 0.3 });
    for (let i = 2; i < steps; i += 4) hat(ac, out, t + i * st, { open: true, vol: 0.12 });
    return dur + 0.3;
  };

  // ---------- public API ----------
  function stop() {
    if (current) { const g = current; g.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.03); setTimeout(() => g.disconnect(), 300); current = null; }
  }
  async function play(id) {
    const ac = getCtx();
    if (!R[id]) return 0;
    stop();
    const bus = ac.createGain(); bus.gain.value = 0.7; bus.connect(master); current = bus;
    const len = await R[id](ac, bus, ac.currentTime + 0.06);
    const mine = bus;
    setTimeout(() => { if (current === mine) current = null; }, (len + 1) * 1000);
    return len;
  }

  window.SoundEngine = {
    play, stop,
    has: id => !!R[id],
    analyser: () => analyser,
    unlock: () => getCtx()
  };
})();
