import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Crown, Star, BookOpen, Gift, ArrowRight, MapPin, Check } from 'lucide-react'

const PurchaseOptions = () => {
    const sectionRef = useRef(null)
    const [selectedBranch, setSelectedBranch] = useState(null)
    
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const PACKETA_API_KEY = '6c413f17387cc33c' // TEST KEY - User will need to replace this

    const openPacketaWidget = (optionIndex) => {
        if (typeof window.Packeta === 'undefined') {
            alert('Knihovna Zásilkovny se stále načítá. Zkuste to prosím za okamžik.')
            return
        }

        const opts = {
            language: 'cs',
            country: 'cz'
        }

        window.Packeta.Widget.pick(PACKETA_API_KEY, (point) => {
            if (point) {
                setSelectedBranch({
                    id: point.id,
                    name: point.name,
                    optionIndex: optionIndex
                })
            }
        }, opts)
    }

    const options = [
        {
            title: "Kniha TAMBO",
            subtitle: "Kniha pro ty, které se nebojí jít do hloubky.",
            price: "399 Kč",
            features: ["Tištěná kniha", "Odesíláme do 48h"],
            cta: "Koupit",
            highlight: false,
            requireShipping: true,
            stripeLink: "https://buy.stripe.com/test_6oE01p9S88fD97u288" // PLACEHOLDER
        },
        {
            title: "Balíček 3 knih",
            subtitle: "3x TAMBO. Pro tebe a tvé nejbližší spojenkyně.",
            price: "1 059 Kč",
            features: ["3x Tištěná kniha", "Doprava zdarma"],
            cta: "Koupit",
            highlight: true,
            badge: "nejvýhodnější",
            requireShipping: true,
            stripeLink: "https://buy.stripe.com/test_evaaGZdbofS1gr66or" // PLACEHOLDER
        },
        {
            title: "E-book",
            subtitle: "Okamžitý přístup k příběhu. Bez čekání.",
            price: "249 Kč",
            features: ["PDF / EPUB", "Čti okamžitě"],
            cta: "Koupit",
            highlight: false,
            requireShipping: false,
            stripeLink: "https://buy.stripe.com/test_8wM4hB2vGdjv4Re7st" // PLACEHOLDER
        },
        {
            title: "Rituální Edice",
            subtitle: "Limitovaná série s osobním požehnáním a dary.",
            price: "999 Kč",
            features: ["Zatím nedostupné", "Buď ve střehu"],
            cta: "Koupit",
            highlight: false,
            disabled: true,
            requireShipping: true
        }
    ]

    const handlePurchase = (option, idx) => {
        if (option.requireShipping && (!selectedBranch || selectedBranch.optionIndex !== idx)) {
            openPacketaWidget(idx)
        } else {
            // Construct final link with branch ID if available
            let finalLink = option.stripeLink
            if (selectedBranch && selectedBranch.optionIndex === idx) {
                const separator = finalLink.includes('?') ? '&' : '?'
                finalLink += `${separator}client_reference_id=${selectedBranch.id}`
            }
            window.location.href = finalLink
        }
    }

    return (
        <section ref={sectionRef} id="koupit" className="py-40 bg-mystic-950 relative overflow-hidden">
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
                    className="text-center mb-32"
                >
                    <span className="text-tambo-rose font-body text-xs tracking-[1em] uppercase mb-10 block font-black">INVESTICE DO PRAVDY</span>
                    <h2 className="text-6xl md:text-9xl font-display">Zvol si <span className="text-tambo-lavender italic font-light">svou podobu</span> proměny</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
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
                            <div className={`p-12 h-full flex flex-col justify-between ${option.disabled ? 'opacity-30 grayscale' : ''}`}>
                                <div>
                                    <h3 className="text-3xl font-display mb-8 text-white">{option.title}</h3>
                                    <p className="text-base text-white/60 mb-8 leading-relaxed font-light italic">{option.subtitle}</p>
                                    <div className="text-4xl font-display text-white mb-10 tracking-tight">{option.price}</div>

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
                                    onClick={() => handlePurchase(option, idx)}
                                    disabled={option.disabled}
                                    className={`w-full ${
                                        option.highlight 
                                            ? 'btn-bold' 
                                            : 'btn-outline-spirit'
                                    } ${option.disabled ? 'cursor-not-allowed opacity-20' : ''}`}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {option.requireShipping && selectedBranch && selectedBranch.optionIndex === idx && (
                                            <Check className="w-4 h-4" />
                                        )}
                                        {option.requireShipping && selectedBranch && selectedBranch.optionIndex === idx 
                                            ? 'Pokračovat k platbě' 
                                            : option.cta
                                        }
                                    </span>
                                </button>

                                {option.requireShipping && selectedBranch && selectedBranch.optionIndex === idx && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-6 pt-6 border-t border-white/5"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-tambo-lavender/10 flex items-center justify-center shrink-0">
                                                <MapPin className="w-4 h-4 text-tambo-lavender" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Pobočka:</p>
                                                <p className="text-xs text-white/90 font-medium italic mb-2">{selectedBranch.name}</p>
                                                <button 
                                                    onClick={() => openPacketaWidget(idx)}
                                                    className="text-[9px] text-tambo-lavender/60 hover:text-tambo-lavender uppercase tracking-widest font-bold transition-colors"
                                                >
                                                    Změnit výběr
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PurchaseOptions
