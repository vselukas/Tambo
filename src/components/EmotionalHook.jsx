import { motion, useScroll } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

// Art Imports
import padImg from '../assets/art/pad.jpg'
import studImg from '../assets/art/stud.jpg'
import navratImg from '../assets/art/navrat.jpg'

const EmotionalHook = () => {
    const sectionRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const steps = [
        {
            image: padImg,
            title: "Pád",
            text: "Ten okamžik v hluboké noci, kdy zjistíš, že celý tvůj dosavadní život byla jen falešná, bezpečná kulisa.",
            color: "text-tambo-rose"
        },
        {
            image: studImg,
            title: "Stud",
            text: "Stud, který tě pálí v hrdle, dokud nenajdeš odvahu ho vyplakat a přestat se omlouvat za to, že vnímáš více než ostatní.",
            color: "text-tambo-lavender"
        },
        {
            image: navratImg,
            title: "Návrat",
            text: "Znovuzrození do tvé divoké, nespoutané podstaty. Domů, do těla a ke své pravé moudrosti.",
            color: "text-tambo-blue"
        }
    ]

    return (
        <section
            ref={sectionRef}
            id="o-knize"
            className="py-32 md:py-48 bg-mystic-950 relative overflow-hidden"
        >
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
                <div className="absolute top-1/4 -left-1/4 w-[60rem] h-[60rem] bg-tambo-purple/20 rounded-full blur-[200px] animate-pulse-spirit"></div>
                <div className="absolute bottom-1/4 -right-1/4 w-[50rem] h-[50rem] bg-tambo-rose/10 rounded-full blur-[180px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center mb-24 md:mb-40"
                >
                    <span className="text-tambo-rose font-body text-xs tracking-[0.8em] uppercase mb-8 block font-black opacity-80">
                        CEREMONIE PRAVDY
                    </span>
                    <h2 className="text-4xl md:text-7xl lg:text-8xl mb-12 font-display leading-[1.1] text-white">
                        Zrcadlo tvé <br />
                        <span className="text-tambo-lavender italic drop-shadow-[0_0_15px_rgba(201,160,255,0.3)]">skutečné</span> podstaty
                    </h2>
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-12"></div>
                    <p className="text-lg md:text-xl text-white/40 leading-relaxed font-light max-w-3xl mx-auto italic border-y border-white/5 py-12">
                        „TAMBO je průvodcem k tvé vlastní vnitřní džungli. Je to tiché zrcadlo postavené před tvou duši ve chvíli, kdy už nelze lhát sama sobě."
                    </p>
                </motion.div>

                {/* Immersive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20 items-center relative">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative group">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: idx * 0.2 }}
                                viewport={{ once: true }}
                            >
                                {/* Card Content */}
                                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl glass-spirit transition-transform duration-700 group-hover:scale-[1.02]">
                                    <motion.img
                                        src={step.image}
                                        alt={step.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                    />
                                    {/* Subtler Bottom Overlay for Readability */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-mystic-950 via-mystic-950/40 to-transparent opacity-90 transition-opacity"></div>
                                    
                                    {/* Text Content inside Card */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                                        <h3 className="text-3xl md:text-5xl text-white mb-6 font-display group-hover:text-white transition-colors drop-shadow-sm">
                                            {step.title}
                                        </h3>
                                        <p className="text-white/80 leading-relaxed font-body text-base lg:text-lg group-hover:text-white transition-colors">
                                            {step.text}
                                        </p>
                                    </div>

                                    {/* Hover Glow */}
                                    <div className="absolute inset-0 border border-white/5 rounded-2xl group-hover:border-tambo-lavender/30 transition-colors duration-700"></div>
                                </div>

                                {/* Shadow/Glow underneath */}
                                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-tambo-purple/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            </motion.div>

                            {/* Progression Arrow (Centered between cards) */}
                            {idx < steps.length - 1 && (
                                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 lg:bottom-auto lg:left-[calc(100%+40px)] lg:top-1/2 lg:-translate-y-1/2 flex justify-center z-20 pointer-events-none">
                                    <motion.div
                                        animate={{ 
                                            y: [0, 8, 0] 
                                        }}
                                        transition={{ 
                                            repeat: Infinity, 
                                            duration: 3, 
                                            ease: "easeInOut" 
                                        }}
                                        className="opacity-20 lg:opacity-30 text-white"
                                    >
                                        <ArrowRight className="w-8 h-8 lg:w-10 lg:h-10 rotate-90 lg:rotate-0" strokeWidth={1} />
                                    </motion.div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default EmotionalHook
