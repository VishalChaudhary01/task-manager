import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/auth.provider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { TaskProvider } from './context/task.provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Toaster position="bottom-right" richColors />
          <App />
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
