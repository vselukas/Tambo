import { useState, useEffect } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    
    const navLinks = [
        { name: 'O knize', href: '#o-knize', id: 'o-knize' },
        { name: 'Recenze', href: '#recenze', id: 'recenze' },
        { name: 'Autorka', href: '#autorka', id: 'autorka' },
        { id: 'hero' }
    ]

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)

        // Intersection Observer for active section tracking
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px', // Trigger when section is in the middle of the screen
            threshold: 0
        }

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)
        
        navLinks.forEach(link => {
            const id = link.id
            const element = document.getElementById(id)
            if (element) observer.observe(element)
        })

        return () => {
            window.removeEventListener('scroll', handleScroll)
            observer.disconnect()
        }
    }, [])

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 border-b ${isScrolled ? 'bg-mystic-950/60 backdrop-blur-2xl py-4 border-white/5' : 'bg-transparent py-10 border-transparent'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#hero" className="flex items-center gap-4 text-2xl font-display font-black tracking-[0.4em] text-tambo-lavender uppercase group">
                    <span className="inline">Tambo</span>
                </a>

                {/* Minimal Desktop Menu */}
                <div className="hidden md:flex space-x-12 items-center">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.id
                        return (
                            <a 
                                key={link.name} 
                                href={link.href} 
                                className={`text-xs font-black tracking-[0.4em] uppercase transition-all duration-500 hover:scale-110 ${
                                    isActive 
                                        ? 'text-tambo-rose drop-shadow-[0_0_12px_rgba(255,126,179,0.8)] scale-110' 
                                        : 'text-white/50 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                                }`}
                            >
                                {link.name}
                            </a>
                        )
                    })}
                    <a href="#koupit" className="btn-bold !px-8 !py-3 !text-[12px]">
                        CHCI KNIHU
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-tambo-lavender" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-mystic-950 z-[-1] flex flex-col items-center justify-center space-y-12">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.id
                        return (
                            <a 
                                key={link.name} 
                                href={link.href} 
                                className={`text-xl md:text-2xl font-display font-bold tracking-[0.3em] uppercase transition-all duration-500 ${
                                    isActive ? 'text-tambo-rose drop-shadow-[0_0_15px_rgba(255,126,179,0.5)] scale-110' : 'text-white/40 hover:text-white'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        )
                    })}
                    <a href="#koupit" className="btn-bold !px-8 !py-4 !text-xs" onClick={() => setIsMobileMenuOpen(false)}>
                        CHCI KNIHU
                    </a>
                </div>
            )}
        </nav>
    )
}

export default Navbar
