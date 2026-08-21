import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const recentOrders = [
  {
    id: "LAB-00124",
    patient: "Patient A",
    test: "Complete Blood Count",
    status: "Pending",
    time: "10:42 AM",
  },
  {
    id: "LAB-00123",
    patient: "Patient B",
    test: "Malaria Test",
    status: "Ready",
    time: "10:20 AM",
  },
  {
    id: "LAB-00122",
    patient: "Patient C",
    test: "Blood Chemistry",
    status: "Reviewed",
    time: "09:48 AM",
  },
];

export default function LaboratoryDashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Laboratory</Text>
            <Text style={styles.subtitle}>
              Manage laboratory orders, results and clinical reports.
            </Text>
          </View>

          <View style={styles.labIcon}>
            <Text style={styles.labIconText}>+</Text>
          </View>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusDot} />

          <View style={styles.statusContent}>
            <Text style={styles.statusTitle}>Laboratory services active</Text>
            <Text style={styles.statusText}>
              Orders and results are being processed normally.
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <StatCard number="12" label="Today's Orders" />
          <StatCard number="04" label="Pending" />
          <StatCard number="08" label="Completed" />
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick actions</Text>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>+</Text>
              </View>

              <Text style={styles.actionTitle}>Orders</Text>
              <Text style={styles.actionText}>View lab orders</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>✓</Text>
              </View>

              <Text style={styles.actionTitle}>Results</Text>
              <Text style={styles.actionText}>Enter results</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent laboratory orders</Text>

          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        {recentOrders.map((order) => (
          <TouchableOpacity key={order.id} style={styles.orderCard}>
            <View style={styles.orderIcon}>
              <Text style={styles.orderIconText}>L</Text>
            </View>

            <View style={styles.orderInfo}>
              <View style={styles.orderTop}>
                <Text style={styles.patientName}>{order.patient}</Text>

                <StatusBadge status={order.status} />
              </View>

              <Text style={styles.testName}>{order.test}</Text>

              <Text style={styles.orderMeta}>
                {order.id} • {order.time}
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Clinical information</Text>

          <Text style={styles.infoText}>
            Laboratory results should be verified by an authorized laboratory
            professional before being released for clinical use.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isPending = status === "Pending";
  const isReady = status === "Ready";

  return (
    <View
      style={[
        styles.statusBadge,
        isPending
          ? styles.pendingBadge
          : isReady
            ? styles.readyBadge
            : styles.reviewedBadge,
      ]}
    >
      <Text
        style={[
          styles.statusBadgeText,
          isPending
            ? styles.pendingText
            : isReady
              ? styles.readyText
              : styles.reviewedText,
        ]}
      >
        {status}
      </Text>
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
    paddingBottom: 45,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 6,
    maxWidth: 280,
    fontSize: 12,
    lineHeight: 18,
    color: "#64748B",
  },

  labIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
  },

  labIconText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
  },

  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#DBEAFE",
    borderRadius: 18,
    padding: 15,
    marginBottom: 15,
  },

  statusDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#2563EB",
    marginRight: 11,
  },

  statusContent: {
    flex: 1,
  },

  statusTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1E3A8A",
  },

  statusText: {
    marginTop: 4,
    fontSize: 10,
    color: "#64748B",
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 22,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  statNumber: {
    fontSize: 23,
    fontWeight: "900",
    color: "#0F172A",
  },

  statLabel: {
    marginTop: 4,
    fontSize: 10,
    color: "#64748B",
  },

  quickActions: {
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },

  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  actionCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  actionIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  actionIconText: {
    color: "#2563EB",
    fontSize: 18,
    fontWeight: "900",
  },

  actionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
  },

  actionText: {
    marginTop: 3,
    color: "#64748B",
    fontSize: 10,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  viewAll: {
    color: "#2563EB",
    fontSize: 11,
    fontWeight: "800",
  },

  orderCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  orderIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  orderIconText: {
    color: "#2563EB",
    fontSize: 17,
    fontWeight: "900",
  },

  orderInfo: {
    flex: 1,
  },

  orderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  patientName: {
    fontSize: 13,
    fontWeight: "800",
    color: "#111827",
  },

  testName: {
    marginTop: 5,
    color: "#334155",
    fontSize: 11,
  },

  orderMeta: {
    marginTop: 5,
    color: "#94A3B8",
    fontSize: 9,
  },

  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  pendingBadge: {
    backgroundColor: "#F1F5F9",
  },

  readyBadge: {
    backgroundColor: "#EFF6FF",
  },

  reviewedBadge: {
    backgroundColor: "#E2E8F0",
  },

  statusBadgeText: {
    fontSize: 8,
    fontWeight: "800",
  },

  pendingText: {
    color: "#475569",
  },

  readyText: {
    color: "#2563EB",
  },

  reviewedText: {
    color: "#0F172A",
  },

  arrow: {
    color: "#2563EB",
    fontSize: 25,
    marginLeft: 8,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  infoTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
  },

  infoText: {
    marginTop: 6,
    fontSize: 11,
    color: "#64748B",
    lineHeight: 18,
  },
});
