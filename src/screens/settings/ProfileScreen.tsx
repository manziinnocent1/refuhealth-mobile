import React, { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  onBack?: () => void;
};

export default function ProfileScreen({ onBack }: Props) {
  const [name, setName] = useState("Healthcare Provider");
  const [phone, setPhone] = useState("+250 788 123 456");

  const save = () => {
    Alert.alert("Profile Updated", "Your profile information has been saved.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <Text style={styles.title}>My Profile</Text>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>HP</Text>
        </View>

        <Text style={styles.label}>Full Name</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <Text style={styles.label}>Role</Text>
        <View style={styles.readOnly}>
          <Text style={styles.readOnlyText}>Healthcare Provider</Text>
        </View>

        <Pressable style={styles.saveButton} onPress={save}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
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
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#2563EB",
    alignSelf: "center",
    marginTop: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#FFFFFF", fontSize: 26, fontWeight: "700" },
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
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
  },
  readOnly: {
    height: 52,
    paddingHorizontal: 14,
    borderRadius: 11,
    justifyContent: "center",
    backgroundColor: "#E2E8F0",
  },
  readOnlyText: { color: "#64748B", fontSize: 13 },
  saveButton: {
    height: 54,
    marginTop: 32,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: { color: "#FFFFFF", fontWeight: "700" },
});
