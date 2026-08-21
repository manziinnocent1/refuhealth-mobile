import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type CommunicationType = "Message" | "Call" | "Video";

type HistoryItem = {
  id: string;
  name: string;
  initials: string;
  type: CommunicationType;
  description: string;
  date: string;
  status: "Completed" | "Missed" | "Sent" | "Received";
};

type CommunicationHistoryScreenProps = {
  onBack?: () => void;
  onOpenConversation?: (conversationId: string, name: string) => void;
};

const historyData: HistoryItem[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    initials: "SJ",
    type: "Message",
    description: "Test results discussed",
    date: "Today, 10:42 AM",
    status: "Received",
  },
  {
    id: "2",
    name: "Dr. Sarah Johnson",
    initials: "SJ",
    type: "Video",
    description: "Follow-up consultation",
    date: "Yesterday, 2:30 PM",
    status: "Completed",
  },
  {
    id: "3",
    name: "Nurse Emily Davis",
    initials: "ED",
    type: "Call",
    description: "Appointment reminder",
    date: "Aug 18, 9:15 AM",
    status: "Completed",
  },
  {
    id: "4",
    name: "Michael Brown",
    initials: "MB",
    type: "Message",
    description: "General health inquiry",
    date: "Aug 16, 4:20 PM",
    status: "Sent",
  },
  {
    id: "5",
    name: "Dr. James Wilson",
    initials: "JW",
    type: "Call",
    description: "Follow-up call",
    date: "Aug 14, 11:00 AM",
    status: "Missed",
  },
];

const filters: Array<"All" | CommunicationType> = [
  "All",
  "Message",
  "Call",
  "Video",
];

const typeIcon: Record<CommunicationType, string> = {
  Message: "💬",
  Call: "☎",
  Video: "▣",
};

export default function CommunicationHistoryScreen({
  onBack,
  onOpenConversation,
}: CommunicationHistoryScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState<
    "All" | CommunicationType
  >("All");

  const filteredHistory = useMemo(() => {
    if (selectedFilter === "All") {
      return historyData;
    }

    return historyData.filter((item) => item.type === selectedFilter);
  }, [selectedFilter]);

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <Pressable
      style={styles.historyCard}
      onPress={() => {
        if (item.type === "Message") {
          onOpenConversation?.(item.id, item.name);
        }
      }}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.initials}</Text>
      </View>

      <View style={styles.historyContent}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{item.name}</Text>

          <View
            style={[
              styles.statusBadge,
              item.status === "Missed" && styles.missedStatusBadge,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                item.status === "Missed" && styles.missedStatusText,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.typeRow}>
          <Text style={styles.typeIcon}>{typeIcon[item.type]}</Text>
          <Text style={styles.typeText}>{item.type}</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.description} numberOfLines={1}>
            {item.description}
          </Text>
        </View>

        <Text style={styles.date}>{item.date}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>‹</Text>
        </Pressable>

        <View>
          <Text style={styles.title}>Communication History</Text>
          <Text style={styles.subtitle}>Your recent secure communications</Text>
        </View>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>24</Text>
          <Text style={styles.summaryLabel}>Messages</Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>8</Text>
          <Text style={styles.summaryLabel}>Calls</Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>3</Text>
          <Text style={styles.summaryLabel}>Video Visits</Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        {filters.map((filter) => {
          const isSelected = filter === selectedFilter;

          return (
            <Pressable
              key={filter}
              style={[
                styles.filterButton,
                isSelected && styles.selectedFilterButton,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  isSelected && styles.selectedFilterText,
                ]}
              >
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={filteredHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No communication found</Text>
            <Text style={styles.emptyText}>
              There are no records for this filter.
            </Text>
          </View>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  backButtonText: {
    fontSize: 34,
    lineHeight: 34,
    color: "#334155",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 3,
    fontSize: 12,
    color: "#64748B",
  },

  summaryCard: {
    marginHorizontal: 20,
    marginTop: 8,
    paddingVertical: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  summaryItem: {
    flex: 1,
    alignItems: "center",
  },

  summaryNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563EB",
  },

  summaryLabel: {
    marginTop: 4,
    fontSize: 11,
    color: "#64748B",
  },

  summaryDivider: {
    width: 1,
    height: 38,
    backgroundColor: "#E2E8F0",
  },

  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 8,
  },

  filterButton: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
  },

  selectedFilterButton: {
    backgroundColor: "#2563EB",
  },

  filterText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },

  selectedFilterText: {
    color: "#FFFFFF",
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  historyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  historyContent: {
    flex: 1,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  name: {
    flex: 1,
    marginRight: 8,
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
  },

  statusBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },

  missedStatusBadge: {
    backgroundColor: "#FEE2E2",
  },

  statusText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#16A34A",
  },

  missedStatusText: {
    color: "#DC2626",
  },

  typeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  typeIcon: {
    fontSize: 12,
    marginRight: 5,
  },

  typeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
  },

  separator: {
    marginHorizontal: 5,
    color: "#CBD5E1",
  },

  description: {
    flex: 1,
    fontSize: 12,
    color: "#64748B",
  },

  date: {
    marginTop: 7,
    fontSize: 11,
    color: "#94A3B8",
  },

  emptyState: {
    alignItems: "center",
    paddingTop: 60,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#334155",
  },

  emptyText: {
    marginTop: 6,
    fontSize: 13,
    color: "#64748B",
  },
});
