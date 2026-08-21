import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

type ConnectionStatus = "Online" | "Offline";

type Props = {
  onOpenSyncCenter?: () => void;
  onOpenOfflineData?: () => void;
  onBack?: () => void;
};

export default function ConnectionStatusScreen({
  onOpenSyncCenter,
  onOpenOfflineData,
  onBack,
}: Props) {
  const [status, setStatus] = useState<ConnectionStatus>("Online");

  const isOnline = status === "Online";

  const toggleConnection = () => {
    setStatus((previous) => (previous === "Online" ? "Offline" : "Online"));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Connection Status</Text>

        <View style={{ width: 30 }} />
      </View>

      <View style={styles.content}>
        <View
          style={[
            styles.statusCircle,
            isOnline ? styles.onlineCircle : styles.offlineCircle,
          ]}
        >
          <Text style={styles.statusIcon}>{isOnline ? "✓" : "!"}</Text>
        </View>

        <Text style={styles.statusTitle}>
          {isOnline ? "You are online" : "You are offline"}
        </Text>

        <Text style={styles.statusDescription}>
          {isOnline
            ? "Your device is connected and your data can be synchronized securely."
            : "You can continue using available offline data. Changes will be synchronized when your connection is restored."}
        </Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Connection</Text>
            <Text
              style={[
                styles.infoValue,
                isOnline ? styles.onlineText : styles.offlineText,
              ]}
            >
              ● {status}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Last Sync</Text>
            <Text style={styles.infoValue}>
              {isOnline ? "Just now" : "10 minutes ago"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Pending Changes</Text>
            <Text style={styles.infoValue}>{isOnline ? "0" : "4"}</Text>
          </View>
        </View>

        <Pressable
          style={[
            styles.primaryButton,
            !isOnline && styles.primaryButtonOffline,
          ]}
          onPress={toggleConnection}
        >
          <Text style={styles.primaryButtonText}>
            {isOnline ? "Simulate Offline Mode" : "Reconnect"}
          </Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={onOpenSyncCenter}>
          <Text style={styles.secondaryButtonText}>Open Sync Center</Text>
        </Pressable>

        <Pressable style={styles.linkButton} onPress={onOpenOfflineData}>
          <Text style={styles.linkButtonText}>Manage Offline Data</Text>
        </Pressable>
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
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    fontSize: 34,
    lineHeight: 34,
    color: "#334155",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  statusCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  onlineCircle: {
    backgroundColor: "#DCFCE7",
  },
  offlineCircle: {
    backgroundColor: "#FEE2E2",
  },
  statusIcon: {
    fontSize: 48,
    fontWeight: "700",
    color: "#16A34A",
  },
  statusTitle: {
    marginTop: 22,
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },
  statusDescription: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 21,
    color: "#64748B",
  },
  infoCard: {
    width: "100%",
    marginTop: 28,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoLabel: {
    fontSize: 13,
    color: "#64748B",
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
  onlineText: {
    color: "#16A34A",
  },
  offlineText: {
    color: "#DC2626",
  },
  divider: {
    height: 1,
    marginVertical: 14,
    backgroundColor: "#E2E8F0",
  },
  primaryButton: {
    width: "100%",
    height: 52,
    marginTop: 24,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonOffline: {
    backgroundColor: "#16A34A",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryButton: {
    width: "100%",
    height: 52,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "700",
  },
  linkButton: {
    marginTop: 18,
  },
  linkButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2563EB",
  },
});
