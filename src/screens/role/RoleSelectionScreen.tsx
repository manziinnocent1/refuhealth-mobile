import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "../../../.expo/types/router";

const COLORS = {
  blue: "#1565D8",
  darkBlue: "#0F4CBA",
  white: "#FFFFFF",
  black: "#111827",
  gray700: "#374151",
  gray500: "#6B7280",
  gray300: "#D1D5DB",
  gray200: "#E5E7EB",
  background: "#F8FAFC",
  lightBlue: "#EAF2FF",
};

type UserRole = "receptionist" | "doctor" | "nurse" | "patient" | "admin";

const roles = [
  {
    id: "receptionist" as UserRole,
    title: "Receptionist",
    description: "Register patients and manage their visits.",
    icon: "desktop-outline" as keyof typeof Ionicons.glyphMap,
  },
  {
    id: "doctor" as UserRole,
    title: "Doctor / Provider",
    description: "View patients and manage clinical information.",
    icon: "medical-outline" as keyof typeof Ionicons.glyphMap,
  },
  {
    id: "nurse" as UserRole,
    title: "Nurse",
    description: "Support patient care and record clinical information.",
    icon: "fitness-outline" as keyof typeof Ionicons.glyphMap,
  },
  {
    id: "patient" as UserRole,
    title: "Patient",
    description: "Access your health information and referrals.",
    icon: "person-outline" as keyof typeof Ionicons.glyphMap,
  },
  {
    id: "admin" as UserRole,
    title: "Administrator",
    description: "Manage users, facilities and system settings.",
    icon: "settings-outline" as keyof typeof Ionicons.glyphMap,
  },
];

export default function RoleSelectionScreen() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleContinue = () => {
    if (!selectedRole) return;

    switch (selectedRole) {
      case "patient":
        router.push("./patient-portal");
        break;

      // add the other role routes when their wrappers exist
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="heart-outline" size={30} color={COLORS.white} />
          </View>

          <Text style={styles.brand}>RefuHealth</Text>
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.eyebrow}>SECURE ACCESS</Text>

          <Text style={styles.title}>Who are you signing in as?</Text>

          <Text style={styles.subtitle}>
            Select your role to access the appropriate RefuHealth workspace.
          </Text>
        </View>

        {/* Roles */}
        <View style={styles.rolesContainer}>
          {roles.map((role) => {
            const isSelected = selectedRole === role.id;

            return (
              <TouchableOpacity
                key={role.id}
                activeOpacity={0.85}
                onPress={() => setSelectedRole(role.id)}
                style={[styles.roleCard, isSelected && styles.selectedRoleCard]}
              >
                <View
                  style={[
                    styles.roleIcon,
                    isSelected && styles.selectedRoleIcon,
                  ]}
                >
                  <Ionicons
                    name={role.icon}
                    size={24}
                    color={isSelected ? COLORS.white : COLORS.blue}
                  />
                </View>

                <View style={styles.roleContent}>
                  <Text
                    style={[
                      styles.roleTitle,
                      isSelected && styles.selectedRoleTitle,
                    ]}
                  >
                    {role.title}
                  </Text>

                  <Text style={styles.roleDescription}>{role.description}</Text>
                </View>

                <View
                  style={[styles.radio, isSelected && styles.selectedRadio]}
                >
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Continue */}
        <TouchableOpacity
          activeOpacity={0.85}
          disabled={!selectedRole}
          onPress={handleContinue}
          style={[
            styles.continueButton,
            !selectedRole && styles.disabledButton,
          ]}
        >
          <Text style={styles.continueText}>Continue</Text>

          <View style={styles.arrowContainer}>
            <Ionicons name="arrow-forward" size={18} color={COLORS.blue} />
          </View>
        </TouchableOpacity>

        {/* Security */}
        <View style={styles.securityContainer}>
          <Ionicons
            name="shield-checkmark-outline"
            size={18}
            color={COLORS.blue}
          />

          <Text style={styles.securityText}>
            Your access is protected and limited according to your role.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    padding: 24,
    paddingBottom: 45,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 42,
  },

  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 17,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  brand: {
    marginLeft: 11,
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.black,
  },

  titleSection: {
    marginBottom: 25,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
    color: COLORS.blue,
    marginBottom: 9,
  },

  title: {
    fontSize: 29,
    lineHeight: 36,
    fontWeight: "900",
    color: COLORS.black,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.gray500,
    maxWidth: 340,
  },

  rolesContainer: {
    gap: 12,
  },

  roleCard: {
    minHeight: 88,
    backgroundColor: COLORS.white,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  selectedRoleCard: {
    borderColor: COLORS.blue,
    backgroundColor: COLORS.lightBlue,
  },

  roleIcon: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedRoleIcon: {
    backgroundColor: COLORS.blue,
  },

  roleContent: {
    flex: 1,
    marginLeft: 13,
    paddingRight: 8,
  },

  roleTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.black,
  },

  selectedRoleTitle: {
    color: COLORS.darkBlue,
  },

  roleDescription: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.gray500,
  },

  radio: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.gray300,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedRadio: {
    borderColor: COLORS.blue,
  },

  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: COLORS.blue,
  },

  continueButton: {
    height: 58,
    marginTop: 25,
    borderRadius: 29,
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7,
  },

  disabledButton: {
    opacity: 0.45,
  },

  continueText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800",
  },

  arrowContainer: {
    position: "absolute",
    right: 7,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  securityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingHorizontal: 15,
  },

  securityText: {
    marginLeft: 7,
    fontSize: 10,
    lineHeight: 15,
    color: COLORS.gray500,
    textAlign: "center",
    flex: 1,
  },
});
