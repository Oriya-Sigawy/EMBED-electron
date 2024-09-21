import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import Home from './components/home/Home';
import PatientView from './components/patientView/PatientView';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient/:patientId" element={<PatientView />} />
      </Routes>
    </Router>
  </ThemeProvider>
);

export default App;
