import React, { useState } from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native'
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default function Maps() {
  const pinColor = 'black';
  const GOOGLE_MAPS_APIKEY = "AIzaSyCYO6S4fjvx8wKmozO5t3BIc5v-bYxk06o";
  // AIzaSyBbUV5bh6eezio2DdlC1FiYwU0rqpK-6EA
  const [pin, setPin] = useState({
    latitude: 24.9639638798089,
    longitude: 67.05872397869825,
  })
  const [secPin, setSecPin] = useState({
    latitude: 24.8270,
    longitude: 67.0251,
  })
  return (
    <View style={styles.Container}>
      <MapView style={styles.map}
        initialRegion={{
          latitude: 24.9639638798089,
          longitude: 67.05872397869825,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {/* <MapViewDirections
          origin={pin}
          destination={secPin}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="red"
        /> */}

        <Marker
          coordinate={pin}
          title={"Home"}
          pinColor={pinColor}
          draggable={true}
          onDragStart={
            (e) => {
              console.log("Drag Start", e.nativeEvent.coordinate)
            }}
          onDragEnd={(e) => {
            console.log("Drag END", e.nativeEvent.coordinate)
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            })
          }}
        />
        <Marker
          coordinate={secPin}
          title={"office"}
          pinColor={pinColor}
          draggable={true}
          onDragStart={
            (f) => {
              console.log("Second Drag Start", f.nativeEvent.coordinate)
            }}
          onDragEnd={(e) => {
            console.log("Second Drag END", e.nativeEvent.coordinate)
            setSecPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            })
          }}
        />
      </MapView>
    </View>

  );
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Text: {
    zIndex: 5,
    fontSize: 32,
    textAlign: 'center',
    color: 'black',
    backgroundColor: "grey"
  },
  MapView: {
    flex: 1
  },
  map: {
    width: "100%",
    height: "100%"
  }
})