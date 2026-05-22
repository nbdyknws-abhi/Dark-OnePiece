import { useEffect, useRef } from 'react';
import { useNarrative } from '../context/NarrativeContext';

// Comprehensive theme configuration mapping specific Node IDs and weather fallbacks
const THEME_CONFIG = {
  // --- CHARACTERS ---
  luffy: {
    bgColor: ['#221509', '#050302'], // Warm solar gold
    particleType: 'gold',
    particleCount: 65,
    rain: 'none',
    lightning: false,
    overlay: 'sunny-rays'
  },
  robin: {
    bgColor: ['#0d0c18', '#030205'], // Sad deep violet
    particleType: 'petal-violet',
    particleCount: 45,
    rain: 'light',
    lightning: false,
    overlay: 'none'
  },
  dragon: {
    bgColor: ['#06130d', '#020504'], // Wind-swept dark green
    particleType: 'dragon-wind',
    particleCount: 75,
    rain: 'normal',
    lightning: true,
    lightningColor: 'rgba(150, 255, 180, ', // Green storm lightning
    overlay: 'none'
  },
  sakazuki: {
    bgColor: ['#280802', '#050100'], // Boiling volcanic magma red
    particleType: 'sakazuki-magma',
    particleCount: 85,
    rain: 'none',
    lightning: false,
    overlay: 'magma'
  },
  shanks: {
    bgColor: ['#1c0c0e', '#050203'], // Red hair crimson aura
    particleType: 'haki',
    particleCount: 55,
    rain: 'none',
    lightning: true,
    lightningColor: 'rgba(255, 0, 50, ', // Crimson Haki lightning
    overlay: 'haki-shockwave'
  },
  roger: {
    bgColor: ['#251d08', '#060502'], // Antique Pirate King gold
    particleType: 'haki',
    particleCount: 65,
    rain: 'none',
    lightning: true,
    lightningColor: 'rgba(255, 215, 0, ', // Gold Haki lightning
    overlay: 'haki-shockwave'
  },
  whitebeard: {
    bgColor: ['#0f141d', '#030508'], // Marineford slate blue
    particleType: 'ash',
    particleCount: 55,
    rain: 'none',
    lightning: false,
    overlay: 'shockwave'
  },
  kaido: {
    bgColor: ['#120c1f', '#030208'], // Imperial violet dragon storm
    particleType: 'gold',
    particleCount: 80,
    rain: 'heavy',
    lightning: true,
    lightningColor: 'rgba(190, 150, 255, ', // Purple lightning
    overlay: 'none'
  },
  vegapunk: {
    bgColor: ['#031618', '#010506'], // Glowing cyber green/teal
    particleType: 'vegapunk-code',
    particleCount: 55,
    rain: 'none',
    lightning: false,
    overlay: 'scans'
  },
  saturn: {
    bgColor: ['#100412', '#030104'], // Unholy black-purple
    particleType: 'saturn-demonic',
    particleCount: 65,
    rain: 'none',
    lightning: false,
    overlay: 'vignette'
  },
  kuma: {
    bgColor: ['#090f1a', '#030509'], // Sorrowful deep blue snow
    particleType: 'kuma-snow',
    particleCount: 70,
    rain: 'none',
    lightning: false,
    overlay: 'none'
  },
  bonney: {
    bgColor: ['#28151f', '#060305'], // Sparkling pinkish-gold
    particleType: 'gold',
    particleCount: 60,
    rain: 'none',
    lightning: false,
    overlay: 'aurora'
  },
  koby: {
    bgColor: ['#09141c', '#03060a'], // Righteous Marine ice blue
    particleType: 'snow',
    particleCount: 55,
    rain: 'none',
    lightning: false,
    overlay: 'spotlight'
  },
  loki: {
    bgColor: ['#1b160e', '#050403'], // Nordic thunder gold-brown
    particleType: 'ash',
    particleCount: 65,
    rain: 'light',
    lightning: true,
    lightningColor: 'rgba(244, 212, 130, ', // Bronze lightning
    overlay: 'none'
  },
  blackbeard: {
    bgColor: ['#06040a', '#010102'], // Absolute void black hole
    particleType: 'gravity',
    particleCount: 75,
    rain: 'none',
    lightning: false,
    overlay: 'vignette'
  },
  garp: {
    bgColor: ['#0f131a', '#040508'], // Heavy Navy blue-grey
    particleType: 'ash',
    particleCount: 55,
    rain: 'heavy',
    lightning: false,
    overlay: 'shockwave'
  },
  kid: {
    bgColor: ['#1b0d07', '#050202'], // Metallic rusted copper/red
    particleType: 'metal',
    particleCount: 80,
    rain: 'none',
    lightning: false,
    overlay: 'none'
  },
  law: {
    bgColor: ['#0a141b', '#030608'], // Surgical sterile cyan/blue
    particleType: 'snow',
    particleCount: 60,
    rain: 'none',
    lightning: false,
    overlay: 'room'
  },

  // --- FACTIONS ---
  'straw-hats': {
    bgColor: ['#221609', '#050302'],
    particleType: 'gold',
    particleCount: 55,
    rain: 'none',
    lightning: false,
    overlay: 'sunny-rays'
  },
  'revolutionaries': {
    bgColor: ['#071610', '#020604'],
    particleType: 'dragon-wind',
    particleCount: 65,
    rain: 'none',
    lightning: false,
    overlay: 'none'
  },
  'marines': {
    bgColor: ['#0b121c', '#030508'],
    particleType: 'ash',
    particleCount: 50,
    rain: 'normal',
    lightning: false,
    overlay: 'searchlight'
  },
  'world-gov': {
    bgColor: ['#061a25', '#02070b'],
    particleType: 'cyber',
    particleCount: 55,
    rain: 'none',
    lightning: false,
    overlay: 'searchlight'
  },

  // --- LOCATIONS ---
  ohara: {
    bgColor: ['#1a0c0a', '#040202'], // Burning red Buster Call
    particleType: 'ash',
    particleCount: 85,
    rain: 'light',
    lightning: false,
    overlay: 'searchlight'
  },
  marineford: {
    bgColor: ['#0c141d', '#030508'],
    particleType: 'ash',
    particleCount: 65,
    rain: 'none',
    lightning: false,
    overlay: 'shockwave'
  },
  wano: {
    bgColor: ['#0f0d14', '#030204'], // Ink wash and sakura
    particleType: 'sakura',
    particleCount: 55,
    rain: 'none',
    lightning: false,
    overlay: 'vignette'
  },
  egghead: {
    bgColor: ['#04151b', '#010507'],
    particleType: 'cyber',
    particleCount: 65,
    rain: 'none',
    lightning: false,
    overlay: 'scans'
  },
  hachinosu: {
    bgColor: ['#0b1618', '#030607'],
    particleType: 'gravity', // mist & dark elements
    particleCount: 55,
    rain: 'none',
    lightning: false,
    overlay: 'none'
  },
  elbaph: {
    bgColor: ['#1f140e', '#060403'], // Warland giant sunset
    particleType: 'gold',
    particleCount: 70,
    rain: 'none',
    lightning: false,
    overlay: 'aurora'
  },
  laughtale: {
    bgColor: ['#281e0e', '#060402'],
    particleType: 'gold',
    particleCount: 75,
    rain: 'none',
    lightning: false,
    overlay: 'aurora'
  },

  // --- CONCEPTS ---
  'void-century': {
    bgColor: ['#09090c', '#020203'], // Forbidden darkness
    particleType: 'rune',
    particleCount: 50,
    rain: 'none',
    lightning: false,
    overlay: 'vignette'
  },
  poneglyphs: {
    bgColor: ['#0b1a20', '#030709'], // Ancient stone cyan
    particleType: 'rune',
    particleCount: 45,
    rain: 'none',
    lightning: false,
    overlay: 'none'
  },
  'summit-war': {
    bgColor: ['#200c0a', '#040202'],
    particleType: 'ash',
    particleCount: 85,
    rain: 'none',
    lightning: true,
    lightningColor: 'rgba(255, 100, 50, ',
    overlay: 'shockwave'
  },

  // --- FALLBACK WEATHER TYPES ---
  calm: {
    bgColor: ['#0a0f18', '#05070a'],
    particleType: 'calm',
    particleCount: 40,
    rain: 'none',
    lightning: false,
    overlay: 'none'
  },
  storm: {
    bgColor: ['#04070a', '#010203'],
    particleType: 'calm',
    particleCount: 85,
    rain: 'heavy',
    lightning: false,
    overlay: 'none'
  },
  lightning: {
    bgColor: ['#04070a', '#010203'],
    particleType: 'calm',
    particleCount: 85,
    rain: 'heavy',
    lightning: true,
    lightningColor: 'rgba(180, 220, 240, ',
    overlay: 'none'
  },
  snow: {
    bgColor: ['#10141c', '#05070a'],
    particleType: 'snow',
    particleCount: 65,
    rain: 'none',
    lightning: false,
    overlay: 'none'
  },
  ash: {
    bgColor: ['#141210', '#040404'],
    particleType: 'ash',
    particleCount: 55,
    rain: 'none',
    lightning: false,
    overlay: 'none'
  },
  cyber: {
    bgColor: ['#040a12', '#010204'],
    particleType: 'cyber',
    particleCount: 60,
    rain: 'none',
    lightning: false,
    overlay: 'scans'
  },
  ink: {
    bgColor: ['#0b0d10', '#020304'],
    particleType: 'ink',
    particleCount: 50,
    rain: 'none',
    lightning: false,
    overlay: 'vignette'
  },
  'cold-rain': {
    bgColor: ['#0d1117', '#040608'],
    particleType: 'snow',
    particleCount: 45,
    rain: 'normal',
    lightning: false,
    overlay: 'spotlight'
  },
  fog: {
    bgColor: ['#0c121b', '#05080c'],
    particleType: 'calm',
    particleCount: 50,
    rain: 'none',
    lightning: false,
    overlay: 'none'
  },
  'east-blue': {
    bgColor: ['#1c1610', '#060504'],
    particleType: 'gold',
    particleCount: 55,
    rain: 'none',
    lightning: false,
    overlay: 'none'
  }
};

export default function CanvasBackground() {
  const canvasRef = useRef(null);
  const { weatherEffect } = useNarrative();
  const weatherRef = useRef(weatherEffect);

  // Sync ref to avoid re-initializing the animation loop when weather changes
  useEffect(() => {
    weatherRef.current = weatherEffect;
  }, [weatherEffect]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle buffers
    const particles = [];
    const fogLayers = [];
    const rainDrops = [];
    let flashOpacity = 0;
    let flashTimer = 0;

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize a single particle dynamically based on theme/type
    const initParticle = (p = {}, type, initial = false) => {
      let size = Math.random() * 2.5 + 0.5;
      let speedY = -(Math.random() * 0.8 + 0.3);
      let speedX = Math.random() * 0.4 - 0.2;
      let opacity = Math.random() * 0.7 + 0.1;
      let color = 'rgba(212, 175, 55, '; // default gold
      let rotation = Math.random() * Math.PI * 2;
      let rotationSpeed = Math.random() * 0.02 - 0.01;
      let char = ''; // For text/runes/cyber particles

      if (type === 'sakura') {
        size = Math.random() * 5 + 3; // larger petals
        speedY = Math.random() * 0.7 + 0.35; // falls down
        speedX = Math.random() * 0.5 - 0.15; // drifts rightward
        color = 'rgba(255, 182, 193, '; // soft pink
      } else if (type === 'petal-violet') {
        size = Math.random() * 4.5 + 2.5;
        speedY = Math.random() * 0.6 + 0.3;
        speedX = Math.random() * 0.4 - 0.2;
        color = 'rgba(186, 85, 211, '; // purple petals
      } else if (type === 'snow') {
        size = Math.random() * 3.0 + 1.0;
        speedY = Math.random() * 0.6 + 0.35;
        speedX = Math.random() * 0.4 - 0.2;
        color = 'rgba(230, 243, 255, ';
      } else if (type === 'kuma-snow') {
        const isBible = Math.random() > 0.85;
        size = isBible ? Math.random() * 5 + 3 : Math.random() * 2.5 + 1.0;
        speedY = isBible ? -(Math.random() * 0.4 + 0.1) : Math.random() * 0.65 + 0.3;
        speedX = Math.random() * 0.4 - 0.2;
        color = isBible ? 'rgba(250, 215, 90, ' : 'rgba(230, 243, 255, ';
        char = isBible ? '⭐' : '';
      } else if (type === 'ash') {
        size = Math.random() * 3.0 + 0.8;
        speedY = Math.random() * 0.5 + 0.2;
        speedX = Math.random() * 0.6 - 0.3;
        color = Math.random() > 0.45 ? 'rgba(115, 115, 115, ' : 'rgba(230, 95, 35, ';
      } else if (type === 'sakazuki-magma') {
        size = Math.random() * 4.0 + 1.2;
        speedY = Math.random() * 0.75 + 0.4; // falls faster
        speedX = Math.random() * 0.4 - 0.2;
        color = Math.random() > 0.3 ? 'rgba(255, 65, 0, ' : 'rgba(255, 130, 0, '; // glowing magma
      } else if (type === 'cyber') {
        size = Math.random() * 2.2 + 0.5;
        speedY = -(Math.random() * 1.5 + 0.5);
        speedX = 0;
        color = Math.random() > 0.5 ? 'rgba(0, 240, 255, ' : 'rgba(0, 100, 240, ';
      } else if (type === 'vegapunk-code') {
        size = Math.random() * 9 + 8; // Font size
        speedY = Math.random() * 1.2 + 0.6; // Code falling down
        speedX = 0;
        color = 'rgba(0, 255, 190, ';
        char = String.fromCharCode(48 + Math.floor(Math.random() * 10)); // 0-9 binary
      } else if (type === 'ink') {
        size = Math.random() * 13 + 4;
        speedY = Math.random() * 0.22 + 0.05;
        speedX = Math.random() * 0.08 - 0.04;
        color = 'rgba(12, 12, 18, ';
      } else if (type === 'saturn-demonic') {
        size = Math.random() * 11 + 6;
        speedY = -(Math.random() * 0.3 + 0.1);
        speedX = Math.random() * 0.4 - 0.2;
        color = Math.random() > 0.7 ? 'rgba(160, 0, 15, ' : 'rgba(15, 15, 20, '; // blood and darkness
        char = Math.random() > 0.9 ? '☠️' : '';
      } else if (type === 'rune') {
        size = Math.random() * 11 + 8;
        speedY = -(Math.random() * 0.45 + 0.15);
        speedX = Math.random() * 0.3 - 0.15;
        color = 'rgba(225, 185, 105, ';
        const glyphs = '᚛᚜ᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁ';
        char = glyphs[Math.floor(Math.random() * glyphs.length)];
      } else if (type === 'gravity') {
        size = Math.random() * 14 + 7;
        speedY = Math.random() * 0.45 + 0.2; // sink down
        speedX = Math.random() * 0.3 - 0.15;
        color = Math.random() > 0.55 ? 'rgba(10, 5, 22, ' : 'rgba(85, 0, 125, '; // dark purple void
      } else if (type === 'haki') {
        size = Math.random() * 2.8 + 1;
        speedY = -(Math.random() * 1.1 + 0.45);
        speedX = Math.random() * 0.8 - 0.4;
        color = Math.random() > 0.6 ? 'rgba(0, 0, 0, ' : 'rgba(210, 0, 0, '; // Red and black Haki sparks
      } else if (type === 'dragon-wind') {
        size = Math.random() * 2.5 + 0.5;
        speedY = Math.random() * 0.4 - 0.2;
        speedX = -(Math.random() * 2.6 + 1.2); // blowing fast leftwards
        color = Math.random() > 0.5 ? 'rgba(40, 145, 90, ' : 'rgba(140, 190, 145, ';
      } else if (type === 'metal') {
        size = Math.random() * 3.8 + 1.8;
        speedY = (Math.random() * 0.6 - 0.3);
        speedX = (Math.random() * 0.6 - 0.3);
        color = Math.random() > 0.5 ? 'rgba(195, 195, 195, ' : 'rgba(185, 110, 50, '; // Steel/Copper
      } else if (type === 'calm') {
        size = Math.random() * 2.0 + 0.5;
        speedY = -(Math.random() * 0.35 + 0.1);
        speedX = Math.random() * 0.3 - 0.15;
        color = 'rgba(70, 160, 205, ';
      } else if (type === 'gold') {
        size = Math.random() * 2.5 + 0.5;
        speedY = -(Math.random() * 0.8 + 0.3);
        speedX = Math.random() * 0.4 - 0.2;
        color = Math.random() > 0.3 ? 'rgba(215, 175, 50, ' : 'rgba(140, 0, 0, ';
      }

      p.x = Math.random() * width;
      p.y = initial ? Math.random() * height : (speedY > 0 ? -15 : height + 15);
      
      // If moving horizontal primarily
      if (Math.abs(speedX) > 1.0 && !initial) {
        p.x = speedX > 0 ? -15 : width + 15;
        p.y = Math.random() * height;
      }

      p.size = size;
      p.speedY = speedY;
      p.speedX = speedX;
      p.opacity = opacity;
      p.color = color;
      p.rotation = rotation;
      p.rotationSpeed = rotationSpeed;
      p.char = char;
      p.type = type;
      p.wobble = Math.random() * 100;
      p.wobbleSpeed = Math.random() * 0.02 + 0.005;

      return p;
    };

    // Create Fog Clouds
    const createFog = (initial = false) => {
      const size = Math.random() * 240 + 160;
      return {
        x: initial ? Math.random() * (width + size * 2) - size : -size,
        y: Math.random() * height,
        size: size,
        speedX: Math.random() * 0.2 + 0.05,
        speedY: (Math.random() * 0.06 - 0.03),
        opacity: Math.random() * 0.03 + 0.006,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.0004 - 0.0002)
      };
    };

    // Create Rain Drop
    const createRain = (intensity) => {
      const weather = weatherRef.current;
      const isCold = weather === 'cold-rain' || weather === 'law' || weather === 'koby' || weather === 'kuma';
      return {
        x: Math.random() * (width + 200) - 200,
        y: -15,
        length: intensity === 'heavy' ? Math.random() * 26 + 18 : Math.random() * 20 + 10,
        speedY: intensity === 'heavy' ? Math.random() * 6 + 16 : Math.random() * 5 + 10,
        speedX: isCold ? -0.4 : -2.2, // cold rain falls straighter
        opacity: Math.random() * 0.2 + 0.05
      };
    };

    // Initialize particle buffers
    const initialTheme = THEME_CONFIG[weatherRef.current] || THEME_CONFIG['calm'];
    for (let i = 0; i < initialTheme.particleCount; i++) {
      particles.push(initParticle({}, initialTheme.particleType, true));
    }
    for (let i = 0; i < 12; i++) {
      fogLayers.push(createFog(true));
    }

    // Canvas animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const currentWeather = weatherRef.current;
      const theme = THEME_CONFIG[currentWeather] || THEME_CONFIG['calm'];
      const targetType = theme.particleType;
      const targetCount = theme.particleCount;

      // Draw background depth gradients
      const bgGrad = ctx.createRadialGradient(
        width / 2, 
        height / 2, 
        10, 
        width / 2, 
        height / 2, 
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, theme.bgColor[0]);
      bgGrad.addColorStop(1, theme.bgColor[1]);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Handle Lightning Flash triggers
      if (theme.lightning) {
        flashTimer--;
        if (flashTimer <= 0) {
          flashOpacity = Math.random() > 0.65 ? 0.32 : 0;
          flashTimer = Math.random() * 180 + 120; // Flash every 2-3 seconds
        }
        if (flashOpacity > 0) {
          const lColor = theme.lightningColor || 'rgba(180, 220, 240, ';
          ctx.fillStyle = lColor + flashOpacity + ')';
          ctx.fillRect(0, 0, width, height);
          flashOpacity -= 0.015; // Fade out
        }
      } else {
        flashOpacity = 0;
      }

      // 1. Draw Rain (if the active theme triggers rain)
      if (theme.rain !== 'none') {
        const dropSpawnRate = theme.rain === 'heavy' ? 12 : (theme.rain === 'light' ? 2 : 5);
        for (let i = 0; i < dropSpawnRate; i++) {
          if (rainDrops.length < 250) {
            rainDrops.push(createRain(theme.rain));
          }
        }

        ctx.strokeStyle = 'rgba(174, 194, 224, 0.4)';
        ctx.lineWidth = 1;
        for (let i = rainDrops.length - 1; i >= 0; i--) {
          const drop = rainDrops[i];
          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x + drop.speedX * (drop.length / drop.speedY), drop.y + drop.length);
          ctx.stroke();

          // Update position
          drop.x += drop.speedX;
          drop.y += drop.speedY;

          // Remove offscreen
          if (drop.y > height) {
            rainDrops.splice(i, 1);
          }
        }
      } else {
        // Fade out active rain drops slowly if weather changes
        if (rainDrops.length > 0) {
          ctx.strokeStyle = 'rgba(174, 194, 224, 0.2)';
          ctx.lineWidth = 0.8;
          for (let i = rainDrops.length - 1; i >= 0; i--) {
            const drop = rainDrops[i];
            ctx.beginPath();
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x + drop.speedX, drop.y + drop.length);
            ctx.stroke();
            drop.x += drop.speedX;
            drop.y += drop.speedY;
            if (drop.y > height) rainDrops.splice(i, 1);
          }
        }
      }

      // 2. Draw Embers / Theme Particles
      if (particles.length < targetCount && Math.random() > 0.3) {
        particles.push(initParticle({}, targetType, false));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.wobble += p.wobbleSpeed;
        p.rotation += p.rotationSpeed;

        // Move particle
        const wobbleFactor = (p.type === 'cyber' || p.type === 'vegapunk-code') ? 0 : Math.sin(p.wobble) * 0.25;
        p.x += p.speedX + wobbleFactor;
        p.y += p.speedY;

        // Draw particle based on its specific type
        ctx.save();
        if (p.type === 'sakura' || p.type === 'petal-violet') {
          // Draw a rotating organic petal shape
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation + p.wobble * 0.1);
          ctx.fillStyle = p.color + p.opacity + ')';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.char) {
          // Draw character symbol (rune, cyber code digit, kuma Bible star)
          ctx.font = `${p.size}px monospace`;
          ctx.fillStyle = p.color + p.opacity + ')';
          ctx.fillText(p.char, p.x, p.y);
        } else {
          // Draw glowing soft circle
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
          glow.addColorStop(0, p.color + p.opacity + ')');
          glow.addColorStop(0.45, p.color + (p.opacity * 0.3) + ')');
          glow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // Recycle/remove offscreen based on direction of travel
        const isOffscreen = p.speedY > 0 
          ? (p.y > height + 15) 
          : (p.y < -15) || (p.x < -15 || p.x > width + 15);
        
        if (isOffscreen) {
          if (particles.length > targetCount) {
            particles.splice(i, 1);
          } else {
            // Recycle with the CURRENT weather's targetType
            initParticle(p, targetType, false);
          }
        }
      }

      // 3. Draw Ocean Fog Layer
      const maxFog = (currentWeather === 'fog' || targetType === 'gravity') ? 22 : 10;
      if (fogLayers.length < maxFog) {
        fogLayers.push(createFog());
      }

      for (let i = fogLayers.length - 1; i >= 0; i--) {
        const f = fogLayers[i];
        f.x += f.speedX;
        f.y += f.speedY;
        f.angle += f.rotationSpeed;

        if (currentWeather === 'fog' || targetType === 'gravity') {
          f.opacity = f.opacity * 0.98 + 0.05 * 0.02; // Thicken
          f.speedX = f.speedX * 0.98 + 0.08 * 0.02; // Slow down
        } else if (currentWeather === 'storm') {
          f.speedX = f.speedX * 0.98 + 1.2 * 0.02; // Wind acceleration
        } else {
          f.opacity = f.opacity * 0.98 + (Math.random() * 0.025 + 0.005) * 0.02; // Thinner
          f.speedX = f.speedX * 0.98 + (Math.random() * 0.2 + 0.05) * 0.02;
        }

        // Draw blurry cloud
        const fGlow = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size);
        
        // Fog color shift based on active theme
        let fColor = '165, 178, 195'; // cool ocean blue-grey
        if (currentWeather === 'storm') fColor = '95, 105, 120';
        else if (currentWeather === 'calm') fColor = '212, 190, 160';
        else if (theme.particleType === 'gold') fColor = '235, 185, 140';
        else if (theme.rain !== 'none') fColor = '110, 125, 140';
        else if (theme.particleType === 'ash') fColor = '85, 85, 90';
        else if (theme.particleType === 'cyber') fColor = '30, 80, 110';
        else if (theme.particleType === 'snow') fColor = '210, 220, 235';

        fGlow.addColorStop(0, `rgba(${fColor}, ${f.opacity})`);
        fGlow.addColorStop(0.6, `rgba(${fColor}, ${f.opacity * 0.35})`);
        fGlow.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = fGlow;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fill();

        // Recycle when out of screen bounds
        if (f.x - f.size > width) {
          if (fogLayers.length > maxFog) {
            fogLayers.splice(i, 1);
          } else {
            fogLayers[i] = createFog();
          }
        }
      }

      // 4. Custom theme overlays
      if (theme.overlay === 'scans') {
        // Neon scanline
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
        ctx.lineWidth = 1.5;
        const scanY = (Date.now() / 15) % height;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(width, scanY);
        ctx.stroke();

        // Grid lines
        ctx.fillStyle = 'rgba(0, 240, 255, 0.008)';
        for (let x = width * 0.1; x < width; x += width * 0.2) {
          ctx.fillRect(x, 0, 1.5, height);
        }
      } else if (theme.overlay === 'vignette') {
        // Deep vignette black ink border
        const vigGrad = ctx.createRadialGradient(
          width / 2, 
          height / 2, 
          Math.min(width, height) / 3, 
          width / 2, 
          height / 2, 
          Math.max(width, height) / 1.5
        );
        vigGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        vigGrad.addColorStop(1, 'rgba(2, 1, 4, 0.65)');
        ctx.fillStyle = vigGrad;
        ctx.fillRect(0, 0, width, height);
      } else if (theme.overlay === 'spotlight') {
        // overhead white cone of light
        const spotGrad = ctx.createLinearGradient(width / 2, 0, width / 2, height);
        spotGrad.addColorStop(0, 'rgba(255, 255, 255, 0.04)');
        spotGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.01)');
        spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.moveTo(width / 2 - 120, 0);
        ctx.lineTo(width / 2 + 120, 0);
        ctx.lineTo(width / 2 + 300, height);
        ctx.lineTo(width / 2 - 300, height);
        ctx.closePath();
        ctx.fill();
      } else if (theme.overlay === 'searchlight') {
        // Two sweeping surveillance searchlights
        const sweepAngle1 = Math.sin(Date.now() / 3000) * 0.4 + Math.PI / 2;
        const sweepAngle2 = Math.cos(Date.now() / 4000) * 0.35 + Math.PI / 2;
        
        // Light 1 (left side)
        const x1 = width * 0.25;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
        ctx.beginPath();
        ctx.moveTo(x1, 0);
        ctx.lineTo(x1 + Math.cos(sweepAngle1 - 0.08) * height, Math.sin(sweepAngle1 - 0.08) * height);
        ctx.lineTo(x1 + Math.cos(sweepAngle1 + 0.08) * height, Math.sin(sweepAngle1 + 0.08) * height);
        ctx.closePath();
        ctx.fill();

        // Light 2 (right side)
        const x2 = width * 0.75;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.beginPath();
        ctx.moveTo(x2, 0);
        ctx.lineTo(x2 + Math.cos(sweepAngle2 - 0.08) * height, Math.sin(sweepAngle2 - 0.08) * height);
        ctx.lineTo(x2 + Math.cos(sweepAngle2 + 0.08) * height, Math.sin(sweepAngle2 + 0.08) * height);
        ctx.closePath();
        ctx.fill();
      } else if (theme.overlay === 'room') {
        // Law's cyan expanding surgical ROOM dome
        const roomPulse = (Date.now() / 2500) % 2;
        const maxRadius = Math.min(width, height) * 0.45;
        const currentRadius = roomPulse < 1.6 ? (roomPulse / 1.6) * maxRadius : maxRadius;
        const roomOpacity = roomPulse < 1.6 ? 0.07 * (1 - (roomPulse / 1.6)) : 0;
        
        if (roomOpacity > 0) {
          ctx.strokeStyle = `rgba(0, 240, 255, ${roomOpacity})`;
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, currentRadius, 0, Math.PI * 2);
          ctx.stroke();

          // Grid lines inside the room dome
          ctx.strokeStyle = `rgba(0, 240, 255, ${roomOpacity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(width / 2 - currentRadius, height / 2);
          ctx.lineTo(width / 2 + currentRadius, height / 2);
          ctx.moveTo(width / 2, height / 2 - currentRadius);
          ctx.lineTo(width / 2, height / 2 + currentRadius);
          ctx.stroke();
        }
      } else if (theme.overlay === 'magma') {
        // Boiling volcanic lava glow rising from the bottom
        const magmaPulse = Math.sin(Date.now() / 1500) * 0.15 + 0.85;
        const magmaGrad = ctx.createLinearGradient(0, height, 0, height - 200);
        magmaGrad.addColorStop(0, `rgba(230, 40, 10, ${0.18 * magmaPulse})`);
        magmaGrad.addColorStop(0.5, `rgba(180, 20, 0, ${0.08 * magmaPulse})`);
        magmaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = magmaGrad;
        ctx.fillRect(0, height - 200, width, 200);
      } else if (theme.overlay === 'shockwave') {
        // Whitebeard's Gura Gura shockwave rings
        const shockPulse = (Date.now() / 3500) % 2;
        const maxShockRadius = Math.max(width, height) * 0.7;
        const curShockRadius = shockPulse < 1.4 ? (shockPulse / 1.4) * maxShockRadius : maxShockRadius;
        const shockOpacity = shockPulse < 1.4 ? 0.08 * (1 - (shockPulse / 1.4)) : 0;
        
        if (shockOpacity > 0) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${shockOpacity})`;
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, curShockRadius, 0, Math.PI * 2);
          ctx.stroke();

          // Crack rays
          ctx.strokeStyle = `rgba(255, 255, 255, ${shockOpacity * 0.8})`;
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            const crackAngle = (i * Math.PI / 2) + Math.sin(Date.now() / 500) * 0.2;
            const sx = width / 2 + Math.cos(crackAngle) * curShockRadius;
            const sy = height / 2 + Math.sin(crackAngle) * curShockRadius;
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx + Math.cos(crackAngle) * 60, sy + Math.sin(crackAngle) * 60);
          }
          ctx.stroke();
        }
      } else if (theme.overlay === 'aurora') {
        // Celestial auroras wavy paths
        const auroraTime = Date.now() / 2200;
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        for (let i = 0; i < 2; i++) {
          const offset = i * 120;
          const aurGrad = ctx.createLinearGradient(0, 0, 0, height * 0.45);
          const r = i === 0 ? 255 : 212;
          const g = i === 0 ? 120 : 175;
          const b = i === 0 ? 30 : 55;
          aurGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.06)`);
          aurGrad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.02)`);
          aurGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = aurGrad;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          for (let x = 0; x <= width; x += 60) {
            const y = Math.sin((x / 200) + auroraTime + offset) * 25 + height * 0.15;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(width, 0);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      } else if (theme.overlay === 'haki-shockwave') {
        // Red Conqueror's Haki lightning crackles
        const hakiPulse = (Date.now() / 4000) % 2;
        if (hakiPulse < 0.65) {
          const borderGrad = ctx.createRadialGradient(
            width / 2, 
            height / 2, 
            width / 3, 
            width / 2, 
            height / 2, 
            Math.max(width, height) / 2
          );
          const intensity = 0.065 * (1 - (hakiPulse / 0.65));
          borderGrad.addColorStop(0, 'rgba(0,0,0,0)');
          borderGrad.addColorStop(1, `rgba(200, 0, 10, ${intensity})`);
          ctx.fillStyle = borderGrad;
          ctx.fillRect(0, 0, width, height);
          
          ctx.strokeStyle = Math.random() > 0.5 ? 'rgba(230, 0, 20, 0.45)' : 'rgba(0, 0, 0, 0.65)';
          ctx.lineWidth = Math.random() * 3 + 1;
          ctx.beginPath();
          let curX = width / 2 + (Math.random() * 200 - 100);
          let curY = height / 2 + (Math.random() * 200 - 100);
          ctx.moveTo(curX, curY);
          for (let j = 0; j < 5; j++) {
            curX += Math.random() * 80 - 40;
            curY += Math.random() * 80 - 40;
            ctx.lineTo(curX, curY);
          }
          ctx.stroke();
        }
      } else if (theme.overlay === 'sunny-rays') {
        // Rotating sunbeams
        const time = Date.now() / 9000;
        ctx.fillStyle = 'rgba(255, 215, 0, 0.015)';
        for (let i = 0; i < 4; i++) {
          const angle = time + (i * Math.PI / 2);
          ctx.beginPath();
          ctx.moveTo(width / 2, height / 2);
          ctx.arc(width / 2, height / 2, Math.max(width, height), angle - 0.15, angle + 0.15);
          ctx.closePath();
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    // Start loop
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
