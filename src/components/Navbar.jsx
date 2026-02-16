import { useState, useEffect } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'O knize', href: '#o-knize' },
        { name: 'Podpořit', href: '#koupit' },
        { name: 'Vznik knihy', href: '#vznik' },
        { name: 'Autorka', href: '#autorka' },
    ]

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-mystic-950/60 backdrop-blur-2xl py-4 border-b border-white/5' : 'bg-transparent py-10'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#" className="flex items-center gap-4 text-2xl font-display font-black tracking-[0.4em] text-tambo-lime uppercase group">
                    <Sparkles className="w-6 h-6 group-hover:rotate-90 transition-transform duration-700" />
                    <span className="hidden sm:inline">Tambo</span>
                </a>

                {/* Minimal Desktop Menu */}
                <div className="hidden md:flex space-x-12 items-center">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="text-[10px] font-black tracking-[0.4em] uppercase hover:text-tambo-lime transition-all duration-500 hover:scale-110">
                            {link.name}
                        </a>
                    ))}
                    <a href="#koupit" className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-full text-[10px] font-black tracking-[0.4em] uppercase hover:bg-tambo-lime hover:text-mystic-950 transition-all duration-500">
                        KOUPIT
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-tambo-lime" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-mystic-950 z-[-1] flex flex-col items-center justify-center space-y-12">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="text-2xl font-display font-bold tracking-[0.3em] uppercase text-white hover:text-tambo-lime transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                            {link.name}
                        </a>
                    ))}
                    <a href="#koupit" className="px-12 py-5 bg-tambo-lime text-mystic-950 rounded-full font-black tracking-[0.4em] uppercase" onClick={() => setIsMobileMenuOpen(false)}>
                        KOUPIT KNIHU
                    </a>
                </div>
            )}
        </nav>
    )
}

export default Navbar
