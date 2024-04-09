import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import Platillo from './Platillo';
import DetallesPlatillo from './DetallePlatillo';
import Busqueda from './Busqueda';

const PlatillosList = ({ navigation, route }) => {
  const [platos, setPlatos] = useState([]);
  const [platoSeleccionado, setPlatoSeleccionado] = useState(null);
  
  const { categoria } = route.params;

  useEffect(() => {
    obtenerPlatos();
  }, [categoria,]);

  const obtenerPlatos = async () => {
    try {
      const response = await fetch(`https://660f73af356b87a55c5168c5.mockapi.io/comida/v1/Platillos?categoria=${categoria}`);
      const data = await response.json();
      setPlatos(data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const buscarPlatillos = async (termino) => {
  try {
    const nombreResponse = await fetch(`https://660f73af356b87a55c5168c5.mockapi.io/comida/v1/Platillos?nombre=${termino.toLowerCase()}`);
    const nombreData = await nombreResponse.json();
    
    const ingredientesResponse = await fetch(`https://660f73af356b87a55c5168c5.mockapi.io/comida/v1/Platillos?ingredientes=${termino.toLowerCase()}`);
    const ingredientesData = await ingredientesResponse.json();
    
    // Combinar los resultados de ambas consultas
    const combinedData = [...nombreData, ...ingredientesData];
    
    // Eliminar duplicados
    const uniqueData = combinedData.filter((platillo, index, self) =>
      index === self.findIndex((p) => (
        p.id === platillo.id
      ))
    );

    setPlatos(uniqueData);
  } catch (error) {
    console.error('Error al buscar los platillos:', error);
  }
};


  const mostrarDetalles = (plato) => {
    setPlatoSeleccionado(plato);
  };

  const volverAImagenes = () => {
    setPlatoSeleccionado(null);
    obtenerPlatos();
  };

  const renderPlato = ({ item }) => {
    if (!item) return null;
    return <Platillo platillo={item} onPress={() => mostrarDetalles(item)} />;
  };

  return (
    <View>
      <Busqueda onBuscar={buscarPlatillos} />
      {platoSeleccionado ? (
        <DetallesPlatillo platillo={platoSeleccionado} onPressVolver={volverAImagenes} />
      ) : (
        <FlatList
          data={platos}
          renderItem={renderPlato}
          keyExtractor={(item) => item?.id?.toString()}
        />
      )}
    </View>
  );
};

export default PlatillosList;
