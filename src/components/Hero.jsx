import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import bookCover from '../assets/book-cover.webp'
import womanImg from '../assets/meditation.png'
import { ChevronDown } from 'lucide-react'

const Hero = () => {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const ySpirit = useTransform(scrollYProgress, [0, 1], [0, -200])
    const yBook = useTransform(scrollYProgress, [0, 1], [0, -100])
    const opacitySpirit = useTransform(scrollYProgress, [0, 0.5], [0.15, 0])
    const scaleSpirit = useTransform(scrollYProgress, [0, 1], [1.25, 2])

    return (
        <section ref={containerRef} className="relative h-screen flex items-center justify-center pt-24 overflow-hidden">
            {/* Dynamic Spiritual Background */}
            <div className="absolute inset-0 -z-10 bg-mystic-950">
                {/* Vibrant Orbs */}
                <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] bg-tambo-purple/20 rounded-full blur-[180px] animate-pulse-spirit"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-tambo-cyan/15 rounded-full blur-[150px] animate-pulse-spirit" style={{ animationDelay: '-2s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-mystic-800/20 rounded-full blur-[250px]"></div>

                {/* Parallax Spectral Woman Figure */}
                <motion.div
                    style={{ y: ySpirit, opacity: opacitySpirit, scale: scaleSpirit }}
                    className="absolute inset-0 flex items-center justify-center translate-y-20 pointer-events-none"
                >
                    <img src={womanImg} alt="" className="h-full object-contain filter brightness-200 contrast-125 transition-all duration-1000" />
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <span className="text-tambo-lime font-body text-xs tracking-[0.6em] uppercase mb-10 block font-black opacity-80 drop-shadow-[0_0_15px_rgba(212,255,0,0.5)]">
                        ODVAHA BÝT SKUTEČNÁ
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-[7rem] mb-12 leading-[0.9] font-display">
                        Vrať se k sobě. <br />
                        Přijmi svou <span className="text-tambo-lime italic">divokost.</span>
                    </h1>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-20">
                        <motion.div
                            style={{ y: yBook }}
                            initial={{ opacity: 0, scale: 0.9, rotateY: 30 }}
                            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 2, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="hidden lg:block perspective-2000"
                        >
                            <img
                                src={bookCover}
                                alt="TAMBO"
                                className="w-80 rounded-lg shadow-[0_50px_100px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-1000 rotate-[-5deg]"
                            />
                        </motion.div>

                        <div className="max-w-lg text-center md:text-left">
                            <p className="text-xl md:text-2xl text-white/60 mb-12 leading-relaxed font-light italic border-l-2 border-tambo-lime pl-8">
                                TAMBO je manifest každé ženy, která už odmítá žít v kleci očekávání. Je to syrový, viscerální sestup do hlubin, kde na tebe čeká tvá pravda.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-8 items-center md:items-start">
                                <a href="#koupit" className="btn-bold group !text-sm whitespace-nowrap">
                                    CHCI KNIHU
                                </a>
                                <a href="https://cdn.prod.website-files.com/645a912a87cb14233f9f9bbd/6491ab808b79409bef0cf5df_Tambo-Ukazka.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline-spirit !text-sm whitespace-nowrap">
                                    STÁHNOUT UKÁZKU
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Dynamic Elements */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50"
            >
                <ChevronDown className="w-8 h-8 text-tambo-cyan" />
            </motion.div>
        </section>
    )
}

export default Hero
