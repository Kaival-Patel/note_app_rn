/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import NotesApp from './App';
import {name as appName} from './app.json';
import React from 'react';
import {store} from './src/store/store';
const RxRedux = () => {
  return (
    <Provider store={store}>
      <NotesApp />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RxRedux);
