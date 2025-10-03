// import { useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
//
// const InteractiveBackground = () => {
//   const canvasRef = useRef(null);
//   const mouseRef = useRef({ x: 0, y: 0 });
//   const particlesRef = useRef([]);
//
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//
//     const ctx = canvas.getContext('2d');
//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//
//     resizeCanvas();
//     window.addEventListener('resize', resizeCanvas);
//
//     // Initialize particles
//     const initParticles = () => {
//       particlesRef.current = [];
//       const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
//
//       for (let i = 0; i < particleCount; i++) {
//         particlesRef.current.push({
//           x: Math.random() * canvas.width,
//           y: Math.random() * canvas.height,
//           vx: (Math.random() - 0.5) * 0.5,
//           vy: (Math.random() - 0.5) * 0.5,
//           radius: Math.random() * 2 + 1,
//           opacity: Math.random() * 0.5 + 0.2,
//           color: `hsl(${220 + Math.random() * 60}, 70%, 60%)`,
//         });
//       }
//     };
//
//     initParticles();
//
//     // Mouse move handler
//     const handleMouseMove = (e) => {
//       mouseRef.current = {
//         x: e.clientX,
//         y: e.clientY,
//       };
//     };
//
//     window.addEventListener('mousemove', handleMouseMove);
//
//     // Animation loop
//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//
//       // Update and draw particles
//       particlesRef.current.forEach((particle, index) => {
//         // Mouse interaction
//         const dx = mouseRef.current.x - particle.x;
//         const dy = mouseRef.current.y - particle.y;
//         const distance = Math.sqrt(dx * dx + dy * dy);
//
//         if (distance < 100) {
//           const force = (100 - distance) / 100;
//           particle.vx += (dx / distance) * force * 0.01;
//           particle.vy += (dy / distance) * force * 0.01;
//         }
//
//         // Update position
//         particle.x += particle.vx;
//         particle.y += particle.vy;
//
//         // Boundary check
//         if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
//         if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
//
//         // Apply friction
//         particle.vx *= 0.99;
//         particle.vy *= 0.99;
//
//         // Draw particle
//         ctx.beginPath();
//         ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
//         ctx.fillStyle = particle.color;
//         ctx.globalAlpha = particle.opacity;
//         ctx.fill();
//
//         // Draw connections
//         particlesRef.current.slice(index + 1).forEach((otherParticle) => {
//           const dx = particle.x - otherParticle.x;
//           const dy = particle.y - otherParticle.y;
//           const distance = Math.sqrt(dx * dx + dy * dy);
//
//           if (distance < 80) {
//             ctx.beginPath();
//             ctx.moveTo(particle.x, particle.y);
//             ctx.lineTo(otherParticle.x, otherParticle.y);
//             ctx.strokeStyle = particle.color;
//             ctx.globalAlpha = (80 - distance) / 80 * 0.2;
//             ctx.lineWidth = 1;
//             ctx.stroke();
//           }
//         });
//       });
//
//       ctx.globalAlpha = 1;
//       requestAnimationFrame(animate);
//     };
//
//     animate();
//
//     return () => {
//       window.removeEventListener('resize', resizeCanvas);
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);
//
//   return (
//     <motion.canvas
//       ref={canvasRef}
//       className="interactive-background"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 2 }}
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         zIndex: 1,
//         pointerEvents: 'none',
//       }}
//     />
//   );
// };
//
// export default InteractiveBackground;