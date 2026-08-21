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

export default function SecurityScreen({ onBack }: Props) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePassword = () => {
    if (!currentPassword || !newPassword) {
      Alert.alert("Required", "Please complete all password fields.");
      return;
    }

    Alert.alert("Success", "Your password has been updated.");
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <Text style={styles.title}>Security</Text>
        <Text style={styles.subtitle}>Protect your healthcare account.</Text>

        <View style={styles.securityCard}>
          <Text style={styles.securityTitle}>Account Security</Text>
          <Text style={styles.securityText}>
            Use a strong password and do not share your account credentials.
          </Text>
        </View>

        <Text style={styles.label}>Current Password</Text>
        <TextInput
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
          style={styles.input}
          placeholder="Enter current password"
        />

        <Text style={styles.label}>New Password</Text>
        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          style={styles.input}
          placeholder="Enter new password"
        />

        <Pressable style={styles.button} onPress={changePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
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
  securityCard: {
    marginTop: 24,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
  },
  securityTitle: { fontSize: 14, fontWeight: "700", color: "#1E40AF" },
  securityText: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 19,
    color: "#3B82F6",
  },
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
    marginTop: 30,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: "#FFFFFF", fontWeight: "700" },
});
