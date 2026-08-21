import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type NotificationType = "Appointment" | "Message" | "Medication" | "System";

type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  icon: string;
};

type Props = {
  onOpenNotification?: (notificationId: string) => void;
  onBack?: () => void;
};

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "Appointment",
    title: "Appointment Reminder",
    message:
      "You have an appointment with Dr. Sarah Johnson tomorrow at 10:00 AM.",
    time: "10 minutes ago",
    isRead: false,
    icon: "📅",
  },
  {
    id: "2",
    type: "Message",
    title: "New Secure Message",
    message: "Dr. Sarah Johnson sent you a new secure message.",
    time: "1 hour ago",
    isRead: false,
    icon: "💬",
  },
  {
    id: "3",
    type: "Medication",
    title: "Medication Reminder",
    message: "It is time to take your prescribed medication.",
    time: "3 hours ago",
    isRead: true,
    icon: "💊",
  },
  {
    id: "4",
    type: "System",
    title: "Data Successfully Synced",
    message: "Your offline health records have been synchronized.",
    time: "Yesterday",
    isRead: true,
    icon: "✓",
  },
];

export default function NotificationCenterScreen({
  onOpenNotification,
  onBack,
}: Props) {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const [filter, setFilter] = useState<"All" | "Unread">("All");

  const filteredNotifications = useMemo(() => {
    if (filter === "Unread") {
      return notifications.filter((item) => !item.isRead);
    }

    return notifications;
  }, [filter, notifications]);

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({
        ...item,
        isRead: true,
      })),
    );
  };

  const openNotification = (id: string) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, isRead: true } : item,
      ),
    );

    onOpenNotification?.(id);
  };

  const renderNotification = ({ item }: { item: NotificationItem }) => (
    <Pressable
      style={[
        styles.notificationCard,
        !item.isRead && styles.unreadNotificationCard,
      ]}
      onPress={() => openNotification(item.id)}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.notificationIcon}>{item.icon}</Text>
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.titleRow}>
          <Text style={styles.notificationTitle}>{item.title}</Text>

          {!item.isRead && <View style={styles.unreadDot} />}
        </View>

        <Text style={styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </Text>

        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>‹</Text>
        </Pressable>

        <View style={styles.headerContent}>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.subtitle}>
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "You are all caught up"}
          </Text>
        </View>

        {unreadCount > 0 && (
          <Pressable onPress={markAllAsRead}>
            <Text style={styles.markReadText}>Mark all read</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.filterContainer}>
        {(["All", "Unread"] as const).map((item) => (
          <Pressable
            key={item}
            style={[
              styles.filterButton,
              filter === item && styles.activeFilterButton,
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
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptyText}>
              You have no notifications in this category.
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
    minHeight: 76,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 34,
    lineHeight: 34,
    color: "#334155",
  },
  headerContent: {
    flex: 1,
    marginLeft: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 3,
    fontSize: 12,
    color: "#64748B",
  },
  markReadText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2563EB",
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 14,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#E2E8F0",
  },
  activeFilterButton: {
    backgroundColor: "#2563EB",
  },
  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  notificationCard: {
    flexDirection: "row",
    padding: 14,
    marginBottom: 10,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  unreadNotificationCard: {
    borderColor: "#BFDBFE",
    backgroundColor: "#F8FBFF",
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    marginRight: 12,
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2563EB",
  },
  notificationMessage: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 19,
    color: "#64748B",
  },
  notificationTime: {
    marginTop: 7,
    fontSize: 11,
    color: "#94A3B8",
  },
  emptyState: {
    alignItems: "center",
    paddingTop: 80,
  },
  emptyIcon: {
    fontSize: 42,
  },
  emptyTitle: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: "700",
    color: "#334155",
  },
  emptyText: {
    marginTop: 6,
    fontSize: 13,
    color: "#64748B",
  },
});
