@@ .. @@
 import React, { useState } from 'react';
 import {
   View,
   Text,
   TextInput,
   StyleSheet,
   TextInputProps,
   Animated,
   Platform,
   TouchableOpacity,
 } from 'react-native';
 import * as Haptics from 'expo-haptics';
-import { COLORS, FONTS } from '@/utils/constants';
+import { FONTS } from '@/utils/constants';
+import { useTheme } from '@/contexts/ThemeContext';

 interface CustomInputProps extends TextInputProps {
   label: string;
   error?: string;
 }

 export default function CustomInput({ 
   label, 
   error, 
   style, 
   secureTextEntry,
   ...props 
 }: CustomInputProps) {
+  const { colors } = useTheme();
   const [isFocused, setIsFocused] = useState(false);
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const focusAnim = React.useRef(new Animated.Value(0)).current;
   const errorAnim = React.useRef(new Animated.Value(0)).current;

   const handleFocus = () => {
     setIsFocused(true);
     if (Platform.OS !== 'web') {
       Haptics.selectionAsync();
     }
     Animated.timing(focusAnim, {
       toValue: 1,
       duration: 200,
       useNativeDriver: false,
     }).start();
   };

   const handleBlur = () => {
     setIsFocused(false);
     Animated.timing(focusAnim, {
       toValue: 0,
       duration: 200,
       useNativeDriver: false,
     }).start();
   };

   const togglePasswordVisibility = () => {
     setIsPasswordVisible(!isPasswordVisible);
     if (Platform.OS !== 'web') {
       Haptics.selectionAsync();
     }
   };

   React.useEffect(() => {
     if (error) {
       Animated.sequence([
         Animated.timing(errorAnim, {
           toValue: 1,
           duration: 300,
           useNativeDriver: true,
         }),
       ]).start();
     } else {
       Animated.timing(errorAnim, {
         toValue: 0,
         duration: 200,
         useNativeDriver: true,
       }).start();
     }
   }, [error]);

   const borderColor = focusAnim.interpolate({
     inputRange: [0, 1],
-    outputRange: [error ? COLORS.error : COLORS.lightGray, COLORS.primary],
+    outputRange: [error ? colors.error : colors.border, colors.primary],
   });

   const labelColor = focusAnim.interpolate({
     inputRange: [0, 1],
-    outputRange: [COLORS.gray, COLORS.primary],
+    outputRange: [colors.textSecondary, colors.primary],
   });

   return (
     <View style={styles.container}>
-      <Animated.Text style={[styles.label, { color: error ? COLORS.error : labelColor }]}>
+      <Animated.Text style={[styles.label, { color: error ? colors.error : labelColor }]}>
         {label}
       </Animated.Text>
-      <Animated.View style={[styles.inputContainer, { borderColor }]}>
+      <Animated.View style={[styles.inputContainer, { borderColor, backgroundColor: colors.inputBackground }]}>
         <TextInput
           {...props}
           secureTextEntry={secureTextEntry && !isPasswordVisible}
-          style={[styles.input, style]}
+          style={[styles.input, { color: colors.text }, style]}
           onFocus={handleFocus}
           onBlur={handleBlur}
-          placeholderTextColor={COLORS.gray}
+          placeholderTextColor={colors.placeholder}
         />
         {secureTextEntry && (
           <TouchableOpacity
             style={styles.eyeButton}
             onPress={togglePasswordVisibility}
           >
-            <Text style={styles.eyeIcon}>
+            <Text style={[styles.eyeIcon, { color: colors.textSecondary }]}>
               {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
             </Text>
           </TouchableOpacity>
         )}
       </Animated.View>
       {error && (
         <Animated.View style={[styles.errorContainer, { opacity: errorAnim }]}>
-          <Text style={styles.error}>{error}</Text>
+          <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
         </Animated.View>
       )}
     </View>
   );
 }

 const styles = StyleSheet.create({
   container: {
     marginBottom: 20,
   },
   label: {
     fontSize: 16,
     fontWeight: '600',
     marginBottom: 8,
     fontFamily: FONTS.medium,
   },
   inputContainer: {
-    borderWidth: 2,
-    borderRadius: 12,
+    borderWidth: 1,
+    borderRadius: 16,
     paddingHorizontal: 15,
-    backgroundColor: COLORS.white,
     flexDirection: 'row',
     alignItems: 'center',
   },
   input: {
-    height: 50,
+    height: 56,
     fontSize: 16,
-    color: COLORS.dark,
     fontFamily: FONTS.regular,
     flex: 1,
   },
   eyeButton: {
     padding: 5,
     marginLeft: 10,
   },
   eyeIcon: {
     fontSize: 18,
   },
   errorContainer: {
     marginTop: 5,
   },
   error: {
     fontSize: 14,
-    color: COLORS.error,
     fontFamily: FONTS.regular,
   },
 });