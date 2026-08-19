import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  blue: "#1565D8",
  white: "#FFFFFF",
  black: "#111827",
  gray700: "#374151",
  gray500: "#6B7280",
  gray200: "#E5E7EB",
  background: "#F8FAFC",
  green: "#16A34A",
};

export default function MyMedicalInformationScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <Ionicons name="medical-outline" size={25} color={COLORS.blue} />
          </View>

          <View style={styles.headerText}>
            <Text style={styles.title}>Medical Information</Text>
            <Text style={styles.subtitle}>Your personal health record.</Text>
          </View>
        </View>

        <InfoSection title="Personal Information">
          <InfoRow label="Full Name" value="Patient Name" />
          <InfoRow label="Patient ID" value="RF-000001" />
          <InfoRow label="Date of Birth" value="Not available" />
          <InfoRow label="Gender" value="Not available" />
        </InfoSection>

        <InfoSection title="Medical History">
          <InfoRow label="Known Conditions" value="No information" />
          <InfoRow label="Allergies" value="No known allergies" />
          <InfoRow label="Current Medications" value="None recorded" />
        </InfoSection>

        <InfoSection title="Recent Health Information">
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="heart-outline" size={24} color={COLORS.blue} />
            </View>

            <Text style={styles.emptyTitle}>No recent information</Text>

            <Text style={styles.emptyText}>
              Your healthcare provider will add information after your medical
              visits.
            </Text>
          </View>
        </InfoSection>

        <View style={styles.securityNotice}>
          <Ionicons name="lock-closed-outline" size={20} color={COLORS.blue} />

          <Text style={styles.securityText}>
            Your medical information is private and can only be accessed by
            authorized users.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 22,
    paddingBottom: 45,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    marginLeft: 14,
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.black,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.gray500,
  },

  section: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: 14,
  },

  infoRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },

  label: {
    fontSize: 11,
    color: COLORS.gray500,
  },

  value: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.gray700,
  },

  emptyState: {
    alignItems: "center",
    paddingVertical: 15,
  },

  emptyIcon: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.black,
  },

  emptyText: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.gray500,
    textAlign: "center",
  },

  securityNotice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF2FF",
    borderRadius: 16,
    padding: 15,
  },

  securityText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 11,
    lineHeight: 17,
    color: COLORS.gray700,
  },
});
