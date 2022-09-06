import React, { useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';




const Users = () => {
  const DATA = 'https://jsonplaceholder.typicode.com/users'
  const [user, setUser] = useState([])
  fetch(DATA)
    .then(response => response.json())
    .then(data => setUser(data))

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )

  const renderItem = ({ item }) => (
    <Item title={item.name} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={user}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'grey',
    padding: 20,
    marginVertical: 8,

    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: "#fff",
  },
});

export default Users;