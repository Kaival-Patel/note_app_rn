import {View, Text, StyleSheet, Button, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch} from 'react-redux';
import {ADD_NOTE, UPDATE_NOTE} from '../reducers/noteReducers';
export default AddScreen = ({navigation, route}) => {
  const params = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [titleValidator, setTitleValidator] = useState('');
  const [descriptionValidator, setDescriptionValidator] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      params.description != null &&
      params.title != null &&
      params.id != null
    ) {
      setDescription(params.description);
      setTitle(params.title);
      setIsUpdate(true);
    }
  }, []);

  const validateForm = () => {
    if (title === '') {
      setTitleValidator('Note Title required');
      return;
    } else {
      setTitleValidator('');
    }

    if (description === '') {
      setDescriptionValidator('Note Description required');
      return;
    } else {
      setDescriptionValidator('');
    }
    if (title != '' && description != '') {
      if (isUpdate) {
        const note = {
          id: params.id,
          title: title,
          description: description,
        };
        dispatch(UPDATE_NOTE(note));
        ToastAndroid.show('Note updated', 100);
        navigation.pop();
      } else {
        try {
          const min = 1;
          const max = 10000;
          const random = min + Math.random() * (max - min);
          const note = {
            id: parseInt(random),
            title: title,
            description: description,
          };
          dispatch(ADD_NOTE(note));
          ToastAndroid.show('Note added', 100);
          navigation.pop();
        } catch (err) {
          console.error(err);
          navigation.pop();
        }
      }
    }
  };
  return (
    <View>
      <Text style={style.text}>Note Title</Text>
      <TextInput
        onChangeText={value => setTitle(value)}
        style={titleValidator == '' ? style.textfield : style.errorTextfield}
        value={title}
      />
      <Text style={style.errorText}>{titleValidator}</Text>
      <Text style={style.text}>Note Description</Text>
      <TextInput
        textAlignVertical="top"
        onChangeText={value => setDescription(value)}
        value={description}
        style={
          descriptionValidator == '' ? style.textfield : style.errorTextfield
        }
        multiline
        numberOfLines={5}
      />
      <Text style={style.errorText}>{descriptionValidator}</Text>

      <View style={style.button}>
        <Button
          onPress={() => validateForm()}
          title={isUpdate ? 'Update Note' : 'Save Note'}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  textfield: {
    borderColor: '#4ACFAC',
    borderStyle: 'solid',
    borderWidth: 1.5,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  errorTextfield: {
    borderColor: '#B33D35',
    borderStyle: 'solid',
    borderWidth: 1.5,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 12,
    color: '#B33D35',
    marginHorizontal: 10,
    fontStyle: 'italic',
  },
  button: {
    color: '#4ACFAC',
    borderRadius: 10,
    padding: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
});
