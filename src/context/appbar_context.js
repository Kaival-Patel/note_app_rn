import {createContext} from 'react';

export default AppBarContext = createContext({
  showDeleteButton: false,
  toggleDeleteButton: () => {},
});
