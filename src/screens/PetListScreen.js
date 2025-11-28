import { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PetContext } from '../context/PetContext';

const PetListScreen = ({ navigation }) => {
  const { pets, toggleFavorite, deletePet } = useContext(PetContext);

  const getPetEmoji = (type) => {
    const t = type.toLowerCase();
    if (t.includes('cat')) return '🐱';
    if (t.includes('dog')) return '🐶';
    if (t.includes('fish')) return '🐠';
    if (t.includes('bird')) return '🐦';
    return '🐾';
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Remove Friend",
      "Are you sure you want to remove this pet from your list?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Remove", 
          onPress: () => deletePet(id), 
          style: "destructive"
        }
      ]
    );
  };

  const renderPetItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.card} 
        activeOpacity={0.9}
        onPress={() => navigation.navigate('PetDetails', { petId: item.id })}
      >
        <LinearGradient
          colors={['#FF512F', '#DD2476']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconContainer}
        >
           <Text style={styles.petEmoji}>{getPetEmoji(item.type)}</Text>
        </LinearGradient>

        <View style={styles.infoBox}>
          <Text style={styles.petName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.petDetails}>
            {item.type} {item.breed ? `• ${item.breed}` : ''}
          </Text>
        </View>
        
        <View style={styles.actionsContainer}>
            <TouchableOpacity 
                onPress={() => toggleFavorite(item.id)} 
                style={styles.actionBtn}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 5}}
            >
                <Text style={styles.actionEmoji}>
                {item.isFavorite ? "❤️" : "🤍"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => handleDelete(item.id)} 
                style={[styles.actionBtn, { marginLeft: 10 }]}
                hitSlop={{top: 10, bottom: 10, left: 5, right: 10}}
            >
                <Text style={styles.actionEmoji}>🗑️</Text>
            </TouchableOpacity>

        </View>
      </TouchableOpacity>
    );
  }

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
             <Text style={{fontSize: 50}}>🐾</Text>
        </View>
      <Text style={styles.emptyTitle}>No pets added yet</Text>
      <Text style={styles.emptySubtitle}>
        Tap the "Add Pets" button on the home screen to get started!
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={renderPetItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={EmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  listContent: {
    padding: 20,
    paddingTop: 30,
    flexGrow: 1, 
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#2D3436',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F7F9FC',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30, 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#FF512F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  petEmoji: {
    fontSize: 30,
  },
  infoBox: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 10,
  },
  petName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 4,
  },
  petDetails: {
    fontSize: 14,
    color: '#636E72',
    fontWeight: '500',
  },
  actionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  actionBtn: {
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center'
  },
  actionEmoji: {
    fontSize: 22,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyIconCircle: {
      width: 100,
      height: 100,
      backgroundColor: '#FFF1F0', 
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 25,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 24,
  },
});

export default PetListScreen;