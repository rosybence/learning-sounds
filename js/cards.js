// Card data for Learning Sounds.
// genre = the main genre (one of jungle, dubstep, garage, electro), used for colours and the genre quiz.
// also = other genres where the sound is common.
// plugins: where = "FL" (ships with FL Studio) or "Free" (free download).
// examples / tutorials become YouTube search links in the app.

window.CARDS = [
  {
    id: "amen", showReal: true, name: "Amen break", aka: "Amen, chopped break",
    genre: "jungle", also: ["Drum & bass", "Breakcore"], type: "Drums",
    listen: "A fast, rolling, slightly dusty drum loop with a crashing ride and snares that skip and stutter. Chopped and re-sequenced at around 160–175 BPM.",
    recipe: [
      "Load a drum break (the original is a 4-bar drum solo from 1969) into a slicer.",
      "Slice on every hit, then re-trigger the slices in a new order at 160–175 BPM.",
      "Add snare rolls and reversed or pitched slices for the classic chopped feel.",
      "Our in-app version is a synthesised imitation of the pattern — listen to the real recording via the examples."
    ],
    plugins: [
      { name: "Fruity Slicer", where: "FL", note: "Auto-slices a break across keys" },
      { name: "Slicex", where: "FL", note: "Producer Edition and up" },
      { name: "Edison", where: "FL", note: "Detect beats and chop" }
    ],
    inFL: true,
    tutorials: ["how to chop amen break fl studio", "jungle break chopping tutorial"],
    examples: [
      { artist: "The Winstons", track: "Amen, Brother", year: 1969, note: "The source — drum solo at 1:26", yt: "QpgeOYQHKcs", t: 86 },
      { artist: "Shy FX & UK Apache", track: "Original Nuttah", year: 1994, yt: "sxbekgL4w7w", t: 0 }
    ]
  },
  {
    id: "reese", name: "Reese bass", aka: "Detuned saw bass",
    genre: "jungle", also: ["Drum & bass", "Dubstep", "Speed garage"], type: "Bass",
    listen: "A thick, growling bass that seems to slowly churn and phase against itself, even on a single held note.",
    recipe: [
      "Two (or more) sawtooth oscillators on the same note.",
      "Detune them slightly against each other (around 10–20 cents) — the beating creates the movement.",
      "Low-pass filter to tame the top; add a clean sine sub underneath.",
      "Optional: slow LFO on the detune or filter, plus a little distortion."
    ],
    plugins: [
      { name: "3x Osc", where: "FL", note: "Two saws, detune with fine tune" },
      { name: "Vital", where: "Free", note: "Unison voices + detune knob" },
      { name: "Surge XT", where: "Free", note: "Super-saw / unison" }
    ],
    inFL: true,
    tutorials: ["how to make reese bass vital", "reese bass 3x osc fl studio"],
    examples: [
      { artist: "Reese (Kevin Saunderson)", track: "Just Want Another Chance", year: 1988, note: "Where the name comes from", yt: "_kOwlbMBO0U", t: 0 },
      { artist: "Bad Company", track: "The Nine", year: 1998, yt: "nRpdg4-ljb8", t: 0 }
    ]
  },
  {
    id: "hoover", name: "Hoover", aka: "Mentasm stab, Dominator sound",
    genre: "jungle", also: ["Hardcore rave", "Techno"], type: "Synth",
    listen: "A huge, swirling, slightly sour lead that swoops in pitch — like a vacuum cleaner played through a stadium PA.",
    recipe: [
      "Pulse/saw waves stacked with heavy detune and chorus (the original is a Roland Alpha Juno preset).",
      "Add a sub-octave layer for weight.",
      "Pitch glides: dip down then swoop up into each note (portamento / pitch envelope).",
      "Lots of chorus; optionally pulse-width modulation."
    ],
    plugins: [
      { name: "Vital", where: "Free", note: "Unison + chorus + pitch envelope" },
      { name: "Surge XT", where: "Free", note: "Has hoover-style factory patches" },
      { name: "Sytrus", where: "FL", note: "Producer Edition and up" }
    ],
    inFL: false,
    tutorials: ["how to make hoover sound vital", "alpha juno hoover synth tutorial"],
    examples: [
      { artist: "Second Phase (Joey Beltram)", track: "Mentasm", year: 1991, yt: "GpOqgnFSUAo", t: 0 },
      { artist: "Human Resource", track: "Dominator", year: 1991, yt: "i7P0686tpXE", t: 0 }
    ]
  },
  {
    id: "ragga", name: "Ragga / MC vocal chop", aka: "Ragga sample, dancehall vocal",
    genre: "jungle", also: ["Dubstep", "Garage", "Grime"], type: "Vocal",
    listen: "Short bursts of Jamaican dancehall or MC vocals, often repeated, pitched or stuttered over the breaks.",
    recipe: [
      "Take a dancehall/ragga acapella or MC line.",
      "Chop single words or phrases; repeat and stutter them in time.",
      "Often pitched up or down, with delay throws on the last word.",
      "This is a recording, so the card plays a real example from YouTube."
    ],
    plugins: [
      { name: "Fruity Slicer", where: "FL", note: "Chop vocals into slices" },
      { name: "Edison", where: "FL", note: "Cut and pitch phrases" },
      { name: "Fruity Delay 3", where: "FL", note: "Echo throws on the last word" }
    ],
    inFL: true,
    tutorials: ["ragga jungle vocal chop tutorial", "how to make ragga jungle fl studio"],
    examples: [
      { artist: "M-Beat feat. General Levy", track: "Incredible", year: 1994, yt: "VcgsvxDsZV0", t: 0 },
      { artist: "Shy FX & UK Apache", track: "Original Nuttah", year: 1994, yt: "sxbekgL4w7w", t: 0 }
    ]
  },
  {
    id: "siren", name: "Dub siren", aka: "Sound-system siren",
    genre: "jungle", also: ["Dub", "Dubstep", "Reggae sound systems"], type: "FX",
    listen: "A rising, wailing electronic siren that loops and echoes away into a long delay tail.",
    recipe: [
      "One oscillator (square or sine).",
      "Modulate its pitch with an LFO (saw or square shape) — speed up the LFO for urgency.",
      "Feed it into a long feedback delay (dotted 8th) so it echoes and builds.",
      "Ride the delay feedback and filter by hand."
    ],
    plugins: [
      { name: "3x Osc + Fruity Delay 3", where: "FL", note: "Automate pitch, heavy feedback" },
      { name: "Vital", where: "Free", note: "LFO on pitch" },
      { name: "NastyDLA", where: "Free", note: "Dub-style delay" }
    ],
    inFL: true,
    tutorials: ["how to make dub siren synth", "dub siren vital tutorial"],
    examples: [
      { artist: "Congo Natty", track: "Junglist", year: 2013, yt: "du12Bk7A3RE", t: 0 }
    ]
  },
  {
    id: "sub", name: "Sine sub bass", aka: "Sub, 808-style sub",
    genre: "dubstep", also: ["Jungle", "Garage", "Grime"], type: "Bass",
    listen: "A deep, clean, round bass you feel more than hear. On phone speakers you'll mostly hear its faint upper edge — use headphones.",
    recipe: [
      "A pure sine wave in the 40–60 Hz range.",
      "Simple envelope: quick attack, sustain, short release.",
      "Optional soft saturation adds harmonics so it's audible on small speakers.",
      "Keep it mono and leave space for the kick."
    ],
    plugins: [
      { name: "3x Osc", where: "FL", note: "Sine wave, one osc" },
      { name: "FL Keys / BooBass", where: "FL", note: "Quick round basses" },
      { name: "Vital", where: "Free", note: "Sine osc + drive" }
    ],
    inFL: true,
    tutorials: ["how to make dubstep sub bass", "sub bass sine fl studio 3x osc"],
    examples: [
      { artist: "Digital Mystikz", track: "Anti-War Dub", year: 2006, yt: "G9H3i0T1iN4", t: 0 },
      { artist: "Skream", track: "Midnight Request Line", year: 2005, yt: "UFvEoJcLvgM", t: 0 }
    ]
  },
  {
    id: "wobble", name: "Wobble bass", aka: "Wub, LFO bass",
    genre: "dubstep", also: ["Bassline", "Brostep"], type: "Bass",
    listen: "A bass that 'talks' — wub-wub-wub — as a filter opens and closes in time with the beat. The wobble speed changes for rhythm.",
    recipe: [
      "Saw + square oscillators on a low note.",
      "Low-pass filter with some resonance.",
      "An LFO opens and closes the filter, synced to tempo (1/4, 1/8, triplets).",
      "Change the LFO rate through the bar; add distortion for grit."
    ],
    plugins: [
      { name: "3x Osc + Fruity Filter", where: "FL", note: "Automate cutoff with a tempo-synced LFO" },
      { name: "Vital", where: "Free", note: "LFO → filter cutoff, drag to assign" },
      { name: "Surge XT", where: "Free", note: "Tempo-synced LFOs" }
    ],
    inFL: true,
    tutorials: ["how to make wobble bass vital", "dubstep wobble bass fl studio"],
    examples: [
      { artist: "Rusko", track: "Cockney Thug (Caspa Remix)", year: 2007, yt: "elhO7i1xgrU", t: 0 },
      { artist: "Benga & Coki", track: "Night", year: 2007, yt: "rNStVlJWy88", t: 0 }
    ]
  },
  {
    id: "halfstep", name: "Half-step groove", aka: "Snare on 3",
    genre: "dubstep", also: ["Grime", "Halftime DnB"], type: "Drums",
    listen: "At 140 BPM it feels slow: kick on beat 1, one big snare on beat 3, with shuffling hats and lots of space for the bass.",
    recipe: [
      "Set the tempo to 140 BPM.",
      "Kick on beat 1, snare (or clap) on beat 3 only.",
      "Add shuffled or triplet hi-hats and the odd percussion hit.",
      "Leave gaps — the sub bass fills them."
    ],
    plugins: [
      { name: "FPC", where: "FL", note: "Drum pads" },
      { name: "Channel rack step sequencer", where: "FL", note: "Program the pattern" }
    ],
    inFL: true,
    tutorials: ["how to make dubstep drums 140", "half step drum pattern tutorial"],
    examples: [
      { artist: "Mala", track: "Changes", year: 2006, yt: "iE6LnK17jYY", t: 0 },
      { artist: "Benga & Coki", track: "Night", year: 2007, yt: "rNStVlJWy88", t: 0 }
    ]
  },
  {
    id: "dubdelay", name: "Dub delay throws", aka: "Echo throws, spring reverb",
    genre: "dubstep", also: ["Dub", "Jungle"], type: "FX",
    listen: "A single hit or chord that keeps repeating, getting darker and washier as it fades, often with a metallic spring-reverb splash.",
    recipe: [
      "Send a single snare, rim or chord stab to a delay (dotted 8th or 1/4).",
      "High feedback (60–80%) with a low-pass filter in the feedback loop so each repeat gets darker.",
      "Add spring reverb for the metallic splash.",
      "'Throw' only certain hits by automating the send level."
    ],
    plugins: [
      { name: "Fruity Delay 3", where: "FL", note: "Feedback + filter built in" },
      { name: "Fruity Reeverb 2", where: "FL", note: "Splash of reverb" },
      { name: "NastyDLA", where: "Free", note: "Tape-style delay" }
    ],
    inFL: true,
    tutorials: ["dub delay throws tutorial", "dub techniques fl studio delay 3"],
    examples: [
      { artist: "Kode9 & The Spaceape", track: "Sine of the Dub", year: 2004, yt: "M9SN23xZQ_Y", t: 0 },
      { artist: "Augustus Pablo & King Tubby", track: "King Tubby Meets Rockers Uptown", year: 1976, note: "Classic dub mixing", yt: "NoXYJkOeYSM", t: 0 }
    ]
  },
  {
    id: "crackle", name: "Vinyl crackle & rain", aka: "Burial ambience",
    genre: "dubstep", also: ["Future garage", "Lo-fi"], type: "FX",
    listen: "Hissing rain, vinyl pops and a distant muffled pad — a moody background texture under the music.",
    recipe: [
      "Layer vinyl crackle (random pops + hiss) quietly under the track.",
      "Add a field recording of rain or street noise.",
      "Low-pass filter the music so it sounds distant.",
      "Keep it quiet — it's a mood, not a part."
    ],
    plugins: [
      { name: "iZotope Vinyl", where: "Free", note: "Crackle, dust, wear" },
      { name: "Fruity Free Filter", where: "FL", note: "Muffle the music" },
      { name: "Freesound.org (CC0)", where: "Free", note: "Rain field recordings" }
    ],
    inFL: false,
    tutorials: ["how to make burial style track", "vinyl crackle izotope vinyl tutorial"],
    examples: [
      { artist: "Burial", track: "Archangel", year: 2007, yt: "8k_f2QK77ew", t: 0 },
      { artist: "Burial", track: "Near Dark", year: 2007, yt: "TK7aQmdqCj8", t: 0 }
    ]
  },
  {
    id: "twostep", name: "2-step shuffle beat", aka: "2-step, skippy garage beat",
    genre: "garage", also: ["Dubstep", "Grime", "Future garage"], type: "Drums",
    listen: "A bouncy, swung beat around 130–135 BPM where the kick skips beats — no steady four-to-the-floor — with snares on 2 and 4.",
    recipe: [
      "Tempo 130–135 BPM, swing around 55–65%.",
      "Snares/claps on beats 2 and 4.",
      "Kick on beat 1 and a skipped kick late in the bar (not on every beat).",
      "Shuffled hats and rimshots fill the gaps."
    ],
    plugins: [
      { name: "FPC", where: "FL", note: "Drum pads" },
      { name: "Channel rack swing knob", where: "FL", note: "Add the shuffle" }
    ],
    inFL: true,
    tutorials: ["how to make uk garage 2 step beat", "2 step drums fl studio"],
    examples: [
      { artist: "Artful Dodger feat. Craig David", track: "Re-Rewind", year: 1999, yt: "M0wv_cQv8As", t: 0 },
      { artist: "MJ Cole", track: "Sincere", year: 1998, yt: "cy-djtiU5RE", t: 0 }
    ]
  },
  {
    id: "organ", name: "Organ bass", aka: "M1 organ bass",
    genre: "garage", also: ["Speed garage", "Bassline", "House"], type: "Bass",
    listen: "A punchy, hollow, slightly 'boxy' bass made of organ tones, bouncing in short notes.",
    recipe: [
      "Stack sine/organ partials (fundamental + octave + higher harmonic) — the Korg M1 'Organ 2' preset is the classic.",
      "Short, plucky envelope.",
      "Play syncopated 8th/16th-note patterns with octave jumps.",
      "Sidechain to the kick for bounce."
    ],
    plugins: [
      { name: "3x Osc", where: "FL", note: "Sines an octave apart" },
      { name: "FL Keys", where: "FL", note: "Organ-ish tones" },
      { name: "Surge XT", where: "Free", note: "Additive/organ patches" }
    ],
    inFL: true,
    tutorials: ["m1 organ bass tutorial", "speed garage organ bass vital"],
    examples: [
      { artist: "Robin S", track: "Show Me Love", year: 1993, note: "The M1 organ sound", yt: "0UFKmhDIghU", t: 0 },
      { artist: "T2", track: "Heartbroken", year: 2007, yt: "KG28976TmDM", t: 0 }
    ]
  },
  {
    id: "rnbvocal", name: "Pitched R&B vocal chop", aka: "Chopped vocal, vocal edit",
    genre: "garage", also: ["Future garage", "Dubstep"], type: "Vocal",
    listen: "Snippets of soulful singing, pitched up and cut into a new rhythmic melody. Plays the real thing from YouTube.",
    recipe: [
      "Take an R&B acapella.",
      "Chop single syllables and re-sequence them into a new rhythm.",
      "Pitch them up (often +3 to +7 semitones) and add reverb.",
      "This is a recording, so the card plays a real example from YouTube."
    ],
    plugins: [
      { name: "Edison", where: "FL", note: "Chop + pitch" },
      { name: "Fruity Slicer", where: "FL", note: "Play chops from keys" },
      { name: "Newtone / Pitcher", where: "FL", note: "Producer/Signature editions" }
    ],
    inFL: true,
    tutorials: ["uk garage vocal chop tutorial", "burial style vocal chops tutorial"],
    examples: [
      { artist: "Burial", track: "Archangel", year: 2007, yt: "8k_f2QK77ew", t: 0 },
      { artist: "Todd Edwards", track: "Saved My Life", year: 1996, note: "Pioneer of chopped vocals", yt: "U-RE8IsrzzM", t: 0 }
    ]
  },
  {
    id: "stabs", name: "Minor 7th / 9th chord stabs", aka: "Garage stabs",
    genre: "garage", also: ["House", "Deep house"], type: "Synth",
    listen: "Short, jazzy, slightly bittersweet chords punched out in a syncopated rhythm.",
    recipe: [
      "Build a minor 7th or minor 9th chord (e.g. C–E♭–G–B♭–D).",
      "Short plucky envelope, filter closes quickly.",
      "Play it on off-beats and syncopated 16ths.",
      "Add a dotted delay or reverb for space."
    ],
    plugins: [
      { name: "FL Keys / FLEX", where: "FL", note: "FLEX ships with free presets" },
      { name: "Vital", where: "Free", note: "Short pluck patch" },
      { name: "Fruity Delay 3", where: "FL", note: "Dotted echoes" }
    ],
    inFL: true,
    tutorials: ["uk garage chords tutorial", "minor 9th chord stabs house"],
    examples: [
      { artist: "MJ Cole", track: "Sincere", year: 1998, yt: "cy-djtiU5RE", t: 0 },
      { artist: "Wookie", track: "Battle", year: 2000, yt: "0nggZE0A9nE", t: 0 }
    ]
  },
  {
    id: "rewind", name: "Rewind / spinback", aka: "Reload, pull-up",
    genre: "garage", also: ["Jungle", "Dubstep", "Sound systems"], type: "FX",
    listen: "The music suddenly spins backwards with a whoosh — the DJ dragging the record back to restart a tune.",
    recipe: [
      "Take the last bar of your track.",
      "Reverse it and speed up the playback quickly (pitch rises).",
      "Or use a tape-stop/scratch effect automated backwards.",
      "Cut to silence, then drop the track again from the start."
    ],
    plugins: [
      { name: "Gross Beat", where: "FL", note: "Signature Edition and up" },
      { name: "Edison (reverse + stretch)", where: "FL", note: "Reverse a bar" },
      { name: "dBlue TapeStop", where: "Free", note: "Tape-stop effect" }
    ],
    inFL: true,
    tutorials: ["how to make rewind effect fl studio", "dj spinback sound effect tutorial"],
    examples: [
      { artist: "Artful Dodger feat. Craig David", track: "Re-Rewind", year: 1999, yt: "M0wv_cQv8As", t: 0 },
      { artist: "Shy FX & UK Apache", track: "Original Nuttah", year: 1994, yt: "sxbekgL4w7w", t: 0 }
    ]
  },
  {
    id: "kick808", name: "808 kick", aka: "808 boom",
    genre: "electro", also: ["Hip hop", "Miami bass", "Techno"], type: "Drums",
    listen: "A deep, booming kick that starts with a short thump and rings out as a long falling tone.",
    recipe: [
      "A sine wave that starts high (≈150 Hz) and drops fast to ≈50 Hz.",
      "Long decay (0.5–2 s) for the 'boom'.",
      "Optional saturation for punch.",
      "Or just use 808 samples — they come with FL Studio."
    ],
    plugins: [
      { name: "FL Studio 808 samples", where: "FL", note: "In the Packs → Drums folder" },
      { name: "Fruity DrumSynth Live", where: "FL", note: "Synthesise kicks" },
      { name: "Vital", where: "Free", note: "Sine + pitch envelope" }
    ],
    inFL: true,
    tutorials: ["how to make 808 kick from scratch", "electro 808 drums tutorial"],
    examples: [
      { artist: "Afrika Bambaataa & Soulsonic Force", track: "Planet Rock", year: 1982, yt: "9J3lwZjHenA", t: 0 },
      { artist: "Marvin Gaye", track: "Sexual Healing", year: 1982, yt: "9LxPoJ4QoSk", t: 0 }
    ]
  },
  {
    id: "cowbell", name: "808 cowbell & clap", aka: "TR-808 cowbell",
    genre: "electro", also: ["Hip hop", "Miami bass", "House"], type: "Drums",
    listen: "A short, tuned 'tonk' cowbell bouncing over crisp, layered handclaps.",
    recipe: [
      "Cowbell: two square waves (≈540 Hz and ≈800 Hz) through a band-pass filter, short decay.",
      "Clap: noise bursts in quick succession through a band-pass filter, then a short tail.",
      "Program syncopated cowbell patterns; claps on 2 and 4.",
      "Or use the 808 samples bundled with FL Studio."
    ],
    plugins: [
      { name: "FL Studio 808 samples", where: "FL", note: "Packs → Drums" },
      { name: "FPC", where: "FL", note: "Pads" },
      { name: "Surge XT", where: "Free", note: "Synthesise from scratch" }
    ],
    inFL: true,
    tutorials: ["808 cowbell synthesis tutorial", "electro beat 808 fl studio"],
    examples: [
      { artist: "Egyptian Lover", track: "Egypt, Egypt", year: 1984, yt: "6mGD2oIlzN4", t: 0 },
      { artist: "Afrika Bambaataa & Soulsonic Force", track: "Planet Rock", year: 1982, yt: "9J3lwZjHenA", t: 0 }
    ]
  },
  {
    id: "vocoder", showReal: true, name: "Vocoder robot voice", aka: "Vocoder",
    genre: "electro", also: ["Electro-funk", "Synth-pop"], type: "Vocal",
    listen: "A flat, robotic voice that sounds like a synth is talking — the words have the shape of speech but the tone of a keyboard.",
    recipe: [
      "A vocoder needs two inputs: your voice (modulator) and a synth (carrier).",
      "The voice's frequency shape is imposed onto the synth.",
      "Use a bright saw or chord as the carrier; speak clearly.",
      "In-app version imitates it with a synth through vowel-shaped filters."
    ],
    plugins: [
      { name: "Vocodex", where: "FL", note: "Producer Edition and up" },
      { name: "TAL-Vocoder", where: "Free", note: "Classic analog-style vocoder" }
    ],
    inFL: false,
    tutorials: ["how to use tal vocoder fl studio", "vocoder robot voice tutorial"],
    examples: [
      { artist: "Kraftwerk", track: "The Robots", year: 1978, yt: "DTnwRsFCXYc", t: 0 },
      { artist: "Herbie Hancock", track: "Rockit", year: 1983, yt: "GHhD4PD75zY", t: 0 }
    ]
  },
  {
    id: "orchhit", name: "Orchestra hit", aka: "ORCH5, orch stab",
    genre: "electro", also: ["Hip hop", "Jungle", "Synth-pop"], type: "Synth",
    listen: "A single, huge 'BWAH!' of a whole orchestra playing one chord at once — dramatic and very 80s.",
    recipe: [
      "Originally a sampled orchestral chord (the Fairlight CMI's 'ORCH5').",
      "Synth version: stack a big chord across octaves with saws and squares.",
      "Very fast attack, short decay, plus a noise/timpani hit.",
      "Add reverb and play it as a stab."
    ],
    plugins: [
      { name: "FL Studio orch hit samples", where: "FL", note: "Search 'orch' in the browser" },
      { name: "FLEX", where: "FL", note: "Check orchestral presets" },
      { name: "Vital", where: "Free", note: "Layered chord stab" }
    ],
    inFL: true,
    tutorials: ["orchestra hit sound history", "how to make orchestra hit synth"],
    examples: [
      { artist: "Afrika Bambaataa & Soulsonic Force", track: "Planet Rock", year: 1982, yt: "9J3lwZjHenA", t: 0 },
      { artist: "Art of Noise", track: "Close (to the Edit)", year: 1984, yt: "-sFK0-lcjGU", t: 0 }
    ]
  },
  {
    id: "acid", name: "303 acid squelch", aka: "Acid bass, TB-303",
    genre: "electro", also: ["Acid house", "Acid techno"], type: "Bass",
    listen: "A rubbery, squelchy, chirping bassline whose resonant filter squeals and slides between notes.",
    recipe: [
      "One saw (or square) oscillator.",
      "Low-pass filter with high resonance and a snappy filter envelope.",
      "16th-note pattern with accents, slides and octave jumps.",
      "Slowly turn up the cutoff and envelope for the 'squelch'; add distortion."
    ],
    plugins: [
      { name: "Open303 / JC-303", where: "Free", note: "Free TB-303 emulations" },
      { name: "3x Osc + Fruity Filter", where: "FL", note: "Resonant low-pass" },
      { name: "Vital", where: "Free", note: "Filter env + glide" }
    ],
    inFL: true,
    tutorials: ["how to make acid bassline 303", "acid 303 sound fl studio"],
    examples: [
      { artist: "Phuture", track: "Acid Tracks", year: 1987, yt: "yKHGv6Es610", t: 0 },
      { artist: "Hardfloor", track: "Acperience 1", year: 1992, yt: "Un4CeV_l3pI", t: 0 }
    ]
  },
  // ---------- more bass ----------
  {
    id: "neuro", name: "Neuro bass", aka: "Neurofunk bass, techstep bass",
    genre: "jungle", also: ["Drum & bass", "Neurofunk", "Techstep"], type: "Bass",
    listen: "A gnarly, metallic mid-range bass at drum & bass speed (≈172 BPM) that snarls and shifts tone on every note, over a fast two-step beat.",
    recipe: [
      "Start with a detuned saw (a Reese) or an FM patch.",
      "Push it through heavy distortion, then a band-pass or comb filter.",
      "Automate the filter quickly on every note so the tone keeps moving.",
      "Layer a clean sine sub underneath so the low end stays solid."
    ],
    plugins: [
      { name: "Vital", where: "Free", note: "FM + distortion + filter envelopes" },
      { name: "Surge XT", where: "Free", note: "Comb filters and waveshapers" },
      { name: "Fruity Blood Overdrive / Distructor", where: "FL", note: "Distortion in FL" }
    ],
    inFL: false,
    tutorials: ["how to make neuro bass vital", "neurofunk bass tutorial"],
    examples: [
      { artist: "Ed Rush & Optical", track: "Wormhole", year: 1998, yt: "Rt0I6LrbhLM", t: 0 },
      { artist: "Noisia", track: "Machine Gun", year: 2010, yt: "pBlu0Sbj6Ao", t: 0 }
    ]
  },
  {
    id: "growl", name: "Growl bass", aka: "Talking bass, FM growl",
    genre: "dubstep", also: ["Brostep", "Riddim"], type: "Bass",
    listen: "A bass that sounds like it's growling or saying 'yow-wow' — the vowel shape changes as the note plays. Mid-range and aggressive.",
    recipe: [
      "FM synthesis: one oscillator modulates another's pitch to make harsh harmonics.",
      "Automate the FM amount and a formant/vowel filter through each note.",
      "Add distortion and OTT-style multiband compression.",
      "Write it in short, rhythmic hits at 140–150 BPM."
    ],
    plugins: [
      { name: "Vital", where: "Free", note: "FM between oscillators + formant filter" },
      { name: "Surge XT", where: "Free", note: "FM and vowel filters" },
      { name: "Sytrus", where: "FL", note: "FM synth, Producer Edition and up" }
    ],
    inFL: false,
    tutorials: ["how to make growl bass vital", "fm growl bass tutorial"],
    examples: [
      { artist: "Doctor P", track: "Sweet Shop", year: 2010, yt: "InSKw4awJ2k", t: 0 },
      { artist: "Flux Pavilion", track: "Bass Cannon", year: 2011, yt: "Htm_956k5ps", t: 0 }
    ]
  },
  {
    id: "speedbass", name: "Speed garage bass", aka: "'Bwoing' bass, pitch-bend bass",
    genre: "garage", also: ["Speed garage", "Bassline", "UK bass"], type: "Bass",
    listen: "A fat, rubbery bass that drops in pitch at the start of each note — 'bwoing!' — over a four-to-the-floor house beat at about 130 BPM.",
    recipe: [
      "Detuned saw or Reese-style bass.",
      "Add a fast pitch envelope: each note starts high and dives down to the right note.",
      "Low-pass filter with an envelope for the 'wow' shape.",
      "Four-to-the-floor kick, shuffled hats, and lots of sidechain."
    ],
    plugins: [
      { name: "3x Osc", where: "FL", note: "Use the pitch envelope in the channel's INS tab" },
      { name: "Vital", where: "Free", note: "Envelope → pitch" },
      { name: "Surge XT", where: "Free", note: "Pitch envelope + unison" }
    ],
    inFL: true,
    tutorials: ["speed garage bass tutorial", "armand van helden bass sound how to"],
    examples: [
      { artist: "Sneaker Pimps", track: "Spin Spin Sugar (Armand's Dark Garage Mix)", year: 1996, yt: "XXE6nG7W9zs", t: 0 },
      { artist: "187 Lockdown", track: "Gunman", year: 1997, yt: "clnEkzPF_4Y", t: 0 }
    ]
  },
  {
    id: "electrobass", name: "Electro synth bass", aka: "Sequenced analog bass",
    genre: "electro", also: ["Detroit techno", "Electro-funk"], type: "Bass",
    listen: "A tight, funky, sequenced synth bass — short, punchy notes bouncing in 16ths over 808 drums.",
    recipe: [
      "One square or saw oscillator (classic: Roland SH-101 or Moog).",
      "Short, punchy envelope; low-pass filter with a little resonance.",
      "Program a syncopated 16th-note line with octave jumps.",
      "Keep the drums 808-based and robotic."
    ],
    plugins: [
      { name: "3x Osc", where: "FL", note: "Square wave + short envelope" },
      { name: "Vital", where: "Free", note: "Mono, short envelope" },
      { name: "Surge XT", where: "Free", note: "Analog-style patches" }
    ],
    inFL: true,
    tutorials: ["how to make electro bassline", "detroit electro bass synth tutorial"],
    examples: [
      { artist: "Cybotron", track: "Clear", year: 1983, yt: "Unc8kDUzbU8", t: 0 },
      { artist: "Model 500", track: "No UFO's", year: 1985, yt: "xcdOBLH_AXs", t: 0 }
    ]
  },
  // ---------- hyperpop ----------
  {
    id: "hyper808", name: "Blown-out 808", aka: "Distorted 808, clipped 808",
    genre: "hyperpop", also: ["Trap", "Rage", "Bubblegum bass"], type: "Bass",
    listen: "A huge 808 bass that's been distorted until it buzzes and crackles, gliding between notes, under fast hi-hat rolls.",
    recipe: [
      "Start with a long 808 (sine with a pitch drop).",
      "Glide (portamento) between notes.",
      "Distort/clip it hard so it buzzes even on phone speakers.",
      "Add fast hi-hat rolls (1/16 and 1/32 triplets) at 140–160 BPM."
    ],
    plugins: [
      { name: "FL 808 samples + Fruity Slide", where: "FL", note: "Use slide notes for glides" },
      { name: "Fruity Soft Clipper / Distructor", where: "FL", note: "Clip it hard" },
      { name: "Vital", where: "Free", note: "Sine + pitch env + distortion" }
    ],
    inFL: true,
    tutorials: ["how to make distorted 808 hyperpop", "100 gecs 808 tutorial"],
    examples: [
      { artist: "100 gecs", track: "money machine", year: 2019, yt: "z97qLNXeAMQ", t: 0 },
      { artist: "Charli XCX", track: "Vroom Vroom", year: 2016, yt: "qfAqtFuGjWM", t: 0 }
    ]
  },
  {
    id: "supersaw", name: "Supersaw lead", aka: "Trance saw, euphoric saw",
    genre: "hyperpop", also: ["Trance", "Happy hardcore", "EDM"], type: "Synth",
    listen: "A massive, bright, shimmering wall of saw waves playing euphoric chords — like trance turned up to max.",
    recipe: [
      "7+ sawtooth voices, widely detuned (unison) and spread in stereo.",
      "Bright filter, long-ish release, lots of reverb.",
      "Play big major chords or a fast arpeggio.",
      "Heavy sidechain pumping to the kick."
    ],
    plugins: [
      { name: "Vital", where: "Free", note: "Unison 7–16 voices, detune up" },
      { name: "Surge XT", where: "Free", note: "Supersaw-style oscillators" },
      { name: "3x Osc", where: "FL", note: "Stack detuned saws" }
    ],
    inFL: true,
    tutorials: ["how to make supersaw vital", "hyperpop synth tutorial"],
    examples: [
      { artist: "100 gecs", track: "ringtone", year: 2019, yt: "_jg8vs4jmfA", t: 0 },
      { artist: "A. G. Cook", track: "Beautiful", year: 2014, yt: "YG0ggHM1PLM", t: 0 }
    ]
  },
  {
    id: "bubblepluck", name: "Bubbly metallic pluck", aka: "SOPHIE pluck, latex sound",
    genre: "hyperpop", also: ["Bubblegum bass", "PC Music"], type: "Synth",
    listen: "Shiny, rubbery, bouncy 'bloop' and 'tink' sounds — like plastic, bubbles or squeaky latex — playing short, playful melodies.",
    recipe: [
      "FM synthesis with a non-integer ratio (e.g. 3.5:1) gives metallic, bell-like tones.",
      "Very fast decay on the FM amount makes the 'bloop'.",
      "Add pitch envelopes for rubbery, bouncy movement.",
      "Keep everything very clean and very loud."
    ],
    plugins: [
      { name: "Vital", where: "Free", note: "FM + pitch envelopes" },
      { name: "Sytrus", where: "FL", note: "FM synth, Producer Edition and up" },
      { name: "Surge XT", where: "Free", note: "FM2/FM3 oscillators" }
    ],
    inFL: false,
    tutorials: ["how to make sophie sounds", "fm pluck bell vital tutorial"],
    examples: [
      { artist: "SOPHIE", track: "BIPP", year: 2013, yt: "MVc3Z-bG6Eo", t: 0 },
      { artist: "SOPHIE", track: "LEMONADE", year: 2014, yt: "LdLvp630plc", t: 0 }
    ]
  },
  {
    id: "glitch", name: "Glitch stutter", aka: "Stutter edit, buffer repeat",
    genre: "hyperpop", also: ["Glitch", "IDM", "Breakcore"], type: "FX",
    listen: "The music suddenly chops into rapid repeats that speed up and rise in pitch — like a CD skipping — often with crunchy bitcrushing.",
    recipe: [
      "Take a short slice of audio and repeat it faster and faster (1/8 → 1/16 → 1/32).",
      "Pitch it up as it speeds up for a 'rising' stutter.",
      "Add a bitcrusher for crunch.",
      "Use it as a fill just before a drop."
    ],
    plugins: [
      { name: "Gross Beat", where: "FL", note: "Stutters and repeats (Signature+)" },
      { name: "Fruity Squeeze / Fruity Slicer", where: "FL", note: "Bitcrush and slice" },
      { name: "dBlue Glitch", where: "Free", note: "Classic free glitch plugin" }
    ],
    inFL: true,
    tutorials: ["stutter glitch effect fl studio", "hyperpop glitch transitions"],
    examples: [
      { artist: "SOPHIE", track: "Immaterial", year: 2018, yt: "PB5tnokRFS0", t: 0 },
      { artist: "100 gecs", track: "ringtone", year: 2019, yt: "_jg8vs4jmfA", t: 0 }
    ]
  },
  {
    id: "chipmunk", name: "Pitched-up autotune vocal", aka: "Chipmunk vocal, hard-tuned vocal",
    genre: "hyperpop", also: ["Bubblegum bass", "Nightcore", "Emo rap"], type: "Vocal",
    listen: "A singer pitched way up with hard, robotic autotune so the notes snap between pitches — cute, cartoonish and glossy.",
    recipe: [
      "Record or take a vocal.",
      "Pitch it up 3–12 semitones (with or without formant shift).",
      "Hard autotune: fastest retune speed so it snaps between notes.",
      "Lots of doubling, reverb and brightness. This is a recording, so the card plays a real example."
    ],
    plugins: [
      { name: "Pitcher / Newtone", where: "FL", note: "Hard tuning (Producer/Signature)" },
      { name: "MAutoPitch (MeldaProduction)", where: "Free", note: "Free autotune" },
      { name: "GSnap", where: "Free", note: "Classic free autotune" }
    ],
    inFL: false,
    tutorials: ["hyperpop vocal tutorial autotune", "100 gecs vocal effect"],
    examples: [
      { artist: "100 gecs", track: "money machine", year: 2019, yt: "z97qLNXeAMQ", t: 0 },
      { artist: "Hannah Diamond", track: "Every Night", year: 2014, yt: "EPFvbc4onks", t: 0 }
    ]
  }

];

window.GENRES = {
  jungle: { label: "Jungle", color: "#ff7a1a" },
  dubstep: { label: "UK Dubstep", color: "#a46bff" },
  garage: { label: "UK Garage", color: "#18e0c8" },
  electro: { label: "Electro", color: "#ff3d8b" },
  hyperpop: { label: "Hyperpop", color: "#4da3ff" }
};
