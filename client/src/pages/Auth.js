import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userAPI';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import {observer} from 'mobx-react-lite';
import {Context} from '../index.js';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import beachVid from "../assets/beachVid.mp4";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [type, setType] = useState('password')


    const click = async () => {
        try {
            setType('password')
            let data;
            if (isLogin){
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
            alert('Activate your account')
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (

        <div className='w-full h-screen relative'>
            <video
                className='w-full h-full object-cover'
                src={beachVid}
                autoPlay
                loop
                muted
            />

            <div className='absolute w-full h-full top-0 left-0 bg-gray-900/30'></div>
            <div className='absolute top-0 w-full h-full flex flex-col justify-center text-center text-black p-4'>

        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto py-1" >{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="justify-content-end mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div className="text-start">
                                Нет акаунта? <NavLink style={{color: '#4169E1'}} to={REGISTRATION_ROUTE}>Зарегистрироваться!</NavLink>
                            </div>
                            :
                            <div className="text-start">
                                Уже есть акаунт? <NavLink style={{color: '#4169E1'}} to={LOGIN_ROUTE}>Войти!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                            style={{width: 150}}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>

            </div>

            </div>
    );
});

export default Auth;