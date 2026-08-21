import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";

export default function PrivacyCenterScreen() {
  const [notifications, setNotifications] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [biometric, setBiometric] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🔐</Text>
          </View>

          <Text style={styles.title}>Privacy Center</Text>

          <Text style={styles.subtitle}>
            Manage your privacy, security, and health-information preferences.
          </Text>
        </View>

        {/* Security Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Text>✓</Text>
          </View>

          <View style={styles.statusContent}>
            <Text style={styles.statusTitle}>Your account is protected</Text>
            <Text style={styles.statusText}>
              Your privacy settings are currently active.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Security</Text>

        <View style={styles.settingsCard}>
          <SettingRow
            title="Login Alerts"
            description="Receive alerts when your account is accessed."
            value={loginAlerts}
            onChange={setLoginAlerts}
          />

          <View style={styles.divider} />

          <SettingRow
            title="Biometric Login"
            description="Use Face ID or fingerprint when supported."
            value={biometric}
            onChange={setBiometric}
          />
        </View>

        <Text style={styles.sectionTitle}>Notifications</Text>

        <View style={styles.settingsCard}>
          <SettingRow
            title="Healthcare Notifications"
            description="Receive important appointment and care updates."
            value={notifications}
            onChange={setNotifications}
          />
        </View>

        <Text style={styles.sectionTitle}>Your data</Text>

        <View style={styles.actionCard}>
          <PrivacyAction
            title="Manage Consent"
            description="Review and change your consent preferences."
          />

          <View style={styles.divider} />

          <PrivacyAction
            title="Request Data Access"
            description="Request access to information held about you."
          />

          <View style={styles.divider} />

          <PrivacyAction
            title="Privacy Policy"
            description="Learn how your healthcare information is handled."
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type SettingRowProps = {
  title: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

function SettingRow({ title, description, value, onChange }: SettingRowProps) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingText}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{
          false: "#CBD5E1",
          true: "#93C5FD",
        }}
        thumbColor={value ? "#2563EB" : "#FFFFFF"}
      />
    </View>
  );
}

function PrivacyAction({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
      <View style={styles.actionText}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionDescription}>{description}</Text>
      </View>

      <Text style={styles.arrow}>›</Text>
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
    alignItems: "center",
    marginBottom: 25,
  },

  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 24,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  icon: {
    fontSize: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
    color: "#64748B",
    lineHeight: 21,
  },

  statusCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 17,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    marginBottom: 25,
  },

  statusIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  statusContent: {
    flex: 1,
  },

  statusTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1E3A8A",
  },

  statusText: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 12,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 11,
  },

  settingsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 17,
    marginBottom: 23,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
  },

  settingText: {
    flex: 1,
    paddingRight: 15,
  },

  settingTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },

  settingDescription: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
    color: "#64748B",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
  },

  actionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 17,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
  },

  actionText: {
    flex: 1,
    paddingRight: 12,
  },

  actionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },

  actionDescription: {
    marginTop: 5,
    color: "#64748B",
    fontSize: 12,
    lineHeight: 18,
  },

  arrow: {
    fontSize: 27,
    color: "#2563EB",
  },
});
