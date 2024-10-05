import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './loadingSlice';

const store = configureStore({
<<<<<<< HEAD
    reducer: {
        loading: loadingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

=======
  reducer: {
    loading: loadingReducer,
  },
});

>>>>>>> 535aa37fda414da915003db1ea304d3f01b81cb3
export default store;
