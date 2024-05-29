import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message);
});
