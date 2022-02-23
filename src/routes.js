import React from 'react';
import { BrowserRouter as  Router,  Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';

export default function RoutesApp() {
    return (
        <Router>
            <Routes>
                <Route path='/' exact element={<Home />}/>                
            </Routes>
        </Router>
    )
}