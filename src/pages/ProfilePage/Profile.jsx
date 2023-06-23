import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.scss'
import { BaseButton } from '../../components/Button/Button'
import { UserContext } from '../../context/userContext'


export const ProfilePage = ({ setModalActive }) => {

    const navigate = useNavigate();
    const user = useContext(UserContext);

    const logout = () => {
        localStorage.removeItem('token');
        setModalActive(true);
        navigate('/login');
    }

    return <div className='profile'> 
                <div className='userInfo'>
                    <div>
                        <h1>Информация о пользователе</h1>
                    </div>
                    <div>
                        <h2>Имя: {user.name}</h2>
                    </div>
                    <div>
                        <h2>Электронная почта: {user.email}</h2>
                    </div>
                    <div>
                        <h3>О себе: {user.about}</h3>
                    </div>
                </div>              
                <BaseButton onClick={logout} >Logout</BaseButton>                   
            </div>   
}