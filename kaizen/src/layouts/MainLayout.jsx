import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'

export default function MainLayout() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <div className="flex min-h-svh flex-col bg-paper text-ink">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
