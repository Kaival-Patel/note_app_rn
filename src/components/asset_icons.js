import React from 'react';
import {Image,useColorScheme} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import icons from '../styles/assets';
import { isDarkMode } from '../styles/theme';

export const MenuIcon = ({height, width}) => {
  return (
    <Image
      source={icons.menuIcon}
      style={{height: height, width: width}}
      tintColor={isDarkMode?Colors.white:Colors.black}></Image>
  );
};
