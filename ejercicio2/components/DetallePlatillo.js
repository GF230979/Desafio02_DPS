
import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const DetallesPlatillo = ({ platillo, onPressVolver }) => {
  return (
    <View style={styles.detalleContainer}>
      <Image source={{ uri: platillo.foto }} style={styles.imagenDetalle} />
      <Text style={styles.detalleNombre}>{platillo.nombre}</Text>
      <Text style={styles.detalleDescripcion}>{platillo.descripcion}</Text>
      <Text style={styles.detalleDescripcion}>Ingredientes: {Array.isArray(platillo.ingredientes) ? platillo.ingredientes.join(', ') : platillo.ingredientes}</Text>
      <Text style={styles.detalleDescripcion}>Precio: ${typeof platillo.precio === 'number' ? platillo.precio.toFixed(2) : platillo.precio}</Text>

      <Button title="Volver" onPress={onPressVolver} />
    </View>
  );
};

const styles = StyleSheet.create({
  detalleContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detalleNombre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detalleDescripcion: {
    marginBottom: 10,
    color: '#666',
  },
  imagenDetalle: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default DetallesPlatillo;
