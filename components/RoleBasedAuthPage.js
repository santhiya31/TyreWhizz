import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

const RoleBasedAuthPage = ({ route, navigation }) => {
  const { userType } = route.params; // Retrieve the role selected (driver, organization, technician)
  const [isSignup, setIsSignup] = useState(false); // Toggle between Login and Signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accounts, setAccounts] = useState({}); // Store user accounts locally for simplicity
  const [popupMessage, setPopupMessage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const handleAuthAction = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required.');
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    if (!emailRegex.test(email)) {
      showModal('Invalid email format. Please enter a valid email.', true);
      return;
    }
    if (password.length < 6) {
      showModal('Password must be at least 6 characters long.', true);
      return;
    }

    if (isSignup) {
      if (password !== confirmPassword) {
        showModal('Passwords do not match.', true);
        return;
      }

      if (accounts[email]) {
        showModal('Account already exists with this email.', true);
        return;
      }

      // Create account
      setAccounts({ ...accounts, [email]: password });
      showModal(`Account successfully created for ${email} as ${userType}`, false);
      setIsSignup(false); // Switch to login mode
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    if (!accounts[email]) {
      showModal('Account does not exist. Please sign up.', true);
      return;
    }

    if (accounts[email] !== password) {
      showModal('Password does not match the registered password.', true);
      return;
    }

    // Successful login
    showModal(`Login successful. Welcome back, ${userType}!`, false);
    if (userType === 'driver') {
      navigation.replace('DriverPage');
    } else if (userType === 'organisation') {
      navigation.replace('OrganisationPage');
    } else if (userType === 'technician') {
      navigation.replace('TechnicianPage');
    }
    // Inside your handleAuthAction function
if (userType === 'driver') {
  navigation.replace('MonitoringPage', { userType: 'driver' });
} else if (userType === 'organisation') {
  navigation.replace('MonitoringPage', { userType: 'organisation' });
} else if (userType === 'technician') {
  navigation.replace('MonitoringPage', { userType: 'technician' });
}

  };

  const showModal = (message, isError) => {
    setPopupMessage(message);
    setModalVisible(true);
    setTimeout(() => setModalVisible(false), 3000); // Auto-hide modal after 3 seconds
  };

  return (
    <View style={styles.container}>

<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>
        {isSignup ? `Signup as ${userType}` : `Login as ${userType}`}
      </Text>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.modalText}>{popupMessage}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {isSignup && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleAuthAction}>
        <Text style={styles.buttonText}>{isSignup ? 'Signup' : 'Login'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
        <Text style={styles.toggleText}>
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#6200ee',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#6200ee',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default RoleBasedAuthPage;
