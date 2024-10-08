import React from 'react';
import Navbar from './screen/nav'
import Section from './screen/section';
import QrCode from './screen/Qrcode';
import ShortUrl from './screen/Shorturl';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
export default function app() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Section />} />
        <Route path='/ShortUrl' element={<ShortUrl />} />
        <Route path='/QrCode' element={<QrCode />} />
      </Routes >
    </BrowserRouter >


  )
}