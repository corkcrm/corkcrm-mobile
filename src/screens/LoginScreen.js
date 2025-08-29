import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Card,
  useTheme,
  ActivityIndicator,
  Snackbar,
  Surface,
  Headline,
  Caption,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import authService from '../services/auth';

const LoginScreen = ({ onLoginSuccess }) => {
  const theme = useTheme();
  const [email, setEmail] = useState('owner-user@dev-org.com'); // Pre-filled for testing
  const [password, setPassword] = useState('dev-org-owner@123'); // Pre-filled for testing
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('error'); // 'error' or 'success'

  const showMessage = (message, type = 'error') => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarVisible(true);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showMessage('Please enter email and password');
      return;
    }

    setLoading(true);

    try {
      const result = await authService.login(email, password, {
        deviceType: Platform.OS === 'ios' ? 'iOS' : Platform.OS === 'android' ? 'Android' : 'Web',
        deviceOS: Platform.Version ? String(Platform.Version) : 'unknown',
      });

      if (result.success) {
        showMessage('Login successful!', 'success');
        if (onLoginSuccess) {
          onLoginSuccess(result.user);
        }
      } else {
        showMessage(result.error);
      }
    } catch (error) {
      showMessage('An unexpected error occurred');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Headline style={[styles.title, { color: theme.colors.primary }]}>
              CorkCRM Mobile
            </Headline>
            <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
              Sign in to your account
            </Text>
          </View>

          <Card style={styles.formCard} mode="elevated">
            <Card.Content>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                disabled={loading}
                style={styles.input}
                left={<TextInput.Icon icon="email" />}
              />

              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                disabled={loading}
                style={styles.input}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />

              <Button
                mode="contained"
                onPress={handleLogin}
                disabled={loading}
                loading={loading}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Card.Content>
          </Card>

          <Surface style={[styles.testInfo, { backgroundColor: theme.colors.surfaceVariant }]} elevation={1}>
            <Caption style={styles.testInfoTitle}>Test Credentials:</Caption>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              Email: owner-user@dev-org.com
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              Password: dev-org-owner@123
            </Text>
          </Surface>
        </ScrollView>
      </KeyboardAvoidingView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={snackbarType === 'success' ? { backgroundColor: theme.colors.primary } : {}}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formCard: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  testInfo: {
    padding: 16,
    borderRadius: 8,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  testInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
});

export default LoginScreen;