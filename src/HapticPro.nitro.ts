import type { HybridObject } from 'react-native-nitro-modules';

export type ImpactStyle = 'light' | 'medium' | 'heavy';

export interface HapticPro extends HybridObject<{
  ios: 'swift';
  android: 'kotlin';
}> {
  multiply(a: number, b: number): number;
  hasAmplitudeControl(): boolean;
  vibrate(duration: number): void;
  impact(style: ImpactStyle): void;
  pattern(timings: number[], amplitudes: number[]): void;
  stop(): void;
}
