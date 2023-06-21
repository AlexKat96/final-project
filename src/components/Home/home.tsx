import React from 'react';
import css from "./home.module.css"
import { Link } from 'react-router-dom'
import Slider from "../Slider/slider"
import { useAppSelector } from 'src/hook';



function Home() {

    var autorize = useAppSelector((state: { autorize: any; }) => state.autorize)

    return (
        <div className={css.main_block}>
            <section className={css.flex_block}>
                <div className={css.flex_text_block}>
                    <h1 className={css.capital_h1_text}>сервис по поиску <br /> публикаций <br /> о компании <br /> по его ИНН</h1>
                    <p className={css.text_p_search_info}>Комплексный анализ публикаций, получение данных <br /> в формате PDF на электронную почту.</p>

                    <Demo />

                </div>
                <div className={css.backround_img}>
                </div>
            </section>

            <section className={css.flex_block_corusel}>
                <h2 className={css.capital_h2_text} >Почему именно мы</h2>
                <div>
                    <Slider />
                </div>
            </section>

            <section>
                <div className={css.centr_pic} style={{ marginBottom: "107px", marginTop: "70px" }} >
                    <div className={css.bigPic}></div>
                </div>
            </section>

            <section className={css.flex_block_corusel} style={{ marginBottom: "118px" }}>
                <h2 className={css.capital_h2_text}> наши тарифы</h2>
                <div className={css.centrBlock}>
                    <div className={css.centr_pic}>
                        <div className={css.tarifBlockBeginner}>
                            <div className={css.yellowBlock}>
                                <div className={css.margTarifBlock}>
                                    <div className={css.flex}>
                                        <div>
                                            <h1 className={css.tarifBig}>Beginner</h1>
                                            <p className={css.textTarif} style={{ marginTop: "18px" }}>Для небольшого исследования</p>
                                        </div>
                                        <div className={css.picLamp}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={css.paddingTarif}>
                                <div className={css.flex}>
                                    <h3 className={css.cost}>799 ₽</h3>
                                    <h3 className={css.oldCost}>1 200 ₽</h3>
                                    <div className={css.tarif}>
                                        <p className={css.tarifText}>Текущий тариф</p>
                                    </div>
                                </div>
                                <p className={css.textTarif} >или 150 ₽/мес. при рассрочке на 24 мес.</p>
                                <h3 className={css.tarifHead}>В тариф входит:</h3>
                                <div className={css.flex}>
                                    <div className={css.picTarifGreen}></div>
                                    <p className={css.tarifLi} >Безлимитная история запросов</p>
                                </div>

                                <div className={css.flex}>
                                    <div className={css.picTarifGreen}></div>
                                    <p className={css.tarifLi} >Безопасная сделка</p>
                                </div>

                                <div className={css.flex}>
                                    <div className={css.picTarifGreen}></div>
                                    <p className={css.tarifLi} >Поддержка 24/7</p>
                                </div>
                                <Link to={`/login`} >
                                    <button className={css.buttonTarif} >Перейти в личный кабинет</button>
                                </Link>
                            </div>
                        </div>
                        <div className={css.tarifBlock}>
                            <div className={css.blue}>
                                <div className={css.margTarifBlock}>
                                    <div className={css.flex}>
                                        <div>
                                            <h1 className={css.tarifBig}>Pro</h1>
                                            <p className={css.textTarif} style={{ marginTop: "18px" }}>Для HR и фрилансеров</p>
                                        </div>
                                        <div className={css.picPro}>
                                        </div>


                                    </div>
                                </div>
                            </div>

                            <div className={css.paddingTarif}>
                                <div className={css.flex}>
                                    <h3 className={css.cost}>1299 ₽</h3>
                                    <h3 className={css.oldCost}>2 600 ₽</h3>
                                </div>
                                <p className={css.textTarif} >или 279 ₽/мес. при рассрочке на 24 мес.</p>
                                <h3 className={css.tarifHead}>В тариф входит:</h3>
                                <div className={css.flex}>
                                    <div className={css.picTarifGreen}></div>
                                    <p className={css.tarifLi} >Все пункты тарифа Beginner</p>
                                </div>

                                <div className={css.flex}>
                                    <div className={css.picTarifGreen}></div>
                                    <p className={css.tarifLi} >Экспорт истории</p>
                                </div>

                                <div className={css.flex}>
                                    <div className={css.picTarifGreen}></div>
                                    <p className={css.tarifLi} >Рекомендации по приоритетам</p>
                                </div>

                                <button className={css.buttonTarifNoReg}>Подробнее</button>
                            </div>

                        </div>

                        <div className={css.tarifBlock}>
                            <div className={css.black}>
                                <div className={css.margTarifBlock}>
                                    <div className={css.flex}>
                                        <div>
                                            <h1 className={css.tarifBigBlack}>Business</h1>
                                            <p className={css.smallTarifBlack} >Для корпоративных клиентов</p>
                                        </div>
                                        <div className={css.picBusiness}>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className={css.paddingTarif}>
                                <div className={css.flex}>
                                    <h3 className={css.cost}>2 379 ₽</h3>
                                    <h3 className={css.oldCost}>3 700 ₽</h3>
                                </div>
                                
                                <h3 className={css.tarifHead}>В тариф входит:</h3>
                                <div className={css.flex}>
                                    <div className={css.picTarifGreen}></div>
                                    <p className={css.tarifLi} >Все пункты тарифа Pro</p>
                                </div>

                                <div className={css.flex}>
                                    <div className={css.picTarifGreen}></div>
                                    <p className={css.tarifLi} >Безлимитное количество запросов</p>
                                </div>

                                <div className={css.flex}>
                                    <div className={css.picTarifGreen}></div>
                                    <p className={css.tarifLi} >Приоритетная поддержка</p>
                                </div>

                                <button className={css.buttonTarifNoReg}>Подробнее</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

    function Demo() {


        var autorizeBoolem = useAppSelector((state: any) => autorize.user)

        if (autorizeBoolem) {

            return (
                <Link to={`/search`} >
                    <button className={css.button_get_date}>Запросить данные</button>
                </Link>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default Home;