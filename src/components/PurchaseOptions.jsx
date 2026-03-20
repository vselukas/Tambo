import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Crown, Star, BookOpen, Gift, ArrowRight } from 'lucide-react'

const PurchaseOptions = () => {
    const sectionRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const options = [
        {
            title: "Kniha TAMBO",
            subtitle: "Kniha pro ty, které se nebojí jít do hloubky.",
            price: "399 Kč",
            features: ["Tištěná kniha", "Odesíláme do 48h"],
            cta: "Chci knihu",
            highlight: false
        },
        {
            title: "Balíček 3 knih",
            subtitle: "3x TAMBO. Pro tebe a tvé nejbližší spojenkyně.",
            price: "1 059 Kč",
            features: ["3x Tištěná kniha", "Doprava zdarma"],
            cta: "Chci knihu",
            highlight: true,
            badge: "nejvýhodnější"
        },
        {
            title: "E-book",
            subtitle: "Okamžitý přístup k příběhu. Bez čekání.",
            price: "249 Kč",
            features: ["PDF / EPUB", "Čti okamžitě"],
            cta: "Chci knihu",
            highlight: false
        },
        {
            title: "Rituální Edice",
            subtitle: "Limitovaná série s osobním požehnáním a dary.",
            price: "999 Kč",
            features: ["Zatím nedostupné", "Buď ve střehu"],
            cta: "Chci knihu",
            highlight: false,
            disabled: true
        }
    ]

    return (
        <section ref={sectionRef} id="koupit" className="py-20 md:py-32 lg:py-40 bg-mystic-950 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40">
                <div className="absolute top-1/4 left-[-10%] w-[50vw] h-[50vw] bg-tambo-lavender/10 rounded-full blur-[180px] animate-pulse-spirit"></div>
                <div className="absolute bottom-1/4 right-[-10%] w-[50vw] h-[50vw] bg-tambo-rose/10 rounded-full blur-[180px] animate-pulse-spirit" style={{ animationDelay: '-3s' }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 md:mb-32"
                >
                    <span className="text-tambo-rose font-body text-[10px] md:text-xs tracking-[0.8em] md:tracking-[1em] uppercase mb-6 md:mb-10 block font-black">INVESTICE DO PRAVDY</span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] 2xl:text-9xl font-display">Zvol si <br className="sm:hidden" /><span className="text-tambo-lavender italic font-light">svou podobu</span> proměny</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {options.map((option, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className={`glass-spirit transition-all duration-1000 relative ${option.highlight ? 'border-tambo-lavender/30 bg-tambo-lavender/[0.04] ring-1 ring-tambo-lavender/20' : ''} ${option.disabled ? 'border-dashed border-white/10' : ''}`}
                        >
                            {/* Card Badge (Sold Out or Best Value) */}
                            {(option.disabled || option.badge) && (
                                <div className={`absolute -top-4 -right-4 bg-mystic-950 border px-4 py-2 rounded-full z-30 ${option.disabled ? 'border-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'border-tambo-lavender/50 shadow-[0_0_20px_rgba(201,160,255,0.3)]'}`}>
                                    <span className={`text-[10px] font-black tracking-[0.3em] uppercase ${option.disabled ? 'text-[#ff3333] drop-shadow-[0_0_8px_rgba(255,51,51,0.6)]' : 'text-tambo-lavender drop-shadow-[0_0_8px_rgba(201,160,255,0.4)]'}`}>
                                        {option.disabled ? 'VYPRODÁNO' : option.badge}
                                    </span>
                                </div>
                            )}

                            {/* Content Wrapper with conditional grayscale */}
                            <div className={`p-8 md:p-10 lg:p-12 h-full flex flex-col justify-between ${option.disabled ? 'opacity-30 grayscale' : ''}`}>
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-display mb-6 md:mb-8 text-white">{option.title}</h3>
                                    <p className="text-sm md:text-base text-white/60 mb-6 md:mb-8 leading-relaxed font-light italic">{option.subtitle}</p>
                                    <div className="text-3xl md:text-4xl font-display text-white mb-8 md:mb-10 tracking-tight">{option.price}</div>

                                    <ul className="space-y-4 mb-12">
                                        {option.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-4 text-[10px] text-white/40 tracking-widest uppercase font-bold">
                                                <div className="w-1 h-1 rounded-full bg-tambo-rose/50"></div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    disabled={option.disabled}
                                    className={`w-full ${
                                        option.highlight 
                                            ? 'btn-bold' 
                                            : 'btn-outline-spirit'
                                    } ${option.disabled ? 'cursor-not-allowed opacity-20' : ''}`}
                                >
                                    <span className="relative z-10">{option.cta}</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PurchaseOptions
