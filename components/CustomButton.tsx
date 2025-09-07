@@ .. @@
 import React from 'react';
 import {
   TouchableOpacity,
   Text,
   StyleSheet,
   ActivityIndicator,
   ViewStyle,
   TextStyle,
   Animated,
   Platform,
 } from 'react-native';
 import * as Haptics from 'expo-haptics';
-import { COLORS, FONTS } from '@/utils/constants';
+import { FONTS } from '@/utils/constants';
+import { useTheme } from '@/contexts/ThemeContext';

 interface CustomButtonProps {
   title: string;
   onPress: () => void;
   loading?: boolean;
   loadingText?: string;
   style?: ViewStyle;
   textStyle?: TextStyle;
   disabled?: boolean;
 }

 export default function CustomButton({
   title,
   onPress,
   loading = false,
   loadingText = 'Carregando...',
   style,
   textStyle,
   disabled = false,
 }: CustomButtonProps) {
+  const { colors } = useTheme();
   const scaleValue = React.useRef(new Animated.Value(1)).current;

   const handlePressIn = () => {
     if (Platform.OS !== 'web') {
       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
     }
     Animated.spring(scaleValue, {
       toValue: 0.95,
       useNativeDriver: true,
     }).start();
   };

   const handlePressOut = () => {
     Animated.spring(scaleValue, {
       toValue: 1,
       useNativeDriver: true,
     }).start();
   };

   const buttonStyle = [
-    styles.button,
+    { ...styles.button, backgroundColor: colors.primary },
     disabled && styles.buttonDisabled,
     style,
   ];

   const buttonTextStyle = [
-    styles.buttonText,
+    { ...styles.buttonText, color: '#FFFFFF' },
     disabled && styles.buttonTextDisabled,
     textStyle,
   ];

   return (
     <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
       <TouchableOpacity
         style={buttonStyle}
         onPress={onPress}
         onPressIn={handlePressIn}
         onPressOut={handlePressOut}
         disabled={disabled || loading}
         activeOpacity={1}
       >
         {loading ? (
           <>
             <ActivityIndicator
               size="small"
-              color={COLORS.white}
+              color="#FFFFFF"
               style={styles.loader}
             />
             <Text style={buttonTextStyle}>{loadingText}</Text>
           </>
         ) : (
           <Text style={buttonTextStyle}>{title}</Text>
         )}
       </TouchableOpacity>
     </Animated.View>
   );
 }

 const styles = StyleSheet.create({
   button: {
-    backgroundColor: COLORS.primary,
     paddingHorizontal: 30,
     paddingVertical: 15,
     borderRadius: 25,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
-    shadowColor: COLORS.primary,
+    shadowColor: '#FF6B35',
     shadowOffset: {
       width: 0,
       height: 4,
     },
     shadowOpacity: 0.3,
     shadowRadius: 8,
     elevation: 8,
   },
   buttonDisabled: {
-    backgroundColor: COLORS.gray,
+    backgroundColor: '#757575',
     shadowOpacity: 0,
     elevation: 0,
   },
   buttonText: {
-    color: COLORS.white,
     fontSize: 16,
     fontWeight: 'bold',
     fontFamily: FONTS.bold,
   },
   buttonTextDisabled: {
-    color: COLORS.lightGray,
+    color: '#E0E0E0',
   },
   loader: {
     marginRight: 10,
   },
 });