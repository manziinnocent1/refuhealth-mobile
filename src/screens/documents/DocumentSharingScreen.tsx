import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

export default function DocumentSharingScreen() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [shareMedicalHistory, setShareMedicalHistory] = useState(false);
  const [shareReferral, setShareReferral] = useState(true);

  const handleShare = () => {
    if (!recipient.trim()) {
      Alert.alert(
        "Recipient required",
        "Please enter the authorized healthcare provider or facility.",
      );
      return;
    }

    Alert.alert(
      "Document Shared",
      "The selected information has been securely shared with the authorized recipient.",
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.shareCircle}>
            <Text style={styles.shareIcon}>↗</Text>
          </View>

          <Text style={styles.title}>Share Document</Text>

          <Text style={styles.subtitle}>
            Share your healthcare document securely with an authorized provider.
          </Text>
        </View>

        {/* Document */}
        <View style={styles.documentCard}>
          <View style={styles.pdfIcon}>
            <Text style={styles.pdfText}>PDF</Text>
          </View>

          <View style={styles.documentInfo}>
            <Text style={styles.documentTitle}>Laboratory Report</Text>
            <Text style={styles.documentMeta}>12 August 2026 • 1.2 MB</Text>
          </View>

          <Text style={styles.check}>✓</Text>
        </View>

        {/* Recipient */}
        <Text style={styles.sectionTitle}>Authorized recipient</Text>

        <Text style={styles.label}>Provider or facility</Text>

        <TextInput
          value={recipient}
          onChangeText={setRecipient}
          placeholder="e.g. Kiziba Hospital"
          placeholderTextColor="#94A3B8"
          style={styles.input}
        />

        <Text style={styles.helper}>
          Only share information with a trusted healthcare provider or facility.
        </Text>

        {/* Additional Data */}
        <Text style={styles.sectionTitle}>Additional information</Text>

        <ShareOption
          title="Referral information"
          description="Include referral details related to this document."
          selected={shareReferral}
          onPress={() => setShareReferral(!shareReferral)}
        />

        <ShareOption
          title="Relevant medical history"
          description="Include relevant information from your medical history."
          selected={shareMedicalHistory}
          onPress={() => setShareMedicalHistory(!shareMedicalHistory)}
        />

        {/* Message */}
        <Text style={styles.sectionTitle}>Message</Text>

        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Add a message to the healthcare provider..."
          placeholderTextColor="#94A3B8"
          multiline
          textAlignVertical="top"
          style={[styles.input, styles.messageInput]}
        />

        {/* Privacy */}
        <View style={styles.privacyCard}>
          <Text style={styles.privacyTitle}>🔐 Secure sharing</Text>

          <Text style={styles.privacyText}>
            The recipient should only access the information needed to provide
            healthcare services. Sharing activity should be recorded in the
            patient's audit history.
          </Text>
        </View>

        {/* Share */}
        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShare}
          activeOpacity={0.85}
        >
          <Text style={styles.shareButtonText}>Share Securely</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function ShareOption({
  title,
  description,
  selected,
  onPress,
}: {
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.option, selected && styles.selectedOption]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.checkbox, selected && styles.selectedCheckbox]}>
        {selected && <Text style={styles.checkboxTick}>✓</Text>}
      </View>

      <View style={styles.optionText}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 20,
    paddingBottom: 45,
  },

  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  shareCircle: {
    width: 65,
    height: 65,
    borderRadius: 23,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  shareIcon: {
    color: "#2563EB",
    fontSize: 30,
    fontWeight: "800",
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 7,
    color: "#64748B",
    textAlign: "center",
    fontSize: 13,
    lineHeight: 19,
  },

  documentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 26,
  },

  pdfIcon: {
    width: 47,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  pdfText: {
    color: "#2563EB",
    fontSize: 10,
    fontWeight: "900",
  },

  documentInfo: {
    flex: 1,
  },

  documentTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },

  documentMeta: {
    marginTop: 5,
    fontSize: 11,
    color: "#64748B",
  },

  check: {
    color: "#2563EB",
    fontSize: 20,
    fontWeight: "800",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 11,
    marginTop: 3,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 7,
  },

  input: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 15,
    color: "#111827",
    fontSize: 14,
    marginBottom: 6,
  },

  helper: {
    color: "#94A3B8",
    fontSize: 11,
    lineHeight: 17,
    marginBottom: 24,
  },

  option: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 9,
  },

  selectedOption: {
    borderColor: "#2563EB",
    backgroundColor: "#F8FBFF",
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 1,
  },

  selectedCheckbox: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  checkboxTick: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },

  optionText: {
    flex: 1,
  },

  optionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },

  optionDescription: {
    marginTop: 5,
    color: "#64748B",
    fontSize: 12,
    lineHeight: 18,
  },

  messageInput: {
    height: 105,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 20,
  },

  privacyCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    marginBottom: 22,
  },

  privacyTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1E3A8A",
    marginBottom: 6,
  },

  privacyText: {
    color: "#475569",
    fontSize: 12,
    lineHeight: 19,
  },

  shareButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});
