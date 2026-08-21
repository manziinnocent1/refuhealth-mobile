import React, { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  notificationId?: string;
  onBack?: () => void;
  onOpenRelatedItem?: () => void;
};

const notification = {
  title: "Appointment Reminder",
  type: "Appointment",
  icon: "📅",
  date: "August 21, 2026",
  time: "10:00 AM",
  sender: "Healthcare System",
  message:
    "This is a reminder that you have an upcoming appointment with Dr. Sarah Johnson tomorrow at 10:00 AM. Please arrive a few minutes early and bring any required medical documents.",
};

export default function NotificationDetailsScreen({
  notificationId,
  onBack,
  onOpenRelatedItem,
}: Props) {
  const [isArchived, setIsArchived] = useState(false);

  const archiveNotification = () => {
    setIsArchived(true);

    Alert.alert(
      "Notification Archived",
      "This notification has been moved to your archive.",
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Notification Details</Text>

        <Pressable onPress={archiveNotification}>
          <Text style={styles.archiveText}>
            {isArchived ? "Archived" : "Archive"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{notification.icon}</Text>
        </View>

        <Text style={styles.title}>{notification.title}</Text>

        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{notification.type}</Text>
        </View>

        <View style={styles.metaCard}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Date</Text>
            <Text style={styles.metaValue}>{notification.date}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Time</Text>
            <Text style={styles.metaValue}>{notification.time}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>From</Text>
            <Text style={styles.metaValue}>{notification.sender}</Text>
          </View>
        </View>

        <View style={styles.messageCard}>
          <Text style={styles.messageLabel}>MESSAGE</Text>
          <Text style={styles.messageText}>{notification.message}</Text>
        </View>

        <Pressable style={styles.actionButton} onPress={onOpenRelatedItem}>
          <Text style={styles.actionButtonText}>View Appointment</Text>
        </Pressable>

        <Text style={styles.idText}>
          Notification ID: {notificationId ?? "N/A"}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    height: 70,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  backButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: 34,
    lineHeight: 34,
    color: "#334155",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E293B",
  },
  archiveText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2563EB",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#EFF6FF",
  },
  icon: {
    fontSize: 32,
  },
  title: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 23,
    fontWeight: "700",
    color: "#0F172A",
  },
  typeBadge: {
    alignSelf: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "#DBEAFE",
  },
  typeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2563EB",
  },
  metaCard: {
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaLabel: {
    fontSize: 13,
    color: "#64748B",
  },
  metaValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 14,
  },
  messageCard: {
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  messageLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#94A3B8",
  },
  messageText: {
    marginTop: 9,
    fontSize: 14,
    lineHeight: 22,
    color: "#475569",
  },
  actionButton: {
    marginTop: 24,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  idText: {
    marginTop: 14,
    textAlign: "center",
    fontSize: 10,
    color: "#94A3B8",
  },
});
