/**
 * src/timeArrow/engine/TimeAnimations.js
 * High performance motion variants, particle bursts & haptics for Time Arrow
 * (Zero dependencies on Brain Arrow)
 */

export const EXIT_VARIANTS = {
  UP: { y: -700, scale: 0.65, opacity: 0 },
  DOWN: { y: 700, scale: 0.65, opacity: 0 },
  LEFT: { x: -700, scale: 0.65, opacity: 0 },
  RIGHT: { x: 700, scale: 0.65, opacity: 0 }
};

export const EXIT_TRANSITION = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1] // Custom snappy cubic bezier
};

export const BLOCKED_SHAKE = {
  x: [0, -9, 9, -7, 7, 0],
  scale: [1, 1.06, 0.98, 1.04, 1],
  transition: { duration: 0.32, ease: "easeInOut" }
};

/**
 * Trigger haptic vibration if available on device
 * @param {'CLEAR' | 'BLOCKED' | 'VICTORY' | 'COMBO'} type
 */
export const triggerHaptics = (type) => {
  if (typeof window === 'undefined' || !window.navigator || !window.navigator.vibrate) return;

  try {
    switch (type) {
      case 'CLEAR':
        window.navigator.vibrate(15);
        break;
      case 'BLOCKED':
        window.navigator.vibrate([30, 40, 30]);
        break;
      case 'COMBO':
        window.navigator.vibrate([20, 25, 45]);
        break;
      case 'VICTORY':
        window.navigator.vibrate([40, 50, 60, 50, 100]);
        break;
      case 'DEFEAT':
        window.navigator.vibrate([80, 60, 120]);
        break;
      default:
        break;
    }
  } catch {
    // Ignore haptic errors on unsupported devices
  }
};

/**
 * Generate confetti/sparkle particles
 */
export const createParticleBurst = (x, y, color = '#FFD166', count = 12) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
    const speed = 40 + Math.random() * 60;
    particles.push({
      id: `p_${Date.now()}_${i}_${Math.random()}`,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 4 + Math.random() * 6,
      color,
      rotation: Math.random() * 360
    });
  }
  return particles;
};

export default {
  EXIT_VARIANTS,
  EXIT_TRANSITION,
  BLOCKED_SHAKE,
  triggerHaptics,
  createParticleBurst
};
