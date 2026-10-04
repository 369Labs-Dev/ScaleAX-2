import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

// One registration point. Import gsap from here, never from 'gsap' directly,
// so plugins are always registered before first use. Skipped where
// matchMedia is missing (jsdom): ScrollTrigger needs it to register, and
// nothing animates there anyway (see motionEnabled).
if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
