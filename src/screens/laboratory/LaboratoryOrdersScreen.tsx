import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const orders = [
  {
    id: "LAB-00124",
    patient: "Patient A",
    test: "Complete Blood Count",
    provider: "Dr. Provider",
    priority: "Urgent",
    status: "Pending",
    time: "10:42 AM",
  },
  {
    id: "LAB-00123",
    patient: "Patient B",
    test: "Malaria Test",
    provider: "Dr. Provider",
    priority: "Routine",
    status: "Ready",
    time: "10:20 AM",
  },
  {
    id: "LAB-00122",
    patient: "Patient C",
    test: "Blood Chemistry",
    provider: "Dr. Provider",
    priority: "Routine",
    status: "Reviewed",
    time: "09:48 AM",
  },
];

export default function LaboratoryOrdersScreen() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.patient.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.test.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || order.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Laboratory Orders</Text>

        <Text style={styles.subtitle}>
          Review and manage laboratory requests from healthcare providers.
        </Text>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search patient, order or test..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          {["All", "Pending", "Ready", "Reviewed"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filterButton,
                filter === item && styles.activeFilter,
              ]}
              onPress={() => setFilter(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === item && styles.activeFilterText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.countRow}>
          <Text style={styles.countText}>
            {filteredOrders.length} laboratory orders
          </Text>

          <Text style={styles.today}>Today</Text>
        </View>

        {filteredOrders.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderCard}
            activeOpacity={0.8}
          >
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{order.id}</Text>

              <StatusBadge status={order.status} />
            </View>

            <Text style={styles.patient}>{order.patient}</Text>

            <Text style={styles.test}>{order.test}</Text>

            <View style={styles.divider} />

            <View style={styles.detailsRow}>
              <Text style={styles.detail}>Provider: {order.provider}</Text>

              <Text style={styles.detail}>{order.time}</Text>
            </View>

            <View style={styles.bottomRow}>
              <View
                style={[
                  styles.priorityBadge,
                  order.priority === "Urgent" ? styles.urgent : styles.routine,
                ]}
              >
                <Text
                  style={[
                    styles.priorityText,
                    order.priority === "Urgent"
                      ? styles.urgentText
                      : styles.routineText,
                  ]}
                >
                  {order.priority}
                </Text>
              </View>

              <Text style={styles.openText}>Open order ›</Text>
            </View>
          </TouchableOpacity>
        ))}

        {filteredOrders.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>⌕</Text>

            <Text style={styles.emptyTitle}>No orders found</Text>

            <Text style={styles.emptyText}>
              Try changing your search or filter.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function StatusBadge({ status }: { status: string }) {
  const ready = status === "Ready";
  const reviewed = status === "Reviewed";

  return (
    <View
      style={[
        styles.statusBadge,
        ready
          ? styles.readyBadge
          : reviewed
            ? styles.reviewedBadge
            : styles.pendingBadge,
      ]}
    >
      <Text
        style={[
          styles.statusText,
          ready
            ? styles.readyText
            : reviewed
              ? styles.reviewedText
              : styles.pendingText,
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

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 12,
    color: "#64748B",
    lineHeight: 18,
    marginBottom: 18,
  },

  searchContainer: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
  },

  searchIcon: {
    color: "#64748B",
    fontSize: 21,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    color: "#111827",
    fontSize: 12,
  },

  filterScroll: {
    marginTop: 14,
    marginBottom: 16,
  },

  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginRight: 8,
  },

  activeFilter: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  filterText: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "700",
  },

  activeFilterText: {
    color: "#FFFFFF",
  },

  countRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  countText: {
    color: "#334155",
    fontSize: 11,
    fontWeight: "700",
  },

  today: {
    color: "#2563EB",
    fontSize: 10,
    fontWeight: "800",
  },

  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 16,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderId: {
    fontSize: 10,
    color: "#64748B",
    fontWeight: "800",
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

  statusText: {
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

  patient: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },

  test: {
    marginTop: 5,
    fontSize: 12,
    color: "#334155",
  },

  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 12,
  },

  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  detail: {
    color: "#94A3B8",
    fontSize: 9,
  },

  bottomRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  priorityBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },

  urgent: {
    backgroundColor: "#EFF6FF",
  },

  routine: {
    backgroundColor: "#F1F5F9",
  },

  priorityText: {
    fontSize: 8,
    fontWeight: "800",
  },

  urgentText: {
    color: "#2563EB",
  },

  routineText: {
    color: "#64748B",
  },

  openText: {
    color: "#2563EB",
    fontSize: 10,
    fontWeight: "800",
  },

  emptyState: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 35,
    marginTop: 15,
  },

  emptyIcon: {
    fontSize: 30,
    color: "#94A3B8",
  },

  emptyTitle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },

  emptyText: {
    marginTop: 5,
    color: "#64748B",
    fontSize: 11,
  },
});
