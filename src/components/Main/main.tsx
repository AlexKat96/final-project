import React from 'react';
import css from "./main.module.css"
import Home from "../Home/home"
import Login from "../Login/login"
import { useAppDispatch } from 'src/hook';
import { addTodo, } from 'src/storage/todoSlice';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from 'src/hook';
import PrivateRoute from '../SearchRoute/searchRoute';
import SearchScanRoute from '../SearchScanRoute/searchScanRoute';
import { data } from "../../data/HistogramDate"
import { useState } from 'react';

function Main() {
    var autorize = useAppSelector((state: { autorize: any; }) => state.autorize)
    const [Json, setJson] = useState<data[]>()
    const dispatch = useAppDispatch();
    var a = localStorage.getItem('token')
    if (a !== null) {
        
        dispatch(addTodo(a));
    }

    return (
        <main className={css.main}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<PrivateRoute autorize={autorize.user} setJson={setJson} />} />
                <Route path="/search/scan" element={<SearchScanRoute autorize={autorize.user} Json={Json!} />} />
            </Routes>

        </main>
    );

}

export default Main;