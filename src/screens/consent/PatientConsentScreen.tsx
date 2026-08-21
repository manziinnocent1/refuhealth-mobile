import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Switch,
} from "react-native";

export default function PatientConsentScreen() {
  const [healthcareConsent, setHealthcareConsent] = useState(true);
  const [dataSharingConsent, setDataSharingConsent] = useState(false);
  const [researchConsent, setResearchConsent] = useState(false);

  const handleSaveConsent = () => {
    Alert.alert(
      "Consent Updated",
      "Your consent preferences have been securely recorded.",
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>✓</Text>
          </View>

          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Your Consent</Text>
            <Text style={styles.subtitle}>
              Control how your health information is used and shared.
            </Text>
          </View>
        </View>

        {/* Security Banner */}
        <View style={styles.securityCard}>
          <View style={styles.securityIcon}>
            <Text style={styles.securityIconText}>🔒</Text>
          </View>

          <View style={styles.securityContent}>
            <Text style={styles.securityTitle}>Your data matters</Text>
            <Text style={styles.securityText}>
              Your health information is protected and only shared according to
              your consent and applicable healthcare requirements.
            </Text>
          </View>
        </View>

        {/* Consent Section */}
        <Text style={styles.sectionTitle}>Consent preferences</Text>

        <View style={styles.consentCard}>
          <ConsentRow
            title="Healthcare Services"
            description="Allow healthcare providers involved in your care to access relevant medical information."
            value={healthcareConsent}
            onValueChange={setHealthcareConsent}
            required
          />

          <View style={styles.divider} />

          <ConsentRow
            title="Care Coordination"
            description="Allow your information to be shared with authorized providers involved in referrals and continuity of care."
            value={dataSharingConsent}
            onValueChange={setDataSharingConsent}
          />

          <View style={styles.divider} />

          <ConsentRow
            title="Health Research"
            description="Allow your de-identified health information to contribute to approved health research."
            value={researchConsent}
            onValueChange={setResearchConsent}
          />
        </View>

        {/* Information */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Important information</Text>

          <Text style={styles.infoText}>
            • You can change your preferences at any time.
          </Text>

          <Text style={styles.infoText}>
            • Some information may be required to provide healthcare services.
          </Text>

          <Text style={styles.infoText}>
            • Your consent decisions are recorded securely.
          </Text>
        </View>

        {/* Save */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSaveConsent}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>Save Consent Preferences</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

type ConsentRowProps = {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  required?: boolean;
};

function ConsentRow({
  title,
  description,
  value,
  onValueChange,
  required,
}: ConsentRowProps) {
  return (
    <View style={styles.consentRow}>
      <View style={styles.consentTextContainer}>
        <View style={styles.rowTitle}>
          <Text style={styles.consentTitle}>{title}</Text>

          {required && (
            <View style={styles.requiredBadge}>
              <Text style={styles.requiredText}>Required</Text>
            </View>
          )}
        </View>

        <Text style={styles.consentDescription}>{description}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: "#D1D5DB",
          true: "#93C5FD",
        }}
        thumbColor={value ? "#2563EB" : "#FFFFFF"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  headerIconText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "800",
  },

  headerTextContainer: {
    flex: 1,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 5,
    color: "#64748B",
    fontSize: 14,
    lineHeight: 20,
  },

  securityCard: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    borderRadius: 20,
    padding: 17,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },

  securityIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  securityIconText: {
    fontSize: 19,
  },

  securityContent: {
    flex: 1,
  },

  securityTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1E3A8A",
    marginBottom: 4,
  },

  securityText: {
    color: "#475569",
    fontSize: 13,
    lineHeight: 19,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 12,
  },

  consentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 2,
  },

  consentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 6,
  },

  consentTextContainer: {
    flex: 1,
    paddingRight: 12,
  },

  rowTitle: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  consentTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },

  requiredBadge: {
    marginLeft: 8,
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },

  requiredText: {
    color: "#2563EB",
    fontSize: 10,
    fontWeight: "700",
  },

  consentDescription: {
    marginTop: 6,
    fontSize: 13,
    color: "#64748B",
    lineHeight: 19,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 15,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 10,
  },

  infoText: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 21,
    marginBottom: 4,
  },

  primaryButton: {
    marginTop: 25,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});
