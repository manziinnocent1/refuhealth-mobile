import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const consentHistory = [
  {
    title: "Healthcare Services",
    action: "Consent granted",
    date: "12 August 2026",
    time: "09:42 AM",
    status: "Active",
  },
  {
    title: "Care Coordination",
    action: "Consent updated",
    date: "08 August 2026",
    time: "02:15 PM",
    status: "Active",
  },
  {
    title: "Health Research",
    action: "Consent declined",
    date: "01 August 2026",
    time: "11:20 AM",
    status: "Declined",
  },
];

export default function ConsentHistoryScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Consent History</Text>
          <Text style={styles.subtitle}>
            Review your previous consent decisions and updates.
          </Text>
        </View>

        <View style={styles.timeline}>
          {consentHistory.map((item, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.dot,
                    item.status === "Active"
                      ? styles.activeDot
                      : styles.declinedDot,
                  ]}
                />

                {index !== consentHistory.length - 1 && (
                  <View style={styles.line} />
                )}
              </View>

              <View style={styles.historyCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.consentTitle}>{item.title}</Text>

                  <View
                    style={[
                      styles.statusBadge,
                      item.status === "Active"
                        ? styles.activeBadge
                        : styles.declinedBadge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        item.status === "Active"
                          ? styles.activeText
                          : styles.declinedText,
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>

                <Text style={styles.action}>{item.action}</Text>

                <Text style={styles.date}>
                  {item.date} • {item.time}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.securityCard}>
          <Text style={styles.securityTitle}>🔒 Secure record</Text>

          <Text style={styles.securityText}>
            Your consent history is maintained as part of your healthcare record
            and should only be accessible to authorized users.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    marginBottom: 28,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 7,
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },

  timeline: {
    marginBottom: 20,
  },

  timelineItem: {
    flexDirection: "row",
  },

  timelineLeft: {
    width: 28,
    alignItems: "center",
  },

  dot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    marginTop: 20,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },

  activeDot: {
    backgroundColor: "#2563EB",
  },

  declinedDot: {
    backgroundColor: "#64748B",
  },

  line: {
    width: 2,
    flex: 1,
    backgroundColor: "#DBEAFE",
    marginTop: 5,
  },

  historyCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 17,
    marginBottom: 14,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  consentTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },

  statusBadge: {
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginLeft: 8,
  },

  activeBadge: {
    backgroundColor: "#EFF6FF",
  },

  declinedBadge: {
    backgroundColor: "#F1F5F9",
  },

  statusText: {
    fontSize: 10,
    fontWeight: "800",
  },

  activeText: {
    color: "#2563EB",
  },

  declinedText: {
    color: "#475569",
  },

  action: {
    marginTop: 9,
    fontSize: 13,
    color: "#334155",
    fontWeight: "600",
  },

  date: {
    marginTop: 6,
    fontSize: 12,
    color: "#94A3B8",
  },

  securityCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 18,
    padding: 17,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },

  securityTitle: {
    color: "#1E3A8A",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 6,
  },

  securityText: {
    color: "#475569",
    fontSize: 13,
    lineHeight: 19,
  },
});
