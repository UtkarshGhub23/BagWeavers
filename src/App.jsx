import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { PreferencesProvider } from './context/PreferencesContext';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import Loader from './components/Loader';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import MobileBottomNav from './components/MobileBottomNav';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import OrderConfirmation from './pages/OrderConfirmation';
import AccountPage from './pages/AccountPage';
import LogoutPage from './pages/LogoutPage';
import WishlistPage from './pages/WishlistPage';
import SupportPage from './pages/SupportPage';

// Layout for main pages with Header/Footer
const MainLayout = () => {
  return (
    <>
      <Header />
      <MenuBar />
      <Outlet />
      <Footer />
      <WhatsAppFAB />
      <MobileBottomNav />
    </>
  );
};

export default function App() {
  // Intersection Observer for Scroll Reveal
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider>
      <PreferencesProvider>
        <Router basename="/">
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <Loader />
                <Routes>
                  {/* Main Layout Routes */}
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/contact" element={<SupportPage />} />
                    <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                  </Route>

                  {/* Auth Routes (Standalone) */}
                  <Route path="/auth/signin" element={<SignInPage />} />
                  <Route path="/auth/signup" element={<SignUpPage />} />
                  <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
                  <Route path="/auth/logout" element={<LogoutPage />} />
                </Routes>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </Router>
      </PreferencesProvider>
    </ThemeProvider>
  );
}
