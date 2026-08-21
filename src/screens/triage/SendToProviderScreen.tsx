import React, { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  patientName?: string;
  priority?: string;
  onBack?: () => void;
  onSent?: () => void;
};

export default function SendToProviderScreen({
  patientName = "John Doe",
  priority = "Medium",
  onBack,
  onSent,
}: Props) {
  const [provider, setProvider] = useState("Dr. Sarah Johnson");

  const providers = [
    "Dr. Sarah Johnson",
    "Dr. James Wilson",
    "Dr. Grace Uwimana",
  ];

  const send = () => {
    Alert.alert("Send Patient", `Send ${patientName} to ${provider}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Send", onPress: onSent },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Send to Provider</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.patientCard}>
          <Text style={styles.label}>PATIENT READY FOR CONSULTATION</Text>
          <Text style={styles.patientName}>{patientName}</Text>
          <Text style={styles.priority}>Priority: {priority}</Text>
        </View>

        <Text style={styles.sectionTitle}>Select Provider</Text>

        {providers.map((item) => (
          <Pressable
            key={item}
            style={[
              styles.provider,
              provider === item && styles.selectedProvider,
            ]}
            onPress={() => setProvider(item)}
          >
            <View>
              <Text style={styles.providerName}>{item}</Text>
              <Text style={styles.providerRole}>
                Available for consultation
              </Text>
            </View>

            <View
              style={[styles.radio, provider === item && styles.radioSelected]}
            >
              {provider === item && <View style={styles.radioDot} />}
            </View>
          </Pressable>
        ))}

        <Pressable style={styles.sendButton} onPress={send}>
          <Text style={styles.sendButtonText}>Send Patient to Provider</Text>
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: { fontSize: 34, lineHeight: 34, color: "#334155" },
  title: { fontSize: 17, fontWeight: "700", color: "#0F172A" },
  content: { padding: 20 },
  patientCard: {
    padding: 17,
    borderRadius: 15,
    backgroundColor: "#EFF6FF",
  },
  label: { fontSize: 9, fontWeight: "700", color: "#2563EB" },
  patientName: {
    marginTop: 7,
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
  },
  priority: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "600",
    color: "#D97706",
  },
  sectionTitle: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "700",
    color: "#334155",
  },
  provider: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedProvider: { borderColor: "#2563EB" },
  providerName: { fontSize: 14, fontWeight: "700", color: "#334155" },
  providerRole: { marginTop: 4, fontSize: 11, color: "#64748B" },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#94A3B8",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: { borderColor: "#2563EB" },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#2563EB",
  },
  sendButton: {
    height: 54,
    marginTop: 25,
    borderRadius: 12,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
