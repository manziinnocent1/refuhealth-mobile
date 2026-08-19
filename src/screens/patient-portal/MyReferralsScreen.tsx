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
  orange: "#EA580C",
};

export default function MyReferralsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <Ionicons
              name="git-network-outline"
              size={25}
              color={COLORS.blue}
            />
          </View>

          <View style={styles.headerText}>
            <Text style={styles.title}>My Referrals</Text>
            <Text style={styles.subtitle}>
              Track your healthcare referrals.
            </Text>
          </View>
        </View>

        <ReferralCard
          facility="District Hospital"
          reason="Specialist Consultation"
          date="24 August 2026"
          status="Pending"
          statusColor={COLORS.orange}
        />

        <ReferralCard
          facility="Refugee Health Centre"
          reason="General Consultation"
          date="12 August 2026"
          status="Completed"
          statusColor={COLORS.green}
        />

        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle-outline"
            size={22}
            color={COLORS.blue}
          />

          <Text style={styles.infoText}>
            Your healthcare providers can securely access referral information
            when authorized.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ReferralCard({
  facility,
  reason,
  date,
  status,
  statusColor,
}: {
  facility: string;
  reason: string;
  date: string;
  status: string;
  statusColor: string;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.facilityIcon}>
          <Ionicons name="business-outline" size={22} color={COLORS.blue} />
        </View>

        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {status}
          </Text>
        </View>
      </View>

      <Text style={styles.facility}>{facility}</Text>

      <Text style={styles.reason}>{reason}</Text>

      <View style={styles.dateRow}>
        <Ionicons name="calendar-outline" size={15} color={COLORS.gray500} />

        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.footerRow}>
        <Text style={styles.reference}>REF-RF-000001</Text>

        <Ionicons name="chevron-forward" size={18} color={COLORS.gray500} />
      </View>
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

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 21,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    marginBottom: 15,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  facilityIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "800",
  },

  facility: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.black,
  },

  reason: {
    marginTop: 5,
    fontSize: 13,
    color: COLORS.gray700,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
  },

  date: {
    marginLeft: 6,
    fontSize: 11,
    color: COLORS.gray500,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginVertical: 15,
  },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  reference: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.gray500,
  },

  infoCard: {
    flexDirection: "row",
    backgroundColor: "#EAF2FF",
    borderRadius: 17,
    padding: 15,
    alignItems: "center",
    marginTop: 5,
  },

  infoText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 11,
    lineHeight: 17,
    color: COLORS.gray700,
  },
});
