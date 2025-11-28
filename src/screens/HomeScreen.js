import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
const PetLoverImg = require('../../assets/Images/PetLoverImg.png');

const { width } = Dimensions.get('window');

const GradientText = ({ text, style }) => {
  return (
    <MaskedView
      maskElement={<Text style={[style, { backgroundColor: 'transparent' }]}>{text}</Text>}
    >
      <LinearGradient
        colors={['#FF512F', '#DD2476']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[style, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

const GradientButton = ({ text, onPress, colors, icon }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.btnWrapper}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBtn}
      >
        <Text style={styles.btnText}>{text} {icon}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const GradientLogo = () => {
  return (
    <MaskedView
      style={{ flexDirection: 'row', height: 45 }}
      maskElement={
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 32, marginRight: 10 }}>🐾</Text>
          <Text style={styles.logoTextBold}>PetCare</Text>
        </View>
      }
    >
      <LinearGradient
        colors={['#FF512F', '#DD2476']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      />
    </MaskedView>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <View style={styles.headerArea}>
        <GradientLogo />
      </View>

      <View style={styles.heroSection}>
        <View style={styles.imageFrame}>
          <Image
            source={PetLoverImg}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.textArea}>
          <Text style={styles.headline}>We Care for Your Pets Like</Text>
          <GradientText
            text="Family"
            style={styles.gradientHeadline}
          />
          <Text style={styles.subtext}>
            Keep track of your furry friends, manage their details, and give them the love they deserve.
          </Text>
        </View>
      </View>

      <View style={styles.actionArea}>
        <GradientButton
          text="Add New Pet"
          icon="+"
          colors={['#FF512F', '#DD2476']}
          onPress={() => navigation.navigate('AddPet')}
        />

        <GradientButton
          text="See All Pets"
          icon="🐾"
          colors={['#4facfe', '#00f2fe']}
          onPress={() => navigation.navigate('PetList')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingTop: 50,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  headerArea: {
    alignItems: 'center',
    marginBottom: 10,
    height: 50, 
    width: '100%', 
    justifyContent: 'center'
  },
  logoTextBold: {
      fontSize: 28,
      fontWeight: '900',
      letterSpacing: 1,
  },
  logoFrame: {
    width: 120,
    height: 50,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#BDBDBD',
    fontSize: 12,
    fontWeight: '600',
  },
  heroSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  imageFrame: {
    width: width * 0.85,
    height: width * 0.85,
    marginBottom: 30,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  textArea: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headline: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2D3436',
    textAlign: 'center',
  },
  gradientHeadline: {
    fontSize: 38,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 5,
  },
  subtext: {
    marginTop: 15,
    fontSize: 15,
    color: '#636E72',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: '90%',
  },
  actionArea: {
    width: '100%',
    gap: 15,
  },
  btnWrapper: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  gradientBtn: {
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default HomeScreen;