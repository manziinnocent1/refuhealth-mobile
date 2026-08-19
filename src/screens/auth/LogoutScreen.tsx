import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  blue: '#1565D8',
  blueDark: '#0D47A1',
  blueLight: '#EAF2FF',
  white: '#FFFFFF',
  black: '#111827',
  gray: '#667085',
  gray500: '#98A2B3',
  gray200: '#E4E7EC',
  lightGray: '#F5F7FA',
  success: '#12B76A',
};

type LogoutScreenProps = {
  onSignIn?: () => void;
  onHome?: () => void;
};

export default function LogoutScreen({
  onSignIn,
  onHome,
}: LogoutScreenProps) {
  const opacity = useRef(
    new Animated.Value(0)
  ).current;

  const scale = useRef(
    new Animated.Value(0.8)
  ).current;

  const translateY = useRef(
    new Animated.Value(20)
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),

      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        tension: 45,
        useNativeDriver: true,
      }),

      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale, translateY]);

  const handleSignIn = () => {
    if (onSignIn) {
      onSignIn();
    } else {
      console.log('Navigate to Login');
    }
  };

  const handleHome = () => {
    if (onHome) {
      onHome();
    } else {
      console.log('Navigate to Welcome');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />

      <View style={styles.container}>

        {/* ---------------------------------------------------------- */}
        {/* Header                                                     */}
        {/* ---------------------------------------------------------- */}

        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Ionicons
                name="medical"
                size={21}
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

        {/* ---------------------------------------------------------- */}
        {/* Main Content                                               */}
        {/* ---------------------------------------------------------- */}

        <Animated.View
          style={[
            styles.mainContent,
            {
              opacity,
              transform: [
                { scale },
                { translateY },
              ],
            },
          ]}
        >
          {/* Success Icon */}

          <View style={styles.successOuter}>
            <View style={styles.successMiddle}>
              <View style={styles.successInner}>
                <Ionicons
                  name="checkmark"
                  size={52}
                  color={COLORS.success}
                />
              </View>
            </View>
          </View>

          <Text style={styles.eyebrow}>
            SESSION ENDED
          </Text>

          <Text style={styles.title}>
            You're signed out
          </Text>

          <Text style={styles.description}>
            Your RefuHealth session has ended successfully.
            Your healthcare information remains protected.
          </Text>

          {/* Security Card */}

          <View style={styles.securityCard}>
            <View style={styles.securityIcon}>
              <Ionicons
                name="shield-checkmark-outline"
                size={24}
                color={COLORS.blue}
              />
            </View>

            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>
                Your session is secure
              </Text>

              <Text style={styles.securityText}>
                For your protection, always sign out when
                leaving a shared or clinical device.
              </Text>
            </View>
          </View>

          {/* Sign In */}

          <TouchableOpacity
            style={styles.signInButton}
            activeOpacity={0.85}
            onPress={handleSignIn}
          >
            <Text style={styles.signInText}>
              Sign in again
            </Text>

            <View style={styles.arrow}>
              <Ionicons
                name="arrow-forward"
                size={19}
                color={COLORS.blue}
              />
            </View>
          </TouchableOpacity>

          {/* Home */}

          <TouchableOpacity
            style={styles.homeButton}
            activeOpacity={0.7}
            onPress={handleHome}
          >
            <Ionicons
              name="home-outline"
              size={17}
              color={COLORS.gray}
            />

            <Text style={styles.homeText}>
              Return to welcome
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ---------------------------------------------------------- */}
        {/* Footer                                                     */}
        {/* ---------------------------------------------------------- */}

        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <Ionicons
              name="lock-closed-outline"
              size={13}
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },

  /* --------------------------------------------------------------- */
  /* Header                                                           */
  /* --------------------------------------------------------------- */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: COLORS.gray,
    marginTop: 1,
  },

  /* --------------------------------------------------------------- */
  /* Main                                                             */
  /* --------------------------------------------------------------- */

  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  successOuter: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  successMiddle: {
    width: 116,
    height: 116,
    borderRadius: 58,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  successInner: {
    width: 82,
    height: 82,
    borderRadius: 41,
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

  eyebrow: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    color: COLORS.success,
    marginTop: 28,
    marginBottom: 8,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
    color: COLORS.black,
    textAlign: 'center',
  },

  description: {
    maxWidth: 340,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 11,
  },

  /* --------------------------------------------------------------- */
  /* Security Card                                                    */
  /* --------------------------------------------------------------- */

  securityCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.blueLight,
    borderWidth: 1,
    borderColor: '#DCEAFF',
    borderRadius: 18,
    padding: 13,
    marginTop: 26,
  },

  securityIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
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
    lineHeight: 15,
    color: COLORS.gray,
    marginTop: 3,
  },

  /* --------------------------------------------------------------- */
  /* Buttons                                                           */
  /* --------------------------------------------------------------- */

  signInButton: {
    width: '100%',
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
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },

  signInText: {
    fontSize: 15,
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

  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 17,
    paddingVertical: 8,
  },

  homeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gray,
    marginLeft: 6,
  },

  /* --------------------------------------------------------------- */
  /* Footer                                                           */
  /* --------------------------------------------------------------- */

  footer: {
    alignItems: 'center',
  },

  footerRow: {
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