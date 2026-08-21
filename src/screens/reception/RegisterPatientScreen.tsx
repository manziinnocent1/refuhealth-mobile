import React, { useState } from "react";
import {
  ScrollView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

type Props = {
  onBack?: () => void;
  onRegistered?: (patientName: string) => void;
};

export default function RegisterPatientScreen({ onBack, onRegistered }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [nationalId, setNationalId] = useState("");

  const canRegister = firstName.trim() && lastName.trim() && phone.trim();

  const register = () => {
    if (canRegister) {
      onRegistered?.(`${firstName.trim()} ${lastName.trim()}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <Text style={styles.title}>Register New Patient</Text>
        <Text style={styles.subtitle}>
          Enter the patient's basic information.
        </Text>

        <Text style={styles.label}>First Name *</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          placeholder="First name"
        />

        <Text style={styles.label}>Last Name *</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          placeholder="Last name"
        />

        <Text style={styles.label}>Phone Number *</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
          placeholder="+250..."
        />

        <Text style={styles.label}>National ID</Text>
        <TextInput
          value={nationalId}
          onChangeText={setNationalId}
          style={styles.input}
          placeholder="Optional national ID"
        />

        <Pressable
          style={[styles.registerButton, !canRegister && styles.disabledButton]}
          onPress={register}
        >
          <Text style={styles.registerText}>Register Patient</Text>
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
    marginTop: 20,
    marginBottom: 7,
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
  registerButton: {
    height: 54,
    marginTop: 30,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: { backgroundColor: "#CBD5E1" },
  registerText: { color: "#FFFFFF", fontWeight: "700" },
});
