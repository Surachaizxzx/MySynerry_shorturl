import React from 'react';
import Navbar from './screen/nav'
import Section from './screen/section';
import List from './screen/list';
import ShortUrl from './screen/Shorturl';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
export default function app() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Section />} />
        <Route path='/ShortUrl' element={<ShortUrl />} />
        <Route path='/List' element={<List />} />
      </Routes >
    </BrowserRouter >


  )
}