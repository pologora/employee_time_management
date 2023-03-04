import { Image, StyleSheet, View } from 'react-native';

export default function Logo() {
  const styles = StyleSheet.create({
    logoContainer: {
      position: 'absolute',
      top: '9%',
      left: '10%',
    },
    logo: {
      width: 106.4,
      height: 36.4,
    },
  });

  return (
    <View style={styles.logoContainer}>
      <Image source={require('../assets/ic_new_logo.png')} style={styles.logo} />
    </View>
  );
}
