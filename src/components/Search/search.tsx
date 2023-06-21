import React from 'react';
import css from "./search.module.css"
import axios from 'axios';
import { useState } from 'react';
import { useAppSelector } from 'src/hook';
import { HOST } from "../../API"
import { Histograms } from "../../data/Histogram"
import { data } from "../../data/HistogramDate"
import { useNavigate } from "react-router-dom";
import histogramDateInput from "../../mock/HistogramData.json"

interface SearchProps {
    setJson: any
}

const Search: React.FC<SearchProps> = ({ setJson }) => {

    const [INNBoolen, setINNBoolen] = useState(false)
    const [INN, setINN] = useState(0)
    const navigate = useNavigate();
    const [DateStart, setDateStart] = useState("")
    const [DateEnd, setDateEnd] = useState("")
    const [Tonal, setTonal] = useState("any")
    const [DocumentSumBoolen, setDocumentSumBoolen] = useState(false)
    const [DocumentSum, setDocumentSum] = useState(0)
    const redux = useAppSelector((state: { todos: any; }) => state.todos)
    const timeNow: string = "2023-06-21"

    const onChangeINN = (e: React.FormEvent<HTMLInputElement>) => {

        if (e.currentTarget.value === "") {
            setINNBoolen(false)

        } else {
            if (!/^(0|[1-9]\d*)$/.test(e.currentTarget.value)) {
                setINNBoolen(false)
            } else {
                setINNBoolen(true)
                setINN(parseInt(e.currentTarget.value))
            }

        }

    }

    const onChangeDocumentSum = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === "") {
            setDocumentSumBoolen(false)
        } else {
            if (!/^(0|[1-9]\d*)$/.test(e.currentTarget.value)) {
                setDocumentSumBoolen(false)
            } else {
                setDocumentSumBoolen(true)
                setDocumentSum(parseInt(e.currentTarget.value))
            }
        }
    }

    const onChangeDateStart = (e: React.FormEvent<HTMLInputElement>) => {
        setDateStart(e.currentTarget.value)
    }
    const onChangeDateEnd = (e: React.FormEvent<HTMLInputElement>) => {
        setDateEnd(e.currentTarget.value)
    }

    const searchButtom = () => {

        var select = (document.getElementById('selectvalue')) as HTMLSelectElement;
        if (select != null) {
            var sel = select.selectedIndex;
            if (sel === 0) {
                setTonal("positive")
            }
            if (sel === 1) {
                setTonal("negative")
            }
            if (sel === 2) {
                setTonal("any")
            }
        }
        var maxFullness: boolean = false;
        var onlyMainRole: boolean = false;
        var onlyWithRiskFactors: boolean = false;
        var excludeTechNews: boolean = false;
        var excludeAnnouncements: boolean = false;
        var excludeDigests: boolean = false;

        var checkbox = document.getElementById(
            'scales1',
        ) as HTMLInputElement | null;

        if (checkbox != null) {
            maxFullness = checkbox.checked
        }

        var checkbox = document.getElementById(
            'scales2',
        ) as HTMLInputElement | null;

        if (checkbox != null) {
            onlyMainRole = checkbox.checked
        }

        var checkbox = document.getElementById(
            'scales3',
        ) as HTMLInputElement | null;

        if (checkbox != null) {
            onlyWithRiskFactors = checkbox.checked
        }

        var checkbox = document.getElementById(
            'scales4',
        ) as HTMLInputElement | null;

        if (checkbox != null) {
            excludeTechNews = checkbox.checked
        }

        var checkbox = document.getElementById(
            'scales5',
        ) as HTMLInputElement | null;

        if (checkbox != null) {
            excludeAnnouncements = checkbox.checked
        }

        var checkbox = document.getElementById(
            'scales6',
        ) as HTMLInputElement | null;

        if (checkbox != null) {
            excludeDigests = checkbox.checked
        }

        let histogram: Histograms = {
            issueDateInterval: {
                startDate: DateStart,
                endDate: DateEnd
            },
            searchContext:
            {
                targetSearchEntitiesContext: {
                    targetSearchEntities: [
                        {
                            type: "company",
                            inn: INN,
                            maxFullness: maxFullness
                        }
                    ],
                    onlyMainRole: onlyMainRole,
                    tonality: Tonal,
                    onlyWithRiskFactors: onlyWithRiskFactors
                }
            },
            attributeFilters: {
                excludeTechNews: excludeTechNews,
                excludeAnnouncements: excludeAnnouncements,
                excludeDigests: excludeDigests
            },
            similarMode: "duplicates",
            limit: DocumentSum,
            sortType: "sourceInfluence",
            sortDirectionType: "desc",
            intervalType: "month",
            histogramTypes: [
                "totalDocuments",
                "riskFactors"
            ]
        }
        getHistogramAxio(histogram)
    }

    return (
        <div className={css.block} >
            <div className={css.flex}>
                <div className={css.textContainer}>
                    <h1 className={css.h1_title}>Найдите необходимые данные в пару кликов.</h1>
                    <p className={css.p_text}>Задайте параметры поиска.
                        Чем больше заполните, тем точнее поиск</p>
                </div>
                <div className={css.flex}>
                    <div className={css.dockPickter}></div>
                    <div className={css.DoubleDockPickter}></div>
                </div>
            </div>
            <div className={css.flex}>

                <section className={css.sectionBlock}>
                    <div className={css.sectionBlock_margin}>
                        <div className={css.sectionBlock_leftBlock}>
                            <p className={css.p_text} >ИНН компании *</p>
                            <input className={INNBoolen ? css.input : css.inputError} onChange={onChangeINN} placeholder="10 цифр"></input>
                            <p className={css.p_text}>Тональность</p>

                            <select id="selectvalue" className={`${css.input}  ${css.p_text}`} >
                                <option className={`${css.input}  ${css.p_text}`}>любая</option>
                                <option className={`${css.input}  ${css.p_text}`} >позитивная</option>
                                <option className={`${css.input}  ${css.p_text}`}>негативная</option>
                            </select>


                            <p className={css.p_text}>Количество документов в выдаче *</p>
                            <input className={DocumentSumBoolen ? css.input : css.inputError} onChange={onChangeDocumentSum} placeholder="от 1 до 1000"></input>

                            <p className={`${css.p_text}  ${css.dateMarginTop}`}>Диапазон поиска *</p>
                            <div className={css.flexDate}>
                                <input className={`${css.input}  ${css.p_text}`} type="date" max={timeNow} onChange={onChangeDateStart} />
                                <input className={`${css.input} ${css.marginInput} ${css.p_text}`} type="date" max={timeNow}
                                    onChange={onChangeDateEnd}
                                />
                            </div>
                        </div>
                        <div className={css.sectionRightContainer}>
                            <div className={css.sectionBlock_marginRightBlock}>
                                <div className={`${css.marginChekbox} ${css.whideCheckbox}`}>
                                    <label className={`${css.marginChekbox} ${css.p_text}`}>
                                        <input type="checkbox" id="scales1" name="scales" className={css.chekbox} />
                                        Признак максимальной полноты
                                    </label>
                                </div>
                                <div className={`${css.marginChekbox} ${css.whideCheckbox}`}>
                                    <label className={`${css.marginChekbox} ${css.p_text}`}>
                                        <input type="checkbox" id="scales2" name="scales" className={css.chekbox} />
                                        Упоминания в бизнес-контексте
                                    </label>
                                </div>
                                <div className={`${css.marginChekbox} ${css.whideCheckbox}`}>
                                    <label className={`${css.marginChekbox} ${css.p_text}`}>
                                        <input type="checkbox" id="scales7" name="scales" className={css.chekbox} />
                                        Главная роль в публикации
                                    </label>
                                </div>
                                <div className={`${css.marginChekbox} ${css.whideCheckbox}`}>
                                    <label className={`${css.marginChekbox} ${css.p_text}`}>
                                        <input type="checkbox" id="scales3" name="scales" className={css.chekbox} />
                                        Публикации только с риск-факторами
                                    </label>
                                </div>
                                <div className={`${css.marginChekbox} ${css.whideCheckbox}`}>
                                    <label className={`${css.marginChekbox} ${css.p_text}`}>
                                        <input type="checkbox" id="scales4" name="scales" className={css.chekbox} />
                                        Включать технические новости рынков
                                    </label>
                                </div>
                                <div className={`${css.marginChekbox} ${css.whideCheckbox}`}>
                                    <label className={`${css.marginChekbox} ${css.p_text}`}>
                                        <input type="checkbox" id="scales5" name="scales" className={css.chekbox} />
                                        Включать анонсы и календари
                                    </label>
                                </div>
                                <div className={`${css.marginChekbox} ${css.whideCheckbox}`}>
                                    <label className={`${css.marginChekbox} ${css.p_text}`}>
                                        <input type="checkbox" id="scales6" name="scales" className={css.chekbox} />
                                        Включать сводки новостей
                                    </label>
                                </div>
                              
                            </div>

                            <Button />

                            <p className={css.required_text}>* Обязательные к заполнению поля</p>
                        </div>
                    </div>
                </section>
                <div className={css.rocketPic}></div>
            </div>

        </div >
    );
    function Button() {

        if (INN && DocumentSum && DateStart && DateEnd) {
            return (
                <button className={css.buttonLogInTrue} onClick={searchButtom}>Поиск</button>
            )
        } else
            return (
                <button className={css.buttonLogIn}>Поиск</button>
            )
    }

    async function getHistogram(histogram: Histograms) {
        var jsonR: string = ""
        try {
            const options = {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json', 'charset': 'utf-8',
                    'Authorization': "Bearer " + redux.token
                },
                body: JSON.stringify({
                    intervalType: histogram.intervalType,
                    histogramTypes: histogram.histogramTypes,
                    issueDateInterval: histogram.issueDateInterval,
                    searchContext: histogram.searchContext,
                    similarMode: histogram.similarMode,
                    limit: histogram.limit,
                    sortType: histogram.sortType,
                    sortDirectionType: histogram.sortDirectionType,
                    attributeFilters: histogram.attributeFilters
                })

            }

            await fetch(HOST + '/objectsearch/histograms', options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error occurred!')
                    }
                    return response.json() as Promise<data[]>
                })
                .then(json => {
                    console.log(json[0])
                    var a: data[] = json as data[]
                    setJson(a)
                    navigate("/search/scan")
                }

                ).catch((err) => {
                    console.log(err, "error")
                })

        } catch {
            console.log("fatal_error")
        }

    }

    function getHistogramAxio(histogram: Histograms) {

        axios.create({
            baseURL: HOST,
            timeout: 1000,
            headers: { 'Authorization': 'Bearer ' + redux.token }
        });

        const config = {
            headers: { Authorization: `Bearer ${redux.token}` }
        };

        const bodyParameters = {

            intervalType: histogram.intervalType,
            histogramTypes: histogram.histogramTypes,
            issueDateInterval: histogram.issueDateInterval,
            searchContext: histogram.searchContext,
            similarMode: histogram.similarMode,
            limit: histogram.limit,
            sortType: histogram.sortType,
            sortDirectionType: histogram.sortDirectionType,
            attributeFilters: histogram.attributeFilters
        };

        axios.post(HOST + '/objectsearch/histograms',
            bodyParameters,
            config
        )
            .then(response => {
                var inputdate: data[] = response.data.data
                setJson(inputdate)
                navigate("/search/scan")
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }

}

export default Search;