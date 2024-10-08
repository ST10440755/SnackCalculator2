import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
 /*import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat'; */

type MenuItemProps = {
  name: string;
  description: string;
  price: number;
  course: string;
};

const courseList = [
  { id: 1, name: 'Hors D Oeuvre' },
  { id: 2, name: 'Amuse-Bouche' },
  { id: 3, name: 'Soup' },
  { id: 4, name: 'Salad' },
  { id: 5, name: 'Appetiser' },
  { id: 6, name: 'Fish' },
  { id: 7, name: 'Main Course' },
  { id: 8, name: 'Palate Cleanser' },
  { id: 9, name: 'Second Main Course' },
  { id: 10, name: 'Cheese' },
  { id: 11, name: 'Dessert' },
  { id: 12, name: 'Mignardise' },
];

const MenuItem = ({ name, description, price, course }: MenuItemProps) => (
  <View style={styles.menuContainer}>
    <Text style={styles.menuName}>{name}</Text>
    <Text style={styles.menuDescription}>{description}</Text>
    <Text style={styles.menuPrice}>R{price}</Text>
    <Text style={styles.menuCourse}>{course}</Text>
  </View>
);

export default function App() {
  const [mName, setMName] = useState<string>('');
  const [mDescription, setMDescription] = useState<string>('');
  const [mPrice, setMPrice] = useState<string>('');
  const [mCourse, setMCourse] = useState<string>('');

  const [menuList, setMenuList] = useState<MenuItemProps[]>([]);
  const [total, setTotal] = useState<number>(0);

   /*let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner
  } */

  const handleSaveMenuItem = () => {
    if (!mName || !mDescription || isNaN(Number(mPrice)) || !mCourse) {
      Alert.alert('Error', 'Please fill out all fields correctly.');
      return;
    }
    const newMenuItem: MenuItemProps = {
      name: mName,
      description: mDescription,
      price: parseFloat(mPrice),
      course: mCourse,
    };
    const updatedMenuList = [...menuList, newMenuItem];
    setMenuList(updatedMenuList);
    setTotal(updatedMenuList.length);

    Alert.alert('Success', 'Menu item added successfully');

    setMName('');
    setMDescription('');
    setMPrice('');
    setMCourse('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>COURSE MENU APP</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.statsText}>TOTAL ITEMS</Text>
          <Text style={styles.statsText}>{total}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.statsText}></Text>
          {/* Future implementation */}
        </View>
      </View>
      <View style={styles.menuContainer}>
        <FlatList
          data={menuList}
          renderItem={({ item }) => (
            <MenuItem
              name={item.name}
              description={item.description}
              price={item.price}
              course={item.course}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Text style={styles.emptyMessage}>Empty Menu</Text>}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>MENU ITEM</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Name'
          onChangeText={setMName}
          value={mName}
          style={styles.input}
        />
        <TextInput
          placeholder='Description'
          onChangeText={setMDescription}
          value={mDescription}
          multiline={true}
          style={styles.inputDescr}
        />
        <TextInput
          placeholder='Price'
          onChangeText={setMPrice}
          value={mPrice}
          keyboardType='numeric'
          style={styles.input}
        />
         <Picker
          onValueChange={(itemValue) => setMCourse(itemValue)}
          selectedValue={mCourse}
          style={styles.picker}
        >
          {courseList.map((item) => (
            <Picker.Item label={item.name} value={item.name} key={item.id} />
          ))}
        </Picker> 
        
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight onPress={handleSaveMenuItem} style={styles.button}>
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#000022',
    padding: 10,
    marginTop: 0,
  },
  headerContainer: {
    alignItems: 'center', // corrected from 'left' to 'flex-start'
    marginBottom: 10,
  },
  headerText: {
    fontSize: 30,
    color: '#e28413',
    //fontFamily: 'Montserrat_700Bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  totalContainer: {
    alignItems: 'center',
  },
  statsText: {
    fontSize: 30,
    color: '#fbf5f3',
    //fontFamily: 'Montserrat_400Regular',
  },
  menuContainer: {
    flex: 1,
  },
  menuName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fbf5f3',
    //fontFamily: 'Montserrat_700Bold',
  },
  menuDescription: {
    fontSize: 25,
    color: '#fbf5f3',
    //fontFamily: 'Montserrat_400Regular',
  },
  menuPrice: {
    fontSize: 30,
    color: 'green',
    //fontFamily: 'Montserrat_400Regular',
  },
  menuCourse: {
    fontSize: 30,
    color: 'blue',
    //fontFamily: 'Montserrat_400Regular',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    marginTop: 20,
    //fontFamily: 'Montserrat_400Regular',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    color: '#000022',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    //fontFamily: 'Montserrat_400Regular',
  },
  inputDescr: {
    backgroundColor: '#fff',
    color: '#000022',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    height: 90,
    //fontFamily: 'Montserrat_400Regular',
  },
  picker: {
    backgroundColor: '#fff',
    color: '#000022',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    height: 50,
    //fontFamily: 'Montserrat_400Regular',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#333',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    //fontFamily: 'Montserrat_700Bold',
  },
});
