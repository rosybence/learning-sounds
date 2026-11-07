(function () {
  const CARDS = window.CARDS, GENRES = window.GENRES, SE = window.SoundEngine;
  const $ = s => document.querySelector(s);
  const byId = Object.fromEntries(CARDS.map(c => [c.id, c]));
  const yt = q => "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  // ---------- LCD ----------
  const lcdNow = $("#lcdNow"), lcdScore = $("#lcdScore");
  const setNow = t => { lcdNow.textContent = t; };
  const setScore = n => { lcdScore.textContent = String(n).padStart(3, "0"); };

  // ---------- oscilloscope ----------
  const canvas = $("#scope"), g2 = canvas.getContext("2d");
  let scopeColor = "#b6ff4a", buf = null;
  function sizeCanvas() { const r = canvas.getBoundingClientRect(), d = window.devicePixelRatio || 1; canvas.width = r.width * d; canvas.height = r.height * d; }
  window.addEventListener("resize", sizeCanvas); sizeCanvas();
  function draw() {
    requestAnimationFrame(draw);
    const w = canvas.width, h = canvas.height;
    g2.clearRect(0, 0, w, h);
    const an = SE.analyser();
    g2.lineWidth = 2 * (window.devicePixelRatio || 1);
    g2.strokeStyle = scopeColor; g2.shadowColor = scopeColor; g2.shadowBlur = 12;
    g2.beginPath();
    if (!an) { g2.moveTo(0, h / 2); g2.lineTo(w, h / 2); g2.stroke(); return; }
    if (!buf) buf = new Float32Array(an.fftSize);
    an.getFloatTimeDomainData(buf);
    // find a rising zero crossing so the wave holds still
    let start = 0; for (let i = 1; i < buf.length / 2; i++) if (buf[i - 1] < 0 && buf[i] >= 0) { start = i; break; }
    const n = buf.length / 2;
    for (let i = 0; i < n; i++) {
      const x = i / (n - 1) * w, y = h / 2 - buf[start + i] * h * 0.42;
      i ? g2.lineTo(x, y) : g2.moveTo(x, y);
    }
    g2.stroke();
  }
  draw();

  // ---------- playback ----------
  let playingEl = null, playTimer = null;
  function clearPlaying() { if (playingEl) playingEl.classList.remove("playing"); playingEl = null; clearTimeout(playTimer); }
  async function playCard(card, el, label) {
    clearPlaying();
    scopeColor = GENRES[card.genre].color;
    if (!SE.has(card.id)) { setNow("RECORDED · OPEN CARD"); return; }
    setNow(label || card.name.toUpperCase());
    if (el) { playingEl = el; el.style.setProperty("--dur", "3s"); el.classList.add("playing"); }
    const len = await SE.play(card.id);
    if (el && playingEl === el) {
      el.style.setProperty("--dur", len + "s");
      el.classList.remove("playing"); void el.offsetWidth; el.classList.add("playing");
      playTimer = setTimeout(clearPlaying, len * 1000);
    }
  }
  $("#stopBtn").addEventListener("click", () => { SE.stop(); clearPlaying(); setNow("— STOPPED —"); });

  // ---------- views ----------
  document.querySelectorAll(".tbtn[data-view]").forEach(b => b.addEventListener("click", () => {
    document.querySelectorAll(".tbtn[data-view]").forEach(x => x.classList.toggle("active", x === b));
    document.querySelectorAll(".view").forEach(v => v.classList.toggle("active", v.id === "view-" + b.dataset.view));
    SE.stop(); clearPlaying();
    if (b.dataset.view === "quiz") showSetup();
  }));

  // ---------- rack ----------
  let filter = "all";
  function renderFilter() {
    const items = [["all", "All sounds", "#b6ff4a"], ...Object.entries(GENRES).map(([k, v]) => [k, v.label, v.color])];
    $("#genreFilter").innerHTML = items.map(([k, l, c]) =>
      `<button class="chan ${filter === k ? "active" : ""}" data-g="${k}" style="--c:${c}"><span class="led"></span>${l}</button>`).join("");
    $("#genreFilter").querySelectorAll(".chan").forEach(b => b.addEventListener("click", () => { filter = b.dataset.g; renderFilter(); renderPads(); }));
  }
  function renderPads() {
    const list = CARDS.filter(c => filter === "all" || c.genre === filter);
    $("#pads").innerHTML = list.map(c => {
      const i = CARDS.indexOf(c) + 1, col = GENRES[c.genre].color;
      return `<div class="pad" role="button" tabindex="0" data-id="${c.id}" style="--c:${col}">
        <div class="pad-top"><span class="pad-num">${String(i).padStart(2, "0")}</span><span class="pad-type">${c.type}</span></div>
        <div><div class="pad-name">${esc(c.name)}</div><div class="pad-genre">${GENRES[c.genre].label}${SE.has(c.id) ? "" : " · <span class='pad-yt'>▶ YouTube</span>"}</div></div>
        <button class="pad-info" data-info="${c.id}" aria-label="Open card">ⓘ</button>
      </div>`;
    }).join("");
    $("#pads").querySelectorAll(".pad").forEach(p => p.addEventListener("click", e => {
      const card = byId[p.dataset.id];
      if (e.target.closest("[data-info]")) { openCard(card); return; }
      if (!SE.has(card.id)) { openCard(card); return; }
      playCard(card, p);
    }));
  }

  // ---------- card ----------
  const modal = $("#modal"), flip = $("#flip");
  // ---------- embedded YouTube examples ----------
  const fmt = t => Math.floor(t / 60) + ":" + String(Math.floor(t % 60)).padStart(2, "0");
  const startKey = (cid, i) => `ls_start_${cid}_${i}`;
  const startOf = (c, i) => store.get(startKey(c.id, i), c.examples[i].t || 0);
  let ytReady = null;
  function loadYT() {
    if (ytReady) return ytReady;
    ytReady = new Promise(res => {
      if (window.YT && YT.Player) return res(true);
      window.onYouTubeIframeAPIReady = () => res(true);
      const sc = document.createElement("script"); sc.src = "https://www.youtube.com/iframe_api";
      sc.onerror = () => res(false); document.head.appendChild(sc);
      setTimeout(() => res(!!(window.YT && YT.Player)), 6000);
    });
    return ytReady;
  }
  const players = [];
  function slotHTML(c, i) {
    const e = c.examples[i];
    return `<div class="video" data-cid="${c.id}" data-i="${i}">${coverHTML(c, i)}</div>
      <div class="vbar" data-cid="${c.id}" data-i="${i}">
        <span class="vstart">▶ starts at <b>${fmt(startOf(c, i))}</b></span>
        <button class="vbtn hidden" data-mark>📍 Set start here</button>
        <button class="vbtn hidden" data-reset>↺</button>
      </div>`;
  }
  function coverHTML(c, i) {
    const e = c.examples[i];
    return `<button class="video-cover" data-loadvideo style="background-image:url(https://i.ytimg.com/vi/${e.yt}/hqdefault.jpg)"><span class="yt big">▶</span></button>`;
  }
  async function loadVideo(slot) {
    SE.stop(); clearPlaying(); stopVideos();
    const c = byId[slot.dataset.cid], i = +slot.dataset.i, e = c.examples[i], st = Math.floor(startOf(c, i));
    const host = document.createElement("div"); slot.innerHTML = ""; slot.appendChild(host);
    const bar = slot.nextElementSibling;
    const ok = await loadYT();
    if (!slot.isConnected) return;
    if (ok) {
      const pl = new YT.Player(host, { host: "https://www.youtube-nocookie.com", videoId: e.yt, width: "100%", height: "100%",
        playerVars: { start: st, autoplay: 1, playsinline: 1, rel: 0, modestbranding: 1 },
        events: { onReady: ev => { ev.target.seekTo(st, true); ev.target.playVideo(); } } });
      slot._player = pl; players.push(slot);
      bar.querySelectorAll(".vbtn").forEach(b => b.classList.remove("hidden"));
    } else {
      slot.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${e.yt}?start=${st}&autoplay=1&rel=0&playsinline=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    }
  }
  function stopVideos() {
    document.querySelectorAll(".video").forEach(v => {
      if (v.querySelector("iframe")) {
        try { v._player && v._player.destroy(); } catch (e) {}
        v._player = null;
        v.innerHTML = coverHTML(byId[v.dataset.cid], +v.dataset.i);
        const bar = v.nextElementSibling; if (bar) bar.querySelectorAll(".vbtn").forEach(b => b.classList.add("hidden"));
      }
    });
  }
  function refreshStart(bar) {
    const c = byId[bar.dataset.cid], i = +bar.dataset.i;
    document.querySelectorAll(`.vbar[data-cid="${c.id}"][data-i="${i}"] .vstart b`).forEach(b => b.textContent = fmt(startOf(c, i)));
  }
  function cardFront(c, hideName) {
    const col = GENRES[c.genre].color;
    const chips = `<span class="chip main">${GENRES[c.genre].label}</span>` + c.also.map(a => `<span class="chip">${esc(a)}</span>`).join("");
    const playable = SE.has(c.id);
    return `<div class="card-top"><span class="pad-type" style="--c:${col}">${c.type}</span><button class="x" data-close>✕</button></div>
      <div class="card-name">${hideName ? "???" : esc(c.name)}</div>
      <div class="card-aka">${hideName ? "" : "aka " + esc(c.aka)}</div>
      ${playable ? `<button class="bigpad card-play" data-play><span class="ring"></span><span class="bp-label">▶ PLAY</span></button>` : ""}
      ${(!playable || c.showReal) ? `<div class="sec"><h3>${playable ? "Hear the real recording" : "Listen"} · ${esc(c.examples[0].artist)} — ${esc(c.examples[0].track)}</h3>${slotHTML(c, 0)}</div>` : ""}
      <div class="chips">${chips}</div>
      <div class="sec"><h3>What to listen for</h3><p class="listen">${esc(c.listen)}</p></div>
      <button class="flipbtn" data-flip>FLIP CARD ↻ &nbsp;plugins · tutorials · examples</button>`;
  }
  function cardBack(c) {
    const col = GENRES[c.genre].color;
    const plugs = c.plugins.map(p => `<div class="plug"><span class="tag ${p.where}">${p.where === "FL" ? "FL" : "FREE"}</span><span><b>${esc(p.name)}</b><small>${esc(p.note)}</small></span></div>`).join("");
    const ex = c.examples.map((e, i) => `<div class="exrow"><button class="ex" data-expand="${i}"><span class="yt">▶</span><span><b>${esc(e.track)}</b><small>${esc(e.artist)}${e.year ? " · " + e.year : ""}${e.note ? " · " + esc(e.note) : ""}</small></span></button>
      <div class="exslot hidden" data-slot="${i}">${slotHTML(c, i)}</div></div>`).join("");
    const tuts = c.tutorials.map(q => `<a class="tut" href="${yt(q)}" target="_blank" rel="noopener">${esc(q)}</a>`).join("");
    const chips = `<span class="chip main">${GENRES[c.genre].label}</span>` + c.also.map(a => `<span class="chip">${esc(a)}</span>`).join("");
    return `<div class="card-top"><span class="pad-type" style="--c:${col}">${esc(c.name)}</span><button class="x" data-close>✕</button></div>
      <div class="chips">${chips}</div>
      <div class="sec"><h3>Free plugins that make it</h3>${plugs}
        <p class="flnote">${c.inFL ? "✓ Possible with FL Studio's own instruments/effects." : "✗ Not straightforward with FL's free stock plugins — use the free plugins or tutorials."}</p></div>
      <div class="sec"><h3>How it's made</h3><ol>${c.recipe.map(r => `<li>${esc(r)}</li>`).join("")}</ol></div>
      <div class="sec"><h3>Tutorials</h3>${tuts}</div>
      <div class="sec"><h3>Famous examples</h3>${ex}</div>
      <button class="flipbtn" data-flip>↻ FLIP BACK</button>`;
  }
  function openCard(c) {
    const col = GENRES[c.genre].color;
    flip.classList.remove("flipped");
    $("#cardFront").innerHTML = cardFront(c); $("#cardBack").innerHTML = cardBack(c);
    [$("#cardFront"), $("#cardBack")].forEach(f => { f.style.setProperty("--c", col); f.scrollTop = 0; });
    modal.classList.remove("hidden");
    modal.dataset.id = c.id;
  }
  modal.addEventListener("click", e => {
    if (e.target.closest("[data-close]")) { modal.classList.add("hidden"); SE.stop(); clearPlaying(); stopVideos(); return; }
    const lv = e.target.closest("[data-loadvideo]"); if (lv) { loadVideo(lv.closest(".video")); return; }
    const exb = e.target.closest("[data-expand]");
    if (exb) { const slot = exb.parentElement.querySelector(".exslot"); const open = slot.classList.contains("hidden");
      stopVideos(); document.querySelectorAll(".exslot").forEach(x => x.classList.add("hidden"));
      if (open) { slot.classList.remove("hidden"); loadVideo(slot.querySelector(".video")); } return; }
    const mk = e.target.closest("[data-mark]");
    if (mk) { const bar = mk.closest(".vbar"), v = bar.previousElementSibling;
      if (v._player && v._player.getCurrentTime) { store.set(startKey(bar.dataset.cid, bar.dataset.i), Math.floor(v._player.getCurrentTime())); refreshStart(bar); mk.textContent = "✓ Saved"; setTimeout(() => mk.textContent = "📍 Set start here", 1200); } return; }
    const rs = e.target.closest("[data-reset]");
    if (rs) { const bar = rs.closest(".vbar"); try { localStorage.removeItem(startKey(bar.dataset.cid, bar.dataset.i)); } catch (er) {} refreshStart(bar); return; }
    if (e.target.closest("[data-flip]")) { stopVideos(); flip.classList.toggle("flipped"); return; }
    const p = e.target.closest("[data-play]"); if (p) { stopVideos(); playCard(byId[modal.dataset.id], p); }
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { modal.classList.add("hidden"); stopVideos(); } });

  // ---------- quiz ----------
  const ROUNDS = 10;
  let q = null;
  function showSetup() {
    $("#quizSetup").classList.remove("hidden"); $("#quizRound").classList.add("hidden"); $("#quizEnd").classList.add("hidden");
    const best = store.get("ls_best", null);
    $("#bestScore").textContent = best !== null ? `BEST: ${best} / ${ROUNDS}` : "";
    setScore(0); setNow("PICK A MODE");
  }
  document.querySelectorAll(".mode").forEach(b => b.addEventListener("click", () => startQuiz(b.dataset.mode)));
  function startQuiz(mode) {
    SE.unlock();
    const pool = shuffle(CARDS).slice(0, ROUNDS);
    q = { mode, pool, i: 0, score: 0, results: [] };
    $("#quizSetup").classList.add("hidden"); $("#quizEnd").classList.add("hidden"); $("#quizRound").classList.remove("hidden");
    setScore(0); nextQuestion();
  }
  function redact(text, card) {
    let t = text;
    [card.name, ...card.aka.split(",")].map(s => s.trim()).filter(s => s.length > 2).forEach(w => { t = t.split(w).join("▒▒▒"); });
    return t;
  }
  function nextQuestion() {
    const card = q.pool[q.i];
    const kind = q.mode === "mixed" ? (Math.random() < 0.5 ? "name" : "genre") : q.mode;
    q.kind = kind; q.card = card;
    $("#qStep").textContent = `${q.i + 1} / ${ROUNDS}`;
    $("#qMeter").innerHTML = Array.from({ length: ROUNDS }, (_, k) => `<i class="${q.results[k] === true ? "good" : q.results[k] === false ? "bad" : k === q.i ? "cur" : ""}"></i>`).join("");
    $("#qPrompt").textContent = kind === "name" ? "What is this sound called?" : "Which genre is this sound most associated with?";
    const playable = SE.has(card.id);
    $("#qPlay").classList.toggle("hidden", !playable);
    $("#qClue").classList.toggle("hidden", playable);
    if (!playable) $("#qClue").innerHTML = "<b>Recorded sound — clue:</b> " + esc(redact(card.listen, card));
    let opts;
    if (kind === "name") {
      const others = shuffle(CARDS.filter(c => c.id !== card.id));
      // prefer distractors of the same type so it's a real test
      const same = others.filter(c => c.type === card.type), rest = others.filter(c => c.type !== card.type);
      opts = shuffle([card, ...[...same, ...rest].slice(0, 3)]).map(c => ({ label: c.name, ok: c.id === card.id }));
    } else {
      opts = Object.entries(GENRES).map(([k, v]) => ({ label: v.label, ok: k === card.genre }));
    }
    $("#qOptions").innerHTML = opts.map((o, k) => `<button class="opt" data-ok="${o.ok}"><span class="key">${"ABCD"[k]}</span>${esc(o.label)}</button>`).join("");
    $("#qOptions").querySelectorAll(".opt").forEach(b => b.addEventListener("click", () => answer(b)));
    $("#qReveal").classList.add("hidden"); $("#qNext").classList.add("hidden");
    setNow(`Q${q.i + 1} · ???`);
    if (playable) setTimeout(() => playQ(), 250);
  }
  function playQ() { playCard(q.card, $("#qPlay"), `Q${q.i + 1} · ???`); }
  $("#qPlay").addEventListener("click", playQ);
  function answer(btn) {
    const ok = btn.dataset.ok === "true", card = q.card;
    $("#qOptions").querySelectorAll(".opt").forEach(b => { b.disabled = true; if (b.dataset.ok === "true") b.classList.add("correct"); });
    if (!ok) btn.classList.add("wrong");
    q.results[q.i] = ok; if (ok) q.score++;
    setScore(q.score); setNow(card.name.toUpperCase());
    $("#qReveal").innerHTML = `<div class="verdict ${ok ? "good" : "bad"}">${ok ? "Nailed it." : "Not quite."}</div>
      <p><b style="color:var(--text)">${esc(card.name)}</b> · ${GENRES[card.genre].label}${card.also.length ? " (also " + card.also.slice(0, 2).map(esc).join(", ") + ")" : ""}</p>
      <p>${esc(card.listen)}</p>
      <button class="linkbtn" id="qOpen">Open full card ↻</button>`;
    $("#qReveal").classList.remove("hidden");
    $("#qOpen").addEventListener("click", () => openCard(card));
    $("#qNext").textContent = q.i + 1 < ROUNDS ? "NEXT ▸" : "SEE SCORE ▸";
    $("#qNext").classList.remove("hidden");
  }
  $("#qNext").addEventListener("click", () => {
    SE.stop(); clearPlaying();
    q.i++;
    if (q.i < ROUNDS) nextQuestion(); else endQuiz();
  });
  function endQuiz() {
    const best = store.get("ls_best", 0);
    if (q.score > best) store.set("ls_best", q.score);
    $("#quizRound").classList.add("hidden"); $("#quizEnd").classList.remove("hidden");
    const msg = q.score >= 9 ? "Selector status." : q.score >= 6 ? "Getting there — run it back." : "Keep digging through the rack.";
    $("#qFinal").innerHTML = `${q.score}/${ROUNDS}<small>${msg}${q.score > best ? " New best!" : ""}</small>`;
    setNow("SESSION COMPLETE");
  }
  $("#qAgain").addEventListener("click", showSetup);

  renderFilter(); renderPads();
})();
