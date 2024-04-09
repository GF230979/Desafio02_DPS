// Platillo.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Platillo = ({ platillo, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.platoContainer}>
        <Image source={{ uri: platillo.foto }} style={styles.imagen} />
        <Text style={styles.nombre}>{platillo.nombre}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  platoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  imagen: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Platillo;
