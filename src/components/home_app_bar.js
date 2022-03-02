import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { useDispatch } from 'react-redux';
import AppBarContext from '../context/appbar_context';
import { REMOVE_NOTE } from '../reducers/noteReducers';

function HomeAppBar() {
  const data = useContext(AppBarContext);
  const dispatch = useDispatch();
  return (
    <View style={style.appbarStyle}>
      <Text style={{fontSize: 17}}>Home</Text>
      {data.data.showDeleteButton ? (
        <TouchableOpacity
          onPress={() => {
            console.log('Deleting '+data.data.selectedIds);
            dispatch(REMOVE_NOTE(data.data.selectedIds));
          }}>
          <FontAwesome name="trash" size={25} color="#E42C5A" />
        </TouchableOpacity>
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
