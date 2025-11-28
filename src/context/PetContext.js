import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      const storedPets = await AsyncStorage.getItem('pets');
      if (storedPets) setPets(JSON.parse(storedPets));
    } catch (error) {
      console.error("Failed to load pets", error);
    }
  };

  const addPet = async (petData) => {
    const newPet = { ...petData, id: Date.now().toString(), isFavorite: false };
    const updatedPets = [...pets, newPet];
    setPets(updatedPets);
    await AsyncStorage.setItem('pets', JSON.stringify(updatedPets));
  };

  const toggleFavorite = async (id) => {
    const updatedPets = pets.map((pet) =>
      pet.id === id ? { ...pet, isFavorite: !pet.isFavorite } : pet
    );
    setPets(updatedPets);
    await AsyncStorage.setItem('pets', JSON.stringify(updatedPets));
  };

  const deletePet = async (id) => {
    const updatedPets = pets.filter((pet) => pet.id !== id);
    setPets(updatedPets);
    await AsyncStorage.setItem('pets', JSON.stringify(updatedPets));
  };

  return (
    <PetContext.Provider value={{ pets, addPet, toggleFavorite, deletePet }}>
      {children}
    </PetContext.Provider>
  );
};