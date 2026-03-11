# react-native-haptic-pro

A small, high-quality React Native library that exposes native haptic and vibration capabilities via Nitro Modules for iOS (Swift) and Android (Kotlin).
Bridge-less native haptics for React Native using Nitro Modules.
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
⚠️ This library requires `react-native-nitro-modules`.
 Make sure you install it alongside this package:


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

- React Native: 0.82 – 0.83
- react-native-nitro-modules: ^0.33.x
- Platforms: iOS and Android

Because this library relies on Nitro Modules and React Native internal APIs,
using unsupported React Native versions may result in build-time errors.

## Contributing
Contributions are welcome. Please read `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` before opening PRs.

For ideas on where to help (example improvements, GIFs, tests, and curated issues), see `CONTRIBUTING.md`.

## License

MIT — see the `LICENSE` file.

## Credits

Built with Nitro Modules and the `react-native-builder-bob` scaffold.

⚡ Performance

react-native-haptic-pro is built using Nitro Modules (JSI-based architecture), which avoids the legacy React Native bridge.

Traditional bridge-based modules serialize calls asynchronously between JavaScript and native code. Nitro uses direct JSI bindings to invoke native implementations without JSON serialization or bridge queue overhead.

🧵 Bridge vs. JSI (Conceptual Difference)
Module Type	Communication Model	Invocation Overhead
Standard Bridge Modules	Async JSON bridge	Higher
RN Vibration API	Async bridge	Higher
Nitro Haptic Pro	Direct JSI binding	Lower
🚀 Why This Matters

By bypassing the legacy bridge, Nitro-based modules:

Reduce JavaScript ↔ native invocation overhead

Avoid JSON serialization costs

Eliminate bridge queue congestion

Provide more predictable timing for high-frequency calls

Note: Haptic feedback is ultimately hardware-bound. The performance improvement primarily affects the call invocation overhead rather than the vibration duration itself.

For most apps, the difference may not be visually measurable — but architecturally, Nitro ensures cleaner and more efficient native integration.