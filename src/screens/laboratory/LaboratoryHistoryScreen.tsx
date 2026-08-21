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

const history = [
  {
    date: "21 Aug 2026",
    test: "Complete Blood Count",
    facility: "Refugee Hospital",
    status: "Reviewed",
    orderId: "LAB-00124",
  },
  {
    date: "12 Aug 2026",
    test: "Malaria Test",
    facility: "Refugee Hospital",
    status: "Reviewed",
    orderId: "LAB-00112",
  },
  {
    date: "02 Jul 2026",
    test: "Blood Chemistry",
    facility: "District Hospital",
    status: "Reviewed",
    orderId: "LAB-00087",
  },
];

export default function LaboratoryHistoryScreen() {
  const [search, setSearch] = useState("");

  const filteredHistory = history.filter(
    (item) =>
      item.test.toLowerCase().includes(search.toLowerCase()) ||
      item.facility.toLowerCase().includes(search.toLowerCase()) ||
      item.orderId.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Laboratory History</Text>

        <Text style={styles.subtitle}>
          View previous laboratory investigations across authorized healthcare
          facilities.
        </Text>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search tests, facilities or order ID..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.summaryCard}>
          <View>
            <Text style={styles.summaryNumber}>03</Text>
            <Text style={styles.summaryLabel}>Recorded investigations</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View>
            <Text style={styles.summaryNumber}>03</Text>
            <Text style={styles.summaryLabel}>Reviewed results</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Investigation timeline</Text>

          <Text style={styles.allText}>All time</Text>
        </View>

        {filteredHistory.map((item, index) => (
          <View key={item.orderId} style={styles.timelineItem}>
            <View style={styles.timelineColumn}>
              <View style={styles.timelineDot} />

              {index !== filteredHistory.length - 1 && (
                <View style={styles.timelineLine} />
              )}
            </View>

            <TouchableOpacity style={styles.historyCard}>
              <View style={styles.historyTop}>
                <Text style={styles.date}>{item.date}</Text>

                <View style={styles.reviewedBadge}>
                  <Text style={styles.reviewedText}>{item.status}</Text>
                </View>
              </View>

              <Text style={styles.testName}>{item.test}</Text>

              <Text style={styles.facility}>{item.facility}</Text>

              <View style={styles.bottomRow}>
                <Text style={styles.orderId}>{item.orderId}</Text>

                <Text style={styles.viewText}>View results ›</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}

        {filteredHistory.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No laboratory records</Text>

            <Text style={styles.emptyText}>
              No investigations match your search.
            </Text>
          </View>
        )}

        <View style={styles.privacyCard}>
          <Text style={styles.privacyTitle}>Privacy & access</Text>

          <Text style={styles.privacyText}>
            Laboratory history should only be visible to the patient and
            healthcare professionals with appropriate authorization.
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

  searchBox: {
    height: 50,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
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

  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    borderRadius: 20,
    padding: 19,
    marginTop: 15,
    marginBottom: 23,
  },

  summaryNumber: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
  },

  summaryLabel: {
    marginTop: 3,
    color: "#DBEAFE",
    fontSize: 9,
  },

  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#60A5FA",
    marginHorizontal: 25,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 13,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },

  allText: {
    fontSize: 10,
    color: "#2563EB",
    fontWeight: "800",
  },

  timelineItem: {
    flexDirection: "row",
  },

  timelineColumn: {
    width: 25,
    alignItems: "center",
  },

  timelineDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#2563EB",
    marginTop: 20,
  },

  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#DBEAFE",
    marginTop: 3,
  },

  historyCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  historyTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  date: {
    fontSize: 9,
    color: "#64748B",
    fontWeight: "700",
  },

  reviewedBadge: {
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  reviewedText: {
    color: "#0F172A",
    fontSize: 8,
    fontWeight: "800",
  },

  testName: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },

  facility: {
    marginTop: 5,
    color: "#64748B",
    fontSize: 10,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 13,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },

  orderId: {
    color: "#94A3B8",
    fontSize: 9,
  },

  viewText: {
    color: "#2563EB",
    fontSize: 10,
    fontWeight: "800",
  },

  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    marginTop: 15,
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },

  emptyText: {
    marginTop: 5,
    color: "#64748B",
    fontSize: 10,
  },

  privacyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  privacyTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
  },

  privacyText: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 10,
    lineHeight: 17,
  },
});
