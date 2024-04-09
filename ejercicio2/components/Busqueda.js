import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const Busqueda = ({ onBuscar }) => {
  const [termino, setTermino] = useState('');

  const handleBuscar = () => {
    onBuscar(termino);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={termino}
        onChangeText={setTermino}
        placeholder="Buscar por nombre o ingredientes..."
      />
      <Button title="Buscar" onPress={handleBuscar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 12,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default Busqueda;