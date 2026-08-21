import React from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type SyncChange = {
  id: string;
  title: string;
  description: string;
  time: string;
  status: "Synced" | "Uploaded" | "Downloaded";
};

type Props = {
  syncId?: string;
  onBack?: () => void;
};

const changes: SyncChange[] = [
  {
    id: "1",
    title: "Medical profile updated",
    description: "Personal information synchronized successfully.",
    time: "Just now",
    status: "Synced",
  },
  {
    id: "2",
    title: "New appointment downloaded",
    description: "Your latest appointment information is available offline.",
    time: "2 minutes ago",
    status: "Downloaded",
  },
  {
    id: "3",
    title: "Health record uploaded",
    description: "A new record was securely uploaded to the server.",
    time: "10 minutes ago",
    status: "Uploaded",
  },
];

export default function SyncDetailsScreen({ syncId, onBack }: Props) {
  const renderItem = ({ item }: { item: SyncChange }) => (
    <View style={styles.changeCard}>
      <View style={styles.timelineDot} />

      <View style={styles.changeContent}>
        <Text style={styles.changeTitle}>{item.title}</Text>
        <Text style={styles.changeDescription}>{item.description}</Text>

        <View style={styles.footer}>
          <Text style={styles.time}>{item.time}</Text>

          <Text style={styles.status}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <View style={styles.headerContent}>
          <Text style={styles.title}>Sync Details</Text>
          <Text style={styles.subtitle}>
            Synchronization ID: {syncId ?? "N/A"}
          </Text>
        </View>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusIcon}>
          <Text style={styles.statusIconText}>✓</Text>
        </View>

        <View>
          <Text style={styles.statusTitle}>Successfully Synced</Text>
          <Text style={styles.statusText}>
            Your data is currently up to date.
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Activity</Text>

      <FlatList
        data={changes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    fontSize: 34,
    lineHeight: 34,
    color: "#334155",
  },
  headerContent: {
    marginLeft: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 3,
    fontSize: 11,
    color: "#94A3B8",
  },
  statusCard: {
    margin: 20,
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  statusIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
  },
  statusIconText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#16A34A",
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#065F46",
  },
  statusText: {
    marginTop: 4,
    fontSize: 12,
    color: "#047857",
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  changeCard: {
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 5,
    marginRight: 12,
    backgroundColor: "#2563EB",
  },
  changeContent: {
    flex: 1,
  },
  changeTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
  },
  changeDescription: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
    color: "#64748B",
  },
  footer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {
    fontSize: 11,
    color: "#94A3B8",
  },
  status: {
    fontSize: 11,
    fontWeight: "600",
    color: "#16A34A",
  },
});
