import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {MenuIcon} from '../components/asset_icons';
import {Fab} from '../components/fab';
import {AppHeader} from '../components/header';
import AppBarContext from '../context/appbar_context';
import {isDarkMode} from '../styles/theme';
export default HomeScreen = ({navigation, route}) => {
  //STATE MANAGEMENT NOTES
  const notes = useSelector(state => state.note_reducer);
  console.log('NOTES LENGTH => ' + notes.length);
  const context = useContext(AppBarContext);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchedNotes, setSearchedNotes] = useState([]);
  const [isSearchingNotes, setIsSearchingNotes] = useState(false);
  const handleSearch = query => {
    if (query != '') {
      //FIRE QUERY
      setIsSearchingNotes(true);
      let notesTemp = notes;
      let searchResults = notesTemp.filter(
        note =>
          note.payload.title.toLowerCase().includes(query.toLowerCase()) ||
          note.payload.description.toLowerCase().includes(query.toLowerCase()),
      );
      console.debug(searchResults);
      setSearchedNotes(searchResults);
    } else {
      setIsSearchingNotes(false);
      setSearchedNotes([]);
    }
  };
  return (
    // <ScrollView>
    <View style={{flex: 1}}>
      <TextInput
        style={style.searchBarStyle}
        onChangeText={query => handleSearch(query)}
        placeholder="Search notes by its title/description"
      />

      {isSearchingNotes ? (
        searchedNotes.length > 0 ? (
          <View>
            <Text style={style.searchTextStyle}>Search Results</Text>
            <FlatList
              numColumns={2}
              data={searchedNotes}
              style={{width: '100%'}}
              renderItem={item => (
                console.log(item.item.payload),
                (
                  <View
                    key={item.item.payload.id}
                    style={{
                      borderColor: '#4ACFAC',
                      flex: 1,
                      padding: 10,
                      backgroundColor: '#FEFFFF',
                      borderRadius: 10,
                      elevation: 5,
                      margin: 10,
                      borderWidth: selectedIds.includes(item.item.payload.id)
                        ? 2
                        : 0,
                    }}>
                    <TouchableOpacity>
                      <Text style={style.title}>{item.item.payload.title}</Text>
                      <Text style={style.description}>
                        {item.item.payload.description}
                      </Text>
                      {selectedIds.includes(item.item.payload.id) ? (
                        <FontAwesome
                          name="check"
                          style={{
                            zIndex: 1,
                            bottom: 5,
                            right: 5,
                            position: 'absolute',
                          }}
                          size={20}
                          color="#4ACFAC"
                        />
                      ) : null}
                    </TouchableOpacity>
                  </View>
                )
              )}
              keyExtractor={item => item.id}
            />
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}>
            <Text>No search results</Text>
          </View>
        )
      ) : notes.length > 0 ? (
        <FlatList
          numColumns={2}
          data={notes}
          style={{width: '100%'}}
          renderItem={item => (
            (
              <AppBarContext.Consumer>
                {data => {
                  console.log('-------', data);
                  return (
                    <View
                      key={item.item.payload.id}
                      style={{
                        borderColor: '#4ACFAC',
                        flex: 1,
                        padding: 10,
                        backgroundColor: '#FEFFFF',
                        borderRadius: 10,
                        elevation: 5,
                        margin: 10,
                        borderWidth: selectedIds.includes(item.item.payload.id)
                          ? 2
                          : 0,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          // var ids = [];
                          // if (selectedIds.includes(item.item.payload.id)) {
                          //   ids = selectedIds.filter(
                          //     id => id !== item.item.payload.id,
                          //   );
                          //   setSelectedIds(ids);
                          // } else {
                          //   ids = selectedIds;
                          // }
                          // if (ids.length > 0) {
                          //   data.toggleDeleteButton(true, ids);
                          // } else {
                          //   data.toggleDeleteButton(false, ids);
                          // }
                          navigation.navigate('Add', item.item.payload);
                        }}
                        onLongPress={() => {
                          var ids;
                          if (selectedIds.includes(item.item.payload.id)) {
                            ids = selectedIds.filter(
                              id => id !== item.item.payload.id,
                            );
                            setSelectedIds(ids);
                          } else {
                            ids = [...selectedIds, item.item.payload.id];
                            setSelectedIds(ids);
                          }
                          if (ids.length > 0) {
                            data.toggleDeleteButton(true, ids);
                          } else {
                            data.toggleDeleteButton(false, ids);
                          }
                        }}>
                        <Text style={style.title}>
                          {item.item.payload.title}
                        </Text>
                        <Text style={style.description}>
                          {item.item.payload.description}
                        </Text>
                        {selectedIds.includes(item.item.payload.id) ? (
                          <FontAwesome
                            name="check"
                            style={{
                              zIndex: 1,
                              bottom: 5,
                              right: 5,
                              position: 'absolute',
                            }}
                            size={20}
                            color="#4ACFAC"
                          />
                        ) : null}
                      </TouchableOpacity>
                    </View>
                  );
                }}
              </AppBarContext.Consumer>
            )
          )}
          keyExtractor={(item,index)=>{
            return item.payload.id;
          }}
        />
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
          <Text>No Notes till now</Text>
        </View>
      )}
      <Fab onPressed={() => navigation.navigate('Add', {})}></Fab>
    </View>
    // <AppBarContext.Provider value={{showDeleteButton, setShowDeleteButton}}>
    //   <View style={{flex: 1}}>
    //     {notes.length > 0 ? (
    //       <FlatList
    //         numColumns={2}
    //         data={notes}
    //         style={{width: '100%'}}
    //         renderItem={item => (
    //           console.log(item.item.payload),
    //           (
    //             <View key={item.item.payload.id} style={style.noteContainer}>
    //               <TouchableOpacity
    //                 onLongPress={handleLongPressOnItem(item.item.payload.id)}>
    //                 <Text style={style.title}>{item.item.payload.title}</Text>
    //                 <Text style={style.description}>
    //                   {item.item.payload.description}
    //                 </Text>
    //               </TouchableOpacity>
    //             </View>
    //           )
    //         )}
    //         keyExtractor={item => item.id}
    //       />
    //     ) : (
    //       <View
    //         style={{
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //           height: '100%',
    //         }}>
    //         <Text>No Notes till now</Text>
    //       </View>
    //     )}
    //     <Fab onPressed={() => navigation.navigate('Add', {})}></Fab>
    //   </View>
    // </AppBarContext.Provider>

    // </ScrollView>
  );
};

const style = StyleSheet.create({
  description: {
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: 13,
    color: '#757575',
    maxHeight: 300,
    paddingVertical: 10,
  },
  title: {
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#4ACFAC',
  },
  noteContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FEFFFF',
    borderRadius: 10,
    elevation: 5,
    margin: 10,
  },
  searchBarStyle: {
    backgroundColor: '#FEFFFF',
    borderRadius: 30,
    elevation: 3,
    margin: 10,
    padding: 10,
  },
  searchTextStyle: {
    margin: 10,
  },
});
