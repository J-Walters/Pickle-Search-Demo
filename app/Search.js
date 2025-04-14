import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  FlatList,
  View,
  Image,
  Keyboard,
} from 'react-native';
import {
  useFonts,
  Raleway_400Regular,
  Raleway_600SemiBold,
} from '@expo-google-fonts/raleway';
import Fuse from 'fuse.js';

const mockItems = [
  {
    id: '1',
    name: 'Cult Gaia Cutout Dress',
    tags: [
      'cult gaia',
      'cutout',
      'resortwear',
      'green',
      'asymmetric',
      'bamboo',
    ],
    image:
      'https://cultgaia.com/cdn/shop/files/240821_DR_CULT_GAIA_S25_HS25_LOOK_BOOK_LOOK_37_0002copy.jpg?v=1740098016&width=1200',
    price: '$32',
    size: 'S',
    location: 'Manhattan',
  },
  {
    id: '2',
    name: 'Realisation Par Silk Wrap Dress',
    tags: [
      'realisation par',
      'silk',
      'wrap dress',
      'floral',
      'romantic',
      'spring',
    ],
    image:
      'https://cdn11.bigcommerce.com/s-233ct/images/stencil/759x1000/products/431/7422/ELECTRA-CRUSH_WEB_2-NEW__86112.1692039739.jpg?c=2',
    price: '$28',
    size: 'M',
    location: 'Brooklyn',
  },
  {
    id: '3',
    name: 'House of CB Jacinta Lace Top',
    tags: ['house of cb', 'corset', 'balconette', 'lace', 'evening'],
    image:
      'https://dsh6y5eym1jrl.cloudfront.net/_next/image?url=https%3A%2F%2Fd166chel5lrjm5.cloudfront.net%2Fimages%2Fdetailed%2F91%2Fjacinta-2.jpg&w=3840&q=100',
    price: '$20',
    size: 'XS',
    location: 'Miami',
  },
  {
    id: '4',
    name: 'Balia Linen Midi',
    tags: ['reformation', 'linen', 'midi dress', 'button down', 'eco', 'white'],
    image:
      'https://media.thereformation.com/image/upload/f_auto,q_auto:eco,dpr_auto/w_500/PRD-SFCC/1314884/WHITE/1314884.1.WHITE?_s=RAABAB0',
    price: '$30',
    size: 'M',
    location: 'Chicago',
  },
  {
    id: '5',
    name: 'Rose Halter Top',
    tags: ['with jean', 'halter', 'two piece', 'red', 'summer', 'casual'],
    image:
      'https://withjean.com/cdn/shop/products/FLAT-1_7877b078-cdcb-4e24-9cfc-4b5fb90dff14_2000x.jpg?v=1681784158',
    price: '$18',
    size: 'S',
    location: 'Brooklyn',
  },
  {
    id: '6',
    name: 'Aritzia Effortless Pant',
    tags: ['aritzia', 'trousers', 'high waist', 'black', 'tailored', 'minimal'],
    image:
      'https://assets.aritzia.com/image/upload/q_auto,f_auto,dpr_auto,w_1200/s25_a06_77775_1274_on_a',
    price: '$25',
    size: 'L',
    location: 'Chicago',
  },
  {
    id: '7',
    name: 'Rat & Boa Antonella Maxi',
    tags: ['rat and boa', 'maxi', 'sheer', 'vacation', 'bold', 'slip dress'],
    image:
      'https://cdn.shopify.com/s/files/1/1191/9918/files/antonella_960x_crop_center.jpg.webp?v=1725359324',
    price: '$35',
    size: 'S',
    location: 'Miami',
  },
  {
    id: '8',
    name: 'SKIMS Soft Lounge Dress',
    tags: ['skims', 'bodycon', 'neutral', 'soft lounge', 'stretch', 'casual'],
    image:
      'https://skims.imgix.net/s/files/1/0259/5448/4284/files/AP-DRS-0596-ONX-HC-SKIMS-LOUNGEWEAR_3140-FR.jpg?v=1708554715&auto=format&q=70&ixlib=react-9.10.0&w=512',
    price: '$22',
    size: 'M',
    location: 'Los Angeles',
  },
];

const fuse = new Fuse(mockItems, {
  keys: ['name', 'tags'],
  threshold: 0.4,
});

export default function Search() {
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState(mockItems);

  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_600SemiBold,
  });

  useEffect(() => {
    setFilteredItems(mockItems);
  }, []);

  if (!fontsLoaded) return null;

  const handleSearch = (text) => {
    setSearch(text);

    if (!text.trim()) {
      setFilteredItems(mockItems);
      return;
    }

    const results = fuse.search(text);
    if (results.length > 0) {
      setFilteredItems(results.map((r) => r.item));
    } else {
      setFilteredItems([]);
    }
  };

  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {
      Keyboard.dismiss();
      handleSearch(search);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pickle Search Demo</Text>
      <TextInput
        style={styles.input}
        placeholder='Search for something dreamy...'
        value={search}
        onChangeText={handleSearch}
        onKeyPress={handleKeyPress}
        placeholderTextColor='#999'
        returnKeyType='search'
      />
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>
              {item.name}
            </Text>
            <Text style={styles.cardDetail}>
              Rent: {item.price} | Size: {item.size}
            </Text>
            <Text
              style={styles.cardDetail}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {item.location}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noResults}>No items matched your search.</Text>
        }
        contentContainerStyle={styles.gridContainer}
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
  gridContainer: {
    paddingBottom: 20,
    paddingHorizontal: 4,
    paddingTop: 20,
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
    borderRadius: 20,
    padding: 12,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    backgroundColor: '#f9f9f9',
  },
  card: {
    width: '46%',
    marginHorizontal: 6,
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  name: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 6,
    marginHorizontal: 4,
    color: '#222',
  },
  cardDetail: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginTop: 2,
    marginHorizontal: 4,
  },

  noResults: {
    fontFamily: 'Raleway_400Regular',
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },
});
