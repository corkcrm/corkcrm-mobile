import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Appbar,
  Card,
  Text,
  Button,
  useTheme,
  ActivityIndicator,
  Avatar,
  Chip,
  List,
  Divider,
  Dialog,
  Portal,
  Switch,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';
import authService from '../services/auth';

const HomeScreen = ({ user, onLogout }) => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutDialog, setLogoutDialog] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const result = await authService.getProfile();
      if (result.success) {
        setProfileData(result);
      } else {
        console.error('Profile fetch error:', result.error);
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    if (onLogout) {
      onLogout();
    }
  };

  const showLogoutDialog = () => setLogoutDialog(true);
  const hideLogoutDialog = () => setLogoutDialog(false);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Appbar.Header>
          <Appbar.Content title="CorkCRM Mobile" />
        </Appbar.Header>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text variant="bodyLarge" style={{ marginTop: 16, color: theme.colors.onSurfaceVariant }}>
            Loading profile...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const userData = profileData?.user?.user || user;
  const organization = profileData?.organization;
  const initials = userData?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || '??';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.Content title="CorkCRM Mobile" />
        <Appbar.Action icon="logout" onPress={showLogoutDialog} />
      </Appbar.Header>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <Card style={styles.profileCard} mode="elevated">
          <Card.Content style={styles.profileContent}>
            <Avatar.Text size={80} label={initials} style={{ backgroundColor: theme.colors.primary }} />
            <View style={styles.profileInfo}>
              <Text variant="headlineSmall" style={{ color: theme.colors.onSurface, fontWeight: 'bold' }}>
                {userData?.name || 'User'}
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                {userData?.email}
              </Text>
              <View style={styles.chipContainer}>
                <Chip mode="flat" compact style={styles.chip}>
                  {userData?.is_owner ? 'Owner' : 'User'}
                </Chip>
                <Chip
                  mode="flat"
                  compact
                  style={[styles.chip, { backgroundColor: userData?.active ? theme.colors.primaryContainer : theme.colors.errorContainer }]}
                >
                  {userData?.active ? 'Active' : 'Inactive'}
                </Chip>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Organization Card */}
        {organization && (
          <Card style={styles.card} mode="elevated">
            <Card.Title 
              title="Organization" 
              titleVariant="titleLarge"
              left={(props) => <Avatar.Icon {...props} icon="domain" style={{ backgroundColor: theme.colors.secondaryContainer }} />}
            />
            <Card.Content>
              <List.Item
                title={organization.name}
                description="Organization Name"
                left={(props) => <List.Icon {...props} icon="office-building" />}
              />
              <Divider />
              <List.Item
                title={organization.time_zone?.label || 'Not Set'}
                description="Time Zone"
                left={(props) => <List.Icon {...props} icon="clock-outline" />}
              />
              <Divider />
              <List.Item
                title="Mobile Access"
                description={organization.features?.mobile_enabled ? 'Enabled' : 'Disabled'}
                left={(props) => <List.Icon {...props} icon="cellphone" />}
                right={() => (
                  <Chip mode="flat" compact style={{ alignSelf: 'center' }}>
                    {organization.features?.mobile_enabled ? 'ON' : 'OFF'}
                  </Chip>
                )}
              />
            </Card.Content>
          </Card>
        )}

        {/* Features Card */}
        <Card style={styles.card} mode="elevated">
          <Card.Title 
            title="Features" 
            titleVariant="titleLarge"
            left={(props) => <Avatar.Icon {...props} icon="feature-search-outline" style={{ backgroundColor: theme.colors.tertiaryContainer }} />}
          />
          <Card.Content>
            {organization?.features && (
              <>
                <List.Item
                  title="Proposals"
                  left={(props) => <List.Icon {...props} icon="file-document-outline" />}
                  right={() => (
                    <Chip 
                      mode="flat" 
                      compact
                      style={{ 
                        backgroundColor: organization.features.proposals_enabled 
                          ? theme.colors.primaryContainer 
                          : theme.colors.surfaceVariant 
                      }}
                    >
                      {organization.features.proposals_enabled ? 'Enabled' : 'Disabled'}
                    </Chip>
                  )}
                />
                <Divider />
                <List.Item
                  title="Invoices"
                  left={(props) => <List.Icon {...props} icon="receipt" />}
                  right={() => (
                    <Chip 
                      mode="flat" 
                      compact
                      style={{ 
                        backgroundColor: organization.features.invoices_enabled 
                          ? theme.colors.primaryContainer 
                          : theme.colors.surfaceVariant 
                      }}
                    >
                      {organization.features.invoices_enabled ? 'Enabled' : 'Disabled'}
                    </Chip>
                  )}
                />
                <Divider />
                <List.Item
                  title="Payments"
                  left={(props) => <List.Icon {...props} icon="credit-card-outline" />}
                  right={() => (
                    <Chip 
                      mode="flat" 
                      compact
                      style={{ 
                        backgroundColor: organization.features.payments_enabled 
                          ? theme.colors.primaryContainer 
                          : theme.colors.surfaceVariant 
                      }}
                    >
                      {organization.features.payments_enabled ? 'Enabled' : 'Disabled'}
                    </Chip>
                  )}
                />
              </>
            )}
          </Card.Content>
        </Card>

        {/* Settings Card */}
        <Card style={styles.card} mode="elevated">
          <Card.Title 
            title="Settings" 
            titleVariant="titleLarge"
            left={(props) => <Avatar.Icon {...props} icon="cog" style={{ backgroundColor: theme.colors.surfaceVariant }} />}
          />
          <Card.Content>
            <List.Item
              title="Dark Mode"
              description={isDarkMode ? "Dark theme enabled" : "Light theme enabled"}
              left={(props) => <List.Icon {...props} icon={isDarkMode ? "weather-night" : "weather-sunny"} />}
              right={() => (
                <Switch
                  value={isDarkMode}
                  onValueChange={toggleTheme}
                  color={theme.colors.primary}
                />
              )}
            />
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={showLogoutDialog}
            icon="logout"
            contentStyle={styles.logoutButtonContent}
            style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
          >
            Logout
          </Button>
        </View>
      </ScrollView>

      {/* Logout Dialog */}
      <Portal>
        <Dialog visible={logoutDialog} onDismiss={hideLogoutDialog}>
          <Dialog.Title>Logout</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Are you sure you want to logout?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideLogoutDialog}>Cancel</Button>
            <Button onPress={handleLogout} textColor={theme.colors.error}>
              Logout
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    marginBottom: 16,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  profileInfo: {
    marginLeft: 20,
    flex: 1,
  },
  chipContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  chip: {
    marginRight: 8,
  },
  card: {
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  logoutButton: {
    borderRadius: 8,
  },
  logoutButtonContent: {
    paddingVertical: 8,
  },
});

export default HomeScreen;