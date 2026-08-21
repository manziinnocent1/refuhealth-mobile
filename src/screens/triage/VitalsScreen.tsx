import React, { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

type Props = {
  onBack?: () => void;
  onSaved?: () => void;
};

export default function VitalsScreen({ onBack, onSaved }: Props) {
  const [temperature, setTemperature] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [pulse, setPulse] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");

  const save = () => {
    if (!temperature || !bloodPressure || !pulse) {
      Alert.alert(
        "Incomplete Vitals",
        "Please record temperature, blood pressure and pulse.",
      );
      return;
    }

    onSaved?.();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <Text style={styles.title}>Record Vital Signs</Text>
        <Text style={styles.subtitle}>
          Enter the patient's current measurements.
        </Text>

        <Text style={styles.label}>Temperature (°C)</Text>
        <TextInput
          value={temperature}
          onChangeText={setTemperature}
          keyboardType="decimal-pad"
          placeholder="e.g. 36.8"
          style={styles.input}
        />

        <Text style={styles.label}>Blood Pressure</Text>
        <TextInput
          value={bloodPressure}
          onChangeText={setBloodPressure}
          placeholder="e.g. 120/80"
          style={styles.input}
        />

        <Text style={styles.label}>Pulse (BPM)</Text>
        <TextInput
          value={pulse}
          onChangeText={setPulse}
          keyboardType="numeric"
          placeholder="e.g. 72"
          style={styles.input}
        />

        <Text style={styles.label}>Respiratory Rate</Text>
        <TextInput
          value={respiratoryRate}
          onChangeText={setRespiratoryRate}
          keyboardType="numeric"
          placeholder="Breaths per minute"
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={save}>
          <Text style={styles.buttonText}>Save Vital Signs</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  content: { padding: 20, paddingBottom: 40 },
  backButton: { fontSize: 34, lineHeight: 34, color: "#334155" },
  title: {
    marginTop: 15,
    fontSize: 25,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: { marginTop: 6, fontSize: 13, color: "#64748B" },
  label: {
    marginTop: 22,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
  input: {
    height: 52,
    paddingHorizontal: 14,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  button: {
    height: 54,
    marginTop: 32,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: "#FFFFFF", fontWeight: "700" },
});
