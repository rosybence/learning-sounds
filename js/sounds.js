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


  // ---------- added bass + hyperpop recipes ----------
  R.neuro = (ac, out, t) => {
    const st = 60 / 172 / 4, bars = 2, dur = bars * 16 * st;
    // dnb beat
    for (let b = 0; b < bars; b++) {
      const bt = t + b * 16 * st;
      [0, 10].forEach(i => kick(ac, out, bt + i * st, { vol: 0.9, decay: 0.25 }));
      [4, 12].forEach(i => snare(ac, out, bt + i * st, { vol: 0.8, tone: 210, decay: 0.16 }));
      for (let i = 2; i < 16; i += 2) hat(ac, out, bt + i * st, { vol: 0.12 });
    }
    // bass: detuned saws -> distortion -> moving band-pass, plus clean sub
    const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 3;
    const g = ac.createGain(); g.gain.value = 0.0001;
    const pre = ac.createGain(); pre.gain.value = 0.5;
    pre.connect(drive(ac, bp, 6)); bp.connect(g); g.connect(out);
    const notes = [[0, 2, 31], [3, 1, 31], [6, 2, 34], [10, 2, 29], [14, 2, 31], [16, 2, 31], [19, 1, 36], [22, 3, 34], [26, 2, 29], [29, 3, 31]];
    const o1 = osc(ac, "sawtooth", midi(31), pre, t, t + dur, -12), o2 = osc(ac, "sawtooth", midi(31), pre, t, t + dur, 12);
    const subG = ac.createGain(); subG.gain.value = 0.0001; subG.connect(out);
    const so = osc(ac, "sine", midi(31), subG, t, t + dur);
    notes.forEach(([i, l, n], k) => {
      const s0 = t + i * st, e0 = s0 + l * st * 0.9;
      [o1, o2, so].forEach(o => o.frequency.setValueAtTime(midi(n), s0));
      g.gain.setValueAtTime(0.0001, s0); g.gain.exponentialRampToValueAtTime(0.22, s0 + 0.01); g.gain.setValueAtTime(0.22, e0 - 0.02); g.gain.exponentialRampToValueAtTime(0.0001, e0);
      subG.gain.setValueAtTime(0.0001, s0); subG.gain.exponentialRampToValueAtTime(0.4, s0 + 0.01); subG.gain.setValueAtTime(0.4, e0 - 0.02); subG.gain.exponentialRampToValueAtTime(0.0001, e0);
      const a = k % 2 ? 2400 : 500, b2 = k % 2 ? 500 : 2600;
      bp.frequency.setValueAtTime(a, s0); bp.frequency.exponentialRampToValueAtTime(b2, e0);
    });
    return dur + 0.3;
  };

  R.growl = (ac, out, t) => {
    const st = 60 / 145 / 4, dur = 32 * st;
    kick(ac, out, t, { vol: 1, decay: 0.4 }); snare(ac, out, t + 8 * st, { vol: 0.9, decay: 0.22 }); clap(ac, out, t + 8 * st, 0.4);
    kick(ac, out, t + 16 * st, { vol: 1, decay: 0.4 }); kick(ac, out, t + 22 * st, { vol: 0.7 }); snare(ac, out, t + 24 * st, { vol: 0.9, decay: 0.22 }); clap(ac, out, t + 24 * st, 0.4);
    const hits = [[2, 3], [6, 2], [11, 4], [18, 2], [20, 2], [27, 4]];
    hits.forEach(([i, l]) => {
      const s0 = t + i * st, e0 = s0 + l * st;
      const car = ac.createOscillator(); car.type = "sawtooth"; car.frequency.value = midi(30);
      const mod = ac.createOscillator(); mod.type = "sine"; mod.frequency.value = midi(30) * 2;
      const idx = ac.createGain(); idx.gain.setValueAtTime(40, s0); idx.gain.linearRampToValueAtTime(700, s0 + (e0 - s0) * 0.6); idx.gain.linearRampToValueAtTime(150, e0);
      mod.connect(idx); idx.connect(car.frequency);
      // vowel: two formant band-passes sweeping 'oww' -> 'aah'
      const f1 = ac.createBiquadFilter(); f1.type = "bandpass"; f1.Q.value = 5; f1.frequency.setValueAtTime(350, s0); f1.frequency.exponentialRampToValueAtTime(800, e0);
      const f2 = ac.createBiquadFilter(); f2.type = "bandpass"; f2.Q.value = 6; f2.frequency.setValueAtTime(700, s0); f2.frequency.exponentialRampToValueAtTime(1300, e0);
      const g = ac.createGain(); g.gain.setValueAtTime(0.0001, s0); g.gain.exponentialRampToValueAtTime(0.5, s0 + 0.01); g.gain.setValueAtTime(0.5, e0 - 0.03); g.gain.exponentialRampToValueAtTime(0.0001, e0);
      const d = drive(ac, g, 4);
      car.connect(f1); car.connect(f2); f1.connect(d); f2.connect(d); g.connect(out);
      const sub = ac.createGain(); env(sub.gain, s0, 0.35, 0.01, 0.05, 0.35, e0); sub.connect(out); osc(ac, "sine", midi(30), sub, s0, e0 + 0.05);
      car.start(s0); mod.start(s0); car.stop(e0 + 0.05); mod.stop(e0 + 0.05);
    });
    return dur + 0.3;
  };

  R.electrobass = (ac, out, t) => {
    const st = 60 / 118 / 4, dur = 32 * st;
    for (let b = 0; b < 2; b++) {
      const bt = t + b * 16 * st;
      [0, 6, 10].forEach(i => kick(ac, out, bt + i * st, { f0: 130, f1: 50, decay: 0.5, vol: 0.8 }));
      [4, 12].forEach(i => clap(ac, out, bt + i * st, 0.5));
      for (let i = 0; i < 16; i += 2) hat(ac, out, bt + i * st, { vol: i % 4 ? 0.1 : 0.16 });
    }
    const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.Q.value = 6; lp.frequency.value = 900;
    lp.connect(out);
    const pat = [0, 2, 3, 6, 8, 10, 11, 14]; const notes = [36, 36, 48, 36, 39, 36, 43, 46];
    for (let b = 0; b < 2; b++) pat.forEach((i, k) => {
      const s0 = t + (b * 16 + i) * st, g = ac.createGain();
      env(g.gain, s0, 0.35, 0.003, st * 0.8);
      const f = ac.createBiquadFilter(); f.type = "lowpass"; f.Q.value = 7; f.frequency.setValueAtTime(2400, s0); f.frequency.exponentialRampToValueAtTime(300, s0 + st);
      g.connect(f); f.connect(out);
      osc(ac, "square", midi(notes[k] - (b ? 2 : 0)), g, s0, s0 + st);
    });
    return dur + 0.4;
  };

  R.hyper808 = (ac, out, t) => {
    const st = 60 / 150 / 4, dur = 32 * st;
    const crush = drive(ac, gainNode(ac, out, 0.55), 9);
    const g = ac.createGain(); g.gain.value = 0.0001; g.connect(crush);
    const o = osc(ac, "sine", midi(31), g, t, t + dur);
    const notes = [[0, 31, 6], [6, 34, 4], [10, 29, 6], [16, 31, 6], [22, 38, 3], [25, 36, 7]];
    notes.forEach(([i, n, l], k) => {
      const s0 = t + i * st, e0 = s0 + l * st;
      if (k === 0) o.frequency.setValueAtTime(midi(n) * 3, s0);
      o.frequency.setTargetAtTime(midi(n), s0, k ? 0.035 : 0.02);   // glide
      g.gain.setValueAtTime(0.0001, s0); g.gain.exponentialRampToValueAtTime(0.3, s0 + 0.005); g.gain.setTargetAtTime(0.18, s0 + 0.05, 0.3); g.gain.setTargetAtTime(0.0001, e0 - 0.03, 0.02);
      kick(ac, out, s0, { vol: 0.5, decay: 0.12, f1: 70 });
    });
    [8, 24].forEach(i => { clap(ac, out, t + i * st, 0.55); snare(ac, out, t + i * st, { vol: 0.5 }); });
    // hat rolls: 16ths, then 32nds and triplets
    for (let i = 0; i < 32; i += 2) hat(ac, out, t + i * st, { vol: 0.12, freq: 9000 });
    for (let k = 0; k < 8; k++) hat(ac, out, t + (12 + k * 0.5) * st, { vol: 0.1, freq: 9500 });
    for (let k = 0; k < 9; k++) hat(ac, out, t + (28 + k * (4 / 9)) * st, { vol: 0.1, freq: 9500 });
    return dur + 0.3;
  };

  R.supersaw = (ac, out, t) => {
    const st = 60 / 150 / 4, dur = 32 * st;
    const bus = reverb(ac, out, 2.6, 0.35);
    const pump = ac.createGain(); pump.connect(bus);
    for (let i = 0; i < 32; i += 4) {
      const s0 = t + i * st; kick(ac, out, s0, { vol: 0.9, decay: 0.25 });
      pump.gain.setValueAtTime(0.25, s0); pump.gain.linearRampToValueAtTime(1, s0 + st * 3);
    }
    [4, 12, 20, 28].forEach(i => clap(ac, out, t + i * st, 0.35));
    const hp = ac.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 180; hp.connect(pump);
    const chords = [[0, [60, 64, 67, 72]], [8, [57, 60, 64, 69]], [16, [53, 57, 60, 65]], [24, [55, 59, 62, 67]]];
    chords.forEach(([i, ns]) => {
      const s0 = t + i * st, e0 = s0 + 8 * st;
      const g = ac.createGain(); env(g.gain, s0, 0.05, 0.01, 0.1, 0.045, e0); g.connect(hp);
      ns.forEach(n => [-32, -20, -9, 0, 9, 20, 32].forEach(dt => osc(ac, "sawtooth", midi(n), g, s0, e0 + 0.05, dt)));
    });
    return dur + 1;
  };

  R.bubblepluck = (ac, out, t) => {
    const st = 60 / 130 / 4, bus = reverb(ac, out, 1.4, 0.2);
    const mel = [[0, 72], [2, 79], [3, 76], [6, 84], [8, 74], [10, 81], [11, 79], [14, 86], [16, 72], [18, 79], [19, 83], [22, 88], [24, 77], [26, 84], [28, 81], [30, 91]];
    mel.forEach(([i, n]) => {
      const s0 = t + i * st, f = midi(n);
      const car = ac.createOscillator(); car.type = "sine";
      car.frequency.setValueAtTime(f * 1.5, s0); car.frequency.exponentialRampToValueAtTime(f, s0 + 0.04); // rubbery pitch drop
      const mod = ac.createOscillator(); mod.type = "sine"; mod.frequency.value = f * 3.5;
      const idx = ac.createGain(); idx.gain.setValueAtTime(f * 4, s0); idx.gain.exponentialRampToValueAtTime(1, s0 + 0.18);
      mod.connect(idx); idx.connect(car.frequency);
      const g = ac.createGain(); env(g.gain, s0, 0.3, 0.002, 0.25);
      car.connect(g); g.connect(bus); car.start(s0); mod.start(s0); car.stop(s0 + 0.4); mod.stop(s0 + 0.4);
    });
    // bouncy kick + snap
    for (let i = 0; i < 32; i += 8) kick(ac, out, t + i * st, { vol: 0.7, decay: 0.3 });
    [4, 12, 20, 28].forEach(i => clap(ac, out, t + i * st, 0.3));
    return 32 * st + 0.8;
  };

  R.glitch = (ac, out, t) => {
    // bitcrush via a stepped waveshaper
    const ws = ac.createWaveShaper(), n = 1024, c = new Float32Array(n);
    for (let i = 0; i < n; i++) { const x = i / (n - 1) * 2 - 1; c[i] = Math.round(x * 6) / 6; }
    ws.curve = c; ws.connect(out);
    const gate = ac.createGain(); gate.gain.value = 0; gate.connect(ws);
    const oscs = [60, 64, 67, 71].map(nn => osc(ac, "sawtooth", midi(nn), gate, t, t + 3.2, (nn % 3) * 5));
    const lp = null;
    let time = t, step = 0.25, pitch = 1;
    // 1 bar normal, then stutters that get faster and rise in pitch
    gate.gain.setValueAtTime(0.12, t); time = t + 1;
    const plan = [[0.25, 4], [0.125, 6], [0.0625, 10], [0.03125, 16]];
    plan.forEach(([len, count]) => {
      for (let k = 0; k < count; k++) {
        gate.gain.setValueAtTime(0.14, time); gate.gain.setValueAtTime(0, time + len * 0.6);
        pitch *= 1.025; oscs.forEach((o, j) => o.frequency.setValueAtTime(midi([60, 64, 67, 71][j]) * pitch, time));
        if (k % 2 === 0) kick(ac, out, time, { vol: 0.5, decay: 0.08, f1: 80 });
        time += len;
      }
    });
    gate.gain.setValueAtTime(0, time);
    kick(ac, out, time + 0.05, { vol: 1, decay: 0.5 }); clap(ac, out, time + 0.05, 0.6);
    return time - t + 0.8;
  };


  // ---------- bassline / speed garage / acid / dub techno ----------
  R.sgbeat = (ac, out, t) => {
    const st = 60 / 132 / 4, sw = st * 0.38;
    const at = i => t + i * st + (i % 2 ? sw : 0);
    for (let i = 0; i < 32; i += 4) kick(ac, out, at(i), { vol: 0.95, decay: 0.3 });
    [4, 12, 20, 28].forEach(i => { clap(ac, out, at(i), 0.45); snare(ac, out, at(i), { vol: 0.4, tone: 230 }); });
    for (let i = 2; i < 32; i += 4) hat(ac, out, at(i), { open: true, vol: 0.16 });
    for (let i = 0; i < 32; i++) if (i % 4 !== 2) hat(ac, out, at(i), { vol: i % 2 ? 0.1 : 0.06 });
    [3, 7, 14, 19, 23, 27, 30].forEach(i => rim(ac, out, at(i), 0.22));
    // simple sub to fill it out
    [[0, 33], [8, 33], [16, 31], [24, 36]].forEach(([i, n]) => { const g = ac.createGain(); const s0 = at(i); env(g.gain, s0, 0.35, 0.01, 0.1, 0.3, s0 + 7 * st); g.connect(out); osc(ac, "sine", midi(n), g, s0, s0 + 7 * st + 0.05); });
    return 32 * st + 0.3;
  };

  function airhorn(ac, out, st, len) {
    const g = ac.createGain(); env(g.gain, st, 0.1, 0.01, 0.05, 0.09, st + len); 
    const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1400; bp.Q.value = 0.8;
    bp.connect(g); g.connect(drive(ac, out, 2));
    [0, 4, 7, 10].forEach(iv => { const o = osc(ac, "sawtooth", midi(64 + iv), bp, st, st + len + 0.05, iv * 3);
      o.frequency.setValueAtTime(midi(64 + iv) * 0.94, st); o.frequency.exponentialRampToValueAtTime(midi(64 + iv), st + 0.06); });
  }
  function gunshot(ac, out, st) {
    const n = noise(ac); const g = ac.createGain(); env(g.gain, st, 0.9, 0.001, 0.18);
    const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.setValueAtTime(6000, st); lp.frequency.exponentialRampToValueAtTime(400, st + 0.3);
    n.connect(lp); lp.connect(g); g.connect(out); n.start(st, Math.random()); n.stop(st + 0.4);
    kick(ac, out, st, { f0: 120, f1: 40, decay: 0.5, vol: 0.9, click: false });
  }
  R.house909 = (ac, out, t) => {
    const st = 60 / 124 / 4, sw = st * 0.12;
    const at = i => t + i * st + (i % 2 ? sw : 0);
    for (let i = 0; i < 32; i += 4) kick(ac, out, at(i), { f0: 180, f1: 52, pitchTime: 0.05, decay: 0.32, vol: 1 });
    [4, 12, 20, 28].forEach(i => clap(ac, out, at(i), 0.6));
    for (let i = 2; i < 32; i += 4) hat(ac, out, at(i), { open: true, vol: 0.2, freq: 8000 });
    for (let i = 0; i < 32; i++) if (i % 4 !== 2) hat(ac, out, at(i), { vol: i % 4 === 0 ? 0.05 : 0.1, freq: 9000 });
    // a simple jacking bassline
    [[0, 36], [3, 36], [6, 48], [8, 39], [11, 36], [14, 46], [16, 36], [19, 36], [22, 48], [24, 41], [27, 39], [30, 43]].forEach(([i, n]) => {
      const s0 = at(i), g = ac.createGain(); env(g.gain, s0, 0.3, 0.004, st * 1.4); const f = ac.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 700; f.Q.value = 4;
      g.connect(f); f.connect(out); osc(ac, "sawtooth", midi(n), g, s0, s0 + st * 2);
    });
    return 32 * st + 0.4;
  };

  R.distort303 = (ac, out, t) => {
    const st = 60 / 142 / 4, steps = 32, dur = steps * st;
    const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.Q.value = 22;
    const g = ac.createGain(); g.gain.value = 0.0001;
    lp.connect(g); g.connect(drive(ac, gainNode(ac, out, 0.55), 7));
    const o = osc(ac, "sawtooth", midi(40), lp, t, t + dur + 0.1);
    const pat = [[40, 1, 0], [40, 0, 0], [52, 0, 1], [40, 0, 0], [43, 1, 0], [40, 0, 1], [55, 0, 0], [40, 0, 0],
                 [40, 1, 0], [38, 0, 0], [50, 0, 1], [40, 0, 0], [52, 1, 0], [40, 0, 1], [43, 0, 0], [47, 1, 0]];
    for (let i = 0; i < steps; i++) {
      const [n, acc, slide] = pat[i % 16], s0 = t + i * st, sweep = 500 + 4000 * (i / steps);
      if (slide) o.frequency.setTargetAtTime(midi(n), s0, 0.03); else o.frequency.setValueAtTime(midi(n), s0);
      g.gain.setTargetAtTime(acc ? 0.34 : 0.24, s0, 0.003); g.gain.setTargetAtTime(0.14, s0 + st * 0.6, 0.02);
      lp.frequency.setValueAtTime(sweep * (acc ? 2 : 1.4), s0); lp.frequency.exponentialRampToValueAtTime(Math.max(220, sweep * 0.4), s0 + st * 0.9);
    }
    g.gain.setTargetAtTime(0.0001, t + dur, 0.02);
    const kb = drive(ac, gainNode(ac, out, 0.8), 3);
    for (let i = 0; i < steps; i += 4) kick(ac, kb, t + i * st, { f0: 200, f1: 50, pitchTime: 0.04, decay: 0.3, vol: 1 });
    for (let i = 2; i < steps; i += 4) hat(ac, out, t + i * st, { open: true, vol: 0.14 });
    return dur + 0.3;
  };

  R.dubchord = (ac, out, t) => {
    const st = 60 / 120 / 4, dur = 32 * st;
    const echo = delay(ac, reverb(ac, out, 3, 0.45), st * 3, 0.72, 1400, 0.7);
    // tape hiss
    const n = noise(ac); const hp = ac.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 5000;
    const hg = gainNode(ac, out, 0.02); n.connect(hp); hp.connect(hg); n.start(t); n.stop(t + dur + 2);
    for (let i = 0; i < 32; i += 4) { const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 900; lp.connect(out); kick(ac, lp, t + i * st, { f0: 110, f1: 45, decay: 0.45, vol: 0.9, click: false }); }
    for (let i = 2; i < 32; i += 4) hat(ac, out, t + i * st, { vol: 0.05, freq: 7000 });
    const hits = [2, 7, 10, 18, 23, 26];
    hits.forEach((i, k) => {
      const s0 = t + i * st;
      const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 1.4; bp.frequency.value = 500 + k * 180; // slowly opening
      const g = ac.createGain(); env(g.gain, s0, 0.12, 0.003, 0.16); bp.connect(g); g.connect(echo);
      [50, 53, 57, 60].forEach(nn => osc(ac, "sawtooth", midi(nn), bp, s0, s0 + 0.25, (nn % 2) * 6 - 3));
    });
    return dur + 2.5;
  };


  // ---------- complextro ----------
  function fourFloor(ac, out, t, st, bars) {
    for (let i = 0; i < bars * 16; i += 4) kick(ac, out, t + i * st, { f0: 170, f1: 50, pitchTime: 0.05, decay: 0.3, vol: 0.95 });
    for (let b = 0; b < bars; b++) [4, 12].forEach(i => { clap(ac, out, t + (b * 16 + i) * st, 0.5); snare(ac, out, t + (b * 16 + i) * st, { vol: 0.35 }); });
    for (let i = 2; i < bars * 16; i += 4) hat(ac, out, t + i * st, { open: true, vol: 0.1 });
  }
  function duck(param, t, st, bars, depth = 0.1, base = 1) {
    for (let i = 0; i < bars * 16; i += 4) { const s0 = t + i * st; param.setValueAtTime(base * depth, s0); param.linearRampToValueAtTime(base, s0 + st * 3.2); }
  }
  R.switchbass = (ac, out, t) => {
    const st = 60 / 128 / 4, bars = 2, dur = bars * 16 * st;
    fourFloor(ac, out, t, st, bars);
    const bus = ac.createGain(); bus.connect(drive(ac, gainNode(ac, out, 0.7), 2.5)); duck(bus.gain, t, st, bars, 0.25);
    const riff = [43, 43, 55, 43, 46, 43, 50, 48, 43, 43, 55, 43, 53, 50, 46, 41];
    const voices = [
      (s0, f, len) => { const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.setValueAtTime(3000, s0); lp.frequency.exponentialRampToValueAtTime(400, s0 + len);
        const g = ac.createGain(); env(g.gain, s0, 0.22, 0.003, len); lp.connect(g); g.connect(bus); [-15, 0, 15].forEach(d => osc(ac, "sawtooth", f, lp, s0, s0 + len + 0.02, d)); },
      (s0, f, len) => { const car = ac.createOscillator(); car.type = "sawtooth"; car.frequency.value = f; const m = ac.createOscillator(); m.frequency.value = f * 2; const ix = ac.createGain(); ix.gain.setValueAtTime(f * 6, s0); ix.gain.linearRampToValueAtTime(f, s0 + len);
        m.connect(ix); ix.connect(car.frequency); const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.setValueAtTime(600, s0); bp.frequency.exponentialRampToValueAtTime(1500, s0 + len); bp.Q.value = 4;
        const g = ac.createGain(); env(g.gain, s0, 0.5, 0.003, len); car.connect(bp); bp.connect(g); g.connect(bus); car.start(s0); m.start(s0); car.stop(s0 + len + 0.02); m.stop(s0 + len + 0.02); },
      (s0, f, len) => { const g = ac.createGain(); env(g.gain, s0, 0.18, 0.002, len); g.connect(bus); osc(ac, "square", f * 2, g, s0, s0 + len + 0.02); osc(ac, "square", f, g, s0, s0 + len + 0.02, 7); },
      (s0, f, len) => { const g = ac.createGain(); env(g.gain, s0, 0.9, 0.003, len); g.connect(bus); const sum = ac.createGain(); [[700, 8], [1200, 10]].forEach(([fr, q]) => { const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.setValueAtTime(fr, s0); bp.frequency.exponentialRampToValueAtTime(fr * 0.5, s0 + len); bp.Q.value = q; sum.connect(bp); bp.connect(g); });
        osc(ac, "sawtooth", f, sum, s0, s0 + len + 0.02); }
    ];
    for (let b = 0; b < bars; b++) riff.forEach((n, i) => {
      const s0 = t + (b * 16 + i) * st, which = Math.floor(i / 2) % 4;
      voices[which](s0, midi(n - (b && i > 11 ? 2 : 0)), st * 0.92);
    });
    return dur + 0.3;
  };

  let pulseWave = null;
  function pulse(ac, d = 0.25) {
    if (!pulseWave || pulseWave.ac !== ac) {
      const N = 64, re = new Float32Array(N), im = new Float32Array(N);
      for (let n = 1; n < N; n++) re[n] = 2 * Math.sin(Math.PI * n * d) / (Math.PI * n);
      pulseWave = { ac, w: ac.createPeriodicWave(re, im) };
    }
    return pulseWave.w;
  }
  R.chiplead = (ac, out, t) => {
    const st = 60 / 128 / 4, bars = 2, dur = bars * 16 * st, sub = st / 2;
    fourFloor(ac, out, t, st, bars);
    const bus = ac.createGain(); bus.gain.value = 0.11; bus.connect(delay(ac, out, st * 3, 0.25, 4000, 0.25));
    const o = ac.createOscillator(); o.setPeriodicWave(pulse(ac, 0.25)); o.connect(bus); o.start(t); o.stop(t + dur);
    const chords = [[67, 71, 74, 79], [64, 67, 71, 76], [60, 64, 67, 72], [62, 66, 69, 74]];
    for (let k = 0; k < bars * 32; k++) {
      const ch = chords[Math.floor(k / 16) % 4], note = ch[k % 4] + (Math.floor(k / 4) % 2 ? 12 : 0);
      o.frequency.setValueAtTime(midi(note), t + k * sub);
    }
    // little console-style bass
    const bg = ac.createGain(); bg.gain.value = 0.12; bg.connect(out);
    const bo = ac.createOscillator(); bo.setPeriodicWave(pulse(ac, 0.5)); bo.connect(bg); bo.start(t); bo.stop(t + dur);
    [43, 40, 36, 38].forEach((n, i) => bo.frequency.setValueAtTime(midi(n), t + i * 8 * st));
    return dur + 0.4;
  };

  R.dirtyelectro = (ac, out, t) => {
    const st = 60 / 128 / 4, bars = 2, dur = bars * 16 * st;
    fourFloor(ac, out, t, st, bars);
    const sc = ac.createGain(); sc.connect(gainNode(ac, out, 0.75)); duck(sc.gain, t, st, bars, 0.05);
    const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.Q.value = 6; lp.connect(drive(ac, sc, 5));
    const g = ac.createGain(); g.gain.value = 0.0001; g.connect(lp);
    const oscs = [-18, -6, 6, 18].map(d => osc(ac, "sawtooth", midi(41), g, t, t + dur, d));
    const pat = [[1, 41, 1], [2, 53, 1], [3, 41, 1], [5, 41, 1], [6, 44, 1], [7, 41, 2], [9, 53, 1], [10, 41, 1], [11, 48, 2], [13, 46, 1], [14, 44, 1], [15, 41, 1]];
    for (let b = 0; b < bars; b++) pat.forEach(([i, n, l]) => {
      const s0 = t + (b * 16 + i) * st, e0 = s0 + l * st * 0.85;
      oscs.forEach(o => o.frequency.setValueAtTime(midi(n), s0));
      g.gain.setValueAtTime(0.0001, s0); g.gain.exponentialRampToValueAtTime(0.3, s0 + 0.004); g.gain.setValueAtTime(0.3, e0 - 0.015); g.gain.exponentialRampToValueAtTime(0.0001, e0);
      const open = 600 + 3000 * ((b * 16 + i) / (bars * 16));
      lp.frequency.setValueAtTime(open * 2.5, s0); lp.frequency.exponentialRampToValueAtTime(open * 0.5, s0 + st);
    });
    return dur + 0.3;
  };

  R.laserzap = (ac, out, t) => {
    const st = 60 / 128 / 4, bars = 2, dur = bars * 16 * st;
    fourFloor(ac, out, t, st, bars);
    const bus = delay(ac, out, st * 1.5, 0.3, 5000, 0.35);
    const zaps = [[2, "down"], [3, "down"], [6, "up"], [10, "down"], [11, "down"], [14, "down"], [15, "up"], [18, "down"], [22, "down"], [23, "down"], [26, "up"], [28, "down"], [29, "down"], [30, "down"], [31, "up"]];
    zaps.forEach(([i, dir], k) => {
      const s0 = t + i * st, len = dir === "down" ? 0.16 : 0.12;
      const o = ac.createOscillator(); o.type = k % 2 ? "square" : "sawtooth";
      if (dir === "down") { o.frequency.setValueAtTime(3500 + (k % 3) * 600, s0); o.frequency.exponentialRampToValueAtTime(90, s0 + len); }
      else { o.frequency.setValueAtTime(150, s0); o.frequency.exponentialRampToValueAtTime(3000, s0 + len); }
      const g = ac.createGain(); env(g.gain, s0, 0.14, 0.002, len); o.connect(g); g.connect(bus); o.start(s0); o.stop(s0 + len + 0.02);
    });
    return dur + 0.6;
  };

  R.pump = (ac, out, t) => {
    const st = 60 / 128 / 4, bars = 3, dur = bars * 16 * st;
    fourFloor(ac, out, t, st, bars);
    const sc = ac.createGain(); sc.gain.value = 1; sc.connect(reverb(ac, out, 2, 0.2));
    duck(sc.gain, t + 16 * st, st, 2, 0.03);          // bar 1 dry, bars 2–3 pumping
    const g = ac.createGain(); env(g.gain, t, 0.045, 0.02, 0.1, 0.04, t + dur); g.connect(sc);
    [[0, [57, 60, 64, 69]], [16, [53, 57, 60, 65]], [32, [55, 59, 62, 67]]].forEach(([i, ns]) => {
      const s0 = t + i * st, e0 = s0 + 16 * st;
      ns.forEach(n => [-25, -10, 0, 10, 25].forEach(d => osc(ac, "sawtooth", midi(n), g, s0, e0, d)));
    });
    const bg = ac.createGain(); bg.gain.value = 0.3; bg.connect(sc);
    const bo = osc(ac, "sawtooth", midi(33), bg, t, t + dur);
    const blp = ac.createBiquadFilter(); bo.disconnect(); bo.connect(blp); blp.type = "lowpass"; blp.frequency.value = 400; blp.connect(bg);
    [[0, 33], [16, 29], [32, 31]].forEach(([i, n]) => bo.frequency.setValueAtTime(midi(n), t + i * st));
    return dur + 0.4;
  };

  // ---------- reggaeton / trap ----------
  function dembowDrums(ac, out, t, st, bars, vol = 1) {
    for (let b = 0; b < bars; b++) {
      const bt = t + b * 16 * st;
      for (let i = 0; i < 16; i += 4) kick(ac, out, bt + i * st, { f0: 140, f1: 50, decay: 0.3, vol: 0.9 * vol });
      [3, 6, 11, 14].forEach(i => snare(ac, out, bt + i * st, { vol: 0.65 * vol, tone: 260, decay: 0.12, bright: 2500 }));
      for (let i = 0; i < 16; i += 2) hat(ac, out, bt + i * st, { vol: (i % 4 ? 0.08 : 0.12) * vol, freq: 8500 });
      if (b === bars - 1) [13, 15].forEach(i => rim(ac, out, bt + i * st, 0.2 * vol));
    }
  }
  R.dembow = (ac, out, t) => { const st = 60 / 95 / 4; dembowDrums(ac, out, t, st, 3); return 48 * st + 0.3; };

  function boom808(ac, out, s0, f, len, vol = 0.5) {
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, s0); g.gain.exponentialRampToValueAtTime(vol, s0 + 0.005); g.gain.setTargetAtTime(vol * 0.6, s0 + 0.05, 0.25); g.gain.setTargetAtTime(0.0001, s0 + len - 0.04, 0.02);
    g.connect(out); const o = osc(ac, "sine", f * 2, g, s0, s0 + len + 0.1); o.frequency.exponentialRampToValueAtTime(f, s0 + 0.05); return o;
  }
  R.regbass = (ac, out, t) => {
    const st = 60 / 95 / 4, bars = 2;
    dembowDrums(ac, out, t, st, bars, 0.6);
    const d = drive(ac, gainNode(ac, out, 0.9), 1.6);
    const roots = [35, 31, 33, 30];
    for (let h = 0; h < bars * 2; h++) [0, 3, 6].forEach((i, k) => boom808(ac, d, t + (h * 8 + i) * st, midi(roots[h]), (k === 2 ? 2 : 3) * st * 0.95, 0.55));
    return bars * 16 * st + 0.4;
  };

  // Karplus–Strong plucked string
  function pluckBuf(ac, f, dur = 1.2) {
    const sr = ac.sampleRate, n = Math.round(sr / f), len = Math.floor(sr * dur);
    const b = ac.createBuffer(1, len, sr), y = b.getChannelData(0);
    for (let i = 0; i < n; i++) y[i] = Math.random() * 2 - 1;
    for (let i = n; i < len; i++) y[i] = 0.497 * (y[i - n] + y[Math.max(0, i - n - 1)]);
    return b;
  }
  R.regpluck = (ac, out, t) => {
    const st = 60 / 95 / 4, bars = 2;
    dembowDrums(ac, out, t, st, bars, 0.5);
    const bus = reverb(ac, out, 1.6, 0.25);
    const mel = [[0, 71], [2, 74], [3, 73], [6, 71], [8, 69], [10, 71], [11, 66], [14, 69], [16, 71], [18, 74], [19, 76], [22, 74], [24, 73], [26, 71], [27, 69], [30, 66]];
    mel.forEach(([i, n]) => { const s0 = t + i * st, src = ac.createBufferSource(); src.buffer = pluckBuf(ac, midi(n));
      const hp = ac.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 150; const g = gainNode(ac, bus, 0.55); src.connect(hp); hp.connect(g); src.start(s0); });
    return bars * 16 * st + 1;
  };

  function trapKit(ac, out, t, st, bars, rolls = false) {
    for (let b = 0; b < bars; b++) {
      const bt = t + b * 16 * st;
      [0, 10].forEach(i => kick(ac, out, bt + i * st, { f0: 150, f1: 55, decay: 0.25, vol: 0.8 }));
      clap(ac, out, bt + 8 * st, 0.6); snare(ac, out, bt + 8 * st, { vol: 0.45, tone: 220 });
      for (let i = 0; i < 16; i += 2) hat(ac, out, bt + i * st, { vol: 0.11, freq: 9000 });
      if (rolls) {
        for (let k = 0; k < 6; k++) hat(ac, out, bt + (4 + k * 2 / 3) * st, { vol: 0.09, freq: 9000 });
        for (let k = 0; k < 8; k++) hat(ac, out, bt + (12 + k * 0.5) * st, { vol: 0.06 + k * 0.008, freq: 7000 + k * 400 });
      }
    }
  }
  R.hatrolls = (ac, out, t) => { const st = 60 / 140 / 4; trapKit(ac, out, t, st, 2, true); return 32 * st + 0.3; };

  R.glide808 = (ac, out, t) => {
    const st = 60 / 140 / 4, bars = 2, dur = bars * 16 * st;
    trapKit(ac, out, t, st, bars, false);
    const g = ac.createGain(); g.gain.value = 0.0001; g.connect(drive(ac, gainNode(ac, out, 0.9), 1.5));
    const o = osc(ac, "sine", midi(36), g, t, t + dur);
    const notes = [[0, 36], [8, 43], [12, 41], [16, 36], [22, 34], [26, 39]];
    notes.forEach(([i, n], k) => {
      const s0 = t + i * st;
      if (k === 0) { o.frequency.setValueAtTime(midi(n) * 2, s0); o.frequency.exponentialRampToValueAtTime(midi(n), s0 + 0.05); }
      else o.frequency.setTargetAtTime(midi(n), s0, 0.05);
      g.gain.setValueAtTime(0.5, s0); g.gain.setTargetAtTime(0.32, s0 + 0.05, 0.4);
    });
    g.gain.setTargetAtTime(0.0001, t + dur - 0.1, 0.05);
    return dur + 0.3;
  };

  R.trapmelody = (ac, out, t) => {
    const st = 60 / 140 / 4, bars = 2;
    trapKit(ac, out, t, st, bars, true);
    const bus = reverb(ac, out, 2.4, 0.35);
    [[0, 66, 3], [3, 69, 1], [4, 71, 4], [8, 69, 2], [10, 66, 2], [12, 64, 4]].forEach(([i, n, l]) => {
      const s0 = t + i * st, e0 = s0 + l * st * 0.95, g = ac.createGain(); env(g.gain, s0, 0.16, 0.05, 0.1, 0.13, e0); g.connect(bus);
      const o = osc(ac, "triangle", midi(n), g, s0, e0 + 0.05); const l2 = ac.createOscillator(); l2.frequency.value = 5; const lg = ac.createGain(); lg.gain.value = 12; l2.connect(lg); lg.connect(o.detune); l2.start(s0); l2.stop(e0);
      const nz = noise(ac); const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = midi(n) * 3; bp.Q.value = 2; const ng = ac.createGain(); env(ng.gain, s0, 0.05, 0.03, 0.08, 0.02, e0);
      nz.connect(bp); bp.connect(ng); ng.connect(bus); nz.start(s0, Math.random()); nz.stop(e0 + 0.05);
    });
    [[16, 78], [18, 76], [20, 73], [23, 71], [24, 73], [26, 76], [28, 71], [30, 69]].forEach(([i, n]) => {
      const s0 = t + i * st, f = midi(n), car = ac.createOscillator(); car.frequency.value = f;
      const m = ac.createOscillator(); m.frequency.value = f * 3.5; const ix = ac.createGain(); ix.gain.setValueAtTime(f * 1.5, s0); ix.gain.exponentialRampToValueAtTime(1, s0 + 1);
      m.connect(ix); ix.connect(car.frequency); const g = ac.createGain(); env(g.gain, s0, 0.16, 0.002, 1.2); car.connect(g); g.connect(bus);
      car.start(s0); m.start(s0); car.stop(s0 + 1.3); m.stop(s0 + 1.3);
    });
    return 32 * st + 1.4;
  };

  // ---------- dub / steppas ----------
  function oneDropDrums(ac, out, t, st, bars, vol = 1) {
    const sw = st * 0.33, bus = delay(ac, out, st * 3, 0.45, 2000, 0.35);
    for (let b = 0; b < bars; b++) {
      const bt = t + b * 16 * st;
      kick(ac, out, bt + 8 * st, { f0: 110, f1: 48, decay: 0.45, vol: 0.9 * vol, click: false });
      rim(ac, bus, bt + 8 * st, 0.35 * vol);
      for (let i = 0; i < 16; i += 2) hat(ac, out, bt + i * st + (i % 4 ? sw : 0), { vol: (i % 4 ? 0.07 : 0.1) * vol, freq: 7000 });
    }
  }
  // steppers at its felt tempo (~140): kick on EVERY beat, snare/rim on beat 3
  function steppersDrums(ac, out, t, st, bars, vol = 1) {
    const bus = delay(ac, out, st * 3, 0.45, 2000, 0.35);
    for (let b = 0; b < bars; b++) {
      const bt = t + b * 16 * st;
      for (let i = 0; i < 16; i += 4) kick(ac, out, bt + i * st, { f0: 150, f1: 48, pitchTime: 0.05, decay: 0.3, vol: 1 * vol, click: true });
      snare(ac, bus, bt + 8 * st, { vol: 0.55 * vol, tone: 240, decay: 0.12 }); rim(ac, bus, bt + 8 * st, 0.3 * vol);
      for (let i = 2; i < 16; i += 4) hat(ac, out, bt + i * st, { vol: 0.09 * vol, freq: 7500 });
      for (let i = 0; i < 16; i += 2) hat(ac, out, bt + i * st, { vol: 0.05 * vol, freq: 8000 });
    }
  }
  function warmBass(ac, out, s0, f, len, vol = 0.45) {
    const g = ac.createGain(); env(g.gain, s0, vol, 0.01, 0.08, vol * 0.85, s0 + len);
    const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 500; lp.connect(g); g.connect(out);
    osc(ac, "sine", f, lp, s0, s0 + len + 0.05); osc(ac, "triangle", f, gainNode(ac, lp, 0.5), s0, s0 + len + 0.05);
  }
  R.onedrop = (ac, out, t) => {
    const st = 60 / 76 / 4; oneDropDrums(ac, out, t, st, 2);
    [[0, 38, 3], [4, 38, 1], [6, 41, 2], [8, 43, 4], [14, 41, 2], [16, 38, 3], [20, 36, 2], [24, 33, 4], [30, 36, 2]].forEach(([i, n, l]) => warmBass(ac, out, t + i * st, midi(n), l * st * 0.9, 0.3));
    return 32 * st + 0.8;
  };
  R.skank = (ac, out, t) => {
    const st = 60 / 76 / 4; oneDropDrums(ac, out, t, st, 2, 0.6);
    const spring = reverb(ac, delay(ac, out, st * 3, 0.5, 2500, 0.35), 1.2, 0.35);
    const chords = [[62, 65, 69], [62, 65, 69], [60, 64, 67], [60, 64, 67]];
    for (let beat = 0; beat < 8; beat++) {
      const s0 = t + (beat * 4 + 2) * st, ch = chords[Math.floor(beat / 2) % 4];
      const g = ac.createGain(); env(g.gain, s0, 0.22, 0.002, 0.08); const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 2200; bp.Q.value = 1;
      bp.connect(g); g.connect(spring); ch.forEach(n => osc(ac, "sawtooth", midi(n), bp, s0, s0 + 0.12));
      // organ bubble: low/high alternation in shuffled 8ths
      [0, 1].forEach(k => { const b0 = t + (beat * 4 + k * 1.33) * st, og = ac.createGain(); env(og.gain, b0, 0.11, 0.004, 0.09); og.connect(out);
        (k ? ch : ch.map(n => n - 12)).forEach(n => [1, 2].forEach(h => osc(ac, "sine", midi(n) * h, og, b0, b0 + 0.15))); });
    }
    return 32 * st + 1;
  };
  R.dubbass = (ac, out, t) => {
    const st = 60 / 70 / 4, len = 32 * st, d = drive(ac, gainNode(ac, out, 0.9), 1.4);
    const line = [[0, 38, 2], [2, 41, 1], [3, 43, 1], [4, 45, 3], [8, 43, 2], [10, 41, 1], [11, 38, 3], [16, 38, 2], [18, 41, 1], [19, 43, 1], [20, 45, 2], [22, 48, 2], [24, 45, 2], [26, 43, 2], [28, 41, 4]];
    oneDropDrums(ac, out, t, st, 2, 0.3);                 // roots dub
    steppersDrums(ac, out, t + len, st / 2, 4, 0.45);     // UK steppas: kick on every beat at 140
    [0, len].forEach(off => line.forEach(([i, n, l]) => warmBass(ac, d, t + off + i * st, midi(n), l * st * 0.92, 0.6)));
    return 2 * len + 0.8;
  };
  R.melodica = (ac, out, t) => {
    const st = 60 / 76 / 4; oneDropDrums(ac, out, t, st, 2, 0.5);
    const bus = reverb(ac, delay(ac, out, st * 3, 0.55, 2500, 0.4), 1.6, 0.3);
    [[0, 74, 3], [3, 72, 1], [4, 69, 4], [10, 67, 2], [12, 69, 4], [16, 74, 2], [18, 77, 2], [20, 76, 4], [26, 72, 2], [28, 74, 4]].forEach(([i, n, l]) => {
      const s0 = t + i * st, e0 = s0 + l * st * 0.95, g = ac.createGain(); env(g.gain, s0, 0.24, 0.04, 0.1, 0.2, e0);
      const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1400; bp.Q.value = 0.8; bp.connect(g); g.connect(bus);
      [["square", 0], ["sawtooth", 6]].forEach(([ty, dt]) => { const o = osc(ac, ty, midi(n), bp, s0, e0 + 0.05, dt);
        const l2 = ac.createOscillator(); l2.frequency.value = 5.5; const lg = ac.createGain(); lg.gain.value = 10; l2.connect(lg); lg.connect(o.detune); l2.start(s0); l2.stop(e0); });
      const nz = noise(ac); const nb = ac.createBiquadFilter(); nb.type = "bandpass"; nb.frequency.value = 3000; const ng = gainNode(ac, bus, 0.012); nz.connect(nb); nb.connect(ng); nz.start(s0, Math.random()); nz.stop(e0);
    });
    return 32 * st + 1.5;
  };
  R.steppersbeat = (ac, out, t) => {
    const st = 60 / 140 / 4; steppersDrums(ac, out, t, st, 4);
    [[0, 33], [8, 33], [16, 36], [24, 31], [32, 33], [40, 33], [48, 36], [56, 31]].forEach(([i, n]) => warmBass(ac, out, t + i * st, midi(n), 7.5 * st, 0.3));
    return 64 * st + 0.8;
  };


  // ---------- classic breaks (programmed imitations) ----------
  // pattern: arrays of 16th steps over 2 bars (0–31). g = ghost snares, o = open hats, h = closed hats
  function playBreak(ac, out, t, pat, bpm, extra) {
    const st = 60 / bpm / 4, bus = gainNode(ac, out, 0.95);
    const dusty = ac.createBiquadFilter(); dusty.type = "lowpass"; dusty.frequency.value = 9000; dusty.connect(bus);
    (pat.k || []).forEach(i => kick(ac, dusty, t + i * st, { f0: 130, f1: 55, decay: 0.22, vol: 0.9 }));
    (pat.s || []).forEach(i => snare(ac, dusty, t + i * st, { vol: 0.8, tone: 210, decay: 0.15, bright: 1500 }));
    (pat.g || []).forEach(i => snare(ac, dusty, t + i * st, { vol: 0.22, tone: 210, decay: 0.07, bright: 1800 }));
    (pat.h || []).forEach(i => hat(ac, dusty, t + i * st, { vol: 0.13, freq: 7000 }));
    (pat.o || []).forEach(i => hat(ac, dusty, t + i * st, { open: true, vol: 0.15, freq: 6500 }));
    (pat.r || []).forEach(i => ride(ac, dusty, t + i * st, 0.12));
    if (extra) extra(dusty, st);
    return 32 * st;
  }
  function bongo(ac, out, s0, high, vol = 0.35) {
    const o = ac.createOscillator(); o.type = "sine"; const f = high ? 420 : 300;
    o.frequency.setValueAtTime(f * 1.25, s0); o.frequency.exponentialRampToValueAtTime(f, s0 + 0.03);
    const g = ac.createGain(); env(g.gain, s0, vol, 0.002, high ? 0.12 : 0.18); o.connect(g); g.connect(out); o.start(s0); o.stop(s0 + 0.25);
    const n = noise(ac); const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = f * 4; bp.Q.value = 3;
    const ng = ac.createGain(); env(ng.gain, s0, vol * 0.3, 0.001, 0.015); n.connect(bp); bp.connect(ng); ng.connect(out); n.start(s0, Math.random()); n.stop(s0 + 0.03);
  }
  function shout(ac, out, s0, vowels, len, pitch) {
    // tiny formant 'yeah' / 'woo' made from the voice helper
    const step = len / vowels.length;
    voice(ac, out, [pitch], vowels.map((v, k) => [s0 + k * step, step * 1.1, v, 1 + (k ? -0.06 : 0.04)]), { type: "sawtooth", vol: 0.45, noiseAmt: 0.25 });
  }
  function twoSpeeds(ac, out, t, pat, bpm, extra) {
    const l1 = playBreak(ac, out, t, pat, bpm, extra);
    const l2 = playBreak(ac, out, t + l1 + 0.25, pat, 166, extra);  // sped up, jungle style
    return l1 + 0.25 + l2 + 0.4;
  }
  const H8 = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
  R.think = (ac, out, t) => twoSpeeds(ac, out, t, {
    k: [0, 6, 10, 16, 22, 26, 27], s: [4, 12, 20, 28], g: [9, 15, 25, 31], h: H8, o: [14, 30]
  }, 112);
  R.apache = (ac, out, t) => twoSpeeds(ac, out, t, {
    k: [0, 7, 10, 16, 23, 26], s: [4, 12, 20, 28], g: [14, 30], h: H8
  }, 112, (bus, st) => {
    [1, 3, 5, 6, 9, 11, 13, 15, 17, 19, 21, 22, 25, 27, 29, 31].forEach((i, k) => bongo(ac, bus, t + i * st, k % 3 !== 2));
  });
  R.funkydrummer = (ac, out, t) => twoSpeeds(ac, out, t, {
    k: [0, 3, 10, 13, 16, 19, 26, 29], s: [4, 12, 20, 28], g: [7, 9, 15, 23, 25, 31],
    h: [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 31], o: [6, 14, 22, 30]
  }, 102);
  R.hotpants = (ac, out, t) => twoSpeeds(ac, out, t, {
    k: [0, 3, 8, 10, 16, 19, 24, 26], s: [4, 12, 20, 28], g: [7, 15, 23], h: [0, 4, 8, 12, 16, 20, 24, 28], o: [2, 6, 10, 14, 18, 22, 26, 30]
  }, 116);

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
