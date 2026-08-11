import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type WelcomeScreenProps = {
  onGetStarted: () => void;
  onSignIn: () => void;
};

export default function WelcomeScreen({
  onGetStarted,
  onSignIn,
}: WelcomeScreenProps) {
  const { width, height } = useWindowDimensions();

  // Responsive measurements
  const isSmallPhone = width < 360;
  const isShortScreen = height < 720;

  const horizontalPadding = isSmallPhone ? 18 : 22;

  const scale = Math.min(Math.max(width / 390, 0.88), 1.08);

  const illustrationWidth = Math.min(width - 70, 230);
  const illustrationHeight = isShortScreen ? 165 : 185;

  const titleSize = isSmallPhone ? 34 : isShortScreen ? 36 : 38;
  const titleLineHeight = titleSize + 4;

  const descriptionSize = isSmallPhone ? 14 : 15;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: horizontalPadding,
          },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              paddingTop: isShortScreen ? 8 : 14,
            },
          ]}
        >
          <View style={styles.logoContainer}>
            <View
              style={[
                styles.logoIcon,
                {
                  width: isSmallPhone ? 40 : 44,
                  height: isSmallPhone ? 40 : 44,
                },
              ]}
            >
              <Ionicons
                name="medical"
                size={isSmallPhone ? 21 : 24}
                color={COLORS.white}
              />
            </View>

            <View>
              <Text
                style={[
                  styles.logoText,
                  {
                    fontSize: isSmallPhone ? 19 : 20,
                  },
                ]}
              >
                RefuHealth
              </Text>

              <Text style={styles.logoSubtitle}>Connected Care</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.languageButton,
              {
                height: isSmallPhone ? 36 : 38,
              },
            ]}
            activeOpacity={0.7}
          >
            <Ionicons name="globe-outline" size={18} color={COLORS.black} />

            <Text style={styles.languageText}>EN</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Hero Illustration */}
          <View
            style={[
              styles.networkContainer,
              {
                width: illustrationWidth,
                height: illustrationHeight,
                marginTop: isShortScreen ? 4 : 10,
                marginBottom: isShortScreen ? 8 : 14,
              },
            ]}
          >
            {/* Decorative dots */}
            <View style={[styles.circle, styles.circleOne]} />
            <View style={[styles.circle, styles.circleTwo]} />
            <View style={[styles.circle, styles.circleThree]} />

            {/* Connection lines */}
            <View style={[styles.connectionLine, styles.lineOne]} />
            <View style={[styles.connectionLine, styles.lineTwo]} />
            <View style={[styles.connectionLine, styles.lineThree]} />

            {/* Main icon */}
            <View
              style={[
                styles.mainIconOuter,
                {
                  width: isSmallPhone ? 126 : 142,
                  height: isSmallPhone ? 126 : 142,
                  borderRadius: isSmallPhone ? 63 : 71,
                },
              ]}
            >
              <View
                style={[
                  styles.mainIcon,
                  {
                    width: isSmallPhone ? 94 : 108,
                    height: isSmallPhone ? 94 : 108,
                    borderRadius: isSmallPhone ? 47 : 54,
                  },
                ]}
              >
                <Ionicons
                  name="medical"
                  size={isSmallPhone ? 48 : 58}
                  color={COLORS.blue}
                />
              </View>
            </View>

            {/* Floating people icon */}
            <View
              style={[
                styles.floatingIcon,
                styles.floatingTop,
                {
                  width: isSmallPhone ? 42 : 46,
                  height: isSmallPhone ? 42 : 46,
                },
              ]}
            >
              <Ionicons
                name="people-outline"
                size={isSmallPhone ? 20 : 22}
                color={COLORS.blue}
              />
            </View>

            {/* Floating shield */}
            <View
              style={[
                styles.floatingIcon,
                styles.floatingLeft,
                {
                  width: isSmallPhone ? 42 : 46,
                  height: isSmallPhone ? 42 : 46,
                },
              ]}
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={isSmallPhone ? 20 : 22}
                color={COLORS.blue}
              />
            </View>

            {/* Floating document */}
            <View
              style={[
                styles.floatingIcon,
                styles.floatingRight,
                {
                  width: isSmallPhone ? 42 : 46,
                  height: isSmallPhone ? 42 : 46,
                },
              ]}
            >
              <Ionicons
                name="document-text-outline"
                size={isSmallPhone ? 20 : 22}
                color={COLORS.blue}
              />
            </View>
          </View>

          {/* Eyebrow */}
          <Text
            style={[
              styles.eyebrow,
              {
                fontSize: isSmallPhone ? 10 : 11,
                letterSpacing: isSmallPhone ? 1.6 : 2,
              },
            ]}
          >
            CONNECTED HEALTHCARE
          </Text>

          {/* Heading */}
          <Text
            style={[
              styles.title,
              {
                fontSize: titleSize,
                lineHeight: titleLineHeight,
              },
            ]}
          >
            Better care,{"\n"}
            <Text style={styles.titleBlue}>connected.</Text>
          </Text>

          {/* Description */}
          <Text
            style={[
              styles.description,
              {
                fontSize: descriptionSize,
                lineHeight: isSmallPhone ? 21 : 23,
                marginTop: isShortScreen ? 10 : 14,
              },
            ]}
          >
            Securely connect patients, receptionists, nurses, doctors,
            laboratories and healthcare providers — even when care happens
            across different facilities.
          </Text>

          {/* Features */}
          <View
            style={[
              styles.features,
              {
                marginTop: isShortScreen ? 18 : 22,
                paddingVertical: isShortScreen ? 10 : 12,
              },
            ]}
          >
            <Feature
              icon="shield-checkmark-outline"
              title="Secure"
              description="Protected health information"
              compact={isShortScreen}
            />

            <Feature
              icon="cloud-offline-outline"
              title="Offline Ready"
              description="Keep working without internet"
              compact={isShortScreen}
            />

            <Feature
              icon="git-network-outline"
              title="Connected"
              description="Share care across facilities"
              compact={isShortScreen}
            />
          </View>
        </View>

        {/* Bottom Actions */}
        <View
          style={[
            styles.bottomSection,
            {
              paddingBottom: Platform.OS === "ios" ? 8 : 14,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={onGetStarted}
          >
            <Text
              style={[
                styles.primaryButtonText,
                {
                  fontSize: isSmallPhone ? 15 : 16,
                },
              ]}
            >
              Get Started
            </Text>

            <View
              style={[
                styles.buttonIcon,
                {
                  width: isSmallPhone ? 38 : 40,
                  height: isSmallPhone ? 38 : 40,
                  borderRadius: isSmallPhone ? 12 : 13,
                },
              ]}
            >
              <Ionicons name="arrow-forward" size={19} color={COLORS.blue} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signInButton}
            activeOpacity={0.7}
            onPress={onSignIn}
          >
            <Text style={styles.signInText}>Already have an account?</Text>

            <Text style={styles.signInLink}>Sign in</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Healthcare information. Connected securely.
          </Text>
        </View>
      </ScrollView>
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
  compact?: boolean;
};

function Feature({ icon, title, description, compact = false }: FeatureProps) {
  return (
    <View
      style={[
        styles.feature,
        {
          paddingVertical: compact ? 4 : 6,
        },
      ]}
    >
      <View
        style={[
          styles.featureIcon,
          {
            width: compact ? 36 : 38,
            height: compact ? 36 : 38,
            borderRadius: compact ? 11 : 12,
          },
        ]}
      >
        <Ionicons name={icon} size={compact ? 19 : 20} color={COLORS.blue} />
      </View>

      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>

        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* Design System                                                              */
/* -------------------------------------------------------------------------- */

const COLORS = {
  blue: "#1565D8",
  blueDark: "#0D47A1",
  blueLight: "#EAF2FF",
  white: "#FFFFFF",
  black: "#111827",
  gray: "#667085",
  lightGray: "#F5F7FA",
  border: "#E5E7EB",
};

/* -------------------------------------------------------------------------- */
/* Styles                                                                     */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scrollView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 4,
  },

  /* ---------------------------------------------------------------------- */
  /* Header                                                                 */
  /* ---------------------------------------------------------------------- */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoIcon: {
    borderRadius: 14,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  logoText: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.black,
    letterSpacing: -0.5,
  },

  logoSubtitle: {
    marginTop: 1,
    fontSize: 11,
    color: COLORS.gray,
    fontWeight: "500",
  },

  languageButton: {
    paddingHorizontal: 11,
    borderRadius: 20,
    backgroundColor: "#F6F8FC",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  languageText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.black,
  },

  /* ---------------------------------------------------------------------- */
  /* Main                                                                   */
  /* ---------------------------------------------------------------------- */

  mainContent: {
    alignItems: "center",
    width: "100%",
  },

  /* ---------------------------------------------------------------------- */
  /* Hero Illustration                                                       */
  /* ---------------------------------------------------------------------- */

  networkContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  mainIconOuter: {
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },

  mainIcon: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 4,
  },

  circle: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.blue,
  },

  circleOne: {
    top: "13%",
    left: "24%",
  },

  circleTwo: {
    bottom: "11%",
    left: "16%",
  },

  circleThree: {
    right: "13%",
    top: "40%",
  },

  connectionLine: {
    position: "absolute",
    height: 1,
    width: 65,
    backgroundColor: "#C8DBF7",
  },

  lineOne: {
    top: "28%",
    left: "27%",
    transform: [{ rotate: "32deg" }],
  },

  lineTwo: {
    bottom: "23%",
    left: "25%",
    transform: [{ rotate: "-28deg" }],
  },

  lineThree: {
    right: "22%",
    top: "43%",
    transform: [{ rotate: "-25deg" }],
  },

  floatingIcon: {
    position: "absolute",
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 9,
    elevation: 3,
  },

  floatingTop: {
    top: 2,
    right: "14%",
  },

  floatingLeft: {
    bottom: 1,
    left: "7%",
  },

  floatingRight: {
    bottom: 18,
    right: "1%",
  },

  /* ---------------------------------------------------------------------- */
  /* Typography                                                             */
  /* ---------------------------------------------------------------------- */

  eyebrow: {
    fontWeight: "800",
    color: COLORS.blue,
    marginBottom: 8,
    textAlign: "center",
  },

  title: {
    fontWeight: "800",
    letterSpacing: -1.3,
    textAlign: "center",
    color: COLORS.black,
  },

  titleBlue: {
    color: COLORS.blue,
  },

  description: {
    width: "100%",
    maxWidth: 350,
    color: COLORS.gray,
    textAlign: "center",
  },

  /* ---------------------------------------------------------------------- */
  /* Features                                                               */
  /* ---------------------------------------------------------------------- */

  features: {
    width: "100%",
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    paddingHorizontal: 14,
  },

  feature: {
    flexDirection: "row",
    alignItems: "center",
  },

  featureIcon: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  featureContent: {
    flex: 1,
  },

  featureTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.black,
  },

  featureDescription: {
    marginTop: 2,
    fontSize: 11,
    color: COLORS.gray,
  },

  /* ---------------------------------------------------------------------- */
  /* Bottom                                                                 */
  /* ---------------------------------------------------------------------- */

  bottomSection: {
    width: "100%",
    marginTop: 16,
  },

  primaryButton: {
    width: "100%",
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",

    shadowColor: COLORS.blue,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 5,
  },

  primaryButtonText: {
    color: COLORS.white,
    fontWeight: "800",
  },

  buttonIcon: {
    position: "absolute",
    right: 7,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  signInButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 13,
  },

  signInText: {
    fontSize: 13,
    color: COLORS.gray,
  },

  signInLink: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.blue,
  },

  footerText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 10,
    color: "#98A2B3",
  },
});
