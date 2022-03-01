import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeScreen from './src/screens/home_screen';
import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StatusBar, View} from 'react-native';
import {isDarkMode} from './src/styles/theme';
import AddScreen from './src/screens/add_screen';
import HomeAppBar from './src/components/home_app_bar';
import AppBarContext from './src/context/appbar_context';
const Stack = createStackNavigator();
// export default NotesApp = () => {
//   toggleDeleteButton = () => {
//     console.log('Togggling button');
//     this.setState(state => ({
//       showDeleteButton: !state.showDeleteButton,
//     }));
//   };
//   console.log('HEllo Constructor');
//   state = {
//     showDeleteButton: false,
//   };
//   return (
//     // {/* <StatusBar barStyle={isDarkMode?'light-content':'dark-content'}/> */}
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             headerTintColor: Colors.black,
//             headerStyle: {
//               backgroundColor: Colors.white,
//             },
//             headerTitle: props => (
//               <AppBarContext.Provider
//                 value={{
//                   data: {...this.state},
//                   toggleDeleteButton: () => {
//                     console.log('Togggling button');
//                     this.setState(state => ({
//                       showDeleteButton: !state.showDeleteButton,
//                     }));
//                   },
//                 }}>
//                 <HomeAppBar />
//               </AppBarContext.Provider>
//             ),
//           }}
//         />
//         <Stack.Screen
//           name="Add"
//           component={AddScreen}
//           options={{
//             title: 'Add Note',
//             headerTintColor: Colors.black,
//             headerStyle: {
//               backgroundColor: Colors.white,
//             },
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };
export default class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    // this.toggleDeleteButton = () => {
    //   console.log('Togggling button');
    //   this.setState(state => ({
    //     showDeleteButton: true,
    //   }));
    // };
    console.log('HEllo Constructor');
    this.state = {
      showDeleteButton: false,
      selectedIds: [],
    };
  }

  render() {
    return (
      // {/* <StatusBar barStyle={isDarkMode?'light-content':'dark-content'}/> */}
      <NavigationContainer>
        <AppBarContext.Provider
          value={{
            data: {...this.state},
            toggleDeleteButton: (markForDelete, selectedIds) => {
              console.log('Togggling button');
              this.setState( state => ({
                showDeleteButton: markForDelete,
                selectedIds: selectedIds,
              }));
            },
          }}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerTintColor: Colors.black,
                headerStyle: {
                  backgroundColor: Colors.white,
                },
                headerTitle: props => <HomeAppBar />,
              }}
            />
            <Stack.Screen
              name="Add"
              component={AddScreen}
              options={{
                title: 'Add Note',
                headerTintColor: Colors.black,
                headerStyle: {
                  backgroundColor: Colors.white,
                },
              }}
            />
          </Stack.Navigator>
        </AppBarContext.Provider>
      </NavigationContainer>
    );
  }
}
