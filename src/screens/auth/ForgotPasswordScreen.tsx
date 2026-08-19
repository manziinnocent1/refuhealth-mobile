import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
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
};

type ForgotPasswordScreenProps = {
  onBack?: () => void;
  onContinue?: (identifier: string) => void;
};

export default function ForgotPasswordScreen({
  onBack,
  onContinue,
}: ForgotPasswordScreenProps) {
  const [identifier, setIdentifier] = useState('');

  const canContinue = identifier.trim().length > 0;

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }

    if (onContinue) {
      onContinue(identifier.trim());
    } else {
      console.log(
        'Continue password recovery:',
        identifier
      );
    }
  };

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
          {/* -------------------------------------------------------- */}
          {/* Header                                                   */}
          {/* -------------------------------------------------------- */}

          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                if (onBack) {
                  onBack();
                } else {
                  console.log('Go back');
                }
              }}
              activeOpacity={0.7}
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

          {/* -------------------------------------------------------- */}
          {/* Illustration                                             */}
          {/* -------------------------------------------------------- */}

          <View style={styles.illustrationWrapper}>
            <View style={styles.illustrationOuter}>
              <View style={styles.illustrationMiddle}>
                <View style={styles.illustrationInner}>
                  <Ionicons
                    name="lock-open-outline"
                    size={46}
                    color={COLORS.blue}
                  />
                </View>
              </View>

              <View style={styles.securityBadge}>
                <Ionicons
                  name="shield-checkmark"
                  size={19}
                  color={COLORS.white}
                />
              </View>
            </View>
          </View>

          {/* -------------------------------------------------------- */}
          {/* Title                                                    */}
          {/* -------------------------------------------------------- */}

          <View style={styles.titleSection}>
            <Text style={styles.eyebrow}>
              ACCOUNT RECOVERY
            </Text>

            <Text style={styles.title}>
              Forgot your password?
            </Text>

            <Text style={styles.description}>
              No worries. Enter your registered email
              address or employee ID and we'll help you
              securely recover your account.
            </Text>
          </View>

          {/* -------------------------------------------------------- */}
          {/* Form Card                                                */}
          {/* -------------------------------------------------------- */}

          <View style={styles.formCard}>
            <Text style={styles.label}>
              Email or Employee ID
            </Text>

            <View
              style={[
                styles.inputContainer,
                identifier.length > 0 &&
                  styles.inputActive,
              ]}
            >
              <Ionicons
                name="person-outline"
                size={20}
                color={
                  identifier.length > 0
                    ? COLORS.blue
                    : COLORS.gray500
                }
              />

              <TextInput
                style={styles.input}
                value={identifier}
                onChangeText={setIdentifier}
                placeholder="Enter your email or employee ID"
                placeholderTextColor={COLORS.gray500}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="done"
                onSubmitEditing={handleContinue}
              />
            </View>

            <View style={styles.infoBox}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color={COLORS.blue}
                />
              </View>

              <Text style={styles.infoText}>
                We'll send a secure verification code to
                the contact information registered with
                your account.
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.continueButton,
                !canContinue &&
                  styles.continueButtonDisabled,
              ]}
              onPress={handleContinue}
              disabled={!canContinue}
              activeOpacity={0.85}
            >
              <Text style={styles.continueText}>
                Continue securely
              </Text>

              <View style={styles.arrowContainer}>
                <Ionicons
                  name="arrow-forward"
                  size={19}
                  color={COLORS.blue}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* -------------------------------------------------------- */}
          {/* Security                                                 */}
          {/* -------------------------------------------------------- */}

          <View style={styles.securitySection}>
            <Ionicons
              name="shield-checkmark-outline"
              size={17}
              color={COLORS.success}
            />

            <Text style={styles.securityText}>
              Your account recovery is protected by
              secure verification.
            </Text>
          </View>

          {/* -------------------------------------------------------- */}
          {/* Footer                                                   */}
          {/* -------------------------------------------------------- */}

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Need additional help?
            </Text>

            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.supportLink}>
                Contact support
              </Text>
            </TouchableOpacity>
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
    marginBottom: 32,
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

  /* Illustration */

  illustrationWrapper: {
    alignItems: 'center',
    marginBottom: 28,
  },

  illustrationOuter: {
    width: 145,
    height: 145,
    borderRadius: 73,
    backgroundColor: COLORS.blueVeryLight,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  illustrationMiddle: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: COLORS.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  illustrationInner: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },

  securityBadge: {
    position: 'absolute',
    right: 3,
    bottom: 12,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Title */

  titleSection: {
    alignItems: 'center',
    marginBottom: 26,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.8,
    color: COLORS.blue,
    marginBottom: 8,
  },

  title: {
    fontSize: 30,
    lineHeight: 37,
    fontWeight: '800',
    letterSpacing: -0.8,
    color: COLORS.black,
    textAlign: 'center',
  },

  description: {
    maxWidth: 350,
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.gray600,
    textAlign: 'center',
    marginTop: 10,
  },

  /* Form */

  formCard: {
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 21,
    padding: 18,

    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.04,
    shadowRadius: 14,
    elevation: 2,
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
  },

  inputActive: {
    borderColor: COLORS.blue,
    backgroundColor: '#FBFDFF',
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.black,
    marginLeft: 10,
  },

  infoBox: {
    flexDirection: 'row',
    backgroundColor: COLORS.blueVeryLight,
    borderRadius: 14,
    padding: 12,
    marginTop: 14,
  },

  infoIcon: {
    marginRight: 9,
  },

  infoText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 16,
    color: COLORS.gray600,
  },

  continueButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
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

  continueButtonDisabled: {
    backgroundColor: '#AFC8ED',
    shadowOpacity: 0,
    elevation: 0,
  },

  continueText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },

  arrowContainer: {
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

  securitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },

  securityText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 15,
    color: COLORS.gray600,
    marginLeft: 7,
  },

  /* Footer */

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  footerText: {
    fontSize: 11,
    color: COLORS.gray600,
  },

  supportLink: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.blue,
    marginLeft: 5,
  },
});