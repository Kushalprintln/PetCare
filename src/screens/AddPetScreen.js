import { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PetContext } from '../context/PetContext';
import { Ionicons } from '@expo/vector-icons';

const AddPetScreen = ({ navigation }) => {
  const { addPet } = useContext(PetContext);

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');

  const [showDropdown, setShowDropdown] = useState(false);
  const petTypes = ['Dog', 'Cat', 'Fish', 'Bird', 'Other'];

  const handleSave = () => {
    if (!name.trim() || !type.trim()) {
      Alert.alert('Missing Info', 'Please enter a Name and select a Pet Type!');
      return;
    }

    addPet({ name, type, age, breed });

    Alert.alert('Success', 'New friend added! 🐾', [
      { text: 'Awesome', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>Add a New Friend</Text>
          <Text style={styles.subtitle}>Fill in the details to track your pet.</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pet Name <Text style={styles.req}>*</Text></Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="e.g. Buddy"
            placeholderTextColor="#C7C7CD"
          />
        </View>

        <View style={[styles.inputGroup, { zIndex: 100 }]}>
          <Text style={styles.label}>Pet Type <Text style={styles.req}>*</Text></Text>

          <TouchableOpacity
            style={styles.dropdownTrigger}
            onPress={() => setShowDropdown(!showDropdown)}
            activeOpacity={0.8}
          >
            <Text style={[styles.dropdownText, !type && { color: '#C7C7CD' }]}>
              {type || "Select Type"}
            </Text>
            <Ionicons
              name={showDropdown ? "chevron-up" : "chevron-down"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownList}>
              {petTypes.map((t, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownOption}
                  onPress={() => {
                    setType(t);
                    setShowDropdown(false);
                  }}
                >
                  <Text style={styles.optionText}>{t}</Text>
                  {type === t && <Ionicons name="checkmark" size={18} color="#FF512F" />}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Breed</Text>
          <TextInput
            style={styles.input}
            value={breed}
            onChangeText={setBreed}
            placeholder="e.g. Golden Retriever"
            placeholderTextColor="#C7C7CD"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="e.g. 2 years"
            keyboardType="numeric"
            placeholderTextColor="#C7C7CD"
          />
        </View>

        <TouchableOpacity
          onPress={handleSave}
          activeOpacity={0.8}
          style={styles.btnWrapper}
        >
          <LinearGradient
            colors={['#FF512F', '#DD2476']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBtn}
          >
            <Text style={styles.btnText}>Save Pet</Text>
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 25,
    paddingTop: 40,
  },
  headerContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 8,
    marginLeft: 4,
  },
  req: {
    color: '#FF512F',
  },
  input: {
    backgroundColor: '#F7F9FC',
    borderWidth: 1,
    borderColor: '#EEF2F6',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#2D3436',
  },
  dropdownTrigger: {
    backgroundColor: '#F7F9FC',
    borderWidth: 1,
    borderColor: '#EEF2F6',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#2D3436',
  },
  dropdownList: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dropdownOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F7F9FC',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    color: '#444',
  },
  btnWrapper: {
    marginTop: 20,
    shadowColor: '#FF512F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  gradientBtn: {
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddPetScreen;