import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FavoritesPage from './pages/favorites/FavoritesPage';
import HomePage from './pages/home/HomePage';
import PreloaderSpinner from './ui/preloaderSpinner/PreloaderSpinner';
import { LoadingProvider } from './contexts/LoadingContext';
import './App.css'
import LoginPage from './pages/login/LoginPage';
import SignUpPage from './pages/signup/SignUpPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LoadingProvider>
          <PreloaderSpinner />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/favorites" element={<FavoritesPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </LoadingProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
