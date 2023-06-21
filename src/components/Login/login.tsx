import React from 'react';
import { useState } from 'react';
import css from "./login.module.css"
import { useAppDispatch } from 'src/hook';
import { addTodo, } from 'src/storage/todoSlice';
import { HOST } from "../../API"
import { useNavigate } from "react-router-dom";



const Login: React.FC = () => {
    const [autorize, setAutorize] = useState(false)
    const [loginBoolen, setLoginBoolen] = useState(false)
    const [passwordBoolen, setPasswordBoolen] = useState(false)
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    const onChangeLogin = (e: React.FormEvent<HTMLInputElement>) => {

        var a: boolean
        if (e.currentTarget.value.startsWith("+")) {
            var patt = new RegExp(
                '^' +                           
                '[-+]?' +                       
                '(?:[0-9]{0,30}\\.)?' +         
                '[0-9]{1,30}' +                 
                '(?:[Ee][-+]?[1-2]?[0-9])?' +   
                '$'                             
            )
            a = patt.test(e.currentTarget.value)
            setLoginBoolen(a)
            if (a) {
                setLogin(e.currentTarget.value)
            }
        } else if (e.currentTarget.value === "") {
            setLoginBoolen(false)
        } else {
            setLoginBoolen(true)
            setLogin(e.currentTarget.value)
        }

    }
    const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {

        if (e.currentTarget.value === "") {
            setPasswordBoolen(false)
        } else {
            setPasswordBoolen(true)
            setPassword(e.currentTarget.value)
        }
    }

    const onClick = () => {
        if (loginBoolen !== false && passwordBoolen !== false) {
            postGetToken()
        }
    }

    var postGetToken = async function () {

        try {
            const options = {
                
                method: 'POST',
                
                body: JSON.stringify({
                    login: login,
                    password: password

                }),
                
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
            
            await fetch(HOST + '/account/login', options)
                .then(response => {
                    if (!response.ok) {
                    
                        throw new Error('Error occurred!')

                    }
                    return response.json()
                })
                .then(json => {
                    var localToken: string = json.accessToken;
                    console.log("Token--", localToken)
                    dispatch(addTodo(localToken));
                    localStorage.setItem('token', localToken);
                    setAutorize(true)
                    navigate('/search')
                }

                ).catch((err) => {
                    setPasswordBoolen(false)
                    setLoginBoolen(false)
                    setPassword("")
                    setLogin("")
                    console.log(err, "error")

                })

        } catch {
            setPasswordBoolen(false)
            setLoginBoolen(false)
            setPassword("")
            setLogin("")
            console.log("fatal_error")
        }

    }

    return (
        <div>
            <div className={css.flex_block_container} style={{marginBottom: "90px"}}>
                <div className={css.marginLog}>
                    <h1 className={css.h1Text}>Для оформления подписки <br /> на тариф, необходимо <br /> авторизоваться.</h1>
                    <div className={css.picCharacters}></div>
                </div>
                <div>
                    <div className={css.picLock}></div>

                    <div className={css.loginBlock}>
                        <div className={css.loginMenu} style={{marginTop: "-90px"}}>
                            <div className={css.flex_block}>
                                <div>
                                    <h4 className={css.logInText}>
                                        Войти
                                    </h4>
                                    <div className={css.loginLine}>

                                    </div>
                                </div>
                                <div className={css.loginMenu}>
                                    <h4 className={css.registrMenuText}>
                                        Зарегистрироваться
                                    </h4>
                                    <div className={css.registrLine}>

                                    </div>
                                </div>

                            </div>
                            <p className={css.textLoginBox} style={{ marginTop: "40px" }}>Логин или номер телефона:</p>

                            <input type="text" className={loginBoolen ? css.input : css.inputErr} onChange={onChangeLogin} />

                            {loginBoolen ? null : (<p className={css.textErr}>Введите корректные данные</p>)}

                            <p className={css.textLoginBox} style={{ marginTop: "40px" }}>Пароль:</p>
                            <input type="password" className={passwordBoolen ? css.input : css.inputErr} onChange={onChangePassword} />

                            {passwordBoolen ? null : (<p className={css.textErr}>Неправильный пароль</p>)}


                            {loginBoolen ? (passwordBoolen ? <button className={css.buttonLogInValidTrue} onClick={onClick} style={{ marginTop: "40px" }}>Войти</button>
                                : <button className={css.buttonLogIn} style={{ marginTop: "40px" }}>Войти</button>) : <button className={css.buttonLogIn} style={{ marginTop: "40px" }} >Войти</button>
                            }

                            <button className={css.backupPassword} >Восстановить пароль</button>
                            <p className={css.textLoginBox} >Войти через:</p>
                            <div className={css.flex_block} style={{justifyContent: "space-around", marginRight: "15px", marginLeft: "-20px"}}>
                                <div className={css.blockAlterLog}>
                                    <a className={css.linkLogin}>
                                        <div className={css.picGoogle}></div>
                                    </a>
                                </div>
                                <div className={css.blockAlterLog}>
                                    <a className={css.linkLogin}>
                                        <div className={css.picFaceBook}></div>
                                    </a>
                                </div>
                                <div className={css.blockAlterLog}>
                                    <a className={css.linkLogin}>
                                        <div className={css.picYandex}></div>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}



export default Login;