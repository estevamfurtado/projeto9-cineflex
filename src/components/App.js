import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './Header';
import Footer from './Footer';

import Movies from './Movies';
import Sessions from './Sessions';
import Tickets from './Tickets';
import Success from './Success';

import '../styles/reset.css'
import '../styles/styles.css'

export default function App () {
    return (<>
        <Header/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <main><Movies /></main>
                } />
                <Route path="/sessoes/:movieId" element={<>
                    <main><Sessions /></main>
                    <Footer/>
                </>} />
                <Route path="/assentos" element={<>
                    <main><Tickets /></main>
                    <Footer/>
                </>}/>
                <Route path="/sucesso" element={
                    <main><Success /></main>
                } />
            </Routes>
        </BrowserRouter>
    </>)
}