import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { useLenis } from './hooks/useLenis'
import { useCustomCursor } from './hooks/useCustomCursor'
import Navbar from './components/Navbar'
import AppLoader from './components/AppLoader'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import Services from './pages/Services'
import Work from './pages/Work'
import About from './pages/About'
import Contact from './pages/Contact'

function AppInner() {
  const [booting, setBooting] = useState(true)
  useLenis()
  useCustomCursor()

  return (
    <>
      {booting && <AppLoader onDone={() => setBooting(false)} />}

      {/* Custom Cursor */}
      <div className="cursor-dot" />
      <div className="cursor-ring" />

      <Navbar />

      <FloatingWhatsApp />

      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </PageTransition>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
