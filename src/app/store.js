import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/User/UserSlice';
import feedbacksReducer from '../features/feedbacks/FeedbackSlice';
;

export const store = configureStore({
  reducer: {
    user: userReducer,
    feedbacks: feedbacksReducer
  },
});
