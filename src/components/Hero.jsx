import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useEffect } from 'react'
import mockupImg from '../assets/mockup.png'
import universeImg from '../assets/universe.png'
import { ChevronDown } from 'lucide-react'

/* ──────────────────────── Sparkle SVG ──────────────────────── */
const Sparkle = ({ className, style }) => (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
)

/* ──────────────────────── Geometric Shapes ──────────────────── */
const FloatingTriangle = ({ className, style }) => (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="20,4 36,36 4,36" />
    </svg>
)

const FloatingCircle = ({ className, style }) => (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="20" cy="20" r="16" />
    </svg>
)

const FloatingDiamond = ({ className, style }) => (
    <svg viewBox="0 0 30 30" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="5" width="20" height="20" transform="rotate(45 15 15)" />
    </svg>
)

/* ──────────────────────── Hero Component ──────────────────────── */
const Hero = () => {
    const containerRef = useRef(null)
    
    // Mouse Parallax Setup
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 25, stiffness: 150 }
    const mouseXSpring = useSpring(mouseX, springConfig)
    const mouseYSpring = useSpring(mouseY, springConfig)

    // Parallax values based on mouse
    const bookX = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20])
    const bookY = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20])
    const portalX = useTransform(mouseXSpring, [-0.5, 0.5], [15, -15])
    const portalY = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const yBookScroll = useTransform(scrollYProgress, [0, 1], [0, -100])
    const yText = useTransform(scrollYProgress, [0, 1], [0, -50])
    const yUniverse = useTransform(scrollYProgress, [0, 1], [0, -150])
    const glowScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e
            const { innerWidth, innerHeight } = window
            const x = (clientX / innerWidth) - 0.5
            const y = (clientY / innerHeight) - 0.5
            mouseX.set(x)
            mouseY.set(y)
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    return (
        <section id="hero" ref={containerRef} className="relative h-screen flex items-center overflow-hidden py-32 lg:py-0">
            {/* ── FILM GRAIN OVERLAY (Static image or SVG filter) ── */}
            <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* ── Deep Background with Glow Orbs ── */}
            <div className="absolute inset-0 -z-30 bg-mystic-950/20">
                {/* Global light source from top right */}
                <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-tambo-lavender/[0.01] rounded-full blur-[180px]"></div>
                
                <div className="absolute top-1/3 left-1/3 w-[60vw] h-[60vw] bg-tambo-purple/[0.02] rounded-full blur-[200px] animate-pulse-spirit"></div>
                <div className="absolute bottom-1/4 right-1/3 w-[50vw] h-[50vw] bg-tambo-rose/[0.01] rounded-full blur-[220px] animate-pulse-spirit" style={{ animationDelay: '-3s' }}></div>
            </div>

            {/* ── Floating Mist/Fog Elements ── */}
            <div className="absolute inset-0 -z-20 pointer-events-none overflow-hidden">
                <motion.div 
                    animate={{ 
                        x: ['-5%', '5%', '-5%'],
                        opacity: [0.02, 0.05, 0.02]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-20 -left-20 w-[120%] h-[40%] bg-gradient-to-t from-tambo-purple/[0.05] via-transparent to-transparent blur-[120px]"
                />
            </div>

            {/* ── Floating Sparkles & Geometric Shapes ── */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                {/* Sparkles */}
                <Sparkle className="absolute w-3 h-3 text-tambo-lavender/60" style={{ top: '15%', left: '10%', animation: 'sparkleFloat 4s ease-in-out infinite' }} />
                <Sparkle className="absolute w-2 h-2 text-tambo-rose/50" style={{ top: '28%', right: '18%', animation: 'sparkleFloat 5s ease-in-out infinite 1s' }} />
                <Sparkle className="absolute w-4 h-4 text-tambo-lavender/40" style={{ top: '22%', right: '35%', animation: 'sparkleFloat 6s ease-in-out infinite 0.5s' }} />
                <Sparkle className="absolute w-2.5 h-2.5 text-tambo-purple/50" style={{ top: '70%', left: '8%', animation: 'sparkleFloat 4.5s ease-in-out infinite 2s' }} />
                <Sparkle className="absolute w-2 h-2 text-tambo-rose/40" style={{ bottom: '25%', right: '12%', animation: 'sparkleFloat 5.5s ease-in-out infinite 1.5s' }} />

                {/* Geometric shapes */}
                <FloatingTriangle className="absolute w-6 h-6 text-tambo-rose/25" style={{ top: '18%', left: '12%', animation: 'geoFloat 8s ease-in-out infinite, geoSpin 15s linear infinite' }} />
                <FloatingTriangle className="absolute w-5 h-5 text-tambo-lavender/20" style={{ bottom: '30%', right: '22%', animation: 'geoFloat 7s ease-in-out infinite 2s, geoSpin 20s linear infinite reverse' }} />
                <FloatingCircle className="absolute w-5 h-5 text-tambo-purple/20" style={{ top: '65%', right: '28%', animation: 'geoFloat 9s ease-in-out infinite 1s' }} />
                <FloatingDiamond className="absolute w-6 h-6 text-tambo-lavender/20" style={{ bottom: '40%', left: '12%', animation: 'geoFloat 7s ease-in-out infinite 1.5s, geoSpin 18s linear infinite' }} />
            </div>

            {/* ── Main Content: Book Left + Text Right ── */}
            <div className="container mx-auto px-6 lg:px-20 relative z-10 scale-[1.02]">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">

                    {/* ─── LEFT: Book with Masked Universe Backdrop ─── */}
                    <motion.div
                        style={{ 
                            x: bookX, 
                            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
                            scale: glowScale 
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative flex-shrink-0 w-80 lg:w-[32rem] flex items-center justify-center p-12"
                    >
                        {/* ── UNIVERSE PORTAL BACKDROP with Cursor Parallax ── */}
                        <motion.div
                            style={{ 
                                x: portalX,
                                y: useTransform(scrollYProgress, [0, 1], [0, -150]),
                                rotateY: useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]),
                                rotateX: useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]),
                            }}
                            className="absolute inset-0 -z-20 pointer-events-none perspective-[1000px]"
                        >
                            <div
                                className="absolute inset-[-25%] bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${universeImg})`,
                                    maskImage: 'radial-gradient(circle at center, black 20%, rgba(0,0,0,0.8) 45%, transparent 75%)',
                                    WebkitMaskImage: 'radial-gradient(circle at center, black 20%, rgba(0,0,0,0.8) 45%, transparent 75%)',
                                    filter: 'blur(20px) brightness(1.5)',
                                    opacity: 0.4
                                }}
                            />
                            {/* Mystic pulse glow */}
                            <div className="absolute inset-[-15%] bg-tambo-lavender/10 mix-blend-screen blur-[140px] animate-pulse" style={{ animationDuration: '6s' }} />
                        </motion.div>

                        {/* Book mockup from user */}
                        <motion.img
                            src={mockupImg}
                            alt="TAMBO Mockup"
                            className="relative z-20 w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                            whileHover={{ scale: 1.05, rotateZ: 1 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                    </motion.div>

                    {/* ─── RIGHT: Text Content ─── */}
                    <motion.div
                        style={{ y: yText }}
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 text-center lg:text-left max-w-2xl lg:pt-12"
                    >
                        <span className="text-tambo-lavender font-body text-sm tracking-[0.8em] uppercase mb-10 block font-black opacity-90 drop-shadow-[0_0_15px_rgba(201,160,255,0.5)]">
                            ODVAHA BÝT SKUTEČNÁ
                        </span>

                        <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] mb-12 leading-[0.9] font-display text-white">
                            Vrať se k sobě. <br />
                            <span className="relative">
                                Přijmi svou{' '}
                                <span
                                    className="italic relative inline-block animate-shimmer"
                                    style={{
                                        background: 'linear-gradient(90deg, #C9A0FF, #FF7EB3, #C9A0FF)',
                                        backgroundSize: '200% auto',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        filter: 'drop-shadow(0 0 25px rgba(255,126,179,0.5))',
                                    }}
                                >
                                    divokost.
                                </span>
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-white/40 mb-14 leading-relaxed font-light italic border-l-4 border-tambo-lavender/30 pl-10 max-w-xl mx-auto lg:mx-0">
                            TAMBO je manifest ženy, která už odmítá plnit cizí očekávání. Je to přímá cesta do hloubky, kde na tebe čeká tvoje skutečná pravda.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-8 items-center lg:items-start">
                            <a href="#koupit" className="btn-bold">
                                CHCI KNIHU
                            </a>
                            <a href="https://cdn.prod.website-files.com/645a912a87cb14233f9f9bbd/6491ab808b79409bef0cf5df_Tambo-Ukazka.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline-spirit">
                                STÁHNOUT UKÁZKU
                            </a>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* ── Scroll Indicator ── */}
            <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30"
            >
                <div className="w-px h-16 bg-gradient-to-b from-tambo-rose to-transparent mb-4"></div>
                <ChevronDown className="w-8 h-8 text-tambo-rose" />
            </motion.div>
        </section>
    )
}

export default Hero
