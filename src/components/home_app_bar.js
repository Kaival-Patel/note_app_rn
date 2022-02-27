import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppBarContext from '../context/appbar_context';

function HomeAppBar() {
  const {showDeleteButton} = useContext(AppBarContext);
  return (
    <View style={style.appbarStyle}>
      <Text style={{fontSize: 17}}>Home</Text>
      {showDeleteButton ? (
        <FontAwesome name="trash" size={25} color='#E42C5A' />
      ) : (
        <View></View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  appbarStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
});

export default HomeAppBar;
