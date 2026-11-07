// "How to tell them apart" notes, shown when you pick the wrong answer in the quiz.
// Keys are two card ids joined by "|" in alphabetical order.

window.CONTRASTS = {
  // ---- basses ----
  "neuro|sub": "A sine sub is a pure, clean low tone with no grit. Neuro bass is all mid-range distortion and snarl at drum & bass speed.",
  "reese|sub": "A sine sub is one pure, still tone. A Reese is two detuned saws, so it's buzzy and slowly churns against itself.",
  "sub|wobble": "A sub holds a steady clean tone. A wobble's filter opens and closes rhythmically, so it goes 'wub-wub'.",
  "organ|sub": "A sine sub is one smooth, deep tone. Organ bass adds higher harmonics for a hollow, plucky 'boxy' sound you hear clearly on small speakers.",
  "growl|sub": "A sub is clean and deep. A growl is a harsh, distorted mid-range sound that changes vowel shape.",
  "electrobass|sub": "A sine sub is smooth and sustained. Electro bass is short, punchy and robotic, bouncing in 16ths.",
  "speedbass|sub": "A sub is a clean held tone. The speed garage bass is fat and buzzy, and swoops down in pitch at the start of each note.",
  "reese|wobble": "A Reese moves slowly and smoothly through detuning. A wobble moves in a strict, tempo-synced rhythm as its filter opens and closes.",
  "neuro|reese": "Both start from detuned saws. A Reese is smooth and slowly churning, often held on long notes. Neuro bass is the Reese pushed through heavy distortion and fast filter moves, so it snarls and changes tone on every note.",
  "reese|speedbass": "A Reese churns steadily on a held note. The speed garage bass is a Reese-like sound with a pitch dive at the start of each note ('bwoing'), over a 4x4 house beat instead of breakbeats.",
  "growl|wobble": "A wobble is a filter opening and closing in a steady, tempo-synced rhythm ('wub-wub-wub'). A growl changes its vowel shape ('yow-wow') within each short hit and sounds more aggressive and mid-range, usually from FM synthesis.",
  "warpbass|wobble": "Both wobble. Dubstep wobble sits at 140 BPM in half-time with lots of space. The bassline 'warp' bass bounces in short, busy notes over a four-to-the-floor kick with swung hats.",
  "kick808|sub": "Both are deep and round. A sine sub holds steady notes as a bassline. An 808 kick starts with a short thump and then falls in pitch as it rings out, and it plays the role of a drum.",
  "hyper808|sub": "A sine sub is clean and smooth. The hyperpop 808 is distorted until it buzzes and crackles, and it glides between notes.",
  "hyper808|kick808": "Both are 808s. The classic electro 808 kick is clean and boomy. The hyperpop one is clipped into a buzzing, distorted bass that glides between notes under fast hi-hat rolls.",
  "organ|speedbass": "Organ bass is hollow and 'boxy', made of sine/organ partials in short plucky notes. The speed garage bass is a fat detuned saw with a downward pitch swoop at the start of each note.",
  "organ|warpbass": "Organ bass is clean, hollow and plucky. The bassline warp bass is driven and buzzy, with a filter wobbling inside each note.",
  "acid|distort303": "Same 303 source. Acid house keeps it rubbery and squelchy at about 120–126 BPM. Acid techno distorts it until it screams, plays faster (≈140 BPM) and sweeps it harder.",
  "acid|electrobass": "Both are sequenced 16th-note basslines. The 303 acid line has a very resonant filter that squelches and slides between notes. Electro bass is tighter and punchier, with little resonance and no slides.",
  "electrobass|speedbass": "Electro bass is short, dry and robotic over 808 drums. Speed garage bass is fat, rubbery and pitch-swooping over a swung 4x4 house beat.",
  "growl|neuro": "Both are aggressive mid-range basses. Growl sits at dubstep tempo (≈140–150) and 'talks' with vowel shapes. Neuro sits at drum & bass tempo (≈172) under a fast two-step beat, with a metallic, comb-filtered snarl.",
  "distort303|warpbass": "The distorted 303 is a single resonant line that squeals and slides. The bassline warp bass is a chunkier square/saw with a wobbling filter in bouncy patterns.",
  // ---- drums ----
  "amen|halfstep": "The Amen is a busy, fast (160–175 BPM) sampled breakbeat with snares skipping everywhere. Half-step is sparse at 140 BPM: one kick, one big snare on beat 3 and lots of space.",
  "sgbeat|twostep": "2-step skips the kick: it is not on every beat. The speed garage beat has a steady four-to-the-floor kick with garage-style swung hats on top.",
  "halfstep|twostep": "Half-step has one snare per bar on beat 3 and feels slow. 2-step has snares on 2 and 4, swung hats and a skipping kick, so it feels bouncy.",
  "house909|sgbeat": "Both are four-to-the-floor. The 909 house groove is straight and sizzling, with open hats on the off-beats. The speed garage beat has heavy swing, rimshots and shuffled hats.",
  "house909|kick808": "The 808 kick is a long, booming tone. The 909 kick is shorter and punchier, made to drive a steady four-to-the-floor house groove.",
  "cowbell|house909": "The 808 kit gives the tuned 'tonk' cowbell and the soft, layered clap of electro. The 909 groove is about driving kicks and sizzling open hi-hats.",
  "amen|twostep": "The Amen is a fast, dense sampled break at 160–175 BPM. 2-step is a programmed, swung beat around 130–135 BPM with a skipping kick.",
  // ---- synths ----
  "hoover|supersaw": "Both are huge stacks of detuned saws. The hoover is darker and sour, with heavy chorus, and swoops in pitch into each note. The supersaw is bright and euphoric, playing big clean chords without the swoop.",
  "dubchord|stabs": "Garage stabs are bright, jazzy chords punched out in syncopated rhythms. The dub techno chord is muffled and repeats into a long, hazy echo over a slow steady kick.",
  "orchhit|stabs": "An orchestra hit is a single huge 'BWAH!' of a whole orchestra, dramatic and 80s. Garage stabs are smaller, jazzy synth chords that play in a rhythm.",
  "bubblepluck|stabs": "Garage stabs are warm chords. The hyperpop pluck is a single glassy, rubbery 'bloop' tone playing a bouncy melody.",
  "stabs|supersaw": "Garage stabs are short and syncopated. The supersaw is a long, sustained, shimmering wall of sound.",
  "bubblepluck|orchhit": "The orchestra hit is one massive dramatic chord. The bubbly pluck is a small, shiny, bell-like tone playing quick melodies.",
  // ---- FX ----
  "dubdelay|siren": "The dub siren is a continuous wailing tone that rises and loops. Dub delay throws take a single hit or chord and repeat it, getting darker as it fades.",
  "glitch|rewind": "The rewind spins the music backwards with a whoosh, like a DJ dragging the record. The glitch stutter repeats a tiny slice faster and faster and rises in pitch, like a CD skipping.",
  "crackle|dubdelay": "Vinyl crackle and rain is a constant background texture of pops and hiss. Dub delay is a sound that repeats and fades away.",
  "gunshot|siren": "The siren is a single wailing electronic tone that echoes. The airhorn is a blaring 'BAAP BAAP BAAAP' chord, and the gunshot is a noise blast with a huge reverb tail.",
  "gunshot|rewind": "Airhorns and gunshots are hype FX dropped over the music. The rewind is the whole track spinning backwards.",
  // ---- vocals ----
  "ragga|rnbvocal": "Ragga chops are Jamaican dancehall/MC voices: rhythmic, shouted, spoken-sung. R&B chops are smooth, soulful singing cut into a new melody and often pitched up.",
  "chipmunk|rnbvocal": "R&B chops are short snippets of a real soulful singer re-arranged. The hyperpop vocal is a whole line pitched way up with hard autotune that snaps robotically between notes.",
  "chipmunk|vocoder": "The vocoder voice is low, flat and robotic, like a synth talking. The hyperpop vocal is high, cute and glossy, with hard autotune.",
  "chipmunk|ragga": "Ragga is a deep, rhythmic Jamaican MC voice. The hyperpop vocal is a high, pitched-up, autotuned singing voice.",
  "rnbvocal|vocoder": "R&B chops are a real human singing voice. A vocoder replaces the voice's tone with a synth, so it sounds robotic and keyboard-like."
};

// Short genre profiles for wrong answers in the genre quiz.
window.GENRE_INFO = {
  jungle: "160–175 BPM · fast chopped breakbeats (Amen), deep subs and Reese bass, ragga vocals and sound-system FX.",
  dubstep: "≈140 BPM, half-time · sparse drums with the snare on beat 3, huge subs and wobbles, dark and spacious.",
  garage: "130–135 BPM · swung 2-step drums with a skipping kick, jazzy chords, chopped R&B vocals, organ bass.",
  electro: "≈110–125 BPM · robotic 808 drum machines, funky synth bass, vocoder voices, sci-fi sounds.",
  hyperpop: "Often 140–160 BPM · maximalist, glossy and distorted: blown-out 808s, supersaws, pitched-up autotune, glitches.",
  bassline: "135–140 BPM, four-to-the-floor · a loud, wobbly mid-range 'warp' bass is the star, with swung hats and R&B vocals.",
  speedgarage: "130–135 BPM, four-to-the-floor · house beat with garage swing, fat pitch-bending 'bwoing' bass, airhorns and gunshots.",
  acidhouse: "120–126 BPM, four-to-the-floor · Chicago 909/808 drums and the squelchy TB-303 bassline.",
  acidtechno: "135–145 BPM · harder, faster and darker than acid house: distorted screaming 303s over pounding kicks.",
  dubtechno: "118–125 BPM · hypnotic and muffled: chord stabs echoing into long delays, soft steady kicks, tape hiss."
};
