// Card data for Learning Sounds.
// genre = the main genre (one of jungle, dubstep, garage, electro), used for colours and the genre quiz.
// also = other genres where the sound is common.
// plugins: where = "FL" (ships with FL Studio) or "Free" (free download).
// examples / tutorials become YouTube search links in the app.

window.CARDS = [
  {
    id: "amen", name: "Amen break", aka: "Amen, chopped break",
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
      { artist: "The Winstons", track: "Amen, Brother", year: 1969, note: "The source — drum solo at 1:26" },
      { artist: "Shy FX & UK Apache", track: "Original Nuttah", year: 1994 }
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
      { artist: "Reese (Kevin Saunderson)", track: "Just Want Another Chance", year: 1988, note: "Where the name comes from" },
      { artist: "Bad Company", track: "The Nine", year: 1998 }
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
      { artist: "Second Phase (Joey Beltram)", track: "Mentasm", year: 1991 },
      { artist: "Human Resource", track: "Dominator", year: 1991 }
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
      "This one is a recording, so the app links to examples rather than synthesising it."
    ],
    plugins: [
      { name: "Fruity Slicer", where: "FL", note: "Chop vocals into slices" },
      { name: "Edison", where: "FL", note: "Cut and pitch phrases" },
      { name: "Fruity Delay 3", where: "FL", note: "Echo throws on the last word" }
    ],
    inFL: true,
    tutorials: ["ragga jungle vocal chop tutorial", "how to make ragga jungle fl studio"],
    examples: [
      { artist: "M-Beat feat. General Levy", track: "Incredible", year: 1994 },
      { artist: "Shy FX & UK Apache", track: "Original Nuttah", year: 1994 }
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
      { artist: "Congo Natty", track: "Junglist", year: 2013 },
      { artist: "Jah Shaka", track: "sound system", year: null, note: "Live sound-system culture" }
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
      { artist: "Digital Mystikz", track: "Anti-War Dub", year: 2006 },
      { artist: "Skream", track: "Midnight Request Line", year: 2005 }
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
      { artist: "Caspa & Rusko", track: "Cockney Thug", year: 2007 },
      { artist: "Benga & Coki", track: "Night", year: 2007 }
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
      { artist: "Mala", track: "Changes", year: 2006 },
      { artist: "Benga & Coki", track: "Night", year: 2007 }
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
      { artist: "Kode9 & The Spaceape", track: "Sine of the Dub", year: 2004 },
      { artist: "King Tubby", track: "dub mixes", year: null, note: "The pioneer of dub mixing" }
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
      { artist: "Burial", track: "Archangel", year: 2007 },
      { artist: "Burial", track: "Near Dark", year: 2007 }
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
      { artist: "Artful Dodger feat. Craig David", track: "Re-Rewind", year: 1999 },
      { artist: "MJ Cole", track: "Sincere", year: 1998 }
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
      { artist: "Robin S", track: "Show Me Love", year: 1993, note: "The M1 organ sound" },
      { artist: "T2", track: "Heartbroken", year: 2007 }
    ]
  },
  {
    id: "rnbvocal", name: "Pitched R&B vocal chop", aka: "Chopped vocal, vocal edit",
    genre: "garage", also: ["Future garage", "Dubstep"], type: "Vocal",
    listen: "Snippets of soulful singing, pitched up and cut into a new rhythmic melody. In-app version is a synthesised 'ooh-ah' imitation.",
    recipe: [
      "Take an R&B acapella.",
      "Chop single syllables and re-sequence them into a new rhythm.",
      "Pitch them up (often +3 to +7 semitones) and add reverb.",
      "Real vocals sound best — check the examples."
    ],
    plugins: [
      { name: "Edison", where: "FL", note: "Chop + pitch" },
      { name: "Fruity Slicer", where: "FL", note: "Play chops from keys" },
      { name: "Newtone / Pitcher", where: "FL", note: "Producer/Signature editions" }
    ],
    inFL: true,
    tutorials: ["uk garage vocal chop tutorial", "burial style vocal chops tutorial"],
    examples: [
      { artist: "Burial", track: "Archangel", year: 2007 },
      { artist: "Todd Edwards", track: "Saved My Life", year: 1996, note: "Pioneer of chopped vocals" }
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
      { artist: "MJ Cole", track: "Sincere", year: 1998 },
      { artist: "Wookie", track: "Battle", year: 2000 }
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
      { artist: "Artful Dodger feat. Craig David", track: "Re-Rewind", year: 1999 },
      { artist: "Shy FX & UK Apache", track: "Original Nuttah", year: 1994 }
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
      { artist: "Afrika Bambaataa & Soulsonic Force", track: "Planet Rock", year: 1982 },
      { artist: "Marvin Gaye", track: "Sexual Healing", year: 1982 }
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
      { artist: "Egyptian Lover", track: "Egypt, Egypt", year: 1984 },
      { artist: "Afrika Bambaataa & Soulsonic Force", track: "Planet Rock", year: 1982 }
    ]
  },
  {
    id: "vocoder", name: "Vocoder robot voice", aka: "Vocoder",
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
      { artist: "Kraftwerk", track: "The Robots", year: 1978 },
      { artist: "Herbie Hancock", track: "Rockit", year: 1983 }
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
      { artist: "Afrika Bambaataa & Soulsonic Force", track: "Planet Rock", year: 1982 },
      { artist: "Art of Noise", track: "Close (to the Edit)", year: 1984 }
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
      { artist: "Phuture", track: "Acid Tracks", year: 1987 },
      { artist: "Hardfloor", track: "Acperience 1", year: 1992 }
    ]
  }
];

window.GENRES = {
  jungle: { label: "Jungle", color: "#ff7a1a" },
  dubstep: { label: "UK Dubstep", color: "#a46bff" },
  garage: { label: "UK Garage", color: "#18e0c8" },
  electro: { label: "Electro", color: "#ff3d8b" }
};
