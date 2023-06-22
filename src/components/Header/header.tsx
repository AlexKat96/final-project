import React from 'react';
import { Link } from 'react-router-dom'
import css from "./header.module.css"
import { useAppSelector } from 'src/hook';
import { HOST } from "../../API"
import { useState } from 'react';
import { addAutorizeUser } from 'src/storage/autorizeUserSlice';
import { useAppDispatch } from 'src/hook';

interface EventFiltersInfo {
    usedCompanyCount: number;
    companyLimit: number;
}

const Header: React.FC = () => {

    const [infoUser, setInfoUser] = useState<EventFiltersInfo>();

    const [needUpdate, setNeedUpdate] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const redux = useAppSelector((state: { todos: any; }) => state.todos)
    const dispatch = useAppDispatch();

    const loginIn = () => {
        
        try {
            const options = {
                
                method: 'GET',
                contentType: 'application/json',
                headers: {
                    'Authorization': "Bearer " + redux.token
                }
            }
            
            fetch(HOST + '/account/info', options)
                .then(response => {
                    if (!response.ok) {
                        
                        throw new Error('Error occurred!')

                    }
                    return response.json()
                })
                .then(json => {
                    var infoUser1: EventFiltersInfo = json.eventFiltersInfo;
                    setInfoUser(infoUser1)
                    dispatch(addAutorizeUser(true))
                }

                ).catch((err) => {
                    console.log(err, options, "error")
                    localStorage.clear();
                    dispatch(addAutorizeUser(false))
                })

        } catch {
            console.log("fatal_error")
            localStorage.clear();
            dispatch(addAutorizeUser(false))
        }
    }
    
    if (needUpdate) {
        if (redux.completed) {
            setIsLoading(true)
            loginIn()
            
            const a = function (): void {

                setIsLoading(false)

            }

            setTimeout(a, 3000);
            
            setNeedUpdate(false)
        }

    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  
        localStorage.clear();
        const a = function (): void {

            window.location.reload();

        }

        setTimeout(a, 500);
        
    }

    return (
        <header className={css.header}>
            <div className={css.header_content}>
                <Link to={`/`} >
                    <div className={css.scan}></div>
                </Link>
                <div className={css.menu}>
                    <Link to={`/`} >
                        <button className={css.menu_item_l}>Главная</button>
                    </Link>
                    <button className={css.menu_item}>Тарифы</button>
                    <button className={css.menu_item}>FAQ</button>
                </div>

                <LoadStat />
                <Profil />

            </div>
        </header>
    );

    function LoadStat() {
        if (isLoading) {
            return (
                <div className={css.loader}>
                </div>
            )
        } else if (isLoading === false && needUpdate === false) {
            return (
                <div className={css.infoBlockMargin}>
                    <div className={css.flex}>
                        <p className={css.textUser}>Использовано компаний</p>
                        <p className={css.textNumber}>{infoUser?.companyLimit}</p>
                    </div>
                    <div className={css.flexlimitComponent}>
                        <p className={css.textUser}>Лимит по компаниям</p>
                        <p className={css.textNumberGreen}>{infoUser?.usedCompanyCount}</p>
                    </div>
                </div>
            )
        }
        return (
            <div className={css.NLoader}>
            </div>
        )
    }
    function Profil() {
        if (isLoading === false && needUpdate === false) {
            return (
                <div className={css.flex}>
                    <div className={css.blockProfil}>
                        <p className={css.userTextProfil}>User</p>
                        <Link to={`/`} >
                            <button className={css.button_exit} type={"button"} onClick={ (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleClick(e) }>Выйти</button>
                        </Link>
                    </div>
                    <div className={css.userIcon}></div>
                </div>
            )
        } else {
            return (
                <div className={css.loginOrRegistrate}>
                    <div className={css.registate}>Зарегистрироваться</div>
                    <div className={css.line}></div>
                    <Link to={`/login`} >
                        <button className={css.button_login}>Войти</button>
                    </Link>
                </div>
            )
        }
    }
}

export default Header;