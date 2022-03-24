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

    const [movie, setMovie] = useState(null);
    const [session, setSession] = useState(null);
    const [order, setOrder] = useState(null);

    function setAppMovie(movieData){
        setMovie(movieData);
    }
    function setAppSession(sessionData){
        setSession(sessionData);
    }
    function setAppOrder(orderData){
        setOrder(orderData);
    }

    return (<>
        <Header/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <main><Movies setAppMovie={setAppMovie}/></main>
                } />
                <Route path="/sessoes/:movieId" element={<>
                    <main><Sessions setAppMovie={setAppMovie} setAppSession={setAppSession}/></main>
                    <Footer movie={movie}/>
                </>} />
                <Route path="/assentos/:sessionId" element={<>
                    <main><Tickets setAppMovie={setAppMovie} setAppSession={setAppSession} setAppOrder={setAppOrder}/></main>
                    <Footer movie={movie} session={session}/>
                </>}/>
                <Route path="/sucesso" element={
                    <main><Success movie={movie} session={session} order={order}/></main>
                } />
            </Routes>
        </BrowserRouter>
    </>)
}