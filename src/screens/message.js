import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../message-redux-toolkit/messageSlice';

const Message = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);

  const handlePress = () => {
    dispatch(setMessage('Message from Component'));
  };

  return (
    <View >
      <Text>{message}</Text>
      <Button title={'Set Message'} onPress={handlePress} />
    </View>
  )
}

export default Message