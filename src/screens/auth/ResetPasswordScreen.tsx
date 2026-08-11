import React, { useMemo, useState } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  blue: '#1565D8',
  blueDark: '#0D47A1',
  blueLight: '#EAF2FF',
  blueVeryLight: '#F5F9FF',

  white: '#FFFFFF',
  black: '#111827',

  gray900: '#344054',
  gray600: '#667085',
  gray500: '#98A2B3',
  gray300: '#D0D5DD',
  gray200: '#E4E7EC',
  gray100: '#F2F4F7',

  success: '#12B76A',
  error: '#D92D20',
  warning: '#F79009',
};

type ResetPasswordScreenProps = {
  onBack?: () => void;
  onPasswordReset?: () => void;
};

export default function ResetPasswordScreen({
  onBack,
  onPasswordReset,
}: ResetPasswordScreenProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [securePassword, setSecurePassword] =
    useState(true);

  const [
    secureConfirmPassword,
    setSecureConfirmPassword,
  ] = useState(true);

  const [submitted, setSubmitted] =
    useState(false);

  const requirements = useMemo(
    () => ({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    }),
    [password]
  );

  const requirementCount = Object.values(
    requirements
  ).filter(Boolean).length;

  const passwordsMatch =
    password.length > 0 &&
    password === confirmPassword;

  const passwordValid =
    requirementCount === 4;

  const canSubmit =
    passwordValid && passwordsMatch;

  const strengthLabel =
    requirementCount <= 1
      ? 'Weak'
      : requirementCount === 2
        ? 'Fair'
        : requirementCount === 3
          ? 'Good'
          : 'Strong';

  const strengthColor =
    requirementCount <= 1
      ? COLORS.error
      : requirementCount === 2
        ? COLORS.warning
        : requirementCount === 3
          ? COLORS.blue
          : COLORS.success;

  const handleReset = () => {
    if (!canSubmit) {
      setSubmitted(true);
      return;
    }

    if (onPasswordReset) {
      onPasswordReset();
    } else {
      console.log('Password reset successfully');

      setSubmitted(true);
    }
  };

  const Requirement = ({
    valid,
    children,
  }: {
    valid: boolean;
    children: React.ReactNode;
  }) => (
    <View style={styles.requirement}>
      <View
        style={[
          styles.requirementIcon,
          valid && styles.requirementIconValid,
        ]}
      >
        <Ionicons
          name={valid ? 'checkmark' : 'ellipse-outline'}
          size={valid ? 13 : 9}
          color={
            valid
              ? COLORS.success
              : COLORS.gray500
          }
        />
      </View>

      <Text
        style={[
          styles.requirementText,
          valid && styles.requirementTextValid,
        ]}
      >
        {children}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}

          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.7}
              onPress={() => {
                if (onBack) {
                  onBack();
                } else {
                  console.log('Go back');
                }
              }}
            >
              <Ionicons
                name="arrow-back"
                size={21}
                color={COLORS.black}
              />
            </TouchableOpacity>

            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Ionicons
                  name="medical"
                  size={20}
                  color={COLORS.white}
                />
              </View>

              <View>
                <Text style={styles.brandName}>
                  RefuHealth
                </Text>

                <Text style={styles.brandTagline}>
                  Connected Care
                </Text>
              </View>
            </View>
          </View>

          {/* Title */}

          <View style={styles.titleSection}>
            <View style={styles.iconCircle}>
              <Ionicons
                name="key-outline"
                size={37}
                color={COLORS.blue}
              />
            </View>

            <Text style={styles.eyebrow}>
              NEW PASSWORD
            </Text>

            <Text style={styles.title}>
              Create a new password
            </Text>

            <Text style={styles.description}>
              Choose a strong password that you don't
              use anywhere else to keep your RefuHealth
              account protected.
            </Text>
          </View>

          {/* Form */}

          <View style={styles.formCard}>
            {/* New Password */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                New password
              </Text>

              <View
                style={[
                  styles.inputContainer,
                  password.length > 0 &&
                    styles.inputActive,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={
                    password.length > 0
                      ? COLORS.blue
                      : COLORS.gray500
                  }
                />

                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);
                    setSubmitted(false);
                  }}
                  placeholder="Enter your new password"
                  placeholderTextColor={COLORS.gray500}
                  secureTextEntry={securePassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    setSecurePassword(
                      !securePassword
                    )
                  }
                >
                  <Ionicons
                    name={
                      securePassword
                        ? 'eye-outline'
                        : 'eye-off-outline'
                    }
                    size={21}
                    color={COLORS.gray500}
                  />
                </TouchableOpacity>
              </View>

              {/* Password Strength */}

              {password.length > 0 && (
                <View style={styles.strengthSection}>
                  <View style={styles.strengthHeader}>
                    <Text style={styles.strengthTitle}>
                      Password strength
                    </Text>

                    <Text
                      style={[
                        styles.strengthLabel,
                        {
                          color: strengthColor,
                        },
                      ]}
                    >
                      {strengthLabel}
                    </Text>
                  </View>

                  <View style={styles.strengthBars}>
                    {[1, 2, 3, 4].map((bar) => (
                      <View
                        key={bar}
                        style={[
                          styles.strengthBar,
                          bar <= requirementCount && {
                            backgroundColor:
                              strengthColor,
                          },
                        ]}
                      />
                    ))}
                  </View>
                </View>
              )}
            </View>

            {/* Requirements */}

            <View style={styles.requirementsCard}>
              <Text style={styles.requirementsTitle}>
                Password requirements
              </Text>

              <View style={styles.requirementsGrid}>
                <Requirement
                  valid={requirements.length}
                >
                  At least 8 characters
                </Requirement>

                <Requirement
                  valid={requirements.uppercase}
                >
                  One uppercase letter
                </Requirement>

                <Requirement
                  valid={requirements.lowercase}
                >
                  One lowercase letter
                </Requirement>

                <Requirement
                  valid={requirements.number}
                >
                  One number
                </Requirement>
              </View>
            </View>

            {/* Confirm Password */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Confirm new password
              </Text>

              <View
                style={[
                  styles.inputContainer,
                  confirmPassword.length > 0 &&
                    styles.inputActive,
                  submitted &&
                    !passwordsMatch &&
                    styles.inputError,
                ]}
              >
                <Ionicons
                  name="shield-checkmark-outline"
                  size={20}
                  color={
                    passwordsMatch
                      ? COLORS.success
                      : COLORS.gray500
                  }
                />

                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={(value) => {
                    setConfirmPassword(value);
                    setSubmitted(false);
                  }}
                  placeholder="Confirm your new password"
                  placeholderTextColor={COLORS.gray500}
                  secureTextEntry={
                    secureConfirmPassword
                  }
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleReset}
                />

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    setSecureConfirmPassword(
                      !secureConfirmPassword
                    )
                  }
                >
                  <Ionicons
                    name={
                      secureConfirmPassword
                        ? 'eye-outline'
                        : 'eye-off-outline'
                    }
                    size={21}
                    color={COLORS.gray500}
                  />
                </TouchableOpacity>
              </View>

              {submitted && !passwordsMatch && (
                <View style={styles.errorRow}>
                  <Ionicons
                    name="alert-circle-outline"
                    size={15}
                    color={COLORS.error}
                  />

                  <Text style={styles.errorText}>
                    Passwords do not match.
                  </Text>
                </View>
              )}

              {passwordsMatch && (
                <View style={styles.matchRow}>
                  <Ionicons
                    name="checkmark-circle"
                    size={15}
                    color={COLORS.success}
                  />

                  <Text style={styles.matchText}>
                    Passwords match.
                  </Text>
                </View>
              )}
            </View>

            {/* Reset Button */}

            <TouchableOpacity
              style={[
                styles.resetButton,
                !canSubmit &&
                  styles.resetButtonDisabled,
              ]}
              activeOpacity={0.85}
              onPress={handleReset}
            >
              <Text style={styles.resetText}>
                Update password
              </Text>

              <View style={styles.arrow}>
                <Ionicons
                  name="arrow-forward"
                  size={19}
                  color={COLORS.blue}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Security */}

          <View style={styles.securityCard}>
            <View style={styles.securityIcon}>
              <Ionicons
                name="shield-checkmark-outline"
                size={21}
                color={COLORS.blue}
              />
            </View>

            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>
                Your information stays protected
              </Text>

              <Text style={styles.securityText}>
                After changing your password, you'll
                need to sign in again on other devices.
              </Text>
            </View>
          </View>

          {/* Footer */}

          <View style={styles.footer}>
            <Ionicons
              name="lock-closed-outline"
              size={13}
              color={COLORS.gray500}
            />

            <Text style={styles.footerText}>
              Secure healthcare information system
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 35,
  },

  /* Header */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 26,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  brandName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.black,
  },

  brandTagline: {
    fontSize: 9,
    color: COLORS.gray600,
    marginTop: 1,
  },

  /* Title */

  titleSection: {
    alignItems: 'center',
    marginBottom: 24,
  },

  iconCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: COLORS.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 19,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.8,
    color: COLORS.blue,
    marginBottom: 7,
  },

  title: {
    fontSize: 29,
    lineHeight: 36,
    fontWeight: '800',
    letterSpacing: -0.8,
    color: COLORS.black,
    textAlign: 'center',
  },

  description: {
    maxWidth: 350,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.gray600,
    textAlign: 'center',
    marginTop: 9,
  },

  /* Form */

  formCard: {
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 21,
    padding: 18,
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: 8,
  },

  inputContainer: {
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 15,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },

  inputActive: {
    borderColor: COLORS.blue,
    backgroundColor: '#FBFDFF',
  },

  inputError: {
    borderColor: COLORS.error,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.black,
    marginLeft: 10,
  },

  /* Strength */

  strengthSection: {
    marginTop: 10,
  },

  strengthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  strengthTitle: {
    fontSize: 9,
    color: COLORS.gray600,
  },

  strengthLabel: {
    fontSize: 9,
    fontWeight: '800',
  },

  strengthBars: {
    flexDirection: 'row',
    gap: 5,
  },

  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray200,
  },

  /* Requirements */

  requirementsCard: {
    backgroundColor: COLORS.gray100,
    borderRadius: 15,
    padding: 13,
    marginBottom: 18,
  },

  requirementsTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.gray900,
    marginBottom: 10,
  },

  requirementsGrid: {
    gap: 7,
  },

  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  requirementIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },

  requirementIconValid: {
    backgroundColor: '#DCFCE7',
  },

  requirementText: {
    fontSize: 10,
    color: COLORS.gray600,
  },

  requirementTextValid: {
    color: COLORS.success,
    fontWeight: '600',
  },

  /* Error / Match */

  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },

  errorText: {
    fontSize: 10,
    color: COLORS.error,
    marginLeft: 5,
  },

  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },

  matchText: {
    fontSize: 10,
    color: COLORS.success,
    fontWeight: '600',
    marginLeft: 5,
  },

  /* Button */

  resetButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',

    shadowColor: COLORS.blue,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 5,
  },

  resetButtonDisabled: {
    backgroundColor: '#AFC8ED',
    shadowOpacity: 0,
    elevation: 0,
  },

  resetText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.white,
  },

  arrow: {
    position: 'absolute',
    right: 7,
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Security */

  securityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.blueVeryLight,
    borderRadius: 17,
    padding: 13,
    marginTop: 18,
  },

  securityIcon: {
    width: 41,
    height: 41,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  securityContent: {
    flex: 1,
  },

  securityTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.black,
  },

  securityText: {
    fontSize: 9,
    lineHeight: 14,
    color: COLORS.gray600,
    marginTop: 3,
  },

  /* Footer */

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },

  footerText: {
    fontSize: 9,
    color: COLORS.gray500,
    marginLeft: 5,
  },
});