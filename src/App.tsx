import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import './App.css'
import FavoritesPage from './pages/favorites/FavoritesPage';
import HomePage from './pages/home/HomePage';

function App() {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  )
}

export default App;
