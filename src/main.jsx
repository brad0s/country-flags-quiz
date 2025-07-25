import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'dotenv/config';
import './utils/firebase'; // Ensure Firebase is initialized
import { GameContextProvider } from './context/GameContext';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </React.StrictMode>
);
