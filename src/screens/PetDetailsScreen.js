import { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PetContext } from '../context/PetContext';

const PetDetailsScreen = ({ route, navigation }) => {
  const { petId } = route.params;
  const { pets, toggleFavorite } = useContext(PetContext);

  const pet = pets.find((p) => p.id === petId);

  if (!pet) return null;

  const getPetEmoji = (type) => {
    const t = type?.toLowerCase() || '';
    if (t.includes('cat')) return '🐱';
    if (t.includes('dog')) return '🐶';
    if (t.includes('fish')) return '🐠';
    if (t.includes('bird')) return '🐦';
    return '🐾';
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.headerWrapper}>
          <LinearGradient
            colors={['#FF512F', '#DD2476']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
          </LinearGradient>

          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarEmoji}>{getPetEmoji(pet.type)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.name}>{pet.name}</Text>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{pet.type}</Text>
          </View>

          <View style={styles.detailsCard}>

            <View style={styles.detailRow}>
              <View style={styles.iconBox}><Text style={styles.iconEmoji}>🧬</Text></View>
              <View>
                <Text style={styles.detailLabel}>Breed</Text>
                <Text style={styles.detailValue}>{pet.breed || 'Unknown'}</Text>
              </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.detailRow}>
              <View style={styles.iconBox}><Text style={styles.iconEmoji}>🎂</Text></View>
              <View>
                <Text style={styles.detailLabel}>Age</Text>
                <Text style={styles.detailValue}>{pet.age || 'Unknown'}</Text>
              </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.detailRow}>
              <View style={styles.iconBox}><Text style={styles.iconEmoji}>❤️</Text></View>
              <View>
                <Text style={styles.detailLabel}>Status</Text>
                <Text style={styles.detailValue}>
                  {pet.isFavorite ? 'Your Best Friend' : 'Part of the Family'}
                </Text>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => toggleFavorite(pet.id)}
          style={styles.btnShadow}
        >
          <LinearGradient
            colors={pet.isFavorite ? ['#FFF', '#FFF'] : ['#FF512F', '#DD2476']}
            style={[styles.actionBtn, pet.isFavorite && styles.outlineBtn]}
          >
            <Text style={[styles.btnText, pet.isFavorite && styles.outlineBtnText]}>
              {pet.isFavorite ? "💔  Remove from Favorites" : "🤍  Mark as Favorite"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  headerWrapper: {
    marginBottom: 50,
  },
  headerGradient: {
    height: 180,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  avatarContainer: {
    position: 'absolute',
    bottom: -50,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  avatarEmoji: {
    fontSize: 60,
  },
  infoSection: {
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  name: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 10,
    textAlign: 'center',
  },
  typeBadge: {
    backgroundColor: '#FFF0F0',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#FFD1D1',
  },
  typeText: {
    color: '#FF512F',
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  detailsCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F7F9FC',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconEmoji: {
    fontSize: 22,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 16,
    color: '#2D3436',
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEF2F6',
    marginVertical: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 25,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F7F9FC',
  },
  btnShadow: {
    shadowColor: '#FF512F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  actionBtn: {
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineBtn: {
    borderWidth: 2,
    borderColor: '#FF512F',
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  outlineBtnText: {
    color: '#FF512F',
  },
});

export default PetDetailsScreen;