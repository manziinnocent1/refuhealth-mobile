import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const documents = [
  {
    id: "1",
    title: "Laboratory Report",
    category: "Laboratory",
    date: "12 Aug 2026",
    size: "1.2 MB",
    type: "PDF",
  },
  {
    id: "2",
    title: "Referral Letter",
    category: "Referral",
    date: "08 Aug 2026",
    size: "860 KB",
    type: "PDF",
  },
  {
    id: "3",
    title: "Prescription",
    category: "Medication",
    date: "05 Aug 2026",
    size: "540 KB",
    type: "PDF",
  },
  {
    id: "4",
    title: "Consultation Summary",
    category: "Clinical",
    date: "01 Aug 2026",
    size: "920 KB",
    type: "PDF",
  },
];

export default function DocumentCenterScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Documents</Text>
            <Text style={styles.subtitle}>
              Your healthcare documents in one secure place.
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>▣</Text>
          </View>
        </View>

        {/* Storage / Security Card */}
        <View style={styles.securityCard}>
          <View style={styles.securityIcon}>
            <Text>🔒</Text>
          </View>

          <View style={styles.securityContent}>
            <Text style={styles.securityTitle}>Secure document storage</Text>

            <Text style={styles.securityText}>
              Your medical documents are protected and available to authorized
              healthcare providers.
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.uploadButton} activeOpacity={0.85}>
            <Text style={styles.uploadIcon}>＋</Text>
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>

          <View style={styles.documentCount}>
            <Text style={styles.countNumber}>{documents.length}</Text>
            <Text style={styles.countLabel}>Documents</Text>
          </View>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Document categories</Text>

        <View style={styles.categories}>
          <CategoryCard icon="🧪" title="Laboratory" count="1" />
          <CategoryCard icon="📋" title="Referrals" count="1" />
          <CategoryCard icon="💊" title="Prescriptions" count="1" />
          <CategoryCard icon="🩺" title="Clinical" count="1" />
        </View>

        {/* Recent Documents */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent documents</Text>

          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        {documents.map((document) => (
          <TouchableOpacity
            key={document.id}
            style={styles.documentCard}
            activeOpacity={0.8}
          >
            <View style={styles.fileIcon}>
              <Text style={styles.fileIconText}>PDF</Text>
            </View>

            <View style={styles.documentInfo}>
              <Text style={styles.documentTitle}>{document.title}</Text>

              <Text style={styles.documentMeta}>
                {document.category} • {document.date}
              </Text>

              <Text style={styles.documentSize}>{document.size}</Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function CategoryCard({
  icon,
  title,
  count,
}: {
  icon: string;
  title: string;
  count: string;
}) {
  return (
    <TouchableOpacity style={styles.categoryCard} activeOpacity={0.8}>
      <Text style={styles.categoryIcon}>{icon}</Text>

      <Text style={styles.categoryTitle}>{title}</Text>

      <Text style={styles.categoryCount}>{count} document</Text>
    </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 13,
    lineHeight: 19,
    maxWidth: 280,
  },

  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  headerIconText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
  },

  securityCard: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    borderRadius: 20,
    padding: 17,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    marginBottom: 20,
  },

  securityIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  securityContent: {
    flex: 1,
  },

  securityTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1E3A8A",
  },

  securityText: {
    marginTop: 5,
    fontSize: 12,
    color: "#475569",
    lineHeight: 18,
  },

  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 25,
  },

  uploadButton: {
    flex: 1,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  uploadIcon: {
    color: "#FFFFFF",
    fontSize: 25,
    marginRight: 8,
  },

  uploadText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 14,
  },

  documentCount: {
    width: 110,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  countNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2563EB",
  },

  countLabel: {
    marginTop: 2,
    fontSize: 10,
    color: "#64748B",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 12,
  },

  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 25,
  },

  categoryCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  categoryIcon: {
    fontSize: 22,
    marginBottom: 8,
  },

  categoryTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#111827",
  },

  categoryCount: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 11,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  viewAll: {
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "800",
  },

  documentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  fileIcon: {
    width: 46,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  fileIconText: {
    color: "#2563EB",
    fontSize: 11,
    fontWeight: "900",
  },

  documentInfo: {
    flex: 1,
  },

  documentTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },

  documentMeta: {
    marginTop: 4,
    fontSize: 11,
    color: "#64748B",
  },

  documentSize: {
    marginTop: 3,
    fontSize: 10,
    color: "#94A3B8",
  },

  arrow: {
    fontSize: 27,
    color: "#2563EB",
  },
});
