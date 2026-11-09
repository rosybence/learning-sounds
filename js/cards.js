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
    genre: "dub", also: ["Jungle", "Dubstep", "Steppas"], type: "FX",
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
    genre: "dub", also: ["Dubstep", "Jungle", "Steppas"], type: "FX",
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
    genre: "garage", also: ["Speed garage", "Bassline / Niche", "House"], type: "Bass",
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
    genre: "acidhouse", also: ["Acid techno", "Electro"], type: "Bass",
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
    genre: "speedgarage", also: ["UK Garage", "Bassline", "UK bass"], type: "Bass",
    listen: "A fat, rubbery, Reese-like bass that bends down in pitch at the start of notes (bwoing!) over a four-to-the-floor house beat at about 130 BPM. This card plays the real thing from YouTube.",
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
,
  // ---------- bassline / niche ----------
  {
    id: "warpbass", name: "Bassline 'warp' bass", aka: "Niche bass, wobbly 4x4 bass",
    genre: "bassline", also: ["Speed garage", "UK bass", "Bass house"], type: "Bass",
    listen: "A loud, buzzy, wobbling mid-range bass that warps in pitch and talks in bouncy patterns over a four-to-the-floor beat at about 135–140 BPM. It's the star of the track. This card plays the real thing from YouTube.",
    recipe: [
      "Two detuned square/saw oscillators an octave apart.",
      "Low-pass filter with resonance; an LFO (1/8 or 1/16) wobbles the cutoff.",
      "Drive it hard so it cuts through on small speakers.",
      "Bouncy, syncopated notes with octave jumps over a 4x4 kick with swung hats."
    ],
    plugins: [
      { name: "3x Osc + Fruity Filter", where: "FL", note: "Square waves + LFO on cutoff" },
      { name: "Vital", where: "Free", note: "Tempo-synced LFO → filter" },
      { name: "Surge XT", where: "Free", note: "Drive + filter modulation" }
    ],
    inFL: true,
    tutorials: ["how to make bassline house bass niche", "uk bassline wobble bass tutorial"],
    examples: [
      { artist: "DJ Q feat. MC Bonez", track: "You Wot!", year: 2008, yt: "39Kz5aZGb_k", t: 0 },
      { artist: "T2", track: "Heartbroken", year: 2007, yt: "KG28976TmDM", t: 0 }
    ]
  },
  // ---------- speed garage ----------
  {
    id: "sgbeat", name: "Speed garage beat", aka: "4x4 garage shuffle",
    genre: "speedgarage", also: ["UK Garage", "Bassline", "House"], type: "Drums",
    listen: "A steady four-to-the-floor kick at about 130–135 BPM, but with heavily swung, skippy hi-hats and rimshots that make it bounce — house drums with garage swing.",
    recipe: [
      "Kick on every beat (four-to-the-floor).",
      "Claps or snares on 2 and 4.",
      "Open hats on the off-beats; shuffled closed hats and rimshots with lots of swing (60–70%).",
      "Leave room for a big bass."
    ],
    plugins: [
      { name: "FPC", where: "FL", note: "Drum pads" },
      { name: "Channel rack swing knob", where: "FL", note: "Push the swing up" }
    ],
    inFL: true,
    tutorials: ["speed garage drums tutorial", "how to make speed garage fl studio"],
    examples: [
      { artist: "Double 99", track: "RIP Groove", year: 1997, yt: "uR3Vw8J8vUo", t: 0 },
      { artist: "Sneaker Pimps", track: "Spin Spin Sugar (Armand's Dark Garage Mix)", year: 1996, yt: "XXE6nG7W9zs", t: 0 }
    ]
  },
  {
    id: "gunshot", name: "Gunshot & airhorn FX", aka: "Sound-system FX",
    genre: "speedgarage", also: ["Jungle", "Dancehall", "Grime"], type: "FX",
    listen: "A blaring BAAP BAAP BAAAAP horn and booming gunshot effects: sound-system crowd-hype noises dropped in before or over the drop. This is a recording, so the card plays a real example.",
    recipe: [
      "Airhorn: several saw waves a few notes apart, short pitch dip, played in a 'baap-baap-baaap' rhythm.",
      "Gunshot: a burst of noise with a low thump, then a big reverb tail.",
      "Use sparingly as hype FX before drops.",
      "Free CC0 versions exist on Freesound. This card plays a real example from YouTube."
    ],
    plugins: [
      { name: "3x Osc", where: "FL", note: "Stacked saws for the horn" },
      { name: "Fruity Reeverb 2", where: "FL", note: "Huge tail for the gunshot" },
      { name: "Freesound.org (CC0)", where: "Free", note: "Ready-made FX samples" }
    ],
    inFL: true,
    tutorials: ["how to make airhorn sound synth", "dub siren airhorn fx tutorial"],
    examples: [
      { artist: "187 Lockdown", track: "Gunman", year: 1997, yt: "clnEkzPF_4Y", t: 0 },
      { artist: "Double 99", track: "RIP Groove", year: 1997, yt: "uR3Vw8J8vUo", t: 0 }
    ]
  },
  // ---------- acid house ----------
  {
    id: "house909", name: "909 house groove", aka: "TR-909 / jack beat",
    genre: "acidhouse", also: ["Chicago house", "Techno"], type: "Drums",
    listen: "Punchy four-to-the-floor kicks, sizzling open hi-hats on the off-beats and crisp claps — the classic Chicago 'jack' groove at about 120–125 BPM.",
    recipe: [
      "Roland TR-909 (or 808/707) style kit.",
      "Kick on every beat, clap on 2 and 4.",
      "Open hat on every off-beat, closed hats in 16ths.",
      "Add a little swing and accents for the 'jack'."
    ],
    plugins: [
      { name: "FL Studio 909 samples", where: "FL", note: "Packs → Drums" },
      { name: "FPC", where: "FL", note: "Drum pads" },
      { name: "Fruity DrumSynth Live", where: "FL", note: "Synthesise kicks/hats" }
    ],
    inFL: true,
    tutorials: ["how to make acid house drums 909", "chicago house beat tutorial"],
    examples: [
      { artist: "Marshall Jefferson", track: "Move Your Body (The House Music Anthem)", year: 1986, yt: "RhKMMh4qOL8", t: 0 },
      { artist: "Phuture", track: "Acid Tracks", year: 1987, yt: "yKHGv6Es610", t: 0 }
    ]
  },
  // ---------- acid techno ----------
  {
    id: "distort303", name: "Distorted 303", aka: "Acid techno 303, screaming acid",
    genre: "acidtechno", also: ["Acid house", "Hard techno", "Free party"], type: "Bass",
    listen: "A 303 line pushed through heavy distortion so it screams and snarls, faster (≈140 BPM) and harder than acid house, over pounding kicks.",
    recipe: [
      "Start with a 303-style line (saw, resonant low-pass, accents, slides).",
      "Max the resonance and push it into heavy distortion.",
      "Slowly sweep the cutoff up over several bars so it builds into a scream.",
      "Hard, distorted 909 kicks at 135–145 BPM."
    ],
    plugins: [
      { name: "Open303 / JC-303", where: "Free", note: "Free 303 emulations" },
      { name: "Fruity Blood Overdrive", where: "FL", note: "Distortion" },
      { name: "Vital", where: "Free", note: "Resonant filter + drive" }
    ],
    inFL: true,
    tutorials: ["acid techno 303 distortion tutorial", "how to make acid techno"],
    examples: [
      { artist: "Josh Wink", track: "Higher State of Consciousness", year: 1995, yt: "d3hAnAnJwyU", t: 0 },
      { artist: "Lochi", track: "London Acid City", year: 1996, yt: "01WzJVQkU9o", t: 0 }
    ]
  },
  // ---------- dub techno ----------
  {
    id: "dubchord", name: "Dub techno chord", aka: "Basic Channel chord, echo stab",
    genre: "dubtechno", also: ["Minimal", "Deep techno", "Dub"], type: "Synth",
    listen: "A soft, muffled minor chord stab that echoes over and over into a hazy cloud, slowly opening and closing, over a gentle steady kick and hiss.",
    recipe: [
      "A minor 7th chord with a short, plucky envelope.",
      "Band-pass or low-pass filter it so it's muffled; slowly automate the cutoff.",
      "Send it into a long feedback delay (3/16 or dotted 8th) and lots of reverb.",
      "Add tape hiss and a soft, deep kick at about 118–125 BPM."
    ],
    plugins: [
      { name: "3x Osc / FL Keys", where: "FL", note: "Simple chord source" },
      { name: "Fruity Delay 3 + Fruity Reeverb 2", where: "FL", note: "Long echoes and space" },
      { name: "Vital", where: "Free", note: "Chord pluck patch" }
    ],
    inFL: true,
    tutorials: ["how to make dub techno chords", "basic channel style tutorial"],
    examples: [
      { artist: "Basic Channel", track: "Quadrant Dub I", year: 1994, yt: "APH42GVgUTM", t: 0 },
      { artist: "Rhythm & Sound", track: "Mango Drive", year: 1998, yt: "yKd-S9hLlgY", t: 0 }
    ]
  }
,
  // ---------- complextro ----------
  {
    id: "switchbass", name: "Instrument-switching bass", aka: "Complextro chop, multi-synth bassline",
    genre: "complextro", also: ["Electro house", "Brostep"], type: "Bass",
    listen: "One bassline/lead that changes to a completely different synth every note or two — saw, growl, square, vocal-ish — so it sounds like several instruments taking turns at high speed. Around 128 BPM.",
    recipe: [
      "Write one simple 16th-note riff.",
      "Copy it onto 3–5 different synth patches (saw, FM growl, square, formant).",
      "Chop between them so each note or pair of notes comes from a different patch.",
      "Glue it all with the same distortion, OTT compression and heavy sidechain."
    ],
    plugins: [
      { name: "Vital", where: "Free", note: "Make several contrasting patches" },
      { name: "3x Osc + Fruity Formula Controller", where: "FL", note: "Multiple patches on separate channels" },
      { name: "Surge XT", where: "Free", note: "Fast patch switching via multiple instances" }
    ],
    inFL: true,
    tutorials: ["complextro tutorial porter robinson style", "how to make complextro fl studio"],
    examples: [
      { artist: "Porter Robinson", track: "Spitfire", year: 2011, yt: "rgT1qFIWHYc", t: 0 },
      { artist: "Wolfgang Gartner", track: "Illmerica", year: 2011, yt: "G_rQ6Av0gMY", t: 0 }
    ]
  },
  {
    id: "chiplead", name: "Chiptune square lead", aka: "8-bit lead, pulse wave arp",
    genre: "complextro", also: ["Chiptune", "Hyperpop", "Nu-disco"], type: "Synth",
    listen: "A bright, buzzy video-game sound made from thin square (pulse) waves, often playing super-fast arpeggios — like an old Game Boy or NES.",
    recipe: [
      "Pulse/square oscillator; try narrow pulse widths (12.5% or 25%).",
      "No filter, instant attack, short release.",
      "Play fast arpeggios (1/16 or 1/32) that cycle through chord notes.",
      "Optional: pitch slides and vibrato like old console music."
    ],
    plugins: [
      { name: "Magical 8bit Plug 2 (YMCK)", where: "Free", note: "Classic free chiptune synth" },
      { name: "3x Osc", where: "FL", note: "Square wave + arpeggiator" },
      { name: "Vital", where: "Free", note: "Pulse width + arp" }
    ],
    inFL: true,
    tutorials: ["chiptune lead sound tutorial", "magical 8bit plug tutorial"],
    examples: [
      { artist: "Mord Fustang", track: "Lick the Rainbow", year: 2011, yt: "SUurkE6XvR0", t: 0 },
      { artist: "Porter Robinson", track: "Say My Name", year: 2010, yt: "f9_apoZ4eKk", t: 0 }
    ]
  },
  {
    id: "dirtyelectro", name: "Dirty electro house bass", aka: "Fidget / filthy electro bass",
    genre: "complextro", also: ["Electro house", "Big room", "Fidget house"], type: "Bass",
    listen: "A gritty, distorted saw bass in short, punchy riffs at about 128 BPM, with filter sweeps and the whole thing ducking hard to every kick.",
    recipe: [
      "Detuned saws (or a Reese) with heavy distortion.",
      "Low-pass filter with an envelope for punch; automate sweeps.",
      "Short, stabby 8th/16th riffs with octave jumps.",
      "Heavy sidechain to a four-to-the-floor kick."
    ],
    plugins: [
      { name: "3x Osc + Fruity Blood Overdrive", where: "FL", note: "Saws + grit" },
      { name: "Vital", where: "Free", note: "Unison + distortion" },
      { name: "Fruity Limiter (sidechain)", where: "FL", note: "Duck to the kick" }
    ],
    inFL: true,
    tutorials: ["dirty electro house bass tutorial", "knife party bass tutorial"],
    examples: [
      { artist: "Knife Party", track: "Internet Friends", year: 2011, yt: "luJJBeCFeM0", t: 0 },
      { artist: "Wolfgang Gartner", track: "Redline", year: 2012, yt: "G-z6gj2z-Vw", t: 0 }
    ]
  },
  {
    id: "laserzap", name: "Laser zaps & pitch dives", aka: "Pew FX, zap",
    genre: "complextro", also: ["Electro", "Dubstep", "Hyperpop"], type: "FX",
    listen: "Quick sci-fi 'pew' and 'zoww' sounds — tones that dive (or shoot up) in pitch in a split second, fired in rhythm between bass hits.",
    recipe: [
      "A square or saw blip with a very fast pitch envelope (e.g. 4 kHz → 100 Hz in 0.1–0.2 s).",
      "Short amp envelope.",
      "Add a little delay so it ricochets.",
      "Fire them in gaps of the riff as fills."
    ],
    plugins: [
      { name: "3x Osc + pitch envelope", where: "FL", note: "Channel settings → INS → pitch" },
      { name: "Vital", where: "Free", note: "Envelope → pitch, fast decay" },
      { name: "Fruity Delay 3", where: "FL", note: "Ricochet echoes" }
    ],
    inFL: true,
    tutorials: ["laser zap sound design", "pew laser fx vital tutorial"],
    examples: [
      { artist: "Porter Robinson", track: "The State", year: 2011, yt: "nFIxrk7_rpE", t: 0 },
      { artist: "Porter Robinson", track: "Spitfire", year: 2011, yt: "rgT1qFIWHYc", t: 0 }
    ]
  },
  {
    id: "pump", name: "Sidechain pump", aka: "Pumping, ducking",
    genre: "complextro", also: ["Electro house", "French house", "EDM"], type: "FX",
    listen: "The whole track 'breathes' with the kick: every time the kick hits, the synths and bass duck out and swell back up — a rhythmic pumping. The demo plays one bar without it, then with it.",
    recipe: [
      "Route the kick into a compressor/limiter on the synth bus (sidechain).",
      "Fast attack, release timed to swell back by the next beat.",
      "Or draw a volume curve (LFO tool) that dips on every beat.",
      "Push it hard for the classic pumping sound."
    ],
    plugins: [
      { name: "Fruity Limiter (sidechain)", where: "FL", note: "Classic FL sidechain" },
      { name: "Fruity Peak Controller", where: "FL", note: "Volume ducking" },
      { name: "Kilohearts Kickstart-style free LFO tools", where: "Free", note: "Volume-shaper plugins" }
    ],
    inFL: true,
    tutorials: ["sidechain compression fl studio", "sidechain pumping explained"],
    examples: [
      { artist: "Madeon", track: "Pop Culture (live mashup)", year: 2011, yt: "lTx3G6h2xyA", t: 0 },
      { artist: "Knife Party", track: "Internet Friends", year: 2011, yt: "luJJBeCFeM0", t: 0 }
    ]
  }
,
// ---------- reggaeton ----------
  {
    id: "dembow", name: "Dembow beat", aka: "Dem bow riddim, boom-ch-boom-chick",
    genre: "reggaeton", also: ["Dancehall", "Latin trap", "Moombahton"], type: "Drums",
    listen: "A kick on every beat with a snappy snare/timbale hitting just before and just after beats 2 and 4 (boom-ch-boom-chick) at about 88–100 BPM. Instantly recognisable bounce.",
    recipe: [
      "Tempo around 90–98 BPM.",
      "Kick on every beat.",
      "Snare (or timbale/rim) on the 4th 16th of beat 1 and the 'and' of beat 2, then the same for beats 3–4 (a 3+3+2 feel).",
      "Add shakers/hats in 8ths and the odd tom fill."
    ],
    plugins: [
      { name: "FPC", where: "FL", note: "Drum pads" },
      { name: "Channel rack step sequencer", where: "FL", note: "Snares on steps 4, 7, 12, 15" }
    ],
    inFL: true,
    tutorials: ["how to make a dembow beat fl studio", "reggaeton drum pattern tutorial"],
    examples: [
      { artist: "Daddy Yankee", track: "Gasolina", year: 2004, yt: "CCF1_jI8Prk", t: 0 },
      { artist: "Shabba Ranks", track: "Dem Bow", year: 1990, yt: "ARG1O3qicXo", t: 0, note: "The Jamaican dancehall track the rhythm is named after" }
    ]
  },
  {
    id: "regbass", name: "Reggaeton 808 bass", aka: "Tresillo bass",
    genre: "reggaeton", also: ["Latin trap", "Dancehall"], type: "Bass",
    listen: "A deep, round 808 bass that bounces in a 3+3+2 tresillo rhythm, locking in with the dembow drums.",
    recipe: [
      "Long 808 or sine bass with a short pitch drop.",
      "Play it on 16th steps 1, 4 and 7 of each half-bar (the 3+3+2 tresillo).",
      "Follow simple minor chord roots.",
      "Keep it clean and big; light saturation helps on phones."
    ],
    plugins: [
      { name: "FL 808 samples", where: "FL", note: "Packs → Drums / 808" },
      { name: "3x Osc", where: "FL", note: "Sine sub" },
      { name: "Vital", where: "Free", note: "Sine + pitch envelope" }
    ],
    inFL: true,
    tutorials: ["reggaeton bass 808 tutorial", "how to make reggaeton beat bass"],
    examples: [
      { artist: "Bad Bunny & Jhay Cortez", track: "DÁKITI", year: 2020, yt: "TmKh7lAwnBI", t: 0 },
      { artist: "Daddy Yankee", track: "Gasolina", year: 2004, yt: "CCF1_jI8Prk", t: 0 }
    ]
  },
  {
    id: "regpluck", name: "Plucked guitar melody", aka: "Reggaeton pluck",
    genre: "reggaeton", also: ["Latin pop", "Moombahton"], type: "Synth",
    listen: "A bright, plucked nylon-string guitar (or pluck synth) playing a catchy minor-key melody over the dembow.",
    recipe: [
      "Nylon/acoustic guitar sample or a pluck synth with a fast decay.",
      "Write a short minor-key hook that repeats.",
      "Leave space so the dembow bounce shows through.",
      "Add a little reverb."
    ],
    plugins: [
      { name: "FL Keys / FLEX presets", where: "FL", note: "Plucked sounds" },
      { name: "Spitfire LABS", where: "Free", note: "Free guitar and plucked instruments" },
      { name: "Vital", where: "Free", note: "Pluck patch" }
    ],
    inFL: true,
    tutorials: ["reggaeton guitar melody tutorial", "how to make reggaeton melody fl studio"],
    examples: [
      { artist: "Luis Fonsi feat. Daddy Yankee", track: "Despacito", year: 2017, yt: "kJQP7kiw5Fk", t: 0 },
      { artist: "Bad Bunny & Jhay Cortez", track: "DÁKITI", year: 2020, yt: "TmKh7lAwnBI", t: 0 }
    ]
  },
  {
    id: "regtag", name: "Reggaeton ad-libs & DJ tags", aka: "Dale!, shouted hype vocals",
    genre: "reggaeton", also: ["Latin trap", "Dancehall"], type: "Vocal",
    listen: "Shouted hype words and catchphrases (Dale!, artist names, yeah yeah) dropped over the beat, often with echo. This is a recording, so the card plays a real example.",
    recipe: [
      "Record short shouted phrases and the artist/producer's name.",
      "Place them at the start of sections and in gaps.",
      "Add delay throws and a little distortion.",
      "Keep them consistent so they become a signature."
    ],
    plugins: [
      { name: "Fruity Delay 3", where: "FL", note: "Echo throws" },
      { name: "Edison", where: "FL", note: "Cut and place phrases" }
    ],
    inFL: true,
    tutorials: ["reggaeton vocal adlibs mixing", "how to make a producer tag"],
    examples: [
      { artist: "Daddy Yankee", track: "Gasolina", year: 2004, yt: "CCF1_jI8Prk", t: 0 },
      { artist: "Don Omar feat. Lucenzo", track: "Danza Kuduro", year: 2010, yt: "7zp1TbLFPp8", t: 0 }
    ]
  },
  // ---------- trap ----------
  {
    id: "hatrolls", name: "Trap hi-hat rolls", aka: "Hat rolls, triplet hats",
    genre: "trap", also: ["Drill", "Hyperpop", "Rage"], type: "Drums",
    listen: "Rapid-fire hi-hats that suddenly speed up into stuttering rolls (triplets, 32nds, sometimes rising in pitch) over slow half-time drums at ≈130–150 BPM.",
    recipe: [
      "Tempo 130–150 BPM, half-time feel (clap/snare on beat 3).",
      "Hats in 8ths or 16ths as the base.",
      "Add rolls: 1/16 triplets, 1/32s, and pitch them up or down.",
      "Vary velocity so they don't sound robotic."
    ],
    plugins: [
      { name: "FPC + piano roll", where: "FL", note: "Draw rolls or use Chop" },
      { name: "FL Studio hat samples", where: "FL", note: "Packs → Drums" }
    ],
    inFL: true,
    tutorials: ["trap hi hat rolls fl studio", "how to program trap hats"],
    examples: [
      { artist: "Migos feat. Lil Uzi Vert", track: "Bad and Boujee", year: 2016, yt: "S-sJp1FfG7Q", t: 0 },
      { artist: "Future", track: "Mask Off", year: 2017, yt: "xvZqHgFz51I", t: 0 }
    ]
  },
  {
    id: "glide808", name: "Trap 808 glide", aka: "808 slide",
    genre: "trap", also: ["Drill", "Hip hop", "Latin trap"], type: "Bass",
    listen: "A long, deep 808 bass that slides smoothly up and down between notes, booming under the beat. Cleaner than the hyperpop version.",
    recipe: [
      "A long 808 sample or sine with a slight pitch drop.",
      "Turn on glide/portamento (FL: slide notes or Fruity Slide).",
      "Overlap notes so the pitch slides between them.",
      "Light saturation so it's audible on small speakers."
    ],
    plugins: [
      { name: "FL 808 samples + slide notes", where: "FL", note: "Slide notes in the piano roll" },
      { name: "Fruity Soft Clipper", where: "FL", note: "Gentle saturation" },
      { name: "Vital", where: "Free", note: "Sine + glide" }
    ],
    inFL: true,
    tutorials: ["how to make 808 glides fl studio", "808 slide tutorial"],
    examples: [
      { artist: "Travis Scott feat. Drake", track: "SICKO MODE", year: 2018, yt: "6ONRf7h3Mdk", t: 0 },
      { artist: "Lil Uzi Vert", track: "XO Tour Llif3", year: 2017, yt: "WrsFXgQk5UI", t: 0 }
    ]
  },
  {
    id: "trapmelody", name: "Dark flute / bell melody", aka: "Trap loop, minor flute",
    genre: "trap", also: ["Drill", "Hip hop"], type: "Synth",
    listen: "A short, moody minor-key loop on a breathy flute or a glassy bell, repeating hypnotically over the drums.",
    recipe: [
      "Pick a dark minor or phrygian scale.",
      "Write a 1–2 bar hook on flute, bell or piano.",
      "Repeat it with tiny variations; leave space for vocals.",
      "Reverb and maybe a low-pass to make it moody."
    ],
    plugins: [
      { name: "FL Keys / FLEX presets", where: "FL", note: "Bells and keys" },
      { name: "Spitfire LABS", where: "Free", note: "Free flutes and bells" },
      { name: "Vital", where: "Free", note: "FM bell patch" }
    ],
    inFL: true,
    tutorials: ["how to make dark trap melodies", "metro boomin melody tutorial"],
    examples: [
      { artist: "Future", track: "Mask Off", year: 2017, yt: "xvZqHgFz51I", t: 0, note: "The famous flute loop" },
      { artist: "Lil Uzi Vert", track: "XO Tour Llif3", year: 2017, yt: "WrsFXgQk5UI", t: 0 }
    ]
  },
  {
    id: "traptag", name: "Producer tag", aka: "Beat tag, signature drop",
    genre: "trap", also: ["Hip hop", "Drill", "Reggaeton"], type: "Vocal",
    listen: "A short spoken phrase or sound at the start of a track that tells you who made the beat: a producer's audio signature. This is a recording, so the card plays a real example.",
    recipe: [
      "Record a short catchphrase (or have someone say it).",
      "Process it with pitch, reverb or distortion so it's distinctive.",
      "Put it at the very start or just before the drop.",
      "Use the same tag on every beat."
    ],
    plugins: [
      { name: "Edison", where: "FL", note: "Record and edit the tag" },
      { name: "Fruity Reeverb 2 / Fruity Delay 3", where: "FL", note: "Make it big" }
    ],
    inFL: true,
    tutorials: ["how to make a producer tag fl studio"],
    examples: [
      { artist: "Future (prod. Metro Boomin)", track: "Mask Off", year: 2017, yt: "xvZqHgFz51I", t: 0 },
      { artist: "Migos (prod. Metro Boomin)", track: "Bad and Boujee", year: 2016, yt: "S-sJp1FfG7Q", t: 0 }
    ]
  },
// ---------- classic breaks ----------
  {
    id: "think", showReal: true, name: "Think break", aka: "Think (About It) break, Yeah! Woo!",
    genre: "jungle", also: ["Hip hop", "Breakbeat", "Drum & bass", "Big beat"], type: "Drums",
    listen: "A tight, funky drum break with sharp snares and crisp hats (on the record, shouted 'Yeah!' and 'Woo!' hits sit on top). Sped up, it drives countless jungle and hip hop tracks. The pad plays a programmed version at the original tempo, then sped up jungle-style; the real record is on the card.",
    recipe: [
      "Find the drum break in Lyn Collins' 'Think (About It)' (1972).",
      "Slice every hit (or use the whole loop) in a slicer.",
      "For jungle, speed it up to 160–175 BPM and rearrange slices; keep the 'Yeah! Woo!' hits as accents.",
      "For hip hop, leave it near its original 95–115 BPM."
    ],
    plugins: [
      { name: "Fruity Slicer / Slicex", where: "FL", note: "Slice the break" },
      { name: "Edison", where: "FL", note: "Find and cut the loop" }
    ],
    inFL: true,
    tutorials: ["think break chopping tutorial", "how to chop breaks for jungle"],
    examples: [
      { artist: "Lyn Collins", track: "Think (About It)", year: 1972, yt: "vCByeJsq65M", t: 0, note: "Use 📍 Set start once you find the break" }
    ]
  },
  {
    id: "apache", showReal: true, name: "Apache break", aka: "Bongo break",
    genre: "jungle", also: ["Hip hop", "Breakbeat", "B-boy"], type: "Drums",
    listen: "A rolling, swinging drum break layered with busy bongos and congas, giving it a percussive, tumbling feel. The anthem of b-boy breaking. The pad plays a programmed version at the original tempo, then sped up jungle-style; the real record is on the card.",
    recipe: [
      "Find the drums-and-bongos section of 'Apache' (1973).",
      "Loop or slice it; the bongos give extra rhythm between the hits.",
      "Speed up for jungle, keep slower for hip hop.",
      "Layer under a new kick for weight if needed."
    ],
    plugins: [
      { name: "Fruity Slicer / Slicex", where: "FL", note: "Slice the break" },
      { name: "Edison", where: "FL", note: "Find and cut the loop" }
    ],
    inFL: true,
    tutorials: ["apache break chop tutorial", "how to use breakbeats fl studio"],
    examples: [
      { artist: "Incredible Bongo Band", track: "Apache", year: 1973, yt: "-Udnb6F1A0g", t: 0 }
    ]
  },
  {
    id: "funkydrummer", showReal: true, name: "Funky Drummer break", aka: "Clyde Stubblefield break",
    genre: "jungle", also: ["Hip hop", "Breakbeat", "Big beat"], type: "Drums",
    listen: "A loose, laid-back funk groove with ghost-note snares and syncopated hats played by Clyde Stubblefield. Lighter and groovier than the Amen. The pad plays a programmed version at the original tempo, then sped up jungle-style; the real record is on the card.",
    recipe: [
      "Find the solo drum break near the end of 'Funky Drummer' (1970).",
      "Loop a bar or two; keep the ghost notes for groove.",
      "Hip hop: use as is. Jungle/breakbeat: speed up and chop.",
      "Compress it to bring out the ghost notes."
    ],
    plugins: [
      { name: "Fruity Slicer / Slicex", where: "FL", note: "Slice the break" },
      { name: "Fruity Compressor", where: "FL", note: "Bring out ghost notes" }
    ],
    inFL: true,
    tutorials: ["funky drummer break sampling tutorial", "most sampled drum breaks"],
    examples: [
      { artist: "James Brown", track: "Funky Drummer (Pt. 1 & 2)", year: 1970, yt: "QXw6YZltKJk", t: 0, note: "The break comes near the end: use 📍 Set start" }
    ]
  },
  {
    id: "hotpants", showReal: true, name: "Hot Pants break", aka: "I'm Coming break",
    genre: "jungle", also: ["Hip hop", "Breakbeat", "Drum & bass"], type: "Drums",
    listen: "A punchy, crisp funk break with a snappy snare and open hi-hats, heard in lots of early-90s jungle and hardcore. The pad plays a programmed version at the original tempo, then sped up jungle-style; the real record is on the card.",
    recipe: [
      "Find the drum break in Bobby Byrd's 'Hot Pants' (1971).",
      "Slice and resequence at jungle tempo.",
      "Layer with the Amen or Think for a busier break.",
      "Add some saturation for a dusty 90s feel."
    ],
    plugins: [
      { name: "Fruity Slicer / Slicex", where: "FL", note: "Slice the break" },
      { name: "Fruity Fast Dist", where: "FL", note: "Dusty grit" }
    ],
    inFL: true,
    tutorials: ["jungle break layering tutorial"],
    examples: [
      { artist: "Bobby Byrd", track: "Hot Pants - I'm Coming, Coming, I'm Coming", year: 1971, yt: "EvCYVzb5P-4", t: 0 }
    ]
  },
  // ---------- dub ----------
  {
    id: "onedrop", name: "One drop riddim", aka: "One drop",
    genre: "dub", also: ["Roots reggae", "Dubstep"], type: "Drums",
    listen: "A slow, relaxed reggae beat (≈70–80 BPM) where the kick and rimshot land together on beat 3 only. Beat 1 is left empty, which gives it a floating, laid-back feel.",
    recipe: [
      "Tempo around 70–80 BPM.",
      "No kick on beat 1: kick and rimshot (cross-stick) together on beat 3.",
      "Swung/shuffled hi-hats in 8ths or triplets.",
      "Leave lots of space for bass and echoes."
    ],
    plugins: [
      { name: "FPC", where: "FL", note: "Drum pads" },
      { name: "Channel rack swing", where: "FL", note: "Shuffle the hats" }
    ],
    inFL: true,
    tutorials: ["one drop reggae drum pattern", "how to make reggae drums fl studio"],
    examples: [
      { artist: "Bob Marley & The Wailers", track: "One Drop", year: 1979, yt: "e3W3TDUzeNc", t: 0 },
      { artist: "Scientist", track: "Dance of the Vampires", year: 1981, yt: "mswVkpgX8EU", t: 0 }
    ]
  },
  {
    id: "skank", name: "Off-beat skank & organ bubble", aka: "Skank, bubble",
    genre: "dub", also: ["Roots reggae", "Ska", "Dancehall"], type: "Synth",
    listen: "Short, choppy guitar chords on the off-beats ('chk... chk...') with a bubbling organ bouncing in between: the rhythm engine of reggae, chopped up and echoed in dub.",
    recipe: [
      "Guitar (or keys): short, muted chords on beats 2 and 4 (the off-beats).",
      "Organ 'bubble': quick alternating low/high chord notes in a shuffled 8th pattern.",
      "In dub, mute them in and out and send hits to delay and spring reverb.",
      "Keep them bright and thin so the bass has room."
    ],
    plugins: [
      { name: "FL Keys / FLEX", where: "FL", note: "Organ and guitar presets" },
      { name: "Fruity Delay 3 + Fruity Reeverb 2", where: "FL", note: "Dub throws" },
      { name: "Spitfire LABS", where: "Free", note: "Free guitar and keys" }
    ],
    inFL: true,
    tutorials: ["reggae skank guitar and organ bubble tutorial", "how to make dub reggae fl studio"],
    examples: [
      { artist: "Augustus Pablo & King Tubby", track: "King Tubby Meets Rockers Uptown", year: 1976, yt: "NoXYJkOeYSM", t: 0 },
      { artist: "Bob Marley & The Wailers", track: "One Drop", year: 1979, yt: "e3W3TDUzeNc", t: 0 }
    ]
  },
  {
    id: "dubbass", name: "Rolling dub bassline", aka: "Reggae bass",
    genre: "dub", also: ["Roots reggae", "Dubstep", "Jungle"], type: "Bass",
    listen: "A deep, round, melodic bassline that sings a short phrase over and over. It's the lead instrument in dub: loud, warm and rolling, with the drums and echoes around it.",
    recipe: [
      "Warm, round tone: sine/triangle or a muted bass guitar, low-passed.",
      "Write a catchy 1–2 bar melodic phrase with rests.",
      "Make it the loudest thing in the mix.",
      "Strip everything else back to it in the 'dub' sections."
    ],
    plugins: [
      { name: "3x Osc", where: "FL", note: "Sine + triangle, low-passed" },
      { name: "FL Keys / BooBass", where: "FL", note: "Round bass tones" },
      { name: "Vital", where: "Free", note: "Warm sub patch" }
    ],
    inFL: true,
    tutorials: ["how to write a reggae dub bassline", "dub bass sound tutorial"],
    examples: [
      { artist: "The Revolutionaries", track: "Kunta Kinte Dub", year: 1976, yt: "K6XDIje4vJU", t: 0 },
      { artist: "Scientist", track: "Dance of the Vampires", year: 1981, yt: "mswVkpgX8EU", t: 0 }
    ]
  },
  {
    id: "melodica", name: "Melodica lead", aka: "Far East sound",
    genre: "dub", also: ["Roots reggae", "Steppas"], type: "Synth",
    listen: "A reedy, slightly wheezy keyboard-harmonica tone playing mournful minor melodies, drenched in echo. Made famous by Augustus Pablo.",
    recipe: [
      "A reed-like tone: square/saw through a band-pass filter, or a melodica sample.",
      "Gentle vibrato and a soft attack.",
      "Minor-key melodies with long notes.",
      "Lots of delay and spring reverb."
    ],
    plugins: [
      { name: "FL Keys / FLEX", where: "FL", note: "Reed/harmonica-style presets" },
      { name: "Vital", where: "Free", note: "Band-passed square + vibrato" },
      { name: "Spitfire LABS", where: "Free", note: "Free woodwind/reed sounds" }
    ],
    inFL: true,
    tutorials: ["augustus pablo melodica sound", "dub melodica synth patch"],
    examples: [
      { artist: "Augustus Pablo & King Tubby", track: "King Tubby Meets Rockers Uptown", year: 1976, yt: "NoXYJkOeYSM", t: 0 }
    ]
  },
  // ---------- steppas ----------
  {
    id: "steppersbeat", name: "Steppers beat", aka: "Steppas rhythm, rockers",
    genre: "steppas", also: ["Dub", "Roots reggae", "UK sound system"], type: "Drums",
    listen: "A marching, militant reggae beat: a kick on every beat with the rimshot/snare on beat 3, at about 70–75 BPM (felt as 140–150). Heavier and more driving than one drop.",
    recipe: [
      "Tempo 70–75 BPM (or program at 140–150 in half-time).",
      "Kick on every beat (four-to-the-floor).",
      "Rimshot or snare on beat 3, often echoed.",
      "Busy 16th hats/shakers and tom fills; very heavy sub underneath."
    ],
    plugins: [
      { name: "FPC", where: "FL", note: "Drum pads" },
      { name: "Fruity Delay 3", where: "FL", note: "Echo the snares" }
    ],
    inFL: true,
    tutorials: ["steppers dub drum pattern", "how to make steppa dub fl studio"],
    examples: [
      { artist: "The Revolutionaries", track: "Kunta Kinte Dub", year: 1976, yt: "K6XDIje4vJU", t: 0, note: "Sly Dunbar's classic steppers drumming" },
      { artist: "Iration Steppas & Tena Stelin", track: "Dub Arena Dub", year: 2014, yt: "PR6D5OYiBk8", t: 0 }
    ]
  },
  {
    id: "steppasbass", name: "Steppas sub bassline", aka: "Sound-system bass",
    genre: "steppas", also: ["Dub", "Dubstep", "UK sound system"], type: "Bass",
    listen: "A huge, deep, repetitive sub-bass riff that drives the whole track on a sound system, locking with the four-to-the-floor steppers kick. Darker and more relentless than roots dub bass.",
    recipe: [
      "Deep sine or sine+triangle bass, very little top end.",
      "Repetitive 1–2 bar riff in 8th notes, often minor and militant.",
      "Lock it to the steppers kick.",
      "Mix it loud: it's meant for big sound-system speakers."
    ],
    plugins: [
      { name: "3x Osc", where: "FL", note: "Sine bass" },
      { name: "Fruity Limiter", where: "FL", note: "Control the low end" },
      { name: "Vital", where: "Free", note: "Sub patch" }
    ],
    inFL: true,
    tutorials: ["steppa dub bassline tutorial", "uk dub sound system bass"],
    examples: [
      { artist: "Iration Steppas & Tena Stelin", track: "Dub Arena Dub", year: 2014, yt: "PR6D5OYiBk8", t: 0 },
      { artist: "Jah Shaka", track: "African Beat", year: 1991, yt: "iRi2jNa8fX4", t: 0 }
    ]
  }
];

window.GENRES = {
  jungle: { label: "Jungle", color: "#ff7a1a" },
  dubstep: { label: "UK Dubstep", color: "#a46bff" },
  garage: { label: "UK Garage", color: "#18e0c8" },
  electro: { label: "Electro", color: "#ff3d8b" },
  hyperpop: { label: "Hyperpop", color: "#4da3ff" },
  bassline: { label: "Bassline / Niche", color: "#ffe14d" },
  speedgarage: { label: "Speed Garage", color: "#ff4d4d" },
  acidhouse: { label: "Acid House", color: "#c8ff3d" },
  acidtechno: { label: "Acid Techno", color: "#c0c7d6" },
  dubtechno: { label: "Dub Techno", color: "#6fbf73" },
  complextro: { label: "Complextro", color: "#ff6af0" },
  reggaeton: { label: "Reggaeton", color: "#e0a050" },
  trap: { label: "Trap", color: "#8a94ff" },
  dub: { label: "Dub", color: "#06d6a0" },
  steppas: { label: "Steppas", color: "#ff9e00" },
  reggaeton: { label: "Reggaeton", color: "#e0a050" },
  trap: { label: "Trap", color: "#8a94ff" },
  dub: { label: "Dub", color: "#06d6a0" },
  steppas: { label: "Steppas", color: "#ff9e00" }
};
