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
  darkBlue: "#0F4CBA",
  white: "#FFFFFF",
  black: "#111827",
  gray700: "#374151",
  gray500: "#6B7280",
  gray200: "#E5E7EB",
  gray100: "#F3F4F6",
  background: "#F8FAFC",
  green: "#16A34A",
  orange: "#EA580C",
};

export default function HealthDashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.name}>Welcome back 👋</Text>
          </View>

          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons
              name="notifications-outline"
              size={23}
              color={COLORS.black}
            />

            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Health Card */}
        <View style={styles.healthCard}>
          <View style={styles.healthCardTop}>
            <View>
              <Text style={styles.healthLabel}>YOUR HEALTH RECORD</Text>
              <Text style={styles.patientName}>Patient Name</Text>
              <Text style={styles.patientId}>Patient ID: RF-000001</Text>
            </View>

            <View style={styles.healthIcon}>
              <Ionicons name="heart-outline" size={26} color={COLORS.blue} />
            </View>
          </View>

          <View style={styles.healthDivider} />

          <View style={styles.healthBottom}>
            <View>
              <Text style={styles.smallLabel}>Record Status</Text>

              <View style={styles.activeRow}>
                <View style={styles.activeDot} />
                <Text style={styles.activeText}>Active</Text>
              </View>
            </View>

            <TouchableOpacity>
              <Text style={styles.viewRecord}>View record</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick access</Text>

        <View style={styles.quickGrid}>
          <QuickAction
            icon="medical-outline"
            title="Medical"
            subtitle="Health information"
          />

          <QuickAction
            icon="git-network-outline"
            title="Referrals"
            subtitle="Referral history"
          />

          <QuickAction
            icon="calendar-outline"
            title="Appointments"
            subtitle="Upcoming visits"
          />

          <QuickAction
            icon="document-text-outline"
            title="Documents"
            subtitle="Medical documents"
          />
        </View>

        {/* Upcoming Appointment */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Next appointment</Text>

          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.appointmentCard}>
          <View style={styles.dateBox}>
            <Text style={styles.dateMonth}>AUG</Text>
            <Text style={styles.dateNumber}>24</Text>
          </View>

          <View style={styles.appointmentInfo}>
            <Text style={styles.appointmentTitle}>General Consultation</Text>

            <Text style={styles.appointmentDoctor}>Healthcare Provider</Text>

            <View style={styles.timeRow}>
              <Ionicons name="time-outline" size={15} color={COLORS.gray500} />

              <Text style={styles.timeText}>10:30 AM</Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={20} color={COLORS.gray500} />
        </View>

        {/* Health Summary */}
        <Text style={styles.sectionTitle}>Health summary</Text>

        <View style={styles.summaryCard}>
          <SummaryItem
            icon="pulse-outline"
            title="Latest Visit"
            value="No recent visit"
          />

          <SummaryItem
            icon="document-text-outline"
            title="Medical Documents"
            value="0 documents"
          />

          <SummaryItem
            icon="git-network-outline"
            title="Active Referrals"
            value="0 referrals"
          />
        </View>

        <Text style={styles.footer}>RefuHealth • Your health, connected</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function QuickAction({
  icon,
  title,
  subtitle,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
}) {
  return (
    <TouchableOpacity style={styles.quickCard} activeOpacity={0.8}>
      <View style={styles.quickIcon}>
        <Ionicons name={icon} size={22} color={COLORS.blue} />
      </View>

      <Text style={styles.quickTitle}>{title}</Text>
      <Text style={styles.quickSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

function SummaryItem({
  icon,
  title,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string;
}) {
  return (
    <View style={styles.summaryItem}>
      <View style={styles.summaryIcon}>
        <Ionicons name={icon} size={20} color={COLORS.blue} />
      </View>

      <View style={styles.summaryInfo}>
        <Text style={styles.summaryTitle}>{title}</Text>
        <Text style={styles.summaryValue}>{value}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color={COLORS.gray500} />
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
    justifyContent: "space-between",
    marginBottom: 22,
  },

  greeting: {
    fontSize: 13,
    color: COLORS.gray500,
  },

  name: {
    marginTop: 3,
    fontSize: 23,
    fontWeight: "800",
    color: COLORS.black,
  },

  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },

  notificationDot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.blue,
    top: 10,
    right: 11,
  },

  healthCard: {
    backgroundColor: COLORS.blue,
    borderRadius: 25,
    padding: 20,
    marginBottom: 26,
  },

  healthCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  healthLabel: {
    color: "#DDEAFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },

  patientName: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 8,
  },

  patientId: {
    color: "#DDEAFF",
    fontSize: 12,
    marginTop: 4,
  },

  healthIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  healthDivider: {
    height: 1,
    backgroundColor: "#4C88E6",
    marginVertical: 20,
  },

  healthBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  smallLabel: {
    color: "#DDEAFF",
    fontSize: 11,
  },

  activeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#8EF0B1",
    marginRight: 6,
  },

  activeText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 13,
  },

  viewRecord: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: 14,
  },

  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 26,
  },

  quickCard: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },

  quickIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  quickTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.black,
  },

  quickSubtitle: {
    fontSize: 11,
    color: COLORS.gray500,
    marginTop: 4,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  seeAll: {
    color: COLORS.blue,
    fontSize: 12,
    fontWeight: "700",
  },

  appointmentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.gray200,
    marginBottom: 26,
  },

  dateBox: {
    width: 52,
    height: 60,
    borderRadius: 15,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
  },

  dateMonth: {
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.blue,
  },

  dateNumber: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.blue,
  },

  appointmentInfo: {
    flex: 1,
    marginLeft: 13,
  },

  appointmentTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.black,
  },

  appointmentDoctor: {
    fontSize: 11,
    color: COLORS.gray500,
    marginTop: 4,
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  timeText: {
    marginLeft: 5,
    fontSize: 11,
    color: COLORS.gray500,
  },

  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    paddingHorizontal: 15,
  },

  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },

  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
  },

  summaryInfo: {
    flex: 1,
    marginLeft: 12,
  },

  summaryTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.black,
  },

  summaryValue: {
    marginTop: 3,
    fontSize: 11,
    color: COLORS.gray500,
  },

  footer: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 11,
    color: COLORS.gray500,
  },
});
