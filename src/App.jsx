import React, { useCallback, useEffect, useState } from "react";
import "./App.scss";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { api } from "./utils/api";
import { useDebounce } from "./hooks/hooks";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { ProfilePage } from "./pages/ProfilePage/Profile";
import { FAQ } from "./pages/FAQ/FAQ";
import { Navigate, Route, Routes } from "react-router-dom";
import { filteredCards } from "./utils/utils";
import { FavoritesPage } from "./pages/FavoritesPage/FavoritesPage";
import { UserContext } from './context/userContext'
import { CardsContext } from "./context/cardContext";
import { ThemeContext } from "./context/themeContext";
import { findLiked } from "./utils/utils";
import { CHEAPEST, EXPENSIVE, NEWEST, POPULAR, RATE, SALE } from "./constants/constants";
import { Modal } from "./components/Modal/Modal";
import { AntdPage } from "./pages/AntdPage/AntdPage";
import { LoginForm } from "./components/Auth/Login/Login";
import { RegisterForm } from "./components/Auth/Register/Register";
import { ResetPass } from "./components/Auth/ResetPass/ResetPass";


function App() {

  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [user, setUser] = React.useState({});
  const [isAuthorized, setAuth] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [theme, setTheme] = useState(true);
  const [modalActive, setModalActive] = useState(false);

  const debounceValueInApp = useDebounce(search);

  const handleProductLike = useCallback(async (product, wasLiked) => {
    const updatedCard = await api.changeProductLike(product._id, wasLiked);
    setCards(s => [...s.map(e => e._id === updatedCard?._id ? updatedCard : e)]);

    wasLiked ?
      setFavorites((state) => state.filter(f => f._id !== updatedCard._id))
      :
      setFavorites((state) => [updatedCard, ...state])

    return wasLiked;
  }, [])

  const productRating = (reviews) => {
    if (!reviews || !reviews.length) {
      return 0;
    }
    const res = reviews.reduce((acc, el) => acc += el.rating, 0);
    return res / reviews.length
  }

  const onSort = (sortId) => {
    switch (sortId) {
      case CHEAPEST:
        return setCards((state) => [...state.sort((a, b) => a.price - b.price)])
      case EXPENSIVE:
        return setCards((state) => [...state.sort((a, b) => b.price - a.price)])
      case POPULAR:
        return setCards((state) => [...state.sort((a, b) => b.likes.length - a.likes.length)])
      case NEWEST:
        return setCards((state) => [...state.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))])
      case SALE:
        return setCards((state) => [...state.sort((a, b) => b.discount - a.discount)])
      case RATE:
        return setCards((state) => [...state.sort((a, b) => productRating(b.reviews) - productRating(a.reviews))])
      default:
        return setCards((state) => [...state.sort((a, b) => a.price - b.price)])
    }
  }

  try {
    useEffect(() => {
      if (debounceValueInApp === undefined) return;
      api.searchProducts(debounceValueInApp)
        .then((data) => setCards(filteredCards(data)))
    }, [debounceValueInApp]);
  } catch (error) {
    console.log(error);
  }

  try {
    useEffect(() => {
      Promise.all([api.getUserInfo(), api.getProductList()]).then(([userData, data]) => {
        setUser(userData);
        const filtered = filteredCards(data.products)
        setCards(filtered);
        const fav = filtered.filter(e => findLiked(e, userData._id));
        setFavorites(fav);
      });
    }, []);
  } catch (error) {
    console.log(error);
  }
  
  const cardsValue = {
    handleLike: handleProductLike,
    cards: cards,
    search,
    favorites,
    onSort,
    setModalActive,
    productRating,
    user
  }

  const authRoutes = <>
  <Route path="/register" element={
    <Modal modalActive={modalActive} setModalActive={setModalActive} >
      <RegisterForm />
    </Modal>
  } />
  <Route path="/login" element={
    <Modal modalActive={modalActive} setModalActive={setModalActive} >
      <LoginForm />
    </Modal>
  } />
    <Route path="/reset-pass" element={
    <Modal modalActive={modalActive} setModalActive={setModalActive} >
      <ResetPass />
    </Modal>
  } />
</>

try{
  useEffect(()=>{
    if (localStorage.getItem('token')) {
      setAuth(true);
    }
  },[]);
} catch (error) {
  console.log(error);
}


  return (

    <div className={`app__${theme ? 'light' : 'dark'} `}>
      <ThemeContext.Provider value={theme}>
        <CardsContext.Provider value={cardsValue}>
          <UserContext.Provider value={user}>
            <Header setSearch={setSearch} favorites={favorites}>
            </Header>
            <button onClick={() => setTheme(!theme)}>Darkmode</button>

            <main className="container content ">
              {isAuthorized ?
                <Routes>
                  <Route path="/" element={<CatalogPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/product/:id" element={<ProductPage />} >
                  </Route>
                  <Route path="/profile" element={<ProfilePage setModalActive={setModalActive} />} />
                  {authRoutes}
                  <Route path="/stylebook" element={<AntdPage />} />
                  <Route path="/FAQ" element={<FAQ />} />
                  <Route path="*" element={<div>NOT FOUND 404</div>} />
                </Routes>
                :
                <Navigate to={'/not-found'} />
              }
            </main>            
            <Footer />
          </UserContext.Provider>
        </CardsContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}


export default App;
