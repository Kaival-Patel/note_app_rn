import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export const Fab = ({onPressed}) => {
  return (
    <TouchableOpacity
      onPress={() => onPressed()}
      style={fabButtonStyle.fabStyle}>
      <View>
        <FontAwesome name="plus" size={30} color={Colors.white} />
      </View>
    </TouchableOpacity>
  );
};

const fabButtonStyle = StyleSheet.create({
  fabStyle: {
    position: 'absolute',
    height: 50,
    bottom: 10,
    zIndex: 2,
    right: 10,
    borderRadius: 400,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#32a852',
  },
});
