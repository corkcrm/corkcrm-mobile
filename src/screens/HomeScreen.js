import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import authService from '../services/auth';

const HomeScreen = ({ user, onLogout }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const result = await authService.getProfile();
      if (result.success) {
        setProfileData(result);
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await authService.logout();
            if (onLogout) {
              onLogout();
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const userData = profileData?.user?.user || user;
  const organization = profileData?.organization;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>{userData?.name || 'User'}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>User Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{userData?.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>{userData?.phone || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Role:</Text>
            <Text style={styles.infoValue}>
              {userData?.is_owner ? 'Owner' : 'User'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={[styles.infoValue, styles.statusActive]}>
              {userData?.active ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>

        {organization && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Organization</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>{organization.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Time Zone:</Text>
              <Text style={styles.infoValue}>
                {organization.time_zone?.label || 'N/A'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Mobile Access:</Text>
              <Text style={[styles.infoValue, styles.statusActive]}>
                {organization.features?.mobile_enabled ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Features</Text>
          {organization?.features && (
            <>
              <View style={styles.featureRow}>
                <Text style={styles.featureLabel}>Proposals</Text>
                <View style={[styles.badge, organization.features.proposals_enabled ? styles.badgeEnabled : styles.badgeDisabled]}>
                  <Text style={styles.badgeText}>
                    {organization.features.proposals_enabled ? 'Enabled' : 'Disabled'}
                  </Text>
                </View>
              </View>
              <View style={styles.featureRow}>
                <Text style={styles.featureLabel}>Invoices</Text>
                <View style={[styles.badge, organization.features.invoices_enabled ? styles.badgeEnabled : styles.badgeDisabled]}>
                  <Text style={styles.badgeText}>
                    {organization.features.invoices_enabled ? 'Enabled' : 'Disabled'}
                  </Text>
                </View>
              </View>
              <View style={styles.featureRow}>
                <Text style={styles.featureLabel}>Payments</Text>
                <View style={[styles.badge, organization.features.payments_enabled ? styles.badgeEnabled : styles.badgeDisabled]}>
                  <Text style={styles.badgeText}>
                    {organization.features.payments_enabled ? 'Enabled' : 'Disabled'}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  statusActive: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  featureLabel: {
    fontSize: 14,
    color: '#333',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeEnabled: {
    backgroundColor: '#E8F5E9',
  },
  badgeDisabled: {
    backgroundColor: '#FFEBEE',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen;