import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import background from "./assets/bg.jpg";
import { BrowserRouter } from 'react-router-dom';

document.body.style.backgroundImage = `url(${background})`;
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>

      <App />
    </BrowserRouter>

  </StrictMode>,
)
