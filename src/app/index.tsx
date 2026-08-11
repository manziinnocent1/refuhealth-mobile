import React, { useState } from 'react';

import WelcomeScreen from '@/screens/auth/WelcomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import RegisterScreen from '@/screens/auth/RegisterScreen';

type AuthScreen = 'welcome' | 'login' | 'register';

export default function Index() {
  const [currentScreen, setCurrentScreen] =
    useState<AuthScreen>('welcome');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            onSignIn={() => {
              // Later:
              // authenticate user and go to dashboard
            }}
            onCreateAccount={() => {
              setCurrentScreen('register');
            }}
          />
        );

      case 'register':
        return (
          <RegisterScreen
            onRegister={() => {
              // Later:
              // create account and continue to verification
            }}
            onSignIn={() => {
              setCurrentScreen('login');
            }}
            onBack={() => {
              setCurrentScreen('welcome');
            }}
          />
        );

      case 'welcome':
      default:
        return (
          <WelcomeScreen
            onGetStarted={() => {
              setCurrentScreen('register');
            }}
            onSignIn={() => {
              setCurrentScreen('login');
            }}
          />
        );
    }
  };

  return renderScreen();
}