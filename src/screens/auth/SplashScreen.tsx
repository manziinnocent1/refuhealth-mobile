import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StatusBar,
  StyleSheet,
  Text,
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
  lightGray: '#F5F7FA',
};

type SplashScreenProps = {
  onFinish?: () => void;
};

export default function SplashScreen({
  onFinish,
}: SplashScreenProps) {
  const logoScale = useRef(
    new Animated.Value(0.7)
  ).current;

  const logoOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const textOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const textTranslate = useRef(
    new Animated.Value(18)
  ).current;

  const pulse = useRef(
    new Animated.Value(1)
  ).current;

  const progress = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 7,
        tension: 45,
        useNativeDriver: true,
      }),

      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 700,
        delay: 350,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.timing(textTranslate, {
        toValue: 0,
        duration: 700,
        delay: 350,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.timing(progress, {
        toValue: 1,
        duration: 2200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start();

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.06,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    const timer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, 2700);

    return () => {
      clearTimeout(timer);
      pulseAnimation.stop();
    };
  }, [
    logoScale,
    logoOpacity,
    textOpacity,
    textTranslate,
    pulse,
    progress,
    onFinish,
  ]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />

      <View style={styles.container}>

        {/* ---------------------------------------------------------- */}
        {/* Decorative Background                                     */}
        {/* ---------------------------------------------------------- */}

        <View style={styles.backgroundCircleLarge} />
        <View style={styles.backgroundCircleSmall} />

        {/* ---------------------------------------------------------- */}
        {/* Main Logo                                                  */}
        {/* ---------------------------------------------------------- */}

        <View style={styles.centerContent}>
          <Animated.View
            style={[
              styles.logoWrapper,
              {
                opacity: logoOpacity,
                transform: [
                  {
                    scale: Animated.multiply(
                      logoScale,
                      pulse
                    ),
                  },
                ],
              },
            ]}
          >
            <View style={styles.logoOuter}>
              <View style={styles.logoInner}>
                <Ionicons
                  name="medical"
                  size={55}
                  color={COLORS.blue}
                />
              </View>
            </View>

            {/* Connection nodes */}

            <View style={styles.nodeTop}>
              <Ionicons
                name="people-outline"
                size={17}
                color={COLORS.white}
              />
            </View>

            <View style={styles.nodeLeft}>
              <Ionicons
                name="shield-checkmark-outline"
                size={17}
                color={COLORS.white}
              />
            </View>

            <View style={styles.nodeRight}>
              <Ionicons
                name="document-text-outline"
                size={17}
                color={COLORS.white}
              />
            </View>
          </Animated.View>

          {/* -------------------------------------------------------- */}
          {/* Brand                                                     */}
          {/* -------------------------------------------------------- */}

          <Animated.View
            style={[
              styles.brandContainer,
              {
                opacity: textOpacity,
                transform: [
                  {
                    translateY: textTranslate,
                  },
                ],
              },
            ]}
          >
            <Text style={styles.brandName}>
              RefuHealth
            </Text>

            <Text style={styles.tagline}>
              Connected Care
            </Text>

            <View style={styles.divider} />

            <Text style={styles.message}>
              Connecting healthcare
            </Text>

            <Text style={styles.message}>
              across distance.
            </Text>
          </Animated.View>
        </View>

        {/* ---------------------------------------------------------- */}
        {/* Bottom                                                     */}
        {/* ---------------------------------------------------------- */}

        <Animated.View
          style={[
            styles.bottomSection,
            {
              opacity: textOpacity,
            },
          ]}
        >
          <View style={styles.progressBackground}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progressWidth,
                },
              ]}
            />
          </View>

          <View style={styles.statusRow}>
            <View style={styles.statusLeft}>
              <View style={styles.statusDot} />

              <Text style={styles.statusText}>
                Secure healthcare platform
              </Text>
            </View>

            <Text style={styles.version}>
              v1.0
            </Text>
          </View>
        </Animated.View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingVertical: 35,
    overflow: 'hidden',
  },

  /* Background */

  backgroundCircleLarge: {
    position: 'absolute',
    width: 390,
    height: 390,
    borderRadius: 195,
    backgroundColor: COLORS.blueLight,
    opacity: 0.55,
    top: -180,
    right: -150,
  },

  backgroundCircleSmall: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: '#F4F8FF',
    bottom: -80,
    left: -90,
  },

  /* Center */

  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  logoWrapper: {
    width: 190,
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  logoOuter: {
    width: 155,
    height: 155,
    borderRadius: 78,
    backgroundColor: COLORS.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoInner: {
    width: 115,
    height: 115,
    borderRadius: 58,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 5,
  },

  nodeTop: {
    position: 'absolute',
    top: 2,
    right: 27,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  nodeLeft: {
    position: 'absolute',
    bottom: 11,
    left: 8,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.blueDark,
    alignItems: 'center',
    justifyContent: 'center',
  },

  nodeRight: {
    position: 'absolute',
    bottom: 28,
    right: 2,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Brand */

  brandContainer: {
    alignItems: 'center',
    marginTop: 10,
  },

  brandName: {
    fontSize: 38,
    fontWeight: '800',
    color: COLORS.black,
    letterSpacing: -1.5,
  },

  tagline: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2.5,
    color: COLORS.blue,
    marginTop: 3,
  },

  divider: {
    width: 38,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.blue,
    marginVertical: 18,
  },

  message: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.gray,
    textAlign: 'center',
  },

  /* Bottom */

  bottomSection: {
    width: '100%',
  },

  progressBackground: {
    height: 4,
    width: '100%',
    borderRadius: 2,
    backgroundColor: COLORS.lightGray,
    overflow: 'hidden',
  },

  progressBar: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: COLORS.blue,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#12B76A',
    marginRight: 7,
  },

  statusText: {
    fontSize: 9,
    color: COLORS.gray,
  },

  version: {
    fontSize: 9,
    color: '#98A2B3',
  },
});