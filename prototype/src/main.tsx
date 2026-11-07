import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/geist'
import { App } from './App'
import './styles.css'
import './revision.css'
import './timeline.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
import './rooms.css'
import './manage.css'
import './platform.css'
