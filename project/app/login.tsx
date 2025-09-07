import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import * as Haptics from 'expo-haptics';
import { COLORS, FONTS, SIZES } from '@/utils/constants';
import { useAuth } from '@/contexts/AuthContext';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const shakeInput = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
    
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    setUsernameError('');
    setPasswordError('');

    // Username validation
    if (!username.trim()) {
      setUsernameError('Username é obrigatório');
      isValid = false;
    } else if (username.length < 3) {
      setUsernameError('Username deve ter pelo menos 3 caracteres');
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError('Senha é obrigatória');
      isValid = false;
    } else if (password.length < 4) {
      setPasswordError('Senha deve ter pelo menos 4 caracteres');
      isValid = false;
    }

    if (!isValid) {
      shakeInput();
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await login({ username, password });
      
      if (result.success) {
        if (Platform.OS !== 'web') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        
        Toast.show({
          type: 'success',
          text1: 'Sucesso!',
          text2: 'Login realizado com sucesso!',
        });
        
        router.replace('/welcome');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro no Login',
          text2: result.message || 'Credenciais inválidas',
        });
        shakeInput();
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha na conexão. Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  const handleSignUp = () => {
    router.push('/register');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Header */}
        <Animated.View 
          style={[
            styles.header,
            { 
              opacity: fadeAnim,
              transform: [{ 
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0],
                })
              }]
            }
          ]}
        >
          <Text style={styles.headerTitle}>AteliêPerto</Text>
          <Text style={styles.headerSubtitle}>✂️ 🪡</Text>
        </Animated.View>

        {/* Form Card */}
        <Animated.View 
          style={[
            styles.formCard,
            { 
              opacity: fadeAnim,
              transform: [{ translateX: shakeAnim }]
            }
          ]}
        >
          <Text style={styles.formTitle}>Entrar na sua conta</Text>
          
          <CustomInput
            label="Username"
            placeholder="Digite seu username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (usernameError) setUsernameError('');
            }}
            error={usernameError}
            autoCapitalize="none"
          />

          <CustomInput
            label="Senha"
            placeholder="Digite sua senha"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
            error={passwordError}
            secureTextEntry
          />

          <CustomButton
            title="ENTRAR"
            onPress={handleLogin}
            loading={isLoading}
            loadingText="Entrando..."
            style={styles.loginButton}
          />

          <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Não tem conta? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpLink}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Background Pattern */}
        <View style={styles.backgroundPattern}>
          <Text style={styles.patternText}>🧵</Text>
          <Text style={styles.patternText}>✂️</Text>
          <Text style={styles.patternText}>🪡</Text>
          <Text style={styles.patternText}>🧵</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  headerSubtitle: {
    fontSize: 24,
    marginTop: 5,
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 40,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: FONTS.bold,
  },
  loginButton: {
    marginTop: 20,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  signUpText: {
    color: COLORS.gray,
    fontSize: 16,
    fontFamily: FONTS.regular,
  },
  signUpLink: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: FONTS.bold,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    opacity: 0.05,
    zIndex: -1,
  },
  patternText: {
    fontSize: 30,
    margin: 20,
    color: COLORS.primary,
  },
});