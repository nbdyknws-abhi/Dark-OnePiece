// Relationship data for the "THE WORST GENERATION" interactive graph

export const FIGURES = [
  {
    id: "luffy",
    name: "Monkey D. Luffy",
    alias: "The Straw Hat Captain",
    faction: "worst-gen",
    bounty: "3,000,000,000 Silver",
    role: "Captain of the Straw Hat Fleet",
    will: "Absolute Freedom. He refuses to rule anyone, seeking only to be the freest person on the ocean.",
    description: "Inheritor of the straw hat and the mysterious 'Will of D.' By unlocking the ancient power of liberation, he has broken the stalest hierarchies of the sea, defeating Kaido and rising to the rank of Emperor.",
    x: 350,
    y: 280
  },
  {
    id: "law",
    name: "Trafalgar Law",
    alias: "The Surgeon of Death",
    faction: "worst-gen",
    bounty: "3,000,000,000 Silver",
    role: "Captain of the Heart Pirates",
    will: "Truth and Discovery. He seeks to uncover the meaning of the forbidden 'D' in his lineage.",
    description: "A cold, calculating tactical genius who possesses the power to manipulate space itself. He initiated the pirate alliance that fractured the equilibrium of the New World.",
    x: 200,
    y: 150
  },
  {
    id: "kidd",
    name: "Eustass Kidd",
    alias: "The Magnetic Terror",
    faction: "worst-gen",
    bounty: "3,000,000,000 Silver",
    role: "Captain of the Kid Pirates",
    will: "Pure Conquest. He seeks to crush anyone who laughs at his dream of taking the final throne.",
    description: "A ruthless, metallic-powered conqueror who rules his crew through fear and loyalty. He shares a brutal rivalry with Luffy, preferring force over diplomacy.",
    x: 180,
    y: 400
  },
  {
    id: "blackbeard",
    name: "Marshall D. Teach",
    alias: "The Dark Conqueror",
    faction: "emperors",
    bounty: "3,996,000,000 Silver",
    role: "Admiral of the Blackbeard Fleet",
    will: "Absolute Domination. He believes that a pirate's dreams never end, regardless of the chaos left in their wake.",
    description: "A cunning traitor who stole the powers of both gravity and earthquakes. He is the ultimate dark mirror of Luffy—believing in destiny but achieving it through betrayal and raw greed.",
    x: 550,
    y: 350
  },
  {
    id: "shanks",
    name: "Red-Haired Shanks",
    alias: "The Guardian Sovereign",
    faction: "emperors",
    bounty: "4,048,900,000 Silver",
    role: "Captain of the Red Hair Fleet",
    will: "Preservation and Balance. He guards the borderlands, waiting for the one worthy of the crown.",
    description: "A legendary swordsman who commands the respect of both pirates and Navy high lords. He sacrificed his arm to save Luffy, inspiring him to set sail.",
    x: 450,
    y: 120
  },
  {
    id: "garp",
    name: "Monkey D. Garp",
    alias: "The Marine Fist",
    faction: "sovereignty",
    bounty: "None (Navy Legend)",
    role: "Vice Admiral & Instructor",
    will: "Conflicted Duty. He seeks to protect the innocent while shielding his rebellious family.",
    description: "The legendary hero of the Marines who fought the old Pirate King to a standstill. He is Luffy's grandfather, torn between his military oath and his love for his outlaw family.",
    x: 650,
    y: 180
  },
  {
    id: "koby",
    name: "Koby",
    alias: "The Future of the Fleet",
    faction: "sovereignty",
    bounty: "None (Navy Captain)",
    role: "Captain of SWORD Division",
    will: "Honorable Justice. He wants to protect the weak without relying on the Navy's censorship and cruelty.",
    description: "A former cabin boy rescued by Luffy on his first day at sea. Under Garp's brutal training, he rose to become an elite marine officer committed to reformed justice.",
    x: 750,
    y: 300
  },
  {
    id: "dragon",
    name: "Monkey D. Dragon",
    alias: "The Revolutionary Spark",
    faction: "revolutionaries",
    bounty: "Unquantifiable (Most Wanted)",
    role: "Supreme Commander of the Revolution",
    will: "Global Liberation. He aims to tear down the world lords and expose the forgotten history.",
    description: "Luffy's mysterious father who founded the Revolutionary Army. He controls the wind currents and operates from the shadows, dismantling the Sovereignty's grip island by island.",
    x: 480,
    y: 500
  }
];

export const CONNECTIONS = [
  {
    source: "luffy",
    target: "law",
    type: "alliance",
    label: "Alliance of Wano",
    description: "A calculated alliance created to defeat the Emperor Kaido. Though Law is logical and Luffy is chaotic, they achieved the impossible."
  },
  {
    source: "luffy",
    target: "kidd",
    type: "rivalry",
    label: "Contenders for the Throne",
    description: "A fierce competitive rivalry. Neither will acknowledge the other's authority, resulting in constant combat and race to the final coordinates."
  },
  {
    source: "luffy",
    target: "blackbeard",
    type: "betrayal",
    label: "Feud of Fate",
    description: "Teach captured Luffy's brother, Ace, initiating the great naval war that led to Ace's execution. An absolute, irreconcilable conflict of blood."
  },
  {
    source: "luffy",
    target: "shanks",
    type: "mentorship",
    label: "The Straw Hat Promise",
    description: "Shanks passed his straw hat to Luffy, telling him to return it only when Luffy has gathered a crew that surpasses his own."
  },
  {
    source: "luffy",
    target: "garp",
    type: "rivalry",
    label: "Bloodline Conflict",
    description: "Grandfather and grandson. Garp wanted Luffy to be a marine protector, but Luffy chose absolute outlaw freedom, placing them on a collision course."
  },
  {
    source: "luffy",
    target: "dragon",
    type: "alliance",
    label: "Unspoken Legacy",
    description: "Father and son. Though they have never formally spoken, Dragon has protected Luffy from the shadows, trusting him to break the old world's shackles."
  },
  {
    source: "luffy",
    target: "koby",
    type: "alliance",
    label: "Bound by Honor",
    description: "Though sworn enemies under marine law, they share an unbreakable friendship based on mutual respect and their humble beginnings."
  },
  {
    source: "law",
    target: "kidd",
    type: "alliance",
    label: "Slayers of the Emperor",
    description: "A desperate partnership formed in Wano. They merged their metallic and spatial powers to topple the Emperor Big Mom."
  },
  {
    source: "shanks",
    target: "blackbeard",
    type: "rivalry",
    label: "The Scar of the Past",
    description: "A bitter, long-running rivalry. Teach gave Shanks his signature facial scars in an ambush. Shanks constantly warns the world of Teach's patient malice."
  },
  {
    source: "garp",
    target: "koby",
    type: "mentorship",
    label: "The Fist's Disciple",
    description: "Garp took Koby under his wing, recognizing his pure heart. He trains him ruthlessly to ensure Koby survives the oncoming war."
  },
  {
    source: "dragon",
    target: "garp",
    type: "rivalry",
    label: "Fractured Family",
    description: "Father and son. Garp's loyalty is to the Navy he served for decades; Dragon's goal is to tear the world authority to pieces."
  }
];
