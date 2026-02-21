import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  multiply,
  triggerImpact,
  triggerVibrate,
  checkHardware,
  triggerPattern,
  stopVibration,
} from 'react-native-haptic-pro';

export default function App() {
  const hasRichHaptics = checkHardware();

  // Pattern for "Success": Two quick taps
  const playSuccess = () => {
    // 0ms wait, 40ms vibe, 60ms wait, 40ms vibe
    triggerPattern([0, 40, 60, 40], [0, 200, 0, 255]);
  };

  // Pattern for "Error": Three rapid sharp taps
  const playError = () => {
    triggerPattern([0, 50, 40, 50, 40, 50], [0, 255, 0, 255, 0, 255]);
  };

  // 1. Heartbeat: A soft thump followed by a strong thump
  const playHeartbeat = () => {
    // [Wait, Pulse 1, Gap, Pulse 2]
    triggerPattern([0, 60, 100, 100], [0, 150, 0, 255]);
  };

  // 2. Machine Gun: Rapid fire staccato
  const playMachineGun = () => {
    triggerPattern(
      [0, 30, 40, 30, 40, 30, 40, 30],
      [0, 255, 0, 255, 0, 255, 0, 255]
    );
  };

  // 3. Zilch / "Nope": Two quick low-intensity taps
  const playNope = () => {
    triggerPattern([0, 35, 30, 35], [0, 120, 0, 120]);
  };

  // 4. Explosion: Strong start that fades (simulated)
  const playExplosion = () => {
    triggerPattern([0, 80, 50, 40, 50, 20], [0, 255, 0, 180, 0, 100]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🔥 Nitro Haptic Pro</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Math Bridge: 3 * 10 = {multiply(3, 10)}
        </Text>
        <Text style={styles.cardText}>
          Advanced Hardware: {hasRichHaptics ? '✅ Yes' : '❌ No'}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Impact Styles</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => triggerImpact('light')}
        >
          <Text style={styles.btnText}>Light</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => triggerImpact('medium')}
        >
          <Text style={styles.btnText}>Medium</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.heavyBtn]}
          onPress={() => triggerImpact('heavy')}
        >
          <Text style={styles.btnText}>Heavy</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Notification Patterns</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#34C759' }]}
          onPress={playSuccess}
        >
          <Text style={styles.btnText}>Success</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#FF9500' }]}
          onPress={playError}
        >
          <Text style={styles.btnText}>Error</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Legacy & Controls</Text>
      <TouchableOpacity
        style={styles.longBtn}
        onPress={() => triggerVibrate(100)}
      >
        <Text style={styles.btnText}>100ms Vibration</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.longBtn, styles.stopBtn]}
        onPress={stopVibration}
      >
        <Text style={styles.btnText}>🛑 Stop All Haptics</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Creative Patterns</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.btn, styles.fancyBtn]}
          onPress={playHeartbeat}
        >
          <Text style={styles.btnText}>💓 Heart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.fancyBtn]}
          onPress={playMachineGun}
        >
          <Text style={styles.btnText}>🔫 Gun</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonRow, { marginTop: 10 }]}>
        <TouchableOpacity
          style={[styles.btn, styles.fancyBtn]}
          onPress={playNope}
        >
          <Text style={styles.btnText}>🚫 Nope</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.fancyBtn]}
          onPress={playExplosion}
        >
          <Text style={styles.btnText}>💥 Boom</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', backgroundColor: '#F5F5F7' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 40, marginBottom: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginTop: 30,
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    elevation: 2,
    marginBottom: 10,
  },
  cardText: { fontSize: 16, marginVertical: 2 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  heavyBtn: { backgroundColor: '#FF3B30' },
  longBtn: {
    backgroundColor: '#5856D6',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginVertical: 5,
  },
  stopBtn: { backgroundColor: '#8E8E93', marginTop: 20 },
  btnText: { color: 'white', fontWeight: 'bold' },
  fancyBtn: {
    backgroundColor: '#222',
    borderRadius: 10,
  },
});
