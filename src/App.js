import React from 'react';

import './App.css';
import Feedbacks from './components/feedback/feedbacks/feedbacks';
import FeedbackDetails from './components/feedback/FeedbackDetails/FeedbackDetails';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Roadmap from './components/roadmap/Roadmap';
import EditFeedback from './components/feedback/editFeedback/EditFeedback';
import AddFeedback from './components/feedback/addFeedback/AddFeedback';
import Planned from './components/roadmap/statuses/planned/Planned';
import InProgress from './components/roadmap/statuses/inProgress/InProgress';
import Live from './components/roadmap/statuses/live/Live';
import Suggestion from './components/roadmap/statuses/suggestion/Suggestion';




const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path='/' element={<Feedbacks />} />
    <Route path='/feedback-details/:id' element={<FeedbackDetails />} />
    <Route path='/add-feedback' element={<AddFeedback />} />
    <Route path='/edit-feedback/:id' element={<EditFeedback />} />
    <Route path='/roadmap' element={<Roadmap />} >
      <Route path='suggestion' element={<Suggestion />} />
      <Route path='planned' element={<Planned />} />
      <Route path='' element={<Planned />} />
      <Route path='in-progress' element={<InProgress />} />
      <Route path='live' element={<Live />} />
    </Route>
  </Route>
));

function App() {


  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
