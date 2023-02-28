import { StyleSheet, Text, View } from 'react-native';
import { backgroundDark, backgroundLight } from './Styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundDark,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  nameTextContainer: {
    backgroundColor: backgroundLight,
    width: '80%',
    marginTop: 5,
    padding: 0,
  },
  text: {
    marginVertical: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default function StartWork() {
  return (
    <View style={styles.container}>
      <View style={styles.nameTextContainer}>
        <Text style={styles.text}>Agnieszka Wojtyłą</Text>
      </View>
    </View>
  );
}
