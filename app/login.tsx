@@ .. @@
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
+  Dimensions,
 } from 'react-native';
 import { useRouter } from 'expo-router';
 import Toast from 'react-native-toast-message';
 import * as Haptics from 'expo-haptics';
-import { COLORS, FONTS, SIZES } from '@/utils/constants';
+import { FONTS, SIZES } from '@/utils/constants';
 import { useAuth } from '@/contexts/AuthContext';
+import { useTheme } from '@/contexts/ThemeContext';
 import CustomInput from '@/components/CustomInput';
 import CustomButton from '@/components/CustomButton';
+import ThemeToggle from '@/components/ThemeToggle';
+
+const { width } = Dimensions.get('window');

 export default function LoginScreen() {
   const router = useRouter();
   const { login } = useAuth();
-  const [username, setUsername] = useState('');
+  const { colors } = useTheme();
+  const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
-  const [usernameError, setUsernameError] = useState('');
+  const [emailError, setEmailError] = useState('');
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
-    setUsernameError('');
+    setEmailError('');
     setPasswordError('');

-    // Username validation
-    if (!username.trim()) {
-      setUsernameError('Username é obrigatório');
+    // Email validation
+    if (!email.trim()) {
+      setEmailError('E-mail é obrigatório');
       isValid = false;
-    } else if (username.length < 3) {
-      setUsernameError('Username deve ter pelo menos 3 caracteres');
+    } else if (!email.includes('@')) {
+      setEmailError('Digite um e-mail válido');
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
-      const result = await login({ username, password });
+      const result = await login({ username: email, password });
       
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
-      style={styles.container} 
+      style={[styles.container, { backgroundColor: colors.background }]} 
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
     >
-      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
+      <StatusBar barStyle={colors.background === '#FFFFFF' ? 'dark-content' : 'light-content'} backgroundColor={colors.background} />
       <ScrollView contentContainerStyle={styles.scrollContainer}>
         
+        {/* Theme Toggle */}
+        <View style={styles.themeToggleContainer}>
+          <ThemeToggle />
+        </View>
+
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
-          <Text style={styles.headerTitle}>AteliêPerto</Text>
-          <Text style={styles.headerSubtitle}>✂️ 🪡</Text>
+          <View style={[styles.logoContainer, { backgroundColor: colors.primary }]}>
+            <Text style={styles.logoIcon}>✂️</Text>
+          </View>
+          <Text style={[styles.appName, { color: colors.text }]}>AteliêPerto</Text>
+          <Text style={[styles.welcomeTitle, { color: colors.text }]}>Bem-vindo de volta!</Text>
+          <Text style={[styles.welcomeSubtitle, { color: colors.textSecondary }]}>
+            Faça login para continuar criando seus sonhos
+          </Text>
         </Animated.View>

         {/* Form Card */}
         <Animated.View 
           style={[
             styles.formCard,
+            { backgroundColor: colors.card, borderColor: colors.border },
             { 
               opacity: fadeAnim,
               transform: [{ translateX: shakeAnim }]
             }
           ]}
         >
-          <Text style={styles.formTitle}>Entrar na sua conta</Text>
-          
           <CustomInput
-            label="Username"
-            placeholder="Digite seu username"
-            value={username}
+            label="E-mail"
+            placeholder="Digite seu e-mail"
+            value={email}
             onChangeText={(text) => {
-              setUsername(text);
-              if (usernameError) setUsernameError('');
+              setEmail(text);
+              if (emailError) setEmailError('');
             }}
-            error={usernameError}
+            error={emailError}
+            keyboardType="email-address"
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
-            title="ENTRAR"
+            title="Entrar"
             onPress={handleLogin}
             loading={isLoading}
             loadingText="Entrando..."
             style={styles.loginButton}
           />

           <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
-            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
+            <Text style={[styles.forgotPasswordText, { color: colors.textSecondary }]}>
+              Esqueceu sua senha?
+            </Text>
           </TouchableOpacity>

+          {/* Divider */}
+          <View style={styles.dividerContainer}>
+            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
+            <Text style={[styles.dividerText, { color: colors.textTertiary }]}>OU CONTINUE COM</Text>
+            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
+          </View>
+
+          {/* Social Login Buttons */}
+          <View style={styles.socialButtonsContainer}>
+            <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.surface, borderColor: colors.border }]}>
+              <Text style={styles.socialIcon}>G</Text>
+              <Text style={[styles.socialText, { color: colors.text }]}>Google</Text>
+            </TouchableOpacity>
+            
+            <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.surface, borderColor: colors.border }]}>
+              <Text style={styles.socialIcon}>🍎</Text>
+              <Text style={[styles.socialText, { color: colors.text }]}>Apple</Text>
+            </TouchableOpacity>
+          </View>
+
           <View style={styles.signUpContainer}>
-            <Text style={styles.signUpText}>Não tem conta? </Text>
+            <Text style={[styles.signUpText, { color: colors.textSecondary }]}>Não tem uma conta? </Text>
             <TouchableOpacity onPress={handleSignUp}>
-              <Text style={styles.signUpLink}>Cadastre-se</Text>
+              <Text style={[styles.signUpLink, { color: colors.primary }]}>Criar Conta</Text>
             </TouchableOpacity>
           </View>
         </Animated.View>

-        {/* Background Pattern */}
-        <View style={styles.backgroundPattern}>
-          <Text style={styles.patternText}>🧵</Text>
-          <Text style={styles.patternText}>✂️</Text>
-          <Text style={styles.patternText}>🪡</Text>
-          <Text style={styles.patternText}>🧵</Text>
-        </View>
       </ScrollView>
     </KeyboardAvoidingView>
   );
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
-    backgroundColor: COLORS.white,
   },
   scrollContainer: {
     flexGrow: 1,
-    justifyContent: 'center',
     paddingHorizontal: SIZES.padding,
+    paddingTop: 60,
+  },
+  themeToggleContainer: {
+    alignItems: 'flex-end',
+    marginBottom: 20,
   },
   header: {
     alignItems: 'center',
-    marginBottom: 40,
+    marginBottom: 50,
+  },
+  logoContainer: {
+    width: 80,
+    height: 80,
+    borderRadius: 40,
+    alignItems: 'center',
+    justifyContent: 'center',
+    marginBottom: 20,
+    shadowColor: '#000',
+    shadowOffset: {
+      width: 0,
+      height: 4,
+    },
+    shadowOpacity: 0.2,
+    shadowRadius: 8,
+    elevation: 8,
+  },
+  logoIcon: {
+    fontSize: 32,
+    color: '#FFFFFF',
   },
-  headerTitle: {
-    fontSize: 32,
+  appName: {
+    fontSize: 28,
     fontWeight: 'bold',
-    color: COLORS.primary,
     fontFamily: FONTS.bold,
+    marginBottom: 10,
+  },
+  welcomeTitle: {
+    fontSize: 24,
+    fontWeight: 'bold',
+    fontFamily: FONTS.bold,
+    marginBottom: 8,
+    textAlign: 'center',
   },
-  headerSubtitle: {
-    fontSize: 24,
-    marginTop: 5,
+  welcomeSubtitle: {
+    fontSize: 16,
+    fontFamily: FONTS.regular,
+    textAlign: 'center',
+    lineHeight: 22,
+    paddingHorizontal: 20,
   },
   formCard: {
-    backgroundColor: COLORS.white,
-    borderRadius: 20,
-    paddingHorizontal: 30,
-    paddingVertical: 40,
-    shadowColor: COLORS.black,
+    borderRadius: 24,
+    paddingHorizontal: 24,
+    paddingVertical: 32,
+    shadowColor: '#000',
     shadowOffset: {
       width: 0,
-      height: 4,
+      height: 8,
     },
-    shadowOpacity: 0.1,
-    shadowRadius: 20,
-    elevation: 8,
+    shadowOpacity: 0.12,
+    shadowRadius: 24,
+    elevation: 12,
     borderWidth: 1,
-    borderColor: COLORS.lightGray,
-  },
-  formTitle: {
-    fontSize: 24,
-    fontWeight: 'bold',
-    color: COLORS.dark,
-    textAlign: 'center',
-    marginBottom: 30,
-    fontFamily: FONTS.bold,
   },
   loginButton: {
-    marginTop: 20,
+    marginTop: 24,
+    borderRadius: 16,
+    paddingVertical: 16,
   },
   forgotPassword: {
     alignItems: 'center',
-    marginTop: 20,
+    marginTop: 16,
   },
   forgotPasswordText: {
-    color: COLORS.primary,
     fontSize: 16,
     fontFamily: FONTS.medium,
   },
+  dividerContainer: {
+    flexDirection: 'row',
+    alignItems: 'center',
+    marginVertical: 32,
+  },
+  dividerLine: {
+    flex: 1,
+    height: 1,
+  },
+  dividerText: {
+    fontSize: 12,
+    fontFamily: FONTS.medium,
+    marginHorizontal: 16,
+    letterSpacing: 0.5,
+  },
+  socialButtonsContainer: {
+    flexDirection: 'row',
+    justifyContent: 'space-between',
+    marginBottom: 32,
+  },
+  socialButton: {
+    flex: 1,
+    flexDirection: 'row',
+    alignItems: 'center',
+    justifyContent: 'center',
+    paddingVertical: 14,
+    borderRadius: 12,
+    borderWidth: 1,
+    marginHorizontal: 6,
+  },
+  socialIcon: {
+    fontSize: 18,
+    marginRight: 8,
+    fontWeight: 'bold',
+  },
+  socialText: {
+    fontSize: 16,
+    fontFamily: FONTS.medium,
+  },
   signUpContainer: {
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
-    marginTop: 30,
   },
   signUpText: {
-    color: COLORS.gray,
     fontSize: 16,
     fontFamily: FONTS.regular,
   },
   signUpLink: {
-    color: COLORS.primary,
     fontSize: 16,
     fontWeight: 'bold',
     fontFamily: FONTS.bold,
   },
-  backgroundPattern: {
-    position: 'absolute',
-    top: 0,
-    left: 0,
-    right: 0,
-    bottom: 0,
-    flexDirection: 'row',
-    flexWrap: 'wrap',
-    opacity: 0.05,
-    zIndex: -1,
-  },
-  patternText: {
-    fontSize: 30,
-    margin: 20,
-    color: COLORS.primary,
-  },
 });