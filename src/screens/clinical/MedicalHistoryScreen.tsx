import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  blue: "#1565D8",
  white: "#FFFFFF",
  black: "#111827",
  gray500: "#6B7280",
  gray300: "#D1D5DB",
  gray200: "#E5E7EB",
  background: "#F7F9FC",
  lightBlue: "#EAF2FF",
};

export default function MedicalHistoryScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.label}>PATIENT RECORD</Text>
        <Text style={styles.title}>Medical history</Text>

        <View style={styles.patientCard}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={24} color={COLORS.blue} />
          </View>

          <View>
            <Text style={styles.patientName}>Patient #RH-2026-0148</Text>
            <Text style={styles.patientDetails}>32 years • Female</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Previous visits</Text>

        <HistoryItem
          date="18 Aug 2026"
          facility="Kiziba Health Facility"
          diagnosis="Respiratory infection"
        />

        <HistoryItem
          date="04 Jul 2026"
          facility="Kiziba Health Facility"
          diagnosis="Routine follow-up"
        />

        <HistoryItem
          date="12 May 2026"
          facility="Referral Hospital"
          diagnosis="General assessment"
        />

        <Text style={styles.sectionTitle}>Known information</Text>

        <InfoCard
          title="Allergies"
          value="No known allergies recorded"
          icon="warning-outline"
        />

        <InfoCard
          title="Chronic conditions"
          value="No chronic conditions recorded"
          icon="heart-outline"
        />

        <InfoCard
          title="Current medications"
          value="No active medication recorded"
          icon="medkit-outline"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function HistoryItem({
  date,
  facility,
  diagnosis,
}: {
  date: string;
  facility: string;
  diagnosis: string;
}) {
  return (
    <View style={styles.historyCard}>
      <View style={styles.timeline}>
        <View style={styles.timelineDot} />
        <View style={styles.timelineLine} />
      </View>

      <View style={styles.historyContent}>
        <Text style={styles.historyDate}>{date}</Text>
        <Text style={styles.historyFacility}>{facility}</Text>
        <Text style={styles.historyDiagnosis}>{diagnosis}</Text>
      </View>

      <Ionicons name="chevron-forward" size={19} color={COLORS.gray300} />
    </View>
  );
}

function InfoCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={styles.infoCard}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={20} color={COLORS.blue} />
      </View>

      <View style={styles.infoContent}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  label: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.2,
    color: COLORS.blue,
  },

  title: {
    marginTop: 5,
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.black,
  },

  patientCard: {
    marginTop: 22,
    padding: 16,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  patientName: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.black,
  },

  patientDetails: {
    marginLeft: 12,
    marginTop: 4,
    fontSize: 10,
    color: COLORS.gray500,
  },

  sectionTitle: {
    marginTop: 27,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "850",
    color: COLORS.black,
  },

  historyCard: {
    minHeight: 83,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    marginBottom: 10,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
  },

  timeline: {
    width: 20,
    alignItems: "center",
    alignSelf: "stretch",
  },

  timelineDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: COLORS.blue,
    marginTop: 5,
  },

  timelineLine: {
    flex: 1,
    width: 1,
    backgroundColor: COLORS.gray200,
    marginTop: 4,
  },

  historyContent: {
    flex: 1,
    marginLeft: 8,
  },

  historyDate: {
    fontSize: 10,
    color: COLORS.blue,
    fontWeight: "700",
  },

  historyFacility: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.black,
  },

  historyDiagnosis: {
    marginTop: 3,
    fontSize: 10,
    color: COLORS.gray500,
  },

  infoCard: {
    padding: 14,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  infoIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  infoContent: {
    flex: 1,
    marginLeft: 12,
  },

  infoTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.black,
  },

  infoValue: {
    marginTop: 4,
    fontSize: 10,
    color: COLORS.gray500,
  },
});
