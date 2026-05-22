export const NODES = [
  // CHARACTERS
  { id: "luffy", type: "character", name: "Monkey D. Luffy", title: "Emperor of the Sea", description: "The captain of the Straw Hat crew. Inheritor of the Sun God's will.", x: 50, y: 50 },
  { id: "robin", type: "character", name: "Nico Robin", title: "Devil Child", description: "The sole survivor of Ohara. The only one capable of reading the Poneglyphs.", x: 45, y: 55 },
  { id: "dragon", type: "character", name: "Monkey D. Dragon", title: "World's Worst Criminal", description: "Leader of the Revolutionary Army. Luffy's father.", x: 35, y: 40 },
  { id: "sakazuki", type: "character", name: "Sakazuki", title: "Fleet Admiral", description: "The iron fist of the World Sovereignty. Believes in Absolute Justice.", x: 60, y: 35 },
  { id: "shanks", type: "character", name: "Shanks", title: "Red-Haired Emperor", description: "The man who gave Luffy his straw hat. Guardian of the old era's balance.", x: 65, y: 50 },
  { id: "roger", type: "character", name: "Gol D. Roger", title: "Pirate King", description: "The man who conquered the Grand Line and started the Great Pirate Era.", x: 80, y: 45 },
  { id: "whitebeard", type: "character", name: "Edward Newgate", title: "Whitebeard", description: "The strongest man in the world. Died at Marineford declaring the One Piece is real.", x: 70, y: 40 },
  { id: "kaido", type: "character", name: "Kaido", title: "King of the Beasts", description: "An indestructible tyrant who ruled Wano for two decades.", x: 75, y: 65 },

  // FACTIONS
  { id: "straw-hats", type: "faction", name: "Straw Hat Fleet", title: "The New Dawn", description: "A massive alliance of pirates sailing under Luffy's flag.", x: 55, y: 50 },
  { id: "revolutionaries", type: "faction", name: "Revolutionary Army", title: "Liberators", description: "A global military force actively fighting to overthrow the World Nobles.", x: 30, y: 40 },
  { id: "marines", type: "faction", name: "Marine Headquarters", title: "Absolute Justice", description: "The military sea force of the World Sovereignty.", x: 60, y: 30 },
  { id: "world-gov", type: "faction", name: "World Sovereignty", title: "The Five Elders", description: "The true rulers of the world, residing in the Holy Land of Mariejois.", x: 55, y: 20 },

  // LOCATIONS
  { id: "ohara", type: "location", name: "Ohara", title: "Tree of Knowledge", description: "An island of scholars who were annihilated for researching the Void Century.", x: 40, y: 65 },
  { id: "marineford", type: "location", name: "Marineford", title: "Naval Fortress", description: "The site of the Summit War, a battle that changed the world forever.", x: 65, y: 35 },
  { id: "wano", type: "location", name: "Wano Country", title: "Land of Samurai", description: "An isolated nation that holds ancient secrets and indestructible stone blocks.", x: 70, y: 60 },
  { id: "elbaph", type: "location", name: "Elbaph", title: "Warland of Giants", description: "The strongest nation in the world. Home of the proud giant warriors.", x: 85, y: 35 },
  { id: "laughtale", type: "location", name: "Laugh Tale", title: "The Final Island", description: "The legendary island containing the true history of the world and the One Piece.", x: 90, y: 50 },

  // ARCS & CONCEPTS
  { id: "void-century", type: "concept", name: "The Void Century", title: "Forbidden History", description: "A 100-year gap in recorded history that the World Government aggressively censors.", x: 45, y: 70 },
  { id: "poneglyphs", type: "concept", name: "Poneglyphs", title: "Indestructible Stones", description: "Ancient blocks detailing the history of the Void Century and the path to Laugh Tale.", x: 75, y: 55 },
  { id: "summit-war", type: "arc", name: "The Summit War", title: "Clash of Titans", description: "The massive war between the Whitebeard Pirates and Marine Headquarters.", x: 65, y: 40 },
];

export const EDGES = [
  // Character -> Faction
  { source: "luffy", target: "straw-hats", label: "Captain", type: "alliance" },
  { source: "dragon", target: "revolutionaries", label: "Supreme Commander", type: "alliance" },
  { source: "sakazuki", target: "marines", label: "Fleet Admiral", type: "alliance" },
  { source: "marines", target: "world-gov", label: "Military Branch", type: "subordinate" },

  // Character -> Character
  { source: "luffy", target: "dragon", label: "Son", type: "origin" },
  { source: "luffy", target: "shanks", label: "Idol & Promise", type: "origin" },
  { source: "luffy", target: "sakazuki", label: "Brother's Killer", type: "rivalry" },
  { source: "luffy", target: "robin", label: "Savior", type: "alliance" },
  { source: "roger", target: "shanks", label: "Captain", type: "origin" },
  { source: "whitebeard", target: "roger", label: "Rivals & Friends", type: "rivalry" },
  
  // Character -> Location
  { source: "robin", target: "ohara", label: "Sole Survivor", type: "origin" },
  { source: "luffy", target: "wano", label: "Liberator", type: "event" },
  { source: "kaido", target: "wano", label: "Tyrant Ruler", type: "event" },
  { source: "sakazuki", target: "marineford", label: "Defender", type: "event" },
  { source: "roger", target: "laughtale", label: "Discoverer", type: "event" },

  // Concept & Arc
  { source: "robin", target: "poneglyphs", label: "Reader", type: "alliance" },
  { source: "ohara", target: "void-century", label: "Researchers", type: "event" },
  { source: "world-gov", target: "void-century", label: "Censors", type: "rivalry" },
  { source: "wano", target: "poneglyphs", label: "Creators", type: "origin" },
  { source: "summit-war", target: "marineford", label: "Location", type: "event" },
  { source: "whitebeard", target: "summit-war", label: "Instigator", type: "event" },
  { source: "sakazuki", target: "summit-war", label: "Executioner", type: "event" },
  { source: "luffy", target: "summit-war", label: "Invader", type: "event" },
];

export const JOURNEYS = {
  luffy: {
    characterId: "luffy",
    name: "Monkey D. Luffy",
    title: "Voyage of the Sun God",
    description: "From a small boat in the East Blue to the toppling of Emperors, trace the route of absolute freedom.",
    waypoints: [
      {
        id: "east-blue",
        name: "East Blue",
        chapter: "Chapter I: Hopeful Horizons",
        tagline: "A Boy's Promise",
        x: 70, y: 220,
        weather: "east-blue",
        sound: "Seagulls & gentle waves",
        stakes: "Setting sail from Foosha, gathering the crew, and making a vow to conquer the sea.",
        factions: ["Straw Hat Fleet"],
        characters: ["Monkey D. Luffy", "Shanks"],
        lore: "The peaceful starting sea where Luffy made his promise to Shanks and set sail in a small wooden barrel.",
        symbol: "👒"
      },
      {
        id: "alabasta",
        name: "Alabasta",
        chapter: "Chapter II: The Desert Kingdom",
        tagline: "Sand and Warlords",
        x: 160, y: 190,
        weather: "fog", // dusty fog
        sound: "Winds carrying sand dust",
        stakes: "Saving Princess Vivi's kingdom from the shadow of Warlord Crocodile and Baroque Works.",
        factions: ["Straw Hat Fleet", "World Sovereignty"],
        characters: ["Monkey D. Luffy", "Nico Robin"],
        lore: "An ancient desert nation holding the first Poneglyph Luffy's crew encountered, revealing the scale of the world's hidden history.",
        symbol: "⏳"
      },
      {
        id: "enies-lobby",
        name: "Enies Lobby",
        chapter: "Chapter III: Declaration of War",
        tagline: "Challenging the Heavens",
        x: 220, y: 120,
        weather: "cold-rain",
        sound: "Steady heavy rain and steel doors",
        stakes: "Declaring war on the World Government by burning their flag to rescue Nico Robin from absolute execution.",
        factions: ["Straw Hat Fleet", "World Sovereignty", "Marine Headquarters"],
        characters: ["Monkey D. Luffy", "Nico Robin", "Sakazuki"],
        lore: "The judicial island where justice is absolute. The Straw Hats forced their way in, proving that no friend is left behind.",
        symbol: "⚖️"
      },
      {
        id: "marineford",
        name: "Marineford",
        chapter: "Chapter IV: Summit War",
        tagline: "The Death of an Era",
        x: 270, y: 150,
        weather: "ash",
        sound: "War drums and falling ashes",
        stakes: "Infiltrating the Navy's fortress to save his brother Ace. The clash of Whitebeard and Fleet Admiral Sengoku.",
        factions: ["Marine Headquarters", "World Sovereignty"],
        characters: ["Monkey D. Luffy", "Whitebeard", "Sakazuki", "Shanks"],
        lore: "The site of the greatest war in recent history, ending in the tragic death of Portgas D. Ace and the closing of the Old Pirate Era.",
        symbol: "⚓"
      },
      {
        id: "wano",
        name: "Wano Country",
        chapter: "Chapter V: Rise of the Sun God",
        tagline: "Liberation of the Samurai",
        x: 350, y: 220,
        weather: "ink",
        sound: "Traditional flute and crackling flames",
        stakes: "Defeating the invincible Emperor Kaido to free Wano from 20 years of enslavement and open its closed borders.",
        factions: ["Straw Hat Fleet"],
        characters: ["Monkey D. Luffy", "Kaido"],
        lore: "An isolated, beautiful land of samurai where Luffy unlocked Gear 5th, awakening the mythical Sun God Nika.",
        symbol: "🌸"
      },
      {
        id: "egghead",
        name: "Egghead Island",
        chapter: "Chapter VI: The Future Island",
        tagline: "Secrets of the Void",
        x: 430, y: 170,
        weather: "cyber",
        sound: "Holographic hums and sonar scans",
        stakes: "Protecting Vegapunk from the Five Elders and escaping the island with the truth of the world's sinking.",
        factions: ["Straw Hat Fleet", "World Sovereignty", "Marine Headquarters"],
        characters: ["Monkey D. Luffy", "Nico Robin", "Sakazuki"],
        lore: "A futuristic island housing technologies from the ancient Void Century, now besieged by the World Government.",
        symbol: "🌐"
      }
    ]
  },
  robin: {
    characterId: "robin",
    name: "Nico Robin",
    title: "Voyage of the Scholar",
    description: "The painful road of the Devil Child, carrying the burning memories of Ohara to the edge of the world.",
    waypoints: [
      {
        id: "ohara",
        name: "Ohara",
        chapter: "Chapter I: Tree of Knowledge",
        tagline: "The Burning Library",
        x: 90, y: 110,
        weather: "ash",
        sound: "Cracking timber and cannon fire",
        stakes: "Surviving the annihilation of her home island by a Buster Call at just eight years old.",
        factions: ["World Sovereignty", "Marine Headquarters"],
        characters: ["Nico Robin", "Sakazuki"],
        lore: "The island of scholars who sacrificed their lives to protect the books of history, leaving Robin as the sole survivor.",
        symbol: "🔥"
      },
      {
        id: "alabasta",
        name: "Alabasta",
        chapter: "Chapter II: Miss All Sunday",
        tagline: "Living in Shadows",
        x: 160, y: 190,
        weather: "fog",
        sound: "Dust storms and whispers",
        stakes: "Working with Crocodile's syndicate to find and read the Pluton Poneglyph, searching for a place to die.",
        factions: ["World Sovereignty"],
        characters: ["Nico Robin", "Monkey D. Luffy"],
        lore: "After years of betrayal, Robin found a captain who pulled her from the collapsing tomb, asking her to live.",
        symbol: "🦂"
      },
      {
        id: "enies-lobby",
        name: "Enies Lobby",
        chapter: "Chapter III: I Want to Live",
        tagline: "The Cry of Liberation",
        x: 220, y: 120,
        weather: "cold-rain",
        sound: "Rain pouring over prison towers",
        stakes: "Surrendering to the government to save her crew, only to witness them burn the world flag to reclaim her.",
        factions: ["Straw Hat Fleet", "World Sovereignty"],
        characters: ["Nico Robin", "Monkey D. Luffy"],
        lore: "The judicial island where Robin finally discarded her fear and shouted her desire to live and sail with her crew.",
        symbol: "⛓️"
      },
      {
        id: "baltigo",
        name: "Baltigo",
        chapter: "Chapter IV: Light of Revolution",
        tagline: "The White Sands",
        x: 300, y: 240,
        weather: "east-blue", // warm winds
        sound: "Howling desert winds and flags flapping",
        stakes: "Finding temporary safety and purpose with Luffy's father, Dragon, and the Revolutionary Army.",
        factions: ["Revolutionary Army"],
        characters: ["Nico Robin", "Monkey D. Dragon"],
        lore: "The secret wind-swept island of the Revolutionaries, where Robin spent the two-year timeskip studying global history.",
        symbol: "🚩"
      },
      {
        id: "egghead",
        name: "Egghead Island",
        chapter: "Chapter V: The Sinking World",
        tagline: "Ohara's Inheritance",
        x: 430, y: 170,
        weather: "cyber",
        sound: "Computer alerts and scanning lines",
        stakes: "Learning that Ohara's books survived, and discovering the truth that the world is slowly sinking.",
        factions: ["Straw Hat Fleet", "World Sovereignty"],
        characters: ["Nico Robin", "Monkey D. Luffy"],
        lore: "Vegapunk salvaged Ohara's research from the lake of fire, proving that the scholars' will could never be erased.",
        symbol: "📖"
      }
    ]
  },
  law: {
    characterId: "law",
    name: "Trafalgar Law",
    title: "Voyage of Retribution",
    description: "The path of a dying boy saved by love, sailing into the storm to destroy the dark balance of the world.",
    waypoints: [
      {
        id: "flevance",
        name: "Flevance",
        chapter: "Chapter I: The White City",
        tagline: "Amber Lead Tragedy",
        x: 120, y: 80,
        weather: "snow",
        sound: "Church bells and silent snow",
        stakes: "Losing his family and city to a government quarantine massacre, infected with terminal White Lead disease.",
        factions: ["World Sovereignty"],
        characters: ["Trafalgar Law"],
        lore: "The beautiful city of Flevance, destroyed by greed and governmental cover-ups regarding Amber Lead mining.",
        symbol: "❄️"
      },
      {
        id: "corazon",
        name: "Minion Island",
        chapter: "Chapter II: Corazon's Gift",
        tagline: "A Smile in the Snow",
        x: 165, y: 105,
        weather: "snow",
        sound: "Crunching snow and a dying laugh",
        stakes: "Corazon sacrificing his life to feed Law the Op-Op Fruit and hide him from Doflamingo's vengeance.",
        factions: ["World Sovereignty"],
        characters: ["Trafalgar Law"],
        lore: "Under the freezing snow of Minion Island, Rosinante used his silence magic to save a weeping child's life.",
        symbol: "❤️"
      },
      {
        id: "dressrosa",
        name: "Dressrosa",
        chapter: "Chapter III: Fate of the Warlord",
        tagline: "Shattering the birdcage",
        x: 290, y: 180,
        weather: "storm",
        sound: "Violent winds and snapping threads",
        stakes: "Defeating Doflamingo to avenge Rosinante, initiating a massive alliance with the Straw Hats.",
        factions: ["Straw Hat Fleet", "World Sovereignty"],
        characters: ["Trafalgar Law", "Monkey D. Luffy"],
        lore: "The kingdom of toys and blood where Law put his life on the line to break Doflamingo's absolute rule.",
        symbol: "🦩"
      },
      {
        id: "wano",
        name: "Wano Country",
        chapter: "Chapter IV: Throne Slayers",
        tagline: "The New Era Dawns",
        x: 350, y: 220,
        weather: "ink",
        sound: "Flute notes and lightning cracks",
        stakes: "Awakening the Op-Op Fruit to topple Emperor Big Mom alongside Kidd, altering the balance of power forever.",
        factions: ["Straw Hat Fleet"],
        characters: ["Trafalgar Law", "Monkey D. Luffy", "Kaido"],
        lore: "By slaying an Emperor, Law proved that the old generation's control was officially broken, uncovering clues to the 'Will of D.'",
        symbol: "🌀"
      }
    ]
  }
};

