import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type OfflineDataItem = {
  id: string;
  title: string;
  description: string;
  size: string;
  updatedAt: string;
  isAvailable: boolean;
};

type Props = {
  onBack?: () => void;
};

const initialData: OfflineDataItem[] = [
  {
    id: "1",
    title: "Health Records",
    description: "Medical history and clinical information",
    size: "12.4 MB",
    updatedAt: "Today, 10:30 AM",
    isAvailable: true,
  },
  {
    id: "2",
    title: "Appointments",
    description: "Upcoming and previous appointments",
    size: "2.1 MB",
    updatedAt: "Today, 9:15 AM",
    isAvailable: true,
  },
  {
    id: "3",
    title: "Secure Messages",
    description: "Recent conversations and messages",
    size: "8.7 MB",
    updatedAt: "Yesterday",
    isAvailable: true,
  },
  {
    id: "4",
    title: "Medication Data",
    description: "Medication schedules and reminders",
    size: "1.8 MB",
    updatedAt: "3 days ago",
    isAvailable: true,
  },
];

export default function OfflineDataScreen({ onBack }: Props) {
  const [data, setData] = useState(initialData);

  const totalSize = useMemo(() => {
    return data.reduce((total, item) => {
      return total + Number.parseFloat(item.size);
    }, 0);
  }, [data]);

  const clearAllData = () => {
    Alert.alert(
      "Clear Offline Data",
      "This will remove all downloaded data from this device. Your cloud data will not be deleted.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear Data",
          style: "destructive",
          onPress: () =>
            setData((previous) =>
              previous.map((item) => ({
                ...item,
                isAvailable: false,
              })),
            ),
        },
      ],
    );
  };

  const removeItem = (id: string, title: string) => {
    Alert.alert(
      `Remove ${title}?`,
      "This data will no longer be available while offline.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () =>
            setData((previous) =>
              previous.map((item) =>
                item.id === id ? { ...item, isAvailable: false } : item,
              ),
            ),
        },
      ],
    );
  };

  const renderItem = ({ item }: { item: OfflineDataItem }) => (
    <View
      style={[styles.dataCard, !item.isAvailable && styles.unavailableCard]}
    >
      <View style={styles.dataIcon}>
        <Text style={styles.dataIconText}>▣</Text>
      </View>

      <View style={styles.dataContent}>
        <View style={styles.titleRow}>
          <Text style={styles.dataTitle}>{item.title}</Text>

          <View
            style={[
              styles.availabilityBadge,
              !item.isAvailable && styles.unavailableBadge,
            ]}
          >
            <Text
              style={[
                styles.availabilityText,
                !item.isAvailable && styles.unavailableText,
              ]}
            >
              {item.isAvailable ? "Available" : "Removed"}
            </Text>
          </View>
        </View>

        <Text style={styles.dataDescription}>{item.description}</Text>

        <Text style={styles.dataMeta}>
          {item.isAvailable
            ? `${item.size} • Updated ${item.updatedAt}`
            : "Not available offline"}
        </Text>

        {item.isAvailable && (
          <Pressable
            style={styles.removeButton}
            onPress={() => removeItem(item.id, item.title)}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </Pressable>
        )}
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
          <Text style={styles.title}>Offline Data</Text>
          <Text style={styles.subtitle}>
            Manage information stored on this device
          </Text>
        </View>
      </View>

      <View style={styles.storageCard}>
        <View>
          <Text style={styles.storageTitle}>Offline Storage</Text>
          <Text style={styles.storageSize}>
            {totalSize.toFixed(1)} MB currently available
          </Text>
        </View>

        <Text style={styles.storageIcon}>▣</Text>
      </View>

      <Pressable style={styles.clearButton} onPress={clearAllData}>
        <Text style={styles.clearButtonText}>Clear All Offline Data</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Downloaded Data</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <Text style={styles.footerText}>
            Offline data is stored securely on this device and can be
            synchronized when an internet connection is available.
          </Text>
        }
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
    color: "#64748B",
  },
  storageCard: {
    margin: 20,
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  storageTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E40AF",
  },
  storageSize: {
    marginTop: 5,
    fontSize: 12,
    color: "#3B82F6",
  },
  storageIcon: {
    fontSize: 30,
    color: "#2563EB",
  },
  clearButton: {
    height: 48,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#DC2626",
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  dataCard: {
    padding: 14,
    marginBottom: 10,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  unavailableCard: {
    opacity: 0.65,
  },
  dataIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    marginRight: 12,
  },
  dataIconText: {
    fontSize: 20,
    color: "#2563EB",
  },
  dataContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dataTitle: {
    flex: 1,
    marginRight: 8,
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
  },
  availabilityBadge: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 7,
    backgroundColor: "#DCFCE7",
  },
  unavailableBadge: {
    backgroundColor: "#E2E8F0",
  },
  availabilityText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#16A34A",
  },
  unavailableText: {
    color: "#64748B",
  },
  dataDescription: {
    marginTop: 5,
    fontSize: 12,
    color: "#64748B",
  },
  dataMeta: {
    marginTop: 7,
    fontSize: 10,
    color: "#94A3B8",
  },
  removeButton: {
    alignSelf: "flex-start",
    marginTop: 10,
  },
  removeButtonText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#DC2626",
  },
  footerText: {
    marginTop: 10,
    paddingHorizontal: 8,
    textAlign: "center",
    fontSize: 11,
    lineHeight: 17,
    color: "#94A3B8",
  },
});
