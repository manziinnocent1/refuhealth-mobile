import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  onBack?: () => void;
  onSearch?: (query: string) => void;
  onRegisterPatient?: () => void;
};

export default function PatientSearchScreen({
  onBack,
  onSearch,
  onRegisterPatient,
}: Props) {
  const [query, setQuery] = useState("");

  const search = () => {
    if (query.trim()) {
      onSearch?.(query.trim());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <Text style={styles.title}>Find Patient</Text>

        <View style={{ width: 30 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>Search for a Patient</Text>
        <Text style={styles.description}>
          Search using patient name, phone number, patient ID, or national ID.
        </Text>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Enter patient details..."
          placeholderTextColor="#94A3B8"
          style={styles.input}
          returnKeyType="search"
          onSubmitEditing={search}
        />

        <Pressable
          style={[styles.searchButton, !query.trim() && styles.disabledButton]}
          onPress={search}
        >
          <Text style={styles.searchButtonText}>Search Patient</Text>
        </Pressable>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <Pressable style={styles.registerButton} onPress={onRegisterPatient}>
          <Text style={styles.registerButtonText}>Register New Patient</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    height: 70,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: { fontSize: 34, lineHeight: 34, color: "#334155" },
  title: { fontSize: 18, fontWeight: "700", color: "#0F172A" },
  content: { padding: 20, paddingTop: 50 },
  heading: { fontSize: 23, fontWeight: "700", color: "#0F172A" },
  description: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: "#64748B",
  },
  input: {
    height: 54,
    marginTop: 28,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    color: "#1E293B",
  },
  searchButton: {
    height: 52,
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "#CBD5E1" },
  searchButtonText: { color: "#FFFFFF", fontWeight: "700" },
  orContainer: {
    marginVertical: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  line: { flex: 1, height: 1, backgroundColor: "#E2E8F0" },
  orText: {
    marginHorizontal: 12,
    fontSize: 11,
    fontWeight: "700",
    color: "#94A3B8",
  },
  registerButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  registerButtonText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "700",
  },
});
