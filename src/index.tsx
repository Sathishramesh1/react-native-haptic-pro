import { NitroModules } from 'react-native-nitro-modules';
import type { HapticPro, ImpactStyle } from './HapticPro.nitro';

const HapticProHybridObject =
  NitroModules.createHybridObject<HapticPro>('HapticPro');

// Math test (already working!)
export function multiply(a: number, b: number): number {
  return HapticProHybridObject.multiply(a, b);
}

// --- NEW TEST METHODS ---

export function triggerImpact(style: ImpactStyle): void {
  HapticProHybridObject.impact(style);
}

export function triggerVibrate(duration: number): void {
  HapticProHybridObject.vibrate(duration);
}

export function stopVibration(): void {
  HapticProHybridObject.stop();
}

export function checkHardware(): boolean {
  return HapticProHybridObject.hasAmplitudeControl();
}

export function triggerPattern(timings: number[], amplitudes: number[]): void {
  HapticProHybridObject.pattern(timings, amplitudes);
}
