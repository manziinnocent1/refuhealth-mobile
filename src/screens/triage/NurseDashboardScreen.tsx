import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  onStartTriage?: () => void;
  onOpenVitals?: () => void;
  onOpenAssessment?: () => void;
  onSendToProvider?: () => void;
};

export default function NurseDashboardScreen({
  onStartTriage,
  onOpenVitals,
  onOpenAssessment,
  onSendToProvider,
}: Props) {
  const actions = [
    { title: "Start Triage", icon: "▶", onPress: onStartTriage },
    { title: "Record Vitals", icon: "♥", onPress: onOpenVitals },
    { title: "Assessment", icon: "✓", onPress: onOpenAssessment },
    { title: "Send to Provider", icon: "→", onPress: onSendToProvider },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Nurse Station</Text>
            <Text style={styles.subtitle}>Triage and patient assessment</Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>RN</Text>
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.number}>8</Text>
            <Text style={styles.label}>Waiting</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.number}>3</Text>
            <Text style={styles.label}>In Triage</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.number}>15</Text>
            <Text style={styles.label}>Completed</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.grid}>
          {actions.map((action) => (
            <Pressable
              key={action.title}
              style={styles.action}
              onPress={action.onPress}
            >
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={styles.actionText}>{action.title}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>Next Patient</Text>
          <Text style={styles.noticePatient}>John Doe</Text>
          <Text style={styles.noticeText}>
            Waiting for initial triage assessment.
          </Text>

          <Pressable onPress={onStartTriage}>
            <Text style={styles.noticeButton}>Start Triage</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: { fontSize: 28, fontWeight: "700", color: "#0F172A" },
  subtitle: { marginTop: 5, fontSize: 13, color: "#64748B" },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#FFFFFF", fontWeight: "700" },
  stats: { flexDirection: "row", paddingHorizontal: 20, gap: 10 },
  statCard: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  number: { fontSize: 21, fontWeight: "700", color: "#2563EB" },
  label: { marginTop: 5, fontSize: 10, color: "#64748B" },
  sectionTitle: {
    margin: 22,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: "700",
    color: "#334155",
  },
  grid: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  action: {
    width: "47%",
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  actionIcon: { fontSize: 22, color: "#2563EB" },
  actionText: {
    marginTop: 9,
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
  notice: {
    margin: 20,
    padding: 18,
    borderRadius: 15,
    backgroundColor: "#EFF6FF",
  },
  noticeTitle: { fontSize: 11, fontWeight: "700", color: "#2563EB" },
  noticePatient: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "700",
    color: "#1E40AF",
  },
  noticeText: { marginTop: 5, fontSize: 11, color: "#3B82F6" },
  noticeButton: {
    marginTop: 14,
    fontSize: 13,
    fontWeight: "700",
    color: "#2563EB",
  },
});
