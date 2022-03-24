import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Header from './Header';
import Footer from './Footer';

import Movies from './Movies';
import Sessions from './Sessions';
import Tickets from './Tickets';
import Success from './Success';

import '../styles/reset.css'
import '../styles/styles.css'

export default function App() {

    const [movie, setMovie] = useState(null);
    const [session, setSession] = useState(null);
    const [order, setOrder] = useState(null);
    const [showPreviousButton, setShowPreviousButton] = useState(false);

    function setAppMovie(movieData) {
        setMovie(movieData);
    }
    function setAppSession(sessionData) {
        setSession(sessionData);
    }
    function setAppOrder(orderData) {
        setOrder(orderData);
    }
    function controlShowPreviousButton(bool) {
        setShowPreviousButton(bool);
    }

    return (<>
        <Header showPreviousButton={showPreviousButton} />
        <Routes>
            <Route path="/" element={
                <main>
                    <Movies
                        setAppMovie={setAppMovie}
                        controlShowPreviousButton={controlShowPreviousButton}
                    />
                </main>
            } />
            <Route path="/sessoes/:movieId" element={<>
                <main>
                    <Sessions
                        setAppMovie={setAppMovie}
                        setAppSession={setAppSession}
                        controlShowPreviousButton={controlShowPreviousButton}
                    />
                </main>
                <Footer movie={movie} />
            </>} />
            <Route path="/assentos/:sessionId" element={<>
                <main>
                    <Tickets
                        setAppMovie={setAppMovie}
                        setAppSession={setAppSession}
                        setAppOrder={setAppOrder}
                        controlShowPreviousButton={controlShowPreviousButton}
                    />
                </main>
                <Footer movie={movie} session={session} />
            </>} />
            <Route path="/sucesso" element={
                <main>
                    <Success
                        movie={movie}
                        session={session}
                        order={order}
                        controlShowPreviousButton={controlShowPreviousButton}
                    />
                </main>
            } />
        </Routes>
    </>)
}