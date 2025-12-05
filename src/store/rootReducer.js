import { combineReducers } from "@reduxjs/toolkit";
// Import các slices khi tạo
// import authReducer from '@/features/authentication/store/authSlice';
// import booksReducer from '@/features/books/store/booksSlice';
// import readerReducer from '@/features/reader/store/readerSlice';

const rootReducer = combineReducers({
  // auth: authReducer,
  // books: booksReducer,
  // reader: readerReducer,
});

export default rootReducer;
