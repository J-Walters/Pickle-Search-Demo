import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, SafeAreaView } from 'react-native';
import { useFonts, Raleway_400Regular, Raleway_600SemiBold } from '@expo-google-fonts/raleway';

export default function Search() {
  const [search, setSearch] = useState('');
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_600SemiBold,
  });

  if (!fontsLoaded) return undefined;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pickle AI Search</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for something dreamy..."
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="#999"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Raleway_600SemiBold',
    color: 'rgb(112, 190, 68)',
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    backgroundColor: '#f9f9f9',
  },
});
