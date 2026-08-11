import React, { useState } from 'react';
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
};

type LoginScreenProps = {
  onSignIn: () => void;
  onCreateAccount: () => void;
};

export default function LoginScreen({
  onSignIn,
  onCreateAccount,
}: LoginScreenProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const canLogin =
    identifier.trim().length > 0 &&
    password.trim().length > 0;

  const handleLogin = () => {
    if (!canLogin) {
      return;
    }

    // Authentication will be connected to the Django API later.
    console.log('Login:', {
      identifier,
      password,
      rememberMe,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ---------------------------------------------------------- */}
          {/* Header                                                     */}
          {/* ---------------------------------------------------------- */}

          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Ionicons
                  name="medical"
                  size={23}
                  color={COLORS.white}
                />
              </View>

              <View>
                <Text style={styles.brandName}>RefuHealth</Text>

                <Text style={styles.brandTagline}>
                  Connected Care
                </Text>
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

          {/* ---------------------------------------------------------- */}
          {/* Security Banner                                            */}
          {/* ---------------------------------------------------------- */}

          <View style={styles.securityBanner}>
            <View style={styles.securityIcon}>
              <Ionicons
                name="shield-checkmark"
                size={19}
                color={COLORS.blue}
              />
            </View>

            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>
                Secure healthcare access
              </Text>

              <Text style={styles.securityText}>
                Your health information is protected.
              </Text>
            </View>

            <View style={styles.onlineIndicator}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Secure</Text>
            </View>
          </View>

          {/* ---------------------------------------------------------- */}
          {/* Welcome Text                                               */}
          {/* ---------------------------------------------------------- */}

          <View style={styles.welcomeSection}>
            <Text style={styles.eyebrow}>
              WELCOME BACK
            </Text>

            <Text style={styles.title}>
              Sign in to your
              <Text style={styles.titleBlue}>
                {' '}RefuHealth
              </Text>
            </Text>

            <Text style={styles.description}>
              Access the information you need to provide
              timely, coordinated and patient-centered care.
            </Text>
          </View>

          {/* ---------------------------------------------------------- */}
          {/* Login Card                                                 */}
          {/* ---------------------------------------------------------- */}

          <View style={styles.loginCard}>
            {/* Identifier */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Email or Employee ID
              </Text>

              <View
                style={[
                  styles.inputContainer,
                  identifier.length > 0 && styles.inputActive,
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
                  returnKeyType="next"
                />
              </View>
            </View>

            {/* Password */}

            <View style={styles.inputGroup}>
              <View style={styles.passwordLabelRow}>
                <Text style={styles.label}>
                  Password
                </Text>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    console.log('Forgot password');
                  }}
                >
                  <Text style={styles.forgotPassword}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  styles.inputContainer,
                  password.length > 0 && styles.inputActive,
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
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.gray500}
                  secureTextEntry={securePassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />

                <TouchableOpacity
                  onPress={() =>
                    setSecurePassword(!securePassword)
                  }
                  activeOpacity={0.7}
                  accessibilityLabel={
                    securePassword
                      ? 'Show password'
                      : 'Hide password'
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
            </View>

            {/* Remember Me */}

            <TouchableOpacity
              style={styles.rememberRow}
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  rememberMe && styles.checkboxActive,
                ]}
              >
                {rememberMe && (
                  <Ionicons
                    name="checkmark"
                    size={15}
                    color={COLORS.white}
                  />
                )}
              </View>

              <Text style={styles.rememberText}>
                Keep me signed in
              </Text>
            </TouchableOpacity>

            {/* Login Button */}

            <TouchableOpacity
              style={[
                styles.loginButton,
                !canLogin && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              activeOpacity={0.85}
              disabled={!canLogin}
            >
              <Text style={styles.loginButtonText}>
                Sign in securely
              </Text>

              <View style={styles.loginArrow}>
                <Ionicons
                  name="arrow-forward"
                  size={19}
                  color={COLORS.blue}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* ---------------------------------------------------------- */}
          {/* Other Access                                               */}
          {/* ---------------------------------------------------------- */}

          <View style={styles.otherAccess}>
            <View style={styles.divider} />

            <Text style={styles.orText}>
              OR
            </Text>

            <View style={styles.divider} />
          </View>

          <TouchableOpacity
            style={styles.biometricButton}
            activeOpacity={0.75}
            onPress={() => {
              console.log('Biometric authentication');
            }}
          >
            <View style={styles.biometricIcon}>
              <Ionicons
                name="finger-print-outline"
                size={24}
                color={COLORS.blue}
              />
            </View>

            <View style={styles.biometricContent}>
              <Text style={styles.biometricTitle}>
                Use biometric sign in
              </Text>

              <Text style={styles.biometricDescription}>
                Face ID or fingerprint
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.gray500}
            />
          </TouchableOpacity>

          {/* ---------------------------------------------------------- */}
          {/* Support                                                    */}
          {/* ---------------------------------------------------------- */}

          <View style={styles.supportSection}>
            <Text style={styles.supportText}>
              Having trouble signing in?
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                console.log('Contact support');
              }}
            >
              <Text style={styles.supportLink}>
                Contact support
              </Text>
            </TouchableOpacity>
          </View>

          {/* ---------------------------------------------------------- */}
          {/* Footer                                                     */}
          {/* ---------------------------------------------------------- */}

          <View style={styles.footer}>
            <View style={styles.footerSecurity}>
              <Ionicons
                name="lock-closed"
                size={12}
                color={COLORS.gray500}
              />

              <Text style={styles.footerText}>
                Secure healthcare information system
              </Text>
            </View>

            <Text style={styles.version}>
              RefuHealth • v1.0
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
    paddingBottom: 30,
  },

  /* --------------------------------------------------------------- */
  /* Header                                                           */
  /* --------------------------------------------------------------- */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  brandName: {
    fontSize: 19,
    fontWeight: '800',
    color: COLORS.black,
    letterSpacing: -0.4,
  },

  brandTagline: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.gray600,
    marginTop: 1,
  },

  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* --------------------------------------------------------------- */
  /* Security Banner                                                  */
  /* --------------------------------------------------------------- */

  securityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.blueVeryLight,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#DCEAFF',
    padding: 12,
    marginBottom: 30,
  },

  securityIcon: {
    width: 38,
    height: 38,
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
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.black,
  },

  securityText: {
    fontSize: 10,
    color: COLORS.gray600,
    marginTop: 2,
  },

  onlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
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

  onlineText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.gray900,
  },

  /* --------------------------------------------------------------- */
  /* Welcome                                                          */
  /* --------------------------------------------------------------- */

  welcomeSection: {
    marginBottom: 25,
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.8,
    color: COLORS.blue,
    marginBottom: 8,
  },

  title: {
    fontSize: 32,
    lineHeight: 39,
    fontWeight: '800',
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

  /* --------------------------------------------------------------- */
  /* Login Card                                                       */
  /* --------------------------------------------------------------- */

  loginCard: {
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
    marginBottom: 18,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: 8,
  },

  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  forgotPassword: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.blue,
  },

  inputContainer: {
    minHeight: 54,
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

  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.black,
    marginLeft: 10,
    paddingVertical: 0,
  },

  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: COLORS.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  checkboxActive: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
  },

  rememberText: {
    fontSize: 12,
    color: COLORS.gray600,
  },

  loginButton: {
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
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },

  loginButtonDisabled: {
    backgroundColor: '#AFC8ED',
    shadowOpacity: 0,
    elevation: 0,
  },

  loginButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
  },

  loginArrow: {
    position: 'absolute',
    right: 7,
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* --------------------------------------------------------------- */
  /* Other Access                                                     */
  /* --------------------------------------------------------------- */

  otherAccess: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 22,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray200,
  },

  orText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.gray500,
    marginHorizontal: 12,
  },

  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 17,
    padding: 12,
    backgroundColor: COLORS.white,
  },

  biometricIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  biometricContent: {
    flex: 1,
  },

  biometricTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.black,
  },

  biometricDescription: {
    fontSize: 10,
    color: COLORS.gray500,
    marginTop: 3,
  },

  /* --------------------------------------------------------------- */
  /* Support                                                          */
  /* --------------------------------------------------------------- */

  supportSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  supportText: {
    fontSize: 11,
    color: COLORS.gray600,
  },

  supportLink: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.blue,
    marginLeft: 5,
  },

  /* --------------------------------------------------------------- */
  /* Footer                                                           */
  /* --------------------------------------------------------------- */

  footer: {
    alignItems: 'center',
    marginTop: 24,
  },

  footerSecurity: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  footerText: {
    fontSize: 9,
    color: COLORS.gray500,
    marginLeft: 5,
  },

  version: {
    fontSize: 9,
    color: '#B0B7C3',
    marginTop: 5,
  },
});