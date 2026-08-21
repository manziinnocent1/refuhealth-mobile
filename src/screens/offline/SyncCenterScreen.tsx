import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type SyncItem = {
  id: string;
  title: string;
  description: string;
  lastSync: string;
  status: "Synced" | "Pending" | "Conflict";
  pendingCount?: number;
};

type Props = {
  onOpenSyncDetails?: (syncId: string) => void;
  onOpenConflict?: (syncId: string) => void;
  onBack?: () => void;
};

const initialData: SyncItem[] = [
  {
    id: "1",
    title: "Health Records",
    description: "Medical history and clinical records",
    lastSync: "Just now",
    status: "Synced",
  },
  {
    id: "2",
    title: "Appointments",
    description: "Upcoming and previous appointments",
    lastSync: "2 minutes ago",
    status: "Synced",
  },
  {
    id: "3",
    title: "Messages",
    description: "Secure conversations and attachments",
    lastSync: "Pending",
    status: "Pending",
    pendingCount: 4,
  },
  {
    id: "4",
    title: "Medication Records",
    description: "Medication schedules and reminders",
    lastSync: "Requires attention",
    status: "Conflict",
    pendingCount: 1,
  },
];

export default function SyncCenterScreen({
  onOpenSyncDetails,
  onOpenConflict,
  onBack,
}: Props) {
  const [syncData, setSyncData] = useState(initialData);
  const [isSyncing, setIsSyncing] = useState(false);

  const syncAll = () => {
    setIsSyncing(true);

    setTimeout(() => {
      setSyncData((previous) =>
        previous.map((item) =>
          item.status === "Conflict"
            ? item
            : {
                ...item,
                status: "Synced",
                lastSync: "Just now",
                pendingCount: 0,
              },
        ),
      );

      setIsSyncing(false);
      Alert.alert("Sync Complete", "Available data has been synchronized.");
    }, 1200);
  };

  const renderItem = ({ item }: { item: SyncItem }) => (
    <Pressable
      style={styles.syncCard}
      onPress={() => {
        if (item.status === "Conflict") {
          onOpenConflict?.(item.id);
        } else {
          onOpenSyncDetails?.(item.id);
        }
      }}
    >
      <View style={styles.syncIcon}>
        <Text style={styles.syncIconText}>↻</Text>
      </View>

      <View style={styles.syncContent}>
        <View style={styles.titleRow}>
          <Text style={styles.syncTitle}>{item.title}</Text>

          <View
            style={[
              styles.statusBadge,
              item.status === "Pending" && styles.pendingBadge,
              item.status === "Conflict" && styles.conflictBadge,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                item.status === "Pending" && styles.pendingText,
                item.status === "Conflict" && styles.conflictText,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <Text style={styles.syncDescription}>{item.description}</Text>

        <Text style={styles.lastSync}>
          {item.pendingCount
            ? `${item.pendingCount} change${item.pendingCount > 1 ? "s" : ""} • `
            : ""}
          {item.lastSync}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <View style={styles.headerContent}>
          <Text style={styles.title}>Sync Center</Text>
          <Text style={styles.subtitle}>Manage your data synchronization</Text>
        </View>
      </View>

      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryTitle}>
            {isSyncing ? "Synchronizing..." : "Ready to synchronize"}
          </Text>
          <Text style={styles.summaryText}>
            Keep your health information up to date across devices.
          </Text>
        </View>

        <Text style={styles.summaryIcon}>☁</Text>
      </View>

      <Pressable
        style={[styles.syncAllButton, isSyncing && styles.syncingButton]}
        onPress={syncAll}
        disabled={isSyncing}
      >
        <Text style={styles.syncAllText}>
          {isSyncing ? "Syncing..." : "Sync All Now"}
        </Text>
      </Pressable>

      <FlatList
        data={syncData}
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
    paddingTop: 14,
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
    fontSize: 23,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 3,
    fontSize: 12,
    color: "#64748B",
  },
  summaryCard: {
    margin: 20,
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E40AF",
  },
  summaryText: {
    width: "85%",
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
    color: "#3B82F6",
  },
  summaryIcon: {
    fontSize: 30,
  },
  syncAllButton: {
    height: 52,
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563EB",
  },
  syncingButton: {
    opacity: 0.7,
  },
  syncAllText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  listContent: {
    padding: 20,
    paddingTop: 8,
  },
  syncCard: {
    flexDirection: "row",
    padding: 14,
    marginBottom: 10,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  syncIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    marginRight: 12,
  },
  syncIconText: {
    fontSize: 23,
    color: "#2563EB",
  },
  syncContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  syncTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
    backgroundColor: "#DCFCE7",
  },
  pendingBadge: {
    backgroundColor: "#FEF3C7",
  },
  conflictBadge: {
    backgroundColor: "#FEE2E2",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#16A34A",
  },
  pendingText: {
    color: "#D97706",
  },
  conflictText: {
    color: "#DC2626",
  },
  syncDescription: {
    marginTop: 5,
    fontSize: 12,
    color: "#64748B",
  },
  lastSync: {
    marginTop: 7,
    fontSize: 11,
    color: "#94A3B8",
  },
});
