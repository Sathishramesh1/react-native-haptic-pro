package com.margelo.nitro.hapticpro

import android.content.Context
import android.os.*
import android.media.AudioAttributes
import android.util.Log
import androidx.annotation.Keep
import com.facebook.proguard.annotations.DoNotStrip

@DoNotStrip
@Keep
class HapticPro(private val context: Context) : HybridHapticProSpec() {

    // Safely get the Vibrator service using the Nitro Global Context
    private fun getVibrator(): Vibrator? {
        return try {
            val ctx = com.margelo.nitro.NitroModules.applicationContext 
            if (ctx == null) {
                Log.e("NitroHaptic", "Global context is null! Registration might be wrong.")
                return null
            }
            
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                val manager = ctx.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as? VibratorManager
                manager?.defaultVibrator
            } else {
                @Suppress("DEPRECATION")
                ctx.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
            }
        } catch (e: Exception) {
            Log.e("NitroHaptic", "Failed to get vibrator: ${e.message}")
            null
        }
    }

    override fun hasAmplitudeControl(): Boolean {
        val v = getVibrator()
        val hasControl = v?.hasAmplitudeControl() ?: false
        Log.d("NitroHaptic", "Hardware amplitude control supported: $hasControl")
        return hasControl
    }

    override fun impact(style: ImpactStyle) {
        val v = getVibrator() ?: return
        
        val attributes = AudioAttributes.Builder()
            .setUsage(AudioAttributes.USAGE_ASSISTANCE_SONIFICATION)
            .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
            .build()

        // Amplitude 255 is the MAX physical power of the motor.
        val duration: Long
        val amplitude: Int

        when (style) {
            ImpactStyle.LIGHT -> {
                // We increase to 35ms so the motor actually moves, 
                // but lower the power to 110 so it stays "Light"
                duration = 35L 
                amplitude = 110 
            }
            ImpactStyle.MEDIUM -> {
                duration = 45L
                amplitude = 190 
            }
            ImpactStyle.HEAVY -> {
                duration = 75L 
                amplitude = 255 
            }
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val effect = VibrationEffect.createOneShot(duration, amplitude)
            v.vibrate(effect, attributes)
        } else {
            @Suppress("DEPRECATION")
            v.vibrate(duration)
        }
        
        Log.d("NitroHaptic", "Fired $style: ${duration}ms @ $amplitude intensity")
    }

    override fun multiply(a: Double, b: Double): Double = a * b
    
    override fun stop() {
        getVibrator()?.cancel()
    }

    override fun vibrate(duration: Double) {
        val v = getVibrator() ?: return
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // Force legacy-style strength (Max Amplitude) for the general vibrate call
            v.vibrate(VibrationEffect.createOneShot(duration.toLong(), 255))
        } else {
            @Suppress("DEPRECATION")
            v.vibrate(duration.toLong())
        }
    }

    override fun pattern(timings: DoubleArray, amplitudes: DoubleArray) {
        val v = getVibrator() ?: return
        val t = timings.map { it.toLong() }.toLongArray()
        val a = amplitudes.map { it.toInt() }.toIntArray()
        
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            v.vibrate(VibrationEffect.createWaveform(t, a, -1))
        } else {
            @Suppress("DEPRECATION")
            v.vibrate(t, -1)
        }
    }
}