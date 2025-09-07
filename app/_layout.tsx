@@ .. @@
 import { useFrameworkReady } from '@/hooks/useFrameworkReady';
 import { AuthProvider } from '@/contexts/AuthContext';
+import { ThemeProvider } from '@/contexts/ThemeContext';

 export default function RootLayout() {
   useFrameworkReady();

   return (
-    <AuthProvider>
-      <Stack 
-        initialRouteName="index"
-        screenOptions={{ headerShown: false }}
-      >
-        <Stack.Screen name="index" />
-        <Stack.Screen name="login" />
-        <Stack.Screen name="welcome" />
-        <Stack.Screen name="register" />
-        <Stack.Screen name="forgot-password" />
-        <Stack.Screen name="seamstress-profile" />
-        <Stack.Screen name="(tabs)" />
-      </Stack>
-      <StatusBar style="auto" />
-      <Toast />
-    </AuthProvider>
+    <ThemeProvider>
+      <AuthProvider>
+        <Stack 
+          initialRouteName="index"
+          screenOptions={{ headerShown: false }}
+        >
+          <Stack.Screen name="index" />
+          <Stack.Screen name="login" />
+          <Stack.Screen name="welcome" />
+          <Stack.Screen name="register" />
+          <Stack.Screen name="forgot-password" />
+          <Stack.Screen name="seamstress-profile" />
+          <Stack.Screen name="(tabs)" />
+        </Stack>
+        <StatusBar style="auto" />
+        <Toast />
+      </AuthProvider>
+    </ThemeProvider>
   );
 }