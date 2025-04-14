import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Button,
  View,
  Image,
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
  },
  {
    id: '3',
    name: 'House of CB Jacinta Lace Top',
    tags: ['house of cb', 'corset', 'balconette', 'lace', 'evening'],
    image:
      'https://dsh6y5eym1jrl.cloudfront.net/_next/image?url=https%3A%2F%2Fd166chel5lrjm5.cloudfront.net%2Fimages%2Fdetailed%2F91%2Fjacinta-2.jpg&w=3840&q=100',
  },
  {
    id: '4',
    name: 'Bailia Linen Midi',
    tags: ['reformation', 'linen', 'midi dress', 'button down', 'eco', 'white'],
    image:
      'https://media.thereformation.com/image/upload/f_auto,q_auto:eco,dpr_auto/w_500/PRD-SFCC/1314884/WHITE/1314884.1.WHITE?_s=RAABAB0',
  },
  {
    id: '5',
    name: 'Rose Halter Top',
    tags: ['with jean', 'halter', 'two piece', 'red', 'summer', 'casual'],
    image:
      'https://withjean.com/cdn/shop/products/FLAT-1_7877b078-cdcb-4e24-9cfc-4b5fb90dff14_2000x.jpg?v=1681784158',
  },
  {
    id: '6',
    name: 'Aritzia Effortless Pant',
    tags: ['aritzia', 'trousers', 'high waist', 'black', 'tailored', 'minimal'],
    image:
      'https://assets.aritzia.com/image/upload/q_auto,f_auto,dpr_auto,w_1200/s25_a06_77775_1274_on_a',
  },
  {
    id: '7',
    name: 'Rat & Boa Antonella Maxi',
    tags: ['rat and boa', 'maxi', 'sheer', 'vacation', 'bold', 'slip dress'],
    image:
      'https://cdn.shopify.com/s/files/1/1191/9918/files/antonella_960x_crop_center.jpg.webp?v=1725359324',
  },
  {
    id: '8',
    name: 'SKIMS Soft Lounge Dress',
    tags: ['skims', 'bodycon', 'neutral', 'soft lounge', 'stretch', 'casual'],
    image:
      'https://skims.imgix.net/s/files/1/0259/5448/4284/files/AP-DRS-0596-ONX-HC-SKIMS-LOUNGEWEAR_3140-FR.jpg?v=1708554715&auto=format&q=70&ixlib=react-9.10.0&w=512',
  },
];

export default function Search() {
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_600SemiBold,
  });

  if (!fontsLoaded) return undefined;

  // Create Fuse.js instance
  const fuse = new Fuse(mockItems, {
    keys: ['name', 'tags'],
    threshold: 0.3, // Controls the fuzziness level (lower is stricter)
  });

  const handleSearch = (text) => {
    setSearch(text);

    if (!text.trim()) {
      setFilteredItems([]);
      return;
    }

    // Perform the fuzzy search
    const results = fuse.search(text).map((result) => result.item);
    setFilteredItems(results);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pickle Search Demo</Text>
      <TextInput
        style={styles.input}
        placeholder='Search for something dreamy...'
        value={search}
        onChangeText={handleSearch}
        placeholderTextColor='#999'
      />
      {filteredItems.length > 0 ? (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: 'Raleway_600SemiBold', fontSize: 18 }}>
            Matches:
          </Text>
          {filteredItems.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <Text
                style={{ fontFamily: 'Raleway_400Regular', marginVertical: 4 }}
              >
                {item.name}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={{ marginTop: 20, fontFamily: 'Raleway_400Regular' }}>
          No items matched your search.
        </Text>
      )}
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 5,
  },
});
