import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import '../index.scss'
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../utils/api";
import { BaseButton } from "../../Button/Button";
import { openNotification } from "../../Notification/Notification";


export const emailRegister = { required: 'Введите почту' }
export const passwordRegister = {
    required: {
        value: true,
        message: 'Введите пароль'
    },
    pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/,
        message: 'Пароль должен содержать минимум 7 символов, одну большую букву латинского алфавита и одну цифру'
    }
}


export const LoginForm = () => {

    const [type, setType] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
    const navigate = useNavigate();

    const sendData = async (data) => {
        try {
            const res = await api.signin(data);
            localStorage.setItem('token', res.token);
            navigate('/');
            openNotification("success", "Вы авторизировались");
        } catch (error) {
            openNotification("error", "Неправильный логин или пароль");
        }

    }


    return (
        <div className="content" >
            <h3>Вход в аккаунт</h3>
            <form className=" form-example" onSubmit={handleSubmit(sendData)}>
                <div>
                    <input className="form__input" type="text" {...register("email", { ...emailRegister })} placeholder="email" />
                    {errors?.email && <span> {errors?.email.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" type={!type ? 'password' : 'text'} {...register("password", { ...passwordRegister })} placeholder="password" />
                    <span onClick={() => setType(!type)} className={`form__pass__icon`}></span>
                    {errors?.password && <span> {errors?.password.message}</span>}
                </div>
                <div className="auth__links">
                    <Link className="auth__link" to={'/register'}>Регистрация</Link>
                    <Link className="auth__link" to={'/reset-pass'}>Забыли пароль?</Link>
                </div>
                <BaseButton type="submit">Войти</BaseButton>
            </form>
        </div>
    )
}
