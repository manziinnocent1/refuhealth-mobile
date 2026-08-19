import React, { useState } from "react";

import WelcomeScreen from "@/screens/auth/WelcomeScreen";
import LoginScreen from "@/screens/auth/LoginScreen";
import RegisterScreen from "@/screens/auth/RegisterScreen";
import RoleSelectionScreen from "@/screens/role/RoleSelectionScreen";

type AuthScreen = "welcome" | "login" | "register" | "role";

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>("welcome");

  switch (currentScreen) {
    // ================================
    // LOGIN
    // ================================
    case "login":
      return (
        <LoginScreen
          onSignIn={() => {
            // After signing in, show role selection
            setCurrentScreen("role");
          }}
          onCreateAccount={() => {
            setCurrentScreen("register");
          }}
        />
      );

    // ================================
    // REGISTER
    // ================================
    case "register":
      return (
        <RegisterScreen
          onRegister={() => {
            // Later:
            // create account
            // verify account
            // then continue to role/dashboard
          }}
          onSignIn={() => {
            setCurrentScreen("login");
          }}
          onBack={() => {
            setCurrentScreen("welcome");
          }}
        />
      );

    // ================================
    // ROLE SELECTION
    // ================================
    case "role":
      return <RoleSelectionScreen />;

    // ================================
    // WELCOME
    // ================================
    case "welcome":
    default:
      return (
        <WelcomeScreen
          onGetStarted={() => {
            setCurrentScreen("register");
          }}
          onSignIn={() => {
            setCurrentScreen("login");
          }}
        />
      );
  }
}
