import {configureStore} from '@reduxjs/toolkit';

import currentUserReducer from './reducers/userSlice';

export default configureStore({
  reducer: {
    currentUser: currentUserReducer,
  },
});
