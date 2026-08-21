import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Message = {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: string;
  status?: "sent" | "delivered" | "read";
};

type ConversationScreenProps = {
  conversationId?: string;
  recipientName?: string;
  recipientInitials?: string;
  onBack?: () => void;
};

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello, how are you feeling today?",
    sender: "other",
    timestamp: "10:20 AM",
  },
  {
    id: "2",
    text: "Hello Doctor, I am feeling much better today. Thank you.",
    sender: "me",
    timestamp: "10:24 AM",
    status: "read",
  },
  {
    id: "3",
    text: "That is great to hear. Please continue taking your medication as prescribed.",
    sender: "other",
    timestamp: "10:27 AM",
  },
  {
    id: "4",
    text: "Your test results are ready for review. We can discuss them during your next appointment.",
    sender: "other",
    timestamp: "10:30 AM",
  },
];

export default function ConversationScreen({
  conversationId,
  recipientName = "Dr. Sarah Johnson",
  recipientInitials = "SJ",
  onBack,
}: ConversationScreenProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [messageText, setMessageText] = useState("");

  const formattedDate = useMemo(() => "Today", []);

  const sendMessage = () => {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage) {
      return;
    }

    const newMessage: Message = {
      id: `${Date.now()}`,
      text: trimmedMessage,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

    setMessages((previousMessages) => [...previousMessages, newMessage]);
    setMessageText("");
  };

  const showAttachmentOptions = () => {
    Alert.alert(
      "Attach File",
      "Choose an option",
      [
        {
          text: "Photo",
          onPress: () => console.log("Open photo picker"),
        },
        {
          text: "Document",
          onPress: () => console.log("Open document picker"),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true },
    );
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMine = item.sender === "me";

    return (
      <View
        style={[
          styles.messageWrapper,
          isMine ? styles.myMessageWrapper : styles.otherMessageWrapper,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isMine ? styles.myMessageBubble : styles.otherMessageBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isMine ? styles.myMessageText : styles.otherMessageText,
            ]}
          >
            {item.text}
          </Text>
        </View>

        <View
          style={[
            styles.messageMeta,
            isMine ? styles.myMessageMeta : styles.otherMessageMeta,
          ]}
        >
          <Text style={styles.timestamp}>{item.timestamp}</Text>

          {isMine && (
            <Text style={styles.messageStatus}>
              {item.status === "read"
                ? "✓✓"
                : item.status === "delivered"
                  ? "✓✓"
                  : "✓"}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>‹</Text>
        </Pressable>

        <View style={styles.recipientAvatar}>
          <Text style={styles.recipientAvatarText}>{recipientInitials}</Text>
          <View style={styles.onlineIndicator} />
        </View>

        <View style={styles.headerContent}>
          <Text style={styles.recipientName}>{recipientName}</Text>
          <Text style={styles.onlineText}>Secure connection • Online</Text>
        </View>

        <Pressable
          style={styles.infoButton}
          onPress={() =>
            Alert.alert(
              "Conversation Info",
              `Conversation ID: ${conversationId ?? "N/A"}`,
            )
          }
        >
          <Text style={styles.infoButtonText}>ⓘ</Text>
        </Pressable>
      </View>

      <View style={styles.encryptionBanner}>
        <Text style={styles.encryptionText}>
          🔒 Messages are encrypted and securely stored
        </Text>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{formattedDate}</Text>
            </View>
          }
        />

        <View style={styles.composerContainer}>
          <Pressable
            style={styles.attachmentButton}
            onPress={showAttachmentOptions}
          >
            <Text style={styles.attachmentText}>＋</Text>
          </Pressable>

          <View style={styles.inputContainer}>
            <TextInput
              value={messageText}
              onChangeText={setMessageText}
              placeholder="Type a secure message..."
              placeholderTextColor="#94A3B8"
              multiline
              style={styles.messageInput}
            />
          </View>

          <Pressable
            style={[
              styles.sendButton,
              !messageText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={sendMessage}
            disabled={!messageText.trim()}
          >
            <Text style={styles.sendButtonText}>➤</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    height: 76,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  backButtonText: {
    fontSize: 34,
    lineHeight: 34,
    color: "#334155",
  },

  recipientAvatar: {
    position: "relative",
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },

  recipientAvatarText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  onlineIndicator: {
    position: "absolute",
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#22C55E",
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  headerContent: {
    flex: 1,
    marginLeft: 10,
  },

  recipientName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
  },

  onlineText: {
    marginTop: 2,
    fontSize: 11,
    color: "#16A34A",
  },

  infoButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  infoButtonText: {
    fontSize: 23,
    color: "#64748B",
  },

  encryptionBanner: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#EFF6FF",
  },

  encryptionText: {
    textAlign: "center",
    fontSize: 11,
    color: "#2563EB",
    fontWeight: "600",
  },

  keyboardContainer: {
    flex: 1,
  },

  messagesContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  dateContainer: {
    alignItems: "center",
    marginVertical: 18,
  },

  dateText: {
    fontSize: 12,
    color: "#64748B",
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },

  messageWrapper: {
    marginBottom: 14,
    maxWidth: "82%",
  },

  myMessageWrapper: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },

  otherMessageWrapper: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },

  messageBubble: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 18,
  },

  myMessageBubble: {
    backgroundColor: "#2563EB",
    borderBottomRightRadius: 4,
  },

  otherMessageBubble: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },

  myMessageText: {
    color: "#FFFFFF",
  },

  otherMessageText: {
    color: "#334155",
  },

  messageMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  myMessageMeta: {
    marginRight: 3,
  },

  otherMessageMeta: {
    marginLeft: 3,
  },

  timestamp: {
    fontSize: 10,
    color: "#94A3B8",
  },

  messageStatus: {
    marginLeft: 4,
    fontSize: 10,
    color: "#2563EB",
  },

  composerContainer: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "flex-end",
  },

  attachmentButton: {
    width: 42,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },

  attachmentText: {
    fontSize: 27,
    color: "#64748B",
  },

  inputContainer: {
    flex: 1,
    minHeight: 46,
    maxHeight: 110,
    paddingHorizontal: 14,
    backgroundColor: "#F1F5F9",
    borderRadius: 23,
    justifyContent: "center",
  },

  messageInput: {
    fontSize: 14,
    color: "#1E293B",
    paddingVertical: 10,
    maxHeight: 100,
  },

  sendButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginLeft: 8,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },

  sendButtonDisabled: {
    backgroundColor: "#CBD5E1",
  },

  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
