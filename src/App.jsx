import Navbar from './components/Navbar'
import Hero from './components/Hero'
import EmotionalHook from './components/EmotionalHook'
import Testimonials from './components/Testimonials'
import PurchaseOptions from './components/PurchaseOptions'
import AboutAuthor from './components/AboutAuthor'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

function App() {
    return (
        <div className="min-h-screen bg-mystic-900 overflow-x-hidden">
            <CustomCursor />
            <Navbar />
            <main>
                <Hero />
                <EmotionalHook />
                <Testimonials />
                <PurchaseOptions />
                <AboutAuthor />
            </main>
            <Footer />
        </div>
    )
}

export default App
