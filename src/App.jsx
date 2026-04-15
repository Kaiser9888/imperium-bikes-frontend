import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import MyListings from './pages/MyListings';
import CreateListing from './pages/CreateListing';
import Favorites from './pages/Favorites';
import Chat from './pages/Chat';
import Videos from './pages/Videos';
import Forum from './pages/Forum';
import SocialFeed from './pages/SocialFeed';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import './styles/theme.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/anuncio/:id" element={<ProductDetail />} />
        <Route path="/anuncios" element={<Home />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/meus-anuncios" element={<MyListings />} />
        <Route path="/criar-anuncio" element={<CreateListing />} />
        <Route path="/editar-anuncio/:id" element={<CreateListing />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/social-feed" element={<SocialFeed />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout-sucesso" element={<CheckoutSuccess />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
