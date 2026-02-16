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
            icon: <BookOpen className="w-6 h-6" />,
            title: "Cesta Samoty",
            subtitle: "1x Kniha TAMBO pro ty, které chtějí pít z hloubky samy.",
            price: "399 Kč",
            features: ["Tištěná kniha", "Energetický otisk", "Odesíláme do 48h"],
            cta: "PŘIJMOUT VOLÁNÍ",
            highlight: false,
            y: useTransform(scrollYProgress, [0, 1], [50, -50])
        },
        {
            icon: <Gift className="w-6 h-6" />,
            title: "Sesterství Pravdy",
            subtitle: "3x TAMBO. Pro tebe a tvé nejbližší spojenkyně.",
            price: "1 059 Kč",
            features: ["3x Tištěná kniha", "Společné sdílení", "Doprava zdarma"],
            cta: "PROPOJIT SE",
            highlight: true,
            y: useTransform(scrollYProgress, [0, 1], [0, 0])
        },
        {
            icon: <Crown className="w-6 h-6" />,
            title: "Rituální Edice",
            subtitle: "Limitovaná série s osobním požehnáním a dary.",
            price: "999 Kč",
            features: ["Zatím nedostupné", "Buď ve střehu"],
            cta: "VYPRODÁNO",
            highlight: false,
            disabled: true,
            y: useTransform(scrollYProgress, [0, 1], [30, -30])
        },
        {
            icon: <Star className="w-6 h-6" />,
            title: "Digitální Esence",
            subtitle: "Okamžitý přístup k příběhu. Bez čekání.",
            price: "249 Kč",
            features: ["PDF / EPUB", "Čti okamžitě"],
            cta: "VSTOUPIT HNED",
            highlight: false,
            y: useTransform(scrollYProgress, [0, 1], [-50, 50])
        }
    ]

    return (
        <section ref={sectionRef} id="koupit" className="py-40 bg-mystic-950 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40">
                <div className="absolute top-1/4 left-[-10%] w-[50vw] h-[50vw] bg-tambo-lime/10 rounded-full blur-[180px] animate-pulse-spirit"></div>
                <div className="absolute bottom-1/4 right-[-10%] w-[50vw] h-[50vw] bg-tambo-cyan/10 rounded-full blur-[180px] animate-pulse-spirit" style={{ animationDelay: '-3s' }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-32"
                >
                    <span className="text-tambo-cyan font-body text-xs tracking-[1em] uppercase mb-10 block font-black">INVESTICE DO PRAVDY</span>
                    <h2 className="text-6xl md:text-9xl font-display mb-12">Zvol si <span className="text-tambo-lime italic font-light">svou podobu</span> proměny</h2>
                    <p className="text-white/30 tracking-[0.2em] font-light max-w-2xl mx-auto uppercase text-xs">Výběr formy je prvním krokem k tvému osvobození.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {options.map((option, idx) => (
                        <motion.div
                            key={idx}
                            style={{ y: option.y }}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className={`glass-spirit p-12 flex flex-col justify-between transition-all duration-1000 group hover:border-tambo-lime/30 ${option.highlight ? 'border-tambo-lime/30 bg-tambo-lime/[0.02]' : ''} ${option.disabled ? 'opacity-30 grayscale' : ''}`}
                        >
                            <div>
                                <div className={`w-16 h-16 rounded-[1.5rem] mb-10 flex items-center justify-center group-hover:rotate-12 transition-transform duration-700 ${option.highlight ? 'bg-tambo-lime text-mystic-950 shadow-[0_0_30px_rgba(212,255,0,0.4)]' : 'bg-white/5 text-tambo-cyan'}`}>
                                    {option.icon}
                                </div>
                                <h3 className="text-2xl font-display mb-6 text-white group-hover:text-tambo-lime transition-colors">{option.title}</h3>
                                <p className="text-base text-white/30 mb-10 leading-relaxed font-light italic">"{option.subtitle}"</p>
                                <div className="text-4xl font-display text-white mb-10 tracking-tight">{option.price}</div>

                                <ul className="space-y-6 mb-12">
                                    {option.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-4 text-xs text-white/40 tracking-widest uppercase font-bold">
                                            <div className="w-1.5 h-1.5 rounded-full bg-tambo-cyan/50"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                disabled={option.disabled}
                                className={`w-full py-5 rounded-full text-[10px] tracking-[0.4em] uppercase font-black transition-all duration-700 flex items-center justify-center gap-3 overflow-hidden relative group/btn ${option.highlight ? 'bg-tambo-lime text-mystic-950 hover:bg-white' : 'bg-white/5 text-white hover:bg-tambo-lime hover:text-mystic-950'} ${option.disabled ? 'cursor-not-allowed border border-white/5' : ''}`}
                            >
                                <span className="relative z-10">{option.cta}</span>
                                <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-2 transition-transform" />
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PurchaseOptions
