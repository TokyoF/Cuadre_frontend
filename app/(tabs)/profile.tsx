import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";
import {
  Bell,
  Lock,
  Shield,
  Key,
  CircleHelp as HelpCircle,
  Settings,
} from "lucide-react-native";

export default function Profile() {
  const { user, logout } = useAuth();
  const [enableBiometrics, setEnableBiometrics] = React.useState(true);
  const [enableNotifications, setEnableNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </Text>
        </View>
        <Text style={styles.profileName}>{user?.name || "User Name"}</Text>
        <Text style={styles.profileEmail}>
          {user?.email || "user@example.com"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingIconContainer}>
            <Key size={20} color="#a34fde" />
          </View>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Change Password</Text>
            <Text style={styles.settingDescription}>
              Update your account password
            </Text>
          </View>
          <TouchableOpacity style={styles.settingAction}>
            <Text style={styles.settingActionText}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingIconContainer}>
            <Lock size={20} color="#a34fde" />
          </View>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Two-Factor Authentication</Text>
            <Text style={styles.settingDescription}>
              Additional security for your account
            </Text>
          </View>
          <Switch
            value={true}
            disabled={true}
            trackColor={{ false: "#e5e7eb", true: "#d8b4fe" }}
            thumbColor="#a34fde"
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingIconContainer}>
            <Shield size={20} color="#a34fde" />
          </View>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Biometric Login</Text>
            <Text style={styles.settingDescription}>
              Login using your fingerprint
            </Text>
          </View>
          <Switch
            value={enableBiometrics}
            onValueChange={setEnableBiometrics}
            trackColor={{ false: "#e5e7eb", true: "#d8b4fe" }}
            thumbColor={enableBiometrics ? "#a34fde" : "#f4f3f4"}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingIconContainer}>
            <Bell size={20} color="#a34fde" />
          </View>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Notifications</Text>
            <Text style={styles.settingDescription}>
              Receive app notifications
            </Text>
          </View>
          <Switch
            value={enableNotifications}
            onValueChange={setEnableNotifications}
            trackColor={{ false: "#e5e7eb", true: "#d8b4fe" }}
            thumbColor={enableNotifications ? "#a34fde" : "#f4f3f4"}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingIconContainer}>
            <Settings size={20} color="#a34fde" />
          </View>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Dark Mode</Text>
            <Text style={styles.settingDescription}>
              Switch between light and dark themes
            </Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#e5e7eb", true: "#d8b4fe" }}
            thumbColor={darkMode ? "#a34fde" : "#f4f3f4"}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>

        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingIconContainer}>
            <HelpCircle size={20} color="#a34fde" />
          </View>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Help & Support</Text>
            <Text style={styles.settingDescription}>
              Get help with using the app
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#a34fde",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ffffff",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#666666",
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(163, 79, 222, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: "#666666",
  },
  settingAction: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(163, 79, 222, 0.1)",
    borderRadius: 16,
  },
  settingActionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#a34fde",
  },
  logoutButton: {
    margin: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f43f5e",
  },
});
