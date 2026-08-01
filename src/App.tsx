import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import OrderForm from './components/OrderForm'
import PawReels from './components/PawReels'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <HowItWorks />
        <Pricing />
        <OrderForm />
        <PawReels />
      </main>
      <Footer />
    </>
  )
}
