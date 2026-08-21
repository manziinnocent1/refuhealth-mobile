import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type SecureMessage = {
  id: string;
  name: string;
  initials: string;
  preview: string;
  time: string;
  unreadCount: number;
  online: boolean;
  category: "Patient" | "Doctor" | "Staff";
};

type SecureMessagesScreenProps = {
  onOpenConversation?: (conversationId: string, name: string) => void;
  onOpenHistory?: () => void;
  onNewMessage?: () => void;
};

const conversations: SecureMessage[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    initials: "SJ",
    preview: "Your test results are ready for review.",
    time: "10:42 AM",
    unreadCount: 2,
    online: true,
    category: "Doctor",
  },
  {
    id: "2",
    name: "Michael Brown",
    initials: "MB",
    preview: "Thank you for the information.",
    time: "Yesterday",
    unreadCount: 0,
    online: false,
    category: "Patient",
  },
  {
    id: "3",
    name: "Nurse Emily Davis",
    initials: "ED",
    preview: "Your appointment has been confirmed.",
    time: "Mon",
    unreadCount: 1,
    online: true,
    category: "Staff",
  },
];

export default function SecureMessagesScreen({
  onOpenConversation,
  onOpenHistory,
  onNewMessage,
}: SecureMessagesScreenProps) {
  const [search, setSearch] = useState("");

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return conversations;
    }

    return conversations.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.preview.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query),
    );
  }, [search]);

  const renderConversation = ({ item }: { item: SecureMessage }) => (
    <Pressable
      style={styles.conversationCard}
      onPress={() => onOpenConversation?.(item.id, item.name)}
    >
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.initials}</Text>
        </View>

        {item.online && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.messageContent}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>

          <Text style={styles.time}>{item.time}</Text>
        </View>

        <View style={styles.bottomRow}>
          <Text
            style={[
              styles.preview,
              item.unreadCount > 0 && styles.unreadPreview,
            ]}
            numberOfLines={1}
          >
            {item.preview}
          </Text>

          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>

        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Secure Messages</Text>
          <Text style={styles.subtitle}>
            Your conversations are private and secure
          </Text>
        </View>

        <Pressable style={styles.historyButton} onPress={onOpenHistory}>
          <Text style={styles.historyButtonText}>History</Text>
        </Pressable>
      </View>

      <View style={styles.securityBanner}>
        <Text style={styles.securityIcon}>🔒</Text>
        <View style={styles.securityContent}>
          <Text style={styles.securityTitle}>End-to-end protected</Text>
          <Text style={styles.securityText}>
            Messages are securely encrypted and protected.
          </Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search conversations..."
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No conversations found</Text>
            <Text style={styles.emptyText}>
              Try searching for a different person or message.
            </Text>
          </View>
        }
      />

      <Pressable style={styles.newMessageButton} onPress={onNewMessage}>
        <Text style={styles.newMessageIcon}>＋</Text>
        <Text style={styles.newMessageText}>New Message</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748B",
  },

  historyButton: {
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
  },

  historyButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
  },

  securityBanner: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 14,
    backgroundColor: "#ECFDF5",
    borderRadius: 14,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },

  securityIcon: {
    fontSize: 20,
    marginRight: 12,
  },

  securityContent: {
    flex: 1,
  },

  securityTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#065F46",
  },

  securityText: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 18,
    color: "#047857",
  },

  searchContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  searchIcon: {
    fontSize: 24,
    color: "#64748B",
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    color: "#0F172A",
    fontSize: 15,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  conversationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },

  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  onlineIndicator: {
    position: "absolute",
    right: 1,
    bottom: 1,
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#22C55E",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  messageContent: {
    flex: 1,
    justifyContent: "center",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    flex: 1,
    marginRight: 8,
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
  },

  time: {
    fontSize: 11,
    color: "#94A3B8",
  },

  bottomRow: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  preview: {
    flex: 1,
    marginRight: 8,
    fontSize: 13,
    color: "#64748B",
  },

  unreadPreview: {
    color: "#334155",
    fontWeight: "600",
  },

  unreadBadge: {
    minWidth: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },

  unreadBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  categoryBadge: {
    alignSelf: "flex-start",
    marginTop: 7,
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  categoryText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#2563EB",
  },

  emptyState: {
    paddingTop: 70,
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#334155",
  },

  emptyText: {
    marginTop: 8,
    textAlign: "center",
    color: "#64748B",
  },

  newMessageButton: {
    position: "absolute",
    right: 20,
    bottom: 25,
    backgroundColor: "#2563EB",
    borderRadius: 28,
    paddingHorizontal: 18,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  newMessageIcon: {
    color: "#FFFFFF",
    fontSize: 24,
    marginRight: 7,
  },

  newMessageText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
