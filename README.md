# ⚓ THE GRAND ERA — Cinematic Lore Archive

[![Project Status: Active](https://img.shields.io/badge/Project%20Status-Active-gold.svg?style=flat-square)](#)
[![Stack: React 19 + Tailwind v4](https://img.shields.io/badge/Stack-React%2019%20%7C%20Tailwind%20v4-blue.svg?style=flat-square)](#)
[![Linting: Clean](https://img.shields.io/badge/ESLint-Passed-success.svg?style=flat-square)](#)

> *"Inherited Will, the Destiny of Age, and the Dreams of People. As long as people continue to pursue the meaning of Freedom, these things will never cease to be."*

**The Grand Era** is a premium, fully responsive cinematic storytelling platform and investigative narrative archive. Inspired by the visual philosophy, pacing, and interconnected structure of the *DARK* Netflix interactive experience, it reimagines a massive pirate fantasy universe as a high-budget intelligence dossier.

Rather than a generic wiki or landing page, **The Grand Era** is a living mythology database. Users explore historical arcs, overlapping geopolitical boundaries, and character legacies through an immersive, weather-responsive graphical universe.

---

## 🌟 Core Experience Features

### 1. The Universe Relationship Graph
* **Interactive Network Web**: Visualizes connections between characters, factions, and islands.
* **Intelligent Connections**: Highlights lines of heritage, alliance, conflict, and secrets on hover.
* **Cinematic Dossiers**: Clicking on nodes pulls up sliding intelligence cards detailing forbidden knowledge, timelines, and affiliated items.

### 2. Geopolitical Influence Overlay
* **Tactical Boundary Map**: Renders glowing territory boundaries indicating regional influence.
* **Four Major Factions**:
  * 🏛️ **World Government**: Cold blue-grey steel sphere of absolute justice.
  * 👑 **Emperors of the Sea**: Crimson boundary marking chaotic domains of high-seas warlords.
  * 🍃 **Revolutionary Army**: Deep emerald zones of rebel activities.
  * 🏴‍☠️ **Straw Hat Grand Fleet**: Warm gold territories representing liberation and alliances.
* **Advanced SVG Glows**: Created using custom Gaussian-blur filters (`<feGaussianBlur>`) behind the map nodes.

### 3. The Cinematic Journey System
* **Voyage Progression Tracker**: Follows the historical voyages of key figures: **Luffy's Path of Liberation**, **Robin's Quest for the True History**, and **Law's Rocky Port Incident**.
* **Atmospheric Camera Choreography**: Smoothly pans, pans out for "traveling," and pans in to center target locations dynamically.
* **Weather Integration**: Syncs canvas weather effects to coordinate paths, matching the climate of the island (e.g., storms for Wano, volcanic embers for Marineford, calm mist for Ohara).

### 4. The Forbidden Codex
* **Redacted Archives**: Fullscreen dossier system containing censored reports (e.g. *The God Valley Incident*, *Ohara Buster Call*). Black redacted blocks decrypt character-by-character with a matrix glitch effect when hovered or clicked.
* **Poneglyph Decryption Matrix**: Interactive runic slab. Decrypt ancient glyphs to reveal fragments of the Void Century translation, completing the translation matrix.
* **Era Chronology**: Minimalist vertical timeline mapping history from 900 years ago to the modern Great Pirate Sinking.

### 5. Ambient Weather Canvas
* An interactive HTML5 Canvas background that renders complex particle systems dynamically matching the active state:
  * 🌊 **Calm**: Gentle floating dust and mist particles.
  * ⚡ **Storm**: High-velocity rain, wind drift, and lightning strikes.
  * 🌋 **Embers**: Red-hot volcanic ash floating upward.

---

## 🛠️ Technology Stack

* **Frontend Library**: [React 19](https://react.dev/)
* **Build Tooling**: [Vite 8](https://vite.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Animation**: [Framer Motion](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Core Canvas**: Custom Vanilla HTML5 Canvas 2D API for weather simulation.

---

## 📁 File Structure

```bash
project-03/
├── src/
│   ├── components/
│   │   ├── CanvasBackground.jsx   # Weather animation system (mist, storm, embers)
│   │   ├── CinematicJourney.jsx   # Visual pan/zoom voyage navigator & chapters
│   │   ├── ForbiddenCodex.jsx     # Redacted files, Poneglyph decrypter, Timeline
│   │   ├── LandingOverlay.jsx     # Atmospheric entrance screen
│   │   ├── NodeDossier.jsx        # Detail card sliding drawer
│   │   └── UniverseGraph.jsx      # SVG relationship web & Geopolitical overlays
│   ├── context/
│   │   └── NarrativeContext.jsx   # Global state provider (weather, active nodes, codex)
│   ├── data/
│   │   ├── loreData.js            # Lore dossiers, timeline files, and journeys
│   │   └── relationships.js       # Node coordinates and connecting lines
│   ├── App.jsx                    # Root app wrapper & Header HUD Controls
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Core design tokens, gradients, animations
├── public/                        # Static assets (film grain noise, custom assets)
├── eslint.config.js               # Code quality settings
├── package.json                   # Project packages and build scripts
└── vite.config.js                 # Dev server and build configurations
```

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
* `npm` or `yarn`

### Installation

1. Clone or copy the project files to your directory.
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Quality Control (Linter)

Ensure the codebase maintains 100% clean formatting and rules:
```bash
npm run lint
```

### Production Build

Compile and minify the project for production deployment:
```bash
npm run build
```
This builds optimized HTML, CSS, and JS bundles to the `dist/` directory.

---

## 🎨 Design System & Aesthetic Language

* **Color Palette**: 
  * Charcoal Black (`#040506`, `#090b0e`)
  * Ancient Parchment (`#e2dcd0`)
  * Weathered Gold (`#c5a880`)
  * Crimson (`#851c1c`, `#e53e3e`)
  * Ocean Fog / Steel (`#8a95a5`)
* **Typography**: Elegant Serif fonts for headers (`Cinematic/Mythology`) paired with monospaced text elements (`Classified/Investigation`).
* **Visual Filters**: Standardized `.noise-overlay` film grain overlay, glassmorphism (`backdrop-blur-xl`), and gold-hued glowing shadows.

---

## 🌐 Deployment

This application is ready to be hosted as a static site. The `dist/` folder generated from `npm run build` can be deployed directly to:
* **Vercel**: Run `vercel` or link your repository.
* **Netlify**: Drag and drop the `dist/` folder or link GitHub.
* **GitHub Pages**: Build and deploy using workflows or the `gh-pages` package.

---

*“History is not a line, but a series of overlapping tides. We do not choose the era we are born into, we only choose how we navigate the storm.”*
