import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Keyboard,
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

type VerifyCodeScreenProps = {
  email?: string;
  onBack?: () => void;
  onVerify?: (code: string) => void;
  onResend?: () => void;
};

export default function VerifyCodeScreen({
  email = 'your registered email',
  onBack,
  onVerify,
  onResend,
}: VerifyCodeScreenProps) {
  const [code, setCode] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  const [seconds, setSeconds] = useState(45);
  const [error, setError] = useState('');

  const inputRefs = useRef<
    Array<TextInput | null>
  >([]);

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSeconds((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleCodeChange = (
    value: string,
    index: number
  ) => {
    setError('');

    const cleanValue = value
      .replace(/[^0-9]/g, '')
      .slice(-1);

    const newCode = [...code];
    newCode[index] = cleanValue;

    setCode(newCode);

    if (cleanValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (
      cleanValue &&
      index === 5 &&
      newCode.every((digit) => digit !== '')
    ) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (
    key: string,
    index: number
  ) => {
    if (
      key === 'Backspace' &&
      !code[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');

    if (fullCode.length !== 6) {
      setError(
        'Please enter the complete 6-digit verification code.'
      );
      return;
    }

    if (onVerify) {
      onVerify(fullCode);
    } else {
      console.log('Verify code:', fullCode);
    }
  };

  const handleResend = () => {
    if (seconds > 0) {
      return;
    }

    setSeconds(45);
    setCode(['', '', '', '', '', '']);
    setError('');

    inputRefs.current[0]?.focus();

    if (onResend) {
      onResend();
    } else {
      console.log('Resend verification code');
    }
  };

  const isComplete = code.every(
    (digit) => digit !== ''
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

          {/* Illustration */}

          <View style={styles.illustration}>
            <View style={styles.illustrationCircle}>
              <Ionicons
                name="shield-checkmark-outline"
                size={48}
                color={COLORS.blue}
              />
            </View>

            <View style={styles.codeBadge}>
              <Text style={styles.codeBadgeText}>
                6
              </Text>
            </View>
          </View>

          {/* Title */}

          <View style={styles.titleSection}>
            <Text style={styles.eyebrow}>
              VERIFICATION
            </Text>

            <Text style={styles.title}>
              Verify your identity
            </Text>

            <Text style={styles.description}>
              We've sent a 6-digit verification code
              to your registered contact.
            </Text>

            <View style={styles.destination}>
              <Ionicons
                name="mail-outline"
                size={16}
                color={COLORS.blue}
              />

              <Text
                style={styles.destinationText}
                numberOfLines={1}
              >
                {email}
              </Text>
            </View>
          </View>

          {/* Code Input */}

          <View style={styles.formCard}>
            <Text style={styles.label}>
              Enter verification code
            </Text>

            <View style={styles.codeRow}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  value={digit}
                  onChangeText={(value) =>
                    handleCodeChange(value, index)
                  }
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(
                      nativeEvent.key,
                      index
                    )
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  style={[
                    styles.codeInput,
                    digit !== '' &&
                      styles.codeInputActive,
                    error !== '' &&
                      styles.codeInputError,
                  ]}
                  textAlign="center"
                  textContentType="oneTimeCode"
                  autoComplete="sms-otp"
                />
              ))}
            </View>

            {error !== '' && (
              <View style={styles.errorRow}>
                <Ionicons
                  name="alert-circle-outline"
                  size={17}
                  color={COLORS.error}
                />

                <Text style={styles.errorText}>
                  {error}
                </Text>
              </View>
            )}

            {/* Verify */}

            <TouchableOpacity
              style={[
                styles.verifyButton,
                !isComplete &&
                  styles.verifyButtonDisabled,
              ]}
              disabled={!isComplete}
              activeOpacity={0.85}
              onPress={handleVerify}
            >
              <Text style={styles.verifyText}>
                Verify code
              </Text>

              <View style={styles.arrow}>
                <Ionicons
                  name="arrow-forward"
                  size={19}
                  color={COLORS.blue}
                />
              </View>
            </TouchableOpacity>

            {/* Resend */}

            <View style={styles.resendSection}>
              <Text style={styles.resendText}>
                Didn't receive the code?
              </Text>

              <TouchableOpacity
                disabled={seconds > 0}
                onPress={handleResend}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.resendLink,
                    seconds > 0 &&
                      styles.resendDisabled,
                  ]}
                >
                  {seconds > 0
                    ? `Resend in ${seconds}s`
                    : 'Resend code'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Security */}

          <View style={styles.securityCard}>
            <View style={styles.securityIcon}>
              <Ionicons
                name="lock-closed-outline"
                size={19}
                color={COLORS.blue}
              />
            </View>

            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>
                Keep your code private
              </Text>

              <Text style={styles.securityText}>
                RefuHealth support will never ask you
                to share your verification code.
              </Text>
            </View>
          </View>

          {/* Footer */}

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Secure healthcare information system
            </Text>

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
    paddingBottom: 35,
  },

  /* Header */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
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

  illustration: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 24,
  },

  illustrationCircle: {
    width: 105,
    height: 105,
    borderRadius: 53,
    backgroundColor: COLORS.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  codeBadge: {
    position: 'absolute',
    right: '32%',
    bottom: -4,
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  codeBadgeText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },

  /* Title */

  titleSection: {
    alignItems: 'center',
    marginBottom: 24,
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
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.gray600,
    textAlign: 'center',
    marginTop: 9,
    maxWidth: 340,
  },

  destination: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.blueVeryLight,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: 11,
    maxWidth: '90%',
  },

  destinationText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.blueDark,
    marginLeft: 6,
    flexShrink: 1,
  },

  /* Form */

  formCard: {
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 21,
    padding: 18,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: 13,
  },

  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  codeInput: {
    width: 45,
    height: 54,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 13,
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.black,
    backgroundColor: COLORS.white,
  },

  codeInputActive: {
    borderColor: COLORS.blue,
    backgroundColor: COLORS.blueVeryLight,
  },

  codeInputError: {
    borderColor: COLORS.error,
  },

  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  errorText: {
    flex: 1,
    fontSize: 10,
    color: COLORS.error,
    marginLeft: 6,
  },

  verifyButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    position: 'relative',
  },

  verifyButtonDisabled: {
    backgroundColor: '#AFC8ED',
  },

  verifyText: {
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

  /* Resend */

  resendSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 19,
  },

  resendText: {
    fontSize: 11,
    color: COLORS.gray600,
  },

  resendLink: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.blue,
    marginLeft: 5,
  },

  resendDisabled: {
    color: COLORS.gray500,
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
    width: 40,
    height: 40,
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
    alignItems: 'center',
    marginTop: 22,
  },

  footerText: {
    fontSize: 9,
    color: COLORS.gray500,
  },

  version: {
    fontSize: 9,
    color: '#B0B7C3',
    marginTop: 4,
  },
});