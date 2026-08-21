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

type Props = {
  onStartConsultation?: () => void;
  onMedicalHistory?: () => void;
  onLaboratory?: () => void;
};

const COLORS = {
  blue: "#1565D8",
  darkBlue: "#0F4CBA",
  white: "#FFFFFF",
  black: "#111827",
  gray700: "#374151",
  gray500: "#6B7280",
  gray300: "#D1D5DB",
  gray200: "#E5E7EB",
  background: "#F7F9FC",
  lightBlue: "#EAF2FF",
  green: "#16855B",
  lightGreen: "#E9F8F1",
  orange: "#D97706",
  lightOrange: "#FFF5E6",
};

export default function ProviderDashboardScreen({
  onStartConsultation,
  onMedicalHistory,
  onLaboratory,
}: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.smallLabel}>REFUHEALTH CLINICAL</Text>
            <Text style={styles.greeting}>Good morning, Doctor</Text>
          </View>

          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={COLORS.black}
            />

            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Provider Card */}
        <View style={styles.providerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>DR</Text>
          </View>

          <View style={styles.providerInfo}>
            <Text style={styles.providerName}>Dr. Healthcare Provider</Text>
            <Text style={styles.providerRole}>
              Clinical Provider • Kiziba Hospital
            </Text>
          </View>

          <View style={styles.onlineBadge}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online</Text>
          </View>
        </View>

        {/* Today's Overview */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's overview</Text>

          <Text style={styles.dateText}>21 Aug 2026</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="people-outline" size={21} color={COLORS.blue} />
            </View>

            <Text style={styles.statNumber}>18</Text>
            <Text style={styles.statLabel}>Patients</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="time-outline" size={21} color={COLORS.orange} />
            </View>

            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Waiting</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons
                name="checkmark-circle-outline"
                size={21}
                color={COLORS.green}
              />
            </View>

            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        {/* Current Patient */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Next patient</Text>

          <View style={styles.waitingBadge}>
            <Text style={styles.waitingText}>WAITING</Text>
          </View>
        </View>

        <View style={styles.patientCard}>
          <View style={styles.patientAvatar}>
            <Ionicons name="person-outline" size={25} color={COLORS.blue} />
          </View>

          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>Patient #RH-2026-0148</Text>
            <Text style={styles.patientDetails}>32 years • Female</Text>
            <Text style={styles.patientDetails}>General consultation</Text>
          </View>

          <Ionicons name="chevron-forward" size={21} color={COLORS.gray300} />
        </View>

        {/* Main Action */}
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={onStartConsultation}
        >
          <View style={styles.primaryIcon}>
            <Ionicons name="medkit-outline" size={20} color={COLORS.blue} />
          </View>

          <Text style={styles.primaryText}>Start Consultation</Text>
        </TouchableOpacity>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Clinical tools</Text>

        <View style={styles.toolsGrid}>
          <TouchableOpacity style={styles.toolCard} onPress={onMedicalHistory}>
            <View style={styles.toolIcon}>
              <Ionicons
                name="document-text-outline"
                size={23}
                color={COLORS.blue}
              />
            </View>

            <Text style={styles.toolTitle}>Medical History</Text>
            <Text style={styles.toolSubtitle}>Patient records</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolCard} onPress={onLaboratory}>
            <View style={styles.toolIcon}>
              <Ionicons name="flask-outline" size={23} color={COLORS.blue} />
            </View>

            <Text style={styles.toolTitle}>Laboratory</Text>
            <Text style={styles.toolSubtitle}>Request tests</Text>
          </TouchableOpacity>
        </View>

        {/* Security */}
        <View style={styles.security}>
          <Ionicons
            name="shield-checkmark-outline"
            size={17}
            color={COLORS.blue}
          />

          <Text style={styles.securityText}>
            Patient information is protected and accessible only to authorized
            healthcare providers.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  smallLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: COLORS.blue,
  },

  greeting: {
    marginTop: 5,
    fontSize: 25,
    fontWeight: "900",
    color: COLORS.black,
  },

  notificationButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },

  notificationDot: {
    position: "absolute",
    top: 11,
    right: 11,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.blue,
  },

  providerCard: {
    marginTop: 22,
    padding: 16,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 18,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "900",
  },

  providerInfo: {
    flex: 1,
    marginLeft: 12,
  },

  providerName: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.black,
  },

  providerRole: {
    marginTop: 4,
    fontSize: 11,
    color: COLORS.gray500,
  },

  onlineBadge: {
    flexDirection: "row",
    alignItems: "center",
  },

  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.green,
    marginRight: 5,
  },

  onlineText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.green,
  },

  sectionHeader: {
    marginTop: 27,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "850",
    color: COLORS.black,
    marginBottom: 12,
  },

  dateText: {
    fontSize: 11,
    color: COLORS.gray500,
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
  },

  statCard: {
    flex: 1,
    padding: 13,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },

  statIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  statNumber: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.black,
  },

  statLabel: {
    marginTop: 2,
    fontSize: 10,
    color: COLORS.gray500,
  },

  waitingBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: COLORS.lightOrange,
  },

  waitingText: {
    fontSize: 8,
    fontWeight: "900",
    color: COLORS.orange,
  },

  patientCard: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    flexDirection: "row",
    alignItems: "center",
  },

  patientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 17,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  patientInfo: {
    flex: 1,
    marginLeft: 12,
  },

  patientName: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.black,
  },

  patientDetails: {
    marginTop: 3,
    fontSize: 10,
    color: COLORS.gray500,
  },

  primaryButton: {
    height: 58,
    marginTop: 15,
    marginBottom: 28,
    borderRadius: 29,
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  primaryText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },

  toolsGrid: {
    flexDirection: "row",
    gap: 12,
  },

  toolCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },

  toolIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  toolTitle: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.black,
  },

  toolSubtitle: {
    marginTop: 3,
    fontSize: 10,
    color: COLORS.gray500,
  },

  security: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  securityText: {
    flex: 1,
    marginLeft: 7,
    fontSize: 9,
    lineHeight: 14,
    color: COLORS.gray500,
  },
});
