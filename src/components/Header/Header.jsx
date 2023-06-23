import React, { useContext } from 'react'
import './index.css';
import { Search } from '../Search/Search';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { ReactComponent as Like } from '../Card/img/like.svg';
import { ReactComponent as Profile } from './img/profile.svg';
import { CardsContext } from '../../context/cardContext';
import logoDF from './img/logo.svg';


export const Header = (props) => {

    const setSearchQuery = (path) => {
        props.setSearch(path);
    }

    const location = useLocation();

    const { favorites, setModalActive, user } = useContext(CardsContext);


    return <div className="header">
        <div className='container'>
            <div className='header__wrapper'>
                <Link to={'/'}>
                    <img src={logoDF} alt='logo' className='logo-pic' />
                </Link>
                {location.pathname === '/' && <Search setSearch={setSearchQuery} />}
                <div className='header__icons'>
                    <Link className='header__fav' to={'/favorites'}>
                        <Like className='header__like' />
                        {!!favorites.length && <span className='header__bubble'>{favorites.length}</span>}
                    </Link>                           
                    <Link to={"/profile"}>
                        <div><span>{user.name}</span></div> 
                    </Link>
                    <Link to={'/login'} onClick={()=>setModalActive(true)}>
                        <Profile  className='header__icon' />
                    </Link>
                </div>
            </div>
        </div>
    </div>
}
