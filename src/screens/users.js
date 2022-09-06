import React, { useState } from 'react'
import { useEffect } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../message-redux-toolkit/messageSlice';
const Users = () => {
  const dispatch = useDispatch();
  // const { users } = useSelector((state) => state.users)

  const DATA = 'https://jsonplaceholder.typicode.com/users'
  const [userData, setUserData] = useState([])
  fetch(DATA)
    .then(response => response.json())
    .then(data => setUserData(data))

  useEffect(() => {
  () => dispatch(setUsers(userData));

  }, [])
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
        data={userData}
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