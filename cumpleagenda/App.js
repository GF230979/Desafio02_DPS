import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Modal, SafeAreaView, Alert, Platform, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, differenceInDays } from 'date-fns';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contacts, setContacts] = useState([]);
  const [newContactModalVisible, setNewContactModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [menuVisible, setMenuVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Por favor, ingresa tu correo electrónico y contraseña.');
      return;
    }
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setMenuVisible(false);
  };

  const handleRegister = () => {
    setShowRegisterForm(true);
  };

  const handleRegisterSubmit = () => {
    if (firstName === '' || lastName === '' || email === '' || password === '') {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
   
    setShowRegisterForm(false);
  };

  const addContact = () => {
    if (firstName === '' || lastName === '' || phoneNumber === '' || contactEmail === '') {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
    const newContact = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: contactEmail,
      birthday: birthday
    };
    setContacts([...contacts, newContact]);
    setNewContactModalVisible(false);
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setContactEmail('');
    setBirthday(new Date());
  }

  const handleContactLongPress = (index) => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar este contacto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => confirmDeleteContact(index) }
      ]
    );
  }

  const confirmDeleteContact = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthday(currentDate);
  };

  const getBirthdayMessage = (birthday) => {
    const today = new Date();
    const birthdayDate = new Date(birthday);
    const differenceInDays = Math.ceil((birthdayDate - today) / (1000 * 60 * 60 * 24));

    if (today.getMonth() === birthdayDate.getMonth() && today.getDate() === birthdayDate.getDate()) {
      return '¡Hoy Cumpleaños!';
    } else if (today > birthdayDate) {
      return 'Pasado';
    } else {
      return `Faltan ${differenceInDays} días`;
    }
  };

  const getContactItemStyle = (birthdayMessage) => {
    switch (birthdayMessage) {
      case '¡Hoy Cumpleaños!':
        return styles.contactItemGreen;
      case 'Pasado':
        return styles.contactItemRed;
      default:
        return styles.contactItemBlue;
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => setMenuVisible(false)} style={styles.menuCloseButton}>
            <Ionicons name="close" size={32} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setNewContactModalVisible(true)}>
            <Text style={styles.menuItemText}>Agregar Persona</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={styles.menuItemText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {!loggedIn && !showRegisterForm ? (
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>Inicio de Sesión</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerLink}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
      ) : loggedIn ? (
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Ionicons name="menu" size={32} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerText}>CumpleAgenda</Text>
          </View>
         {contacts.length === 0 ? (
  <View style={styles.noContactsContainer}>
    <Text style={styles.noContactsText}>No hay registros!! 🥺</Text>
  </View>
) : (
            <ScrollView style={styles.contactsContainer}>
              {contacts.map((contact, index) => {
                const birthdayDate = new Date(contact.birthday);
                const today = new Date();
                const differenceInDays = Math.ceil((birthdayDate - today) / (1000 * 60 * 60 * 24));
                const birthdayMessage = getBirthdayMessage(contact.birthday);

                return (
                  <TouchableWithoutFeedback key={index} onLongPress={() => handleContactLongPress(index)}>
                    <View style={[styles.contactItem, getContactItemStyle(birthdayMessage)]}>
                      <Text>{contact.firstName} {contact.lastName}</Text>
                      <Text>{birthdayMessage}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </ScrollView>
          )}
          <TouchableOpacity style={styles.floatingButton} onPress={() => setNewContactModalVisible(true)}>
            <Ionicons name="person-add" size={32} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      ) : (
        <View style={styles.registerContainer}>
          <Text style={styles.registerTitle}>Registro de Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.registerButton} onPress={handleRegisterSubmit}>
            <Text style={styles.registerButtonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={newContactModalVisible}
        onRequestClose={() => setNewContactModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar Contacto</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Número de teléfono"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              value={contactEmail}
              onChangeText={(text) => setContactEmail(text)}
            />
            <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
              <Text>{birthday.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={birthday}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <TouchableOpacity style={styles.addButton} onPress={addContact}>
              <Text style={styles.addButtonText}>Agregar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setNewContactModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#fff',
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 10,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  registerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  contactsContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  noContactsText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  },
  contactItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    borderRadius: 50,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menuContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    marginTop: 20,
    marginRight: 'auto',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuCloseButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  menuItem: {
    marginBottom: 20,
  },
  menuItemText: {
    fontSize: 18,
    color: '#333',
  },
  contactItemGreen: {
    backgroundColor: '#CFFFD4', 
  },
  contactItemRed: {
    backgroundColor: '#FFC0CB', 
  },
  contactItemBlue: {
    backgroundColor: '#ADD8E6', 
  },
   mainContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 0, 
  },
  noContactsContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
 modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%', 
  },
  
});