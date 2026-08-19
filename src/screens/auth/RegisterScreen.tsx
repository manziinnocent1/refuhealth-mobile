import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  blue: "#1565D8",
  blueDark: "#0D47A1",
  blueLight: "#EAF2FF",
  blueVeryLight: "#F5F9FF",

  white: "#FFFFFF",
  black: "#111827",

  gray900: "#344054",
  gray600: "#667085",
  gray500: "#98A2B3",
  gray300: "#D0D5DD",
  gray200: "#E4E7EC",
  gray100: "#F2F4F7",

  success: "#12B76A",
  error: "#D92D20",
};

type RegisterScreenProps = {
  onRegister: () => void;
  onSignIn: () => void;
  onBack: () => void;
};

export default function RegisterScreen({
  onRegister,
  onSignIn,
  onBack,
}: RegisterScreenProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const canRegister =
    fullName.trim().length >= 2 &&
    email.trim().length > 0 &&
    employeeId.trim().length > 0 &&
    password.length >= 8 &&
    passwordsMatch &&
    acceptedTerms;

  const handleRegister = () => {
    if (!canRegister) {
      return;
    }

    // For now, send control back to index.tsx.
    // Your Django API can be connected here later.
    onRegister();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Ionicons name="medical" size={23} color={COLORS.white} />
            </View>

            <View>
              <Text style={styles.brandName}>RefuHealth</Text>

              <Text style={styles.brandTagline}>Connected Care</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.helpButton}
            activeOpacity={0.7}
            accessibilityLabel="Get help"
          >
            <Ionicons
              name="help-circle-outline"
              size={22}
              color={COLORS.gray900}
            />
          </TouchableOpacity>
        </View>

        {/* Back */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <View style={styles.backIcon}>
            <Ionicons name="arrow-back" size={17} color={COLORS.blue} />
          </View>

          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* Intro */}
        <View style={styles.welcomeSection}>
          <Text style={styles.eyebrow}>CREATE YOUR ACCOUNT</Text>

          <Text style={styles.title}>
            Join
            <Text style={styles.titleBlue}> RefuHealth</Text>
          </Text>

          <Text style={styles.description}>
            Create your secure account to connect with patients, healthcare
            teams and facilities.
          </Text>
        </View>

        {/* Security Banner */}
        <View style={styles.securityBanner}>
          <View style={styles.securityIcon}>
            <Ionicons name="shield-checkmark" size={19} color={COLORS.blue} />
          </View>

          <View style={styles.securityContent}>
            <Text style={styles.securityTitle}>
              Your information is protected
            </Text>

            <Text style={styles.securityText}>
              Healthcare data stays secure and private.
            </Text>
          </View>

          <View style={styles.secureBadge}>
            <View style={styles.onlineDot} />

            <Text style={styles.secureBadgeText}>Secure</Text>
          </View>
        </View>

        {/* Registration Card */}
        <View style={styles.registerCard}>
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full name</Text>

            <View
              style={[
                styles.inputContainer,
                fullName.length > 0 && styles.inputActive,
              ]}
            >
              <Ionicons
                name="person-outline"
                size={20}
                color={fullName.length > 0 ? COLORS.blue : COLORS.gray500}
              />

              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
                placeholderTextColor={COLORS.gray500}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email address</Text>

            <View
              style={[
                styles.inputContainer,
                email.length > 0 && styles.inputActive,
              ]}
            >
              <Ionicons
                name="mail-outline"
                size={20}
                color={email.length > 0 ? COLORS.blue : COLORS.gray500}
              />

              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.gray500}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Employee ID */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Employee / Staff ID</Text>

            <View
              style={[
                styles.inputContainer,
                employeeId.length > 0 && styles.inputActive,
              ]}
            >
              <Ionicons
                name="id-card-outline"
                size={20}
                color={employeeId.length > 0 ? COLORS.blue : COLORS.gray500}
              />

              <TextInput
                style={styles.input}
                value={employeeId}
                onChangeText={setEmployeeId}
                placeholder="Enter your staff ID"
                placeholderTextColor={COLORS.gray500}
                autoCapitalize="characters"
                autoCorrect={false}
                returnKeyType="next"
              />
            </View>

            <Text style={styles.helperText}>
              Use the ID provided by your healthcare organization.
            </Text>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>

            <View
              style={[
                styles.inputContainer,
                password.length > 0 && styles.inputActive,
              ]}
            >
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={password.length > 0 ? COLORS.blue : COLORS.gray500}
              />

              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Create a password"
                placeholderTextColor={COLORS.gray500}
                secureTextEntry={securePassword}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />

              <TouchableOpacity
                onPress={() => setSecurePassword(!securePassword)}
                activeOpacity={0.7}
                accessibilityLabel={
                  securePassword ? "Show password" : "Hide password"
                }
              >
                <Ionicons
                  name={securePassword ? "eye-outline" : "eye-off-outline"}
                  size={21}
                  color={COLORS.gray500}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.helperText}>Use at least 8 characters.</Text>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm password</Text>

            <View
              style={[
                styles.inputContainer,
                confirmPassword.length > 0 && styles.inputActive,
                confirmPassword.length > 0 &&
                  !passwordsMatch &&
                  styles.inputError,
                passwordsMatch && styles.inputSuccess,
              ]}
            >
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={
                  passwordsMatch
                    ? COLORS.success
                    : confirmPassword.length > 0
                      ? COLORS.error
                      : COLORS.gray500
                }
              />

              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                placeholderTextColor={COLORS.gray500}
                secureTextEntry={secureConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleRegister}
              />

              <TouchableOpacity
                onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}
                activeOpacity={0.7}
                accessibilityLabel={
                  secureConfirmPassword
                    ? "Show confirmation password"
                    : "Hide confirmation password"
                }
              >
                <Ionicons
                  name={
                    secureConfirmPassword ? "eye-outline" : "eye-off-outline"
                  }
                  size={21}
                  color={COLORS.gray500}
                />
              </TouchableOpacity>
            </View>

            {confirmPassword.length > 0 && !passwordsMatch && (
              <Text style={styles.errorText}>Passwords do not match.</Text>
            )}

            {passwordsMatch && (
              <View style={styles.matchRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={14}
                  color={COLORS.success}
                />

                <Text style={styles.successText}>Passwords match</Text>
              </View>
            )}
          </View>

          {/* Terms */}
          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
            activeOpacity={0.7}
          >
            <View
              style={[styles.checkbox, acceptedTerms && styles.checkboxActive]}
            >
              {acceptedTerms && (
                <Ionicons name="checkmark" size={15} color={COLORS.white} />
              )}
            </View>

            <Text style={styles.termsText}>
              I agree to the{" "}
              <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>.
            </Text>
          </TouchableOpacity>

          {/* Create Account */}
          <TouchableOpacity
            style={[
              styles.registerButton,
              !canRegister && styles.registerButtonDisabled,
            ]}
            activeOpacity={0.85}
            disabled={!canRegister}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Create account</Text>

            <View style={styles.registerArrow}>
              <Ionicons name="arrow-forward" size={19} color={COLORS.blue} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <View style={styles.loginPrompt}>
          <Text style={styles.loginPromptText}>Already have an account?</Text>

          <TouchableOpacity activeOpacity={0.7} onPress={onSignIn}>
            <Text style={styles.loginLink}>Sign in</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerSecurity}>
            <Ionicons name="lock-closed" size={12} color={COLORS.gray500} />

            <Text style={styles.footerText}>
              Secure healthcare information system
            </Text>
          </View>

          <Text style={styles.version}>RefuHealth • v1.0</Text>
        </View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 120,
  },

  /* Header */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  brandName: {
    fontSize: 19,
    fontWeight: "800",
    color: COLORS.black,
    letterSpacing: -0.4,
  },

  brandTagline: {
    fontSize: 10,
    fontWeight: "500",
    color: COLORS.gray600,
    marginTop: 1,
  },

  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray100,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Back */

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 20,
  },

  backIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  backText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.gray900,
  },

  /* Intro */

  welcomeSection: {
    marginBottom: 20,
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.8,
    color: COLORS.blue,
    marginBottom: 8,
  },

  title: {
    fontSize: 32,
    lineHeight: 39,
    fontWeight: "800",
    letterSpacing: -1,
    color: COLORS.black,
  },

  titleBlue: {
    color: COLORS.blue,
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.gray600,
    marginTop: 10,
    maxWidth: 350,
  },

  /* Security */

  securityBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.blueVeryLight,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#DCEAFF",
    padding: 11,
    marginBottom: 18,
  },

  securityIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  securityContent: {
    flex: 1,
  },

  securityTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.black,
  },

  securityText: {
    fontSize: 9,
    color: COLORS.gray600,
    marginTop: 2,
  },

  secureBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },

  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.success,
    marginRight: 5,
  },

  secureBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.gray900,
  },

  /* Register Card */

  registerCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 22,
    padding: 18,

    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },

  inputGroup: {
    marginBottom: 16,
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.gray900,
    marginBottom: 8,
  },

  inputContainer: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 15,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },

  inputActive: {
    borderColor: COLORS.blue,
    backgroundColor: "#FBFDFF",
  },

  inputError: {
    borderColor: COLORS.error,
  },

  inputSuccess: {
    borderColor: COLORS.success,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.black,
    marginLeft: 10,
    paddingVertical: 0,
  },

  helperText: {
    fontSize: 10,
    color: COLORS.gray500,
    marginTop: 5,
  },

  errorText: {
    fontSize: 10,
    color: COLORS.error,
    marginTop: 5,
  },

  matchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  successText: {
    fontSize: 10,
    color: COLORS.success,
    marginLeft: 4,
    fontWeight: "600",
  },

  /* Terms */

  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 1,
    marginBottom: 18,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: COLORS.gray300,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginTop: 1,
  },

  checkboxActive: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
  },

  termsText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 17,
    color: COLORS.gray600,
  },

  termsLink: {
    color: COLORS.blue,
    fontWeight: "700",
  },

  /* Register Button */

  registerButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",

    shadowColor: COLORS.blue,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },

  registerButtonDisabled: {
    backgroundColor: "#AFC8ED",
    shadowOpacity: 0,
    elevation: 0,
  },

  registerButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800",
  },

  registerArrow: {
    position: "absolute",
    right: 7,
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Login Prompt */

  loginPrompt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  loginPromptText: {
    fontSize: 12,
    color: COLORS.gray600,
  },

  loginLink: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.blue,
    marginLeft: 5,
  },

  /* Footer */

  footer: {
    alignItems: "center",
    marginTop: 22,
  },

  footerSecurity: {
    flexDirection: "row",
    alignItems: "center",
  },

  footerText: {
    fontSize: 9,
    color: COLORS.gray500,
    marginLeft: 5,
  },

  version: {
    fontSize: 9,
    color: "#B0B7C3",
    marginTop: 5,
  },
});
