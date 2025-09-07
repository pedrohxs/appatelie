import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { FONTS, SIZES } from '@/utils/constants';
import ThemeToggle from '@/components/ThemeToggle';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.background === '#FFFFFF' ? 'dark-content' : 'light-content'} backgroundColor={colors.background} />
      
      {/* Theme Toggle */}
      <View style={styles.themeToggleContainer}>
        <ThemeToggle />
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          style={styles.logoContainer}
        >
          <Text style={styles.logoIcon}>✂️</Text>
        </LinearGradient>
        
        <Text style={[styles.appName, { color: colors.text }]}>AteliêPerto</Text>
        <Text style={[styles.tagline, { color: colors.textSecondary }]}>
          Conectando você aos melhores ateliês da sua região
        </Text>
      </View>

      {/* Features */}
      <View style={styles.featuresContainer}>
        <View style={[styles.featureCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={styles.featureIcon}>🎨</Text>
          <Text style={[styles.featureTitle, { color: colors.text }]}>Ateliês Próximos</Text>
          <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
            Encontre os melhores ateliês na sua região
          </Text>
        </View>

        <View style={[styles.featureCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={styles.featureIcon}>⭐</Text>
          <Text style={[styles.featureTitle, { color: colors.text }]}>Avaliações</Text>
          <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
            Veja avaliações de outros clientes
          </Text>
        </View>

        <View style={[styles.featureCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={styles.featureIcon}>📱</Text>
          <Text style={[styles.featureTitle, { color: colors.text }]}>Fácil Contato</Text>
          <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
            Entre em contato direto com os ateliês
          </Text>
        </View>
      </View>

      {/* CTA Button */}
      <TouchableOpacity
        style={[styles.ctaButton, { backgroundColor: colors.primary }]}
        onPress={handleGetStarted}
        activeOpacity={0.8}
      >
        <Text style={styles.ctaButtonText}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: 60,
  },
  themeToggleContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  logoIcon: {
    fontSize: 40,
    color: '#FFFFFF',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: FONTS.bold,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 40,
  },
  featureCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: FONTS.bold,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    textAlign: 'center',
    lineHeight: 20,
  },
  ctaButton: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#FF6B35',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: FONTS.bold,
  },
});