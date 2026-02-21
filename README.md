# react-native-haptic-pro

A small, high-quality React Native library that exposes native haptic and vibration capabilities via Nitro Modules for iOS (Swift) and Android (Kotlin).

This README helps new users get started quickly, understand the public API, run the example app, and contribute.

## Why use react-native-haptic-pro

- Simple, focused API for common haptic patterns (impact, vibration, custom patterns).
- Built with Nitro Modules for tight native integration on both iOS and Android.
- Lightweight and easy to add to any React Native project.

## Features

- Trigger native impact haptics (light / medium / heavy).
- Trigger simple vibration with a duration (ms).
- Trigger custom vibration patterns (timings + amplitudes) on devices that support amplitude control.
- Query whether the device supports amplitude control.

## Installation

Install the library and the Nitro Modules runtime:

```bash
npm install react-native-haptic-pro react-native-nitro-modules
```

Notes:

- `react-native-nitro-modules` is required: this project uses Nitro Modules to wire native implementations to JavaScript.
- For React Native 0.60+ autolinking should pick up native modules. If you use CocoaPods, run `pod install` from the `ios/` folder.

## Quick start

Import the functions you need and call them directly:

```ts
import {
  triggerImpact,
  triggerVibrate,
  stopVibration,
  checkHardware,
  triggerPattern,
} from 'react-native-haptic-pro';

// Light impact
triggerImpact('light');

// Vibrate for 500ms
triggerVibrate(500);

// Stop ongoing vibration
stopVibration();

// Check for amplitude control
const hasAmp = checkHardware();

// Trigger a custom pattern (timings in ms, amplitudes 0-255)
if (hasAmp) {
  triggerPattern([0, 50, 100, 50], [0, 128, 255, 128]);
}
```

See the `example/` folder for a working demo app.

## API Reference

All functions are exported from the package root and call through to the native Nitro Hybrid object.

- `multiply(a: number, b: number): number`
  - Utility/test method that returns `a * b` (handy for smoke tests).

- `triggerImpact(style: 'light' | 'medium' | 'heavy'): void`
  - Trigger a platform-appropriate impact haptic.

- `triggerVibrate(duration: number): void`
  - Start a vibration for `duration` milliseconds.

- `stopVibration(): void`
  - Stop any ongoing vibration started by this module.

- `checkHardware(): boolean`
  - Returns `true` if the device supports amplitude control (useful before calling `triggerPattern`).

- `triggerPattern(timings: number[], amplitudes: number[]): void`
  - Triggers a custom vibration pattern. `timings` are durations in ms, `amplitudes` are 0-255 values on supported devices.

Types are included so TypeScript users get good autocompletion and compile-time checks.

## Example app

This repository contains an `example/` app that demonstrates typical usage. To run it:

1. `cd example`
2. `npm install` (or `yarn`)
3. Run on device/simulator: `npx react-native run-android` or open the Xcode workspace for iOS.

Open `example/src/App.tsx` to see usage.

## Compatibility

- Platforms: iOS and Android
- React Native: works with modern RN versions (0.60+). Older RN versions may require manual linking.

## Contributing

Contributions are welcome. Please read `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` before opening PRs.

High-impact contribution ideas:

- Add animated GIFs/screenshots showing the haptic effects.
- Improve the example app and provide copy-paste snippets.
- Add cross-platform tests and CI.
- Curate `good first issue` and `help wanted` issues to attract contributors.

## Tips to increase GitHub adoption

- Add a short demo GIF at the top of the README.
- Add topics to the GitHub repo: `react-native`, `haptics`, `vibration`.
- Keep the example minimal and copy-paste friendly.
- Write a short `SHOWCASE.md` with real-world use cases.

## License

MIT — see the `LICENSE` file.

## Credits

Built with Nitro Modules and the `react-native-builder-bob` scaffold.
