import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import Home from './components/home/Home';
import PatientView from './components/patientView/PatientView';
import FavoritesQueriesView from './components/favoritesQueriesView/FavoritesQueriesView';
import ImageView from './components/imageView/ImageView';

const App = () => (
   //each route loads its components.
  <ThemeProvider theme={theme}>
    <CssBaseline />              
    <Router>                     
      <Routes>                   
        <Route path="/" element={<Home />} />
        <Route path="/patient/:imageId" element={<PatientView />} />
        <Route path="/favorites" element={<FavoritesQueriesView />} />
        <Route path="/imageView" element={<ImageView />} />
      </Routes>
    </Router>
  </ThemeProvider>
);

export default App;           //App is exported as the default component so it can be used in index.js, main.jsx.
