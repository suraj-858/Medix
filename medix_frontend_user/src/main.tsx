import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthProvider.tsx'
import store  from './redux/store.ts'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')!).render(

  <Provider store={store} >
      <BrowserRouter>
        <AuthProvider>
           <App />
        </AuthProvider>
      </BrowserRouter>
  </Provider>
  
) 
