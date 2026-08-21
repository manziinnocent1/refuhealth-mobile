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

export default function DataAccessRequestScreen() {
  const [reason, setReason] = useState("");
  const [requestType, setRequestType] = useState<
    "view" | "copy" | "correction"
  >("view");

  const handleSubmit = () => {
    if (!reason.trim()) {
      Alert.alert(
        "Information Required",
        "Please explain why you are requesting access to your information.",
      );
      return;
    }

    Alert.alert(
      "Request Submitted",
      "Your data access request has been submitted securely.",
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Data Access Request</Text>

          <Text style={styles.subtitle}>
            Request access to your healthcare information or ask for a
            correction.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Text>ℹ</Text>
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Your information, your control</Text>

            <Text style={styles.infoText}>
              You can request access to information stored in your healthcare
              record or report information that you believe is incorrect.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Request type</Text>

        <View style={styles.optionContainer}>
          <RequestOption
            title="View my information"
            description="Review the healthcare information associated with your record."
            selected={requestType === "view"}
            onPress={() => setRequestType("view")}
          />

          <RequestOption
            title="Get a copy"
            description="Request a copy of your available healthcare information."
            selected={requestType === "copy"}
            onPress={() => setRequestType("copy")}
          />

          <RequestOption
            title="Correct information"
            description="Report information that may be inaccurate or incomplete."
            selected={requestType === "correction"}
            onPress={() => setRequestType("correction")}
          />
        </View>

        <Text style={styles.sectionTitle}>Reason for request</Text>

        <View style={styles.inputCard}>
          <TextInput
            value={reason}
            onChangeText={setReason}
            placeholder="Explain why you are making this request..."
            placeholderTextColor="#94A3B8"
            multiline
            textAlignVertical="top"
            style={styles.input}
          />
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>🔒 Privacy notice</Text>

          <Text style={styles.noticeText}>
            Requests should be reviewed according to the hospital's policies and
            applicable healthcare privacy requirements before information is
            released.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.submitText}>Submit Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

type RequestOptionProps = {
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
};

function RequestOption({
  title,
  description,
  selected,
  onPress,
}: RequestOptionProps) {
  return (
    <TouchableOpacity
      style={[styles.option, selected && styles.selectedOption]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.radio, selected && styles.selectedRadio]}>
        {selected && <View style={styles.radioInner} />}
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
    marginBottom: 23,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 7,
    color: "#64748B",
    fontSize: 14,
    lineHeight: 20,
  },

  infoCard: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    borderRadius: 20,
    padding: 17,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },

  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    color: "#1E3A8A",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 5,
  },

  infoText: {
    color: "#475569",
    fontSize: 12,
    lineHeight: 18,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 11,
  },

  optionContainer: {
    marginBottom: 25,
  },

  option: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  selectedOption: {
    borderColor: "#2563EB",
    backgroundColor: "#F8FBFF",
  },

  radio: {
    width: 21,
    height: 21,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 1,
  },

  selectedRadio: {
    borderColor: "#2563EB",
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2563EB",
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

  inputCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
  },

  input: {
    minHeight: 130,
    padding: 16,
    color: "#111827",
    fontSize: 14,
    lineHeight: 21,
  },

  notice: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 23,
  },

  noticeTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
  },

  noticeText: {
    color: "#64748B",
    fontSize: 12,
    lineHeight: 19,
  },

  submitButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },

  submitText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});
