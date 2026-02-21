import Foundation
import UIKit
import NitroModules

class HapticPro: HybridHapticProSpec {
  // Pre-initialize generators to reduce latency
  private let lightGenerator = UIImpactFeedbackGenerator(style: .light)
  private let mediumGenerator = UIImpactFeedbackGenerator(style: .medium)
  private let heavyGenerator = UIImpactFeedbackGenerator(style: .heavy)
  private let notificationGenerator = UINotificationFeedbackGenerator()

  public func multiply(a: Double, b: Double) throws -> Double {
    return a * b
  }

  public func hasAmplitudeControl() throws -> Bool {
    // All Taptic Engine iPhones support granular control
    return true
  }

  public func impact(style: ImpactStyle) throws {
    // Haptics must run on the main thread on iOS
    DispatchQueue.main.async {
      switch style {
      case .light:
        self.lightGenerator.impactOccurred()
      case .medium:
        self.mediumGenerator.impactOccurred()
      case .heavy:
        self.heavyGenerator.impactOccurred()
      }
    }
  }

  public func vibrate(duration: Double) throws {
    // iOS doesn't have a "variable duration" vibration API like Android.
    // 1519 is the standard "Peek" haptic (short & strong).
    AudioServicesPlaySystemSound(1519)
  }

  public func stop() throws {
    // iOS manages generator lifecycle automatically
  }

  public func pattern(timings: [Double], amplitudes: [Double]) throws {
    // Placeholder: Custom waveforms on iOS require CoreHaptics.
    // For v0.1, we'll trigger a 'success' notification as a fallback.
    DispatchQueue.main.async {
      self.notificationGenerator.notificationOccurred(.success)
    }
  }
}