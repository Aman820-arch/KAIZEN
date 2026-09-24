import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Maison from './pages/Maison'
import NotFound from './pages/NotFound'
import Watch from './pages/Watch'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/watches/:slug" element={<Watch />} />
        <Route path="/maison" element={<Maison />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
