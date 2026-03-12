import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Quote } from 'lucide-react'
import womanImg from '../assets/meditation.png'

/* ──────────────────────── Decorative Components ──────────────────────── */
const Sparkle = ({ className, style }) => (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
)

const FloatingIcon = ({ className, style }) => (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="20" cy="20" r="16" />
        <path d="M20 10V30M10 20H30" opacity="0.3" />
    </svg>
)

const Testimonials = () => {
    const sectionRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const yParallax = useTransform(scrollYProgress, [0, 1], [-150, 150])

    const reviews = [
        {
            text: "Tato kniha mě pohltila až do poslední stránky. Je to jako by někdo konečně nahlas řekl to, co jsem roky cítila uvnitř, ale bála se to pojmenovat.",
            author: "Terezie K."
        },
        {
            text: "Syrové, pravdivé a nesmírně osvobozující. Karolína má dar psát tak, že se vám slova dotýkají přímo kostí.",
            author: "Michaela R."
        },
        {
            text: "Nečetla jsem knihu, prožívala jsem ji. Změnila můj pohled na to, co znamená být 'hodná holka'.",
            author: "Jana V."
        },
        {
            text: "Tambo je průvodcem tancem ve tmě. Ukazuje, že tam dole není nic, čeho bychom se měly bát, pokud jsme ochotné vidět.",
            author: "Lucie S."
        }
    ]

    return (
        <section ref={sectionRef} id="recenze" className="py-40 md:py-64 bg-mystic-950 relative overflow-hidden">
            {/* Simple Parallax Background Motif */}
            <motion.img
                style={{ y: yParallax }}
                src={womanImg}
                alt=""
                className="absolute top-0 left-0 w-full opacity-[0.04] scale-125 pointer-events-none grayscale brightness-150 z-0"
            />

            {/* Floating Mystical Elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <Sparkle className="absolute w-4 h-4 text-tambo-lavender/20" style={{ top: '20%', left: '15%', animation: 'sparkleFloat 6s ease-in-out infinite' }} />
                <Sparkle className="absolute w-2 h-2 text-tambo-rose/30" style={{ top: '60%', right: '10%', animation: 'sparkleFloat 4s ease-in-out infinite 1s' }} />
                <FloatingIcon className="absolute w-12 h-12 text-tambo-purple/10" style={{ top: '40%', left: '5%', animation: 'geoFloat 10s ease-in-out infinite' }} />
                <div className="absolute top-1/4 left-[-10%] w-[40rem] h-[40rem] bg-tambo-purple/5 rounded-full blur-[180px]"></div>
                <div className="absolute bottom-1/4 right-[-10%] w-[40rem] h-[40rem] bg-tambo-lavender/5 rounded-full blur-[150px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-24 lg:mb-40"
                >
                    <span className="text-tambo-rose font-body text-xs tracking-[0.6em] uppercase mb-6 block font-black opacity-60">
                        RECENZE
                    </span>
                    <h2 className="text-4xl md:text-7xl font-display mb-8 text-white leading-[1.1]">
                        Hlasy žen, které <br />
                        <span className="text-tambo-lavender italic drop-shadow-[0_0_15px_rgba(201,160,255,0.2)]">slyšely volání</span>
                    </h2>
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-tambo-lavender/30 to-transparent mx-auto"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: idx * 0.15 }}
                            viewport={{ once: true }}
                            className="glass-spirit p-12 lg:p-16 relative flex flex-col justify-between group hover:border-tambo-lavender/30 transition-all duration-1000"
                        >
                            <Quote className="w-12 h-12 text-tambo-rose/5 absolute top-8 left-8 group-hover:text-tambo-rose/10 transition-colors" />
                            <p className="text-xl lg:text-2xl text-white/50 leading-relaxed font-light italic mb-10 relative z-10 group-hover:text-white/80 transition-colors">
                                "{review.text}"
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="w-10 h-px bg-tambo-lavender/20 group-hover:w-16 transition-all duration-700"></div>
                                <span className="text-xs font-body font-bold uppercase tracking-[0.3em] text-tambo-lavender/60">{review.author}</span>
                            </div>

                            {/* Subtle inner glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[inherit]"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
