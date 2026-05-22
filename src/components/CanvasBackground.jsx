import { useEffect, useRef } from 'react';
import { useNarrative } from '../context/NarrativeContext';

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

    // Particle definitions
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

    // Create Embers / Particles based on weather
    const createEmber = (initial = false) => {
      const weather = weatherRef.current;
      let size = Math.random() * 2.5 + 0.5;
      let speedY = -(Math.random() * 0.8 + 0.3);
      let speedX = Math.random() * 0.4 - 0.2;
      let opacity = Math.random() * 0.7 + 0.1;
      let color = Math.random() > 0.3 ? 'rgba(212, 175, 55, ' : 'rgba(139, 0, 0, '; // Gold or Crimson

      if (weather === 'snow') {
        size = Math.random() * 2.0 + 0.5;
        speedY = Math.random() * 0.5 + 0.2; // drift down
        speedX = Math.random() * 0.4 - 0.2;
        color = 'rgba(230, 240, 255, ';
      } else if (weather === 'ash') {
        size = Math.random() * 2.5 + 0.5;
        speedY = Math.random() * 0.4 + 0.15; // drift down slowly
        speedX = Math.random() * 0.5 - 0.25;
        color = Math.random() > 0.45 ? 'rgba(120, 120, 120, ' : 'rgba(220, 90, 40, ';
      } else if (weather === 'cyber') {
        size = Math.random() * 2.2 + 0.5;
        speedY = -(Math.random() * 1.5 + 0.5); // fast up
        speedX = 0;
        color = Math.random() > 0.5 ? 'rgba(0, 240, 255, ' : 'rgba(0, 100, 240, ';
      } else if (weather === 'ink') {
        size = Math.random() * 12 + 4; // large droplets
        speedY = Math.random() * 0.25 + 0.05; // slowly wash down
        speedX = Math.random() * 0.08 - 0.04;
        color = 'rgba(10, 10, 15, ';
      } else if (weather === 'east-blue') {
        size = Math.random() * 2.0 + 0.5;
        speedY = -(Math.random() * 0.4 + 0.15); // gentle up
        speedX = Math.random() * 0.3 - 0.15;
        color = 'rgba(244, 212, 130, ';
      }

      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : (speedY > 0 ? -10 : height + 10),
        size,
        speedY,
        speedX,
        opacity,
        color,
        wobble: Math.random() * 100,
        wobbleSpeed: Math.random() * 0.02 + 0.005
      };
    };

    // Create Fog Clouds
    const createFog = (initial = false) => {
      const size = Math.random() * 200 + 150;
      return {
        x: initial ? Math.random() * (width + size * 2) - size : -size,
        y: Math.random() * height,
        size: size,
        speedX: Math.random() * 0.3 + 0.1,
        speedY: (Math.random() * 0.1 - 0.05),
        opacity: Math.random() * 0.04 + 0.01,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.0005 - 0.00025)
      };
    };

    // Create Rain Drop
    const createRain = () => {
      const weather = weatherRef.current;
      return {
        x: Math.random() * (width + 200) - 200,
        y: -10,
        length: Math.random() * 25 + 15,
        speedY: Math.random() * 15 + 12,
        speedX: weather === 'cold-rain' ? -0.2 : -2, // straighter rain for cold rain
        opacity: Math.random() * 0.2 + 0.05
      };
    };

    // Initialize particles
    for (let i = 0; i < 40; i++) particles.push(createEmber(true));
    for (let i = 0; i < 15; i++) fogLayers.push(createFog(true));

    // Canvas animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const currentWeather = weatherRef.current;
      const targetCount = currentWeather === 'storm' || currentWeather === 'lightning' ? 70 : 40;

      // Draw dark background depth gradients
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, Math.max(width, height));
      if (currentWeather === 'calm') {
        bgGrad.addColorStop(0, '#0a0f18'); // deep oceanic blue center
        bgGrad.addColorStop(1, '#05070a'); // charcoal black
      } else if (currentWeather === 'storm' || currentWeather === 'lightning') {
        bgGrad.addColorStop(0, '#04070a'); // darker charcoal grey
        bgGrad.addColorStop(1, '#010203');
      } else if (currentWeather === 'fog') {
        bgGrad.addColorStop(0, '#0c121b'); // murky oceanic teal
        bgGrad.addColorStop(1, '#05080c');
      } else if (currentWeather === 'east-blue') {
        bgGrad.addColorStop(0, '#1c1610'); // warm gold sunset center
        bgGrad.addColorStop(1, '#060504'); // deep warm charcoal
      } else if (currentWeather === 'cold-rain') {
        bgGrad.addColorStop(0, '#0d1117'); // slate blue-grey center
        bgGrad.addColorStop(1, '#040608');
      } else if (currentWeather === 'ash') {
        bgGrad.addColorStop(0, '#141210'); // burnt ash orange/grey
        bgGrad.addColorStop(1, '#040404');
      } else if (currentWeather === 'ink') {
        bgGrad.addColorStop(0, '#0b0d10'); // moonlit monochrome
        bgGrad.addColorStop(1, '#020304');
      } else if (currentWeather === 'cyber') {
        bgGrad.addColorStop(0, '#040a12'); // high tech cyan center
        bgGrad.addColorStop(1, '#010204');
      } else if (currentWeather === 'snow') {
        bgGrad.addColorStop(0, '#10141c'); // frozen slate center
        bgGrad.addColorStop(1, '#05070a');
      } else {
        bgGrad.addColorStop(0, '#0b0f16');
        bgGrad.addColorStop(1, '#06080b');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Handle Lightning Flash triggers
      if (currentWeather === 'lightning') {
        flashTimer--;
        if (flashTimer <= 0) {
          flashOpacity = Math.random() > 0.7 ? 0.35 : 0;
          flashTimer = Math.random() * 180 + 120; // Flash every 2-3 seconds
        }
        if (flashOpacity > 0) {
          ctx.fillStyle = `rgba(180, 220, 240, ${flashOpacity})`;
          ctx.fillRect(0, 0, width, height);
          flashOpacity -= 0.02; // Fade out rapidly
        }
      } else {
        flashOpacity = 0;
      }

      // 1. Draw Rain (if storm, rain, lightning, or cold-rain is active)
      if (currentWeather === 'rain' || currentWeather === 'storm' || currentWeather === 'lightning' || currentWeather === 'cold-rain') {
        const dropSpawnRate = currentWeather === 'storm' || currentWeather === 'lightning' ? 12 : (currentWeather === 'cold-rain' ? 3 : 5);
        for (let i = 0; i < dropSpawnRate; i++) {
          if (rainDrops.length < 250) {
            rainDrops.push(createRain());
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

          // Update rain
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
          ctx.lineWidth = 1;
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

      // 2. Draw Embers / Particles
      // Manage particle counts dynamically
      if (particles.length < targetCount && Math.random() > 0.3) {
        particles.push(createEmber());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.wobble += p.wobbleSpeed;

        // Dynamic morphing of velocities and colors to match weather changes
        const weather = currentWeather;
        if (weather === 'snow') {
          p.speedY = p.speedY * 0.94 + (Math.random() * 0.5 + 0.2) * 0.06;
          p.speedX = p.speedX * 0.94 + (Math.random() * 0.4 - 0.2) * 0.06;
          p.color = 'rgba(230, 240, 255, ';
        } else if (weather === 'ash') {
          p.speedY = p.speedY * 0.94 + (Math.random() * 0.4 + 0.15) * 0.06;
          p.speedX = p.speedX * 0.94 + (Math.random() * 0.5 - 0.25) * 0.06;
          if (!p.color.startsWith('rgba(120,') && !p.color.startsWith('rgba(220,')) {
            p.color = Math.random() > 0.45 ? 'rgba(120, 120, 120, ' : 'rgba(220, 90, 40, ';
          }
        } else if (weather === 'cyber') {
          p.speedY = p.speedY * 0.94 + -(Math.random() * 1.5 + 0.5) * 0.06;
          p.speedX = 0;
          if (!p.color.startsWith('rgba(0,')) {
            p.color = Math.random() > 0.5 ? 'rgba(0, 240, 255, ' : 'rgba(0, 100, 240, ';
          }
        } else if (weather === 'ink') {
          p.speedY = p.speedY * 0.94 + (Math.random() * 0.25 + 0.05) * 0.06;
          p.speedX = p.speedX * 0.94 + (Math.random() * 0.08 - 0.04) * 0.06;
          p.color = 'rgba(10, 10, 15, ';
          if (p.size < 4) p.size = p.size * 0.95 + (Math.random() * 12 + 4) * 0.05;
        } else if (weather === 'east-blue') {
          p.speedY = p.speedY * 0.94 + -(Math.random() * 0.4 + 0.15) * 0.06;
          p.speedX = p.speedX * 0.94 + (Math.random() * 0.3 - 0.15) * 0.06;
          p.color = 'rgba(244, 212, 130, ';
        } else if (weather === 'storm') {
          p.speedY = p.speedY * 0.94 + -(Math.random() * 1.8 + 0.8) * 0.06;
          p.speedX = p.speedX * 0.94 - 0.6 * 0.06; // Wind blow
        } else {
          // calm or others
          p.speedY = p.speedY * 0.94 + -(Math.random() * 0.8 + 0.3) * 0.06;
          p.speedX = p.speedX * 0.94 + (Math.random() * 0.4 - 0.2) * 0.06;
          if (!p.color.startsWith('rgba(212,') && !p.color.startsWith('rgba(139,')) {
            p.color = Math.random() > 0.3 ? 'rgba(212, 175, 55, ' : 'rgba(139, 0, 0, ';
          }
        }

        p.x += p.speedX + Math.sin(p.wobble) * 0.25;
        p.y += p.speedY;

        // Draw particle
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        glow.addColorStop(0, p.color + p.opacity + ')');
        glow.addColorStop(0.5, p.color + (p.opacity * 0.3) + ')');
        glow.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Recycle/remove offscreen based on direction of travel
        const isOffscreen = p.speedY > 0 ? (p.y > height + 10) : (p.y < -10) || (p.x < -10 || p.x > width + 10);
        if (isOffscreen) {
          if (particles.length > targetCount) {
            particles.splice(i, 1);
          } else {
            particles[i] = createEmber();
          }
        }
      }

      // 3. Draw Ocean Fog Layer
      const maxFog = currentWeather === 'fog' ? 25 : 12;
      if (fogLayers.length < maxFog) {
        fogLayers.push(createFog());
      }

      for (let i = fogLayers.length - 1; i >= 0; i--) {
        const f = fogLayers[i];
        f.x += f.speedX;
        f.y += f.speedY;
        f.angle += f.rotationSpeed;

        if (currentWeather === 'fog') {
          f.opacity = f.opacity * 0.98 + 0.06 * 0.02; // thicken
          f.speedX = f.speedX * 0.98 + 0.08 * 0.02; // slow down
        } else if (currentWeather === 'storm') {
          f.speedX = f.speedX * 0.98 + 1.2 * 0.02; // accelerate wind
        } else {
          f.opacity = f.opacity * 0.98 + (Math.random() * 0.03 + 0.01) * 0.02; // ease back
          f.speedX = f.speedX * 0.98 + (Math.random() * 0.2 + 0.1) * 0.02;
        }

        // Draw blurry cloud
        const fGlow = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size);
        
        // Fog color shift based on weather
        let fColor = '165, 178, 195'; // cool ocean blue-grey
        if (currentWeather === 'storm') fColor = '100, 110, 125';
        else if (currentWeather === 'calm') fColor = '212, 190, 160'; // warm sunset gold-grey tint
        else if (currentWeather === 'east-blue') fColor = '235, 190, 150'; // bright warm gold
        else if (currentWeather === 'cold-rain') fColor = '110, 125, 140'; // slate blue-grey
        else if (currentWeather === 'ash') fColor = '90, 90, 95'; // ash-grey
        else if (currentWeather === 'cyber') fColor = '30, 80, 110'; // digital cyan-grey
        else if (currentWeather === 'snow') fColor = '210, 220, 235'; // cold white-blue

        fGlow.addColorStop(0, `rgba(${fColor}, ${f.opacity})`);
        fGlow.addColorStop(0.6, `rgba(${fColor}, ${f.opacity * 0.4})`);
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

      // 4. Custom atmosphere overlays
      if (currentWeather === 'cyber') {
        // scanline
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
        ctx.lineWidth = 1;
        const scanY = (Date.now() / 15) % height;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(width, scanY);
        ctx.stroke();

        // vertical grid lines
        ctx.fillStyle = 'rgba(0, 240, 255, 0.01)';
        ctx.fillRect(width * 0.2, 0, 1, height);
        ctx.fillRect(width * 0.5, 0, 1, height);
        ctx.fillRect(width * 0.8, 0, 1, height);
      } else if (currentWeather === 'ink') {
        // vignette black ink border
        const inkGrad = ctx.createRadialGradient(width / 2, height / 2, width / 4, width / 2, height / 2, Math.max(width, height) / 2);
        inkGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        inkGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.15)');
        inkGrad.addColorStop(1, 'rgba(3, 4, 6, 0.6)');
        ctx.fillStyle = inkGrad;
        ctx.fillRect(0, 0, width, height);
      } else if (currentWeather === 'cold-rain') {
        // authoritarian top spotlight beam
        const spotGrad = ctx.createLinearGradient(width / 2, 0, width / 2, height);
        spotGrad.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
        spotGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.015)');
        spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.moveTo(width / 2 - 150, 0);
        ctx.lineTo(width / 2 + 150, 0);
        ctx.lineTo(width / 2 + 500, height);
        ctx.lineTo(width / 2 - 500, height);
        ctx.closePath();
        ctx.fill();
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
