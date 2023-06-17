
import './App.css'
import Header from './components/Header/Header'
import {Provider} from 'react-redux'
import { store } from './app/store'

function App() {


  return (
    <Provider store={store}>
     <main className='main-container'>
     <Header/>
     </main>
    </Provider>
  )
}

export default App
