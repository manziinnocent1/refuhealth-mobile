import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons name="medical" size={24} color={COLORS.white} />
            </View>

            <View>
              <Text style={styles.logoText}>RefuHealth</Text>
              <Text style={styles.logoSubtitle}>
                Connected Care
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.languageButton}
            activeOpacity={0.7}
          >
            <Ionicons
              name="globe-outline"
              size={19}
              color={COLORS.black}
            />
            <Text style={styles.languageText}>EN</Text>
          </TouchableOpacity>
        </View>

        {/* Main Hero */}
        <View style={styles.heroSection}>
          <View style={styles.networkContainer}>
            {/* Decorative network */}
            <View style={[styles.circle, styles.circleOne]} />
            <View style={[styles.circle, styles.circleTwo]} />
            <View style={[styles.circle, styles.circleThree]} />

            <View style={styles.connectionLineOne} />
            <View style={styles.connectionLineTwo} />
            <View style={styles.connectionLineThree} />

            {/* Main medical icon */}
            <View style={styles.mainIconOuter}>
              <View style={styles.mainIcon}>
                <Ionicons
                  name="medical"
                  size={58}
                  color={COLORS.blue}
                />
              </View>
            </View>

            {/* Floating icons */}
            <View style={[styles.floatingIcon, styles.floatingTop]}>
              <Ionicons
                name="people-outline"
                size={22}
                color={COLORS.blue}
              />
            </View>

            <View style={[styles.floatingIcon, styles.floatingLeft]}>
              <Ionicons
                name="shield-checkmark-outline"
                size={22}
                color={COLORS.blue}
              />
            </View>

            <View style={[styles.floatingIcon, styles.floatingRight]}>
              <Ionicons
                name="document-text-outline"
                size={22}
                color={COLORS.blue}
              />
            </View>
          </View>

          <Text style={styles.eyebrow}>
            CONNECTED HEALTHCARE
          </Text>

          <Text style={styles.title}>
            Better care,{'\n'}
            <Text style={styles.titleBlue}>connected.</Text>
          </Text>

          <Text style={styles.description}>
            Securely connect patients, receptionists, nurses,
            doctors, laboratories and healthcare providers —
            even when care happens across different facilities.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          <Feature
            icon="shield-checkmark-outline"
            title="Secure"
            description="Protected health information"
          />

          <Feature
            icon="cloud-offline-outline"
            title="Offline Ready"
            description="Keep working without internet"
          />

          <Feature
            icon="git-network-outline"
            title="Connected"
            description="Share care across facilities"
          />
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => {
              console.log('Get Started pressed');
            }}
          >
            <Text style={styles.primaryButtonText}>
              Get Started
            </Text>

            <View style={styles.buttonIcon}>
              <Ionicons
                name="arrow-forward"
                size={20}
                color={COLORS.blue}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signInButton}
            activeOpacity={0.7}
            onPress={() => {
              console.log('Sign In pressed');
            }}
          >
            <Text style={styles.signInText}>
              Already have an account?
            </Text>

            <Text style={styles.signInLink}>
              Sign in
            </Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Healthcare information. Connected securely.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* -------------------------------------------------------------------------- */
/* Feature Component                                                          */
/* -------------------------------------------------------------------------- */

type FeatureProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
};

function Feature({
  icon,
  title,
  description,
}: FeatureProps) {
  return (
    <View style={styles.feature}>
      <View style={styles.featureIcon}>
        <Ionicons
          name={icon}
          size={20}
          color={COLORS.blue}
        />
      </View>

      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>
          {description}
        </Text>
      </View>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* Design System                                                              */
/* -------------------------------------------------------------------------- */

const COLORS = {
  blue: '#1565D8',
  blueDark: '#0D47A1',
  blueLight: '#EAF2FF',
  white: '#FFFFFF',
  black: '#111827',
  gray: '#667085',
  lightGray: '#F5F7FA',
  border: '#E5E7EB',
};

/* -------------------------------------------------------------------------- */
/* Styles                                                                     */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  /* Header */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 14,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.black,
    letterSpacing: -0.4,
  },

  logoSubtitle: {
    marginTop: 1,
    fontSize: 11,
    color: COLORS.gray,
    fontWeight: '500',
  },

  languageButton: {
    height: 38,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  languageText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.black,
  },

  /* Hero */

  heroSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },

  networkContainer: {
    width: 230,
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 15,
  },

  mainIconOuter: {
    width: 142,
    height: 142,
    borderRadius: 71,
    backgroundColor: COLORS.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainIcon: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 5,
  },

  circle: {
    position: 'absolute',
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.blue,
  },

  circleOne: {
    top: 25,
    left: 55,
  },

  circleTwo: {
    bottom: 18,
    left: 34,
  },

  circleThree: {
    right: 35,
    top: 74,
  },

  connectionLineOne: {
    position: 'absolute',
    width: 75,
    height: 1,
    backgroundColor: '#C8DBF7',
    top: 53,
    left: 60,
    transform: [{ rotate: '32deg' }],
  },

  connectionLineTwo: {
    position: 'absolute',
    width: 70,
    height: 1,
    backgroundColor: '#C8DBF7',
    bottom: 42,
    left: 55,
    transform: [{ rotate: '-28deg' }],
  },

  connectionLineThree: {
    position: 'absolute',
    width: 70,
    height: 1,
    backgroundColor: '#C8DBF7',
    right: 51,
    top: 82,
    transform: [{ rotate: '-25deg' }],
  },

  floatingIcon: {
    position: 'absolute',
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  floatingTop: {
    top: 5,
    right: 35,
  },

  floatingLeft: {
    bottom: 5,
    left: 12,
  },

  floatingRight: {
    bottom: 25,
    right: 4,
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    color: COLORS.blue,
    marginBottom: 10,
  },

  title: {
    fontSize: 38,
    lineHeight: 43,
    fontWeight: '800',
    letterSpacing: -1.4,
    textAlign: 'center',
    color: COLORS.black,
  },

  titleBlue: {
    color: COLORS.blue,
  },

  description: {
    maxWidth: 340,
    marginTop: 14,
    fontSize: 15,
    lineHeight: 23,
    color: COLORS.gray,
    textAlign: 'center',
  },

  /* Features */

  features: {
    width: '100%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    padding: 14,
    marginBottom: 16,
  },

  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },

  featureIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  featureContent: {
    flex: 1,
  },

  featureTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.black,
  },

  featureDescription: {
    marginTop: 2,
    fontSize: 11,
    color: COLORS.gray,
  },

  /* Bottom */

  bottomSection: {
    paddingBottom: 12,
  },

  primaryButton: {
    height: 58,
    borderRadius: 18,
    backgroundColor: COLORS.blue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',

    shadowColor: COLORS.blue,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 6,
  },

  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },

  buttonIcon: {
    position: 'absolute',
    right: 8,
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },

  signInText: {
    fontSize: 13,
    color: COLORS.gray,
  },

  signInLink: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.blue,
  },

  footerText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 10,
    color: '#98A2B3',
  },
});