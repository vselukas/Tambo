import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Zap, Moon, Sun, Wind } from 'lucide-react'
import womanImg from '../assets/meditation.png'

const TargetAudience = () => {
    const sectionRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const yWatermark = useTransform(scrollYProgress, [0, 1], [-200, 200])

    return (
        <section ref={sectionRef} className="py-40 bg-mystic-950 border-y border-white/[0.05] relative overflow-hidden">
            {/* Background Spirit Aspect */}
            <motion.img
                style={{ y: yWatermark }}
                src={womanImg}
                alt=""
                className="absolute top-0 left-0 w-full opacity-[0.05] scale-150 pointer-events-none grayscale brightness-150"
            />

            {/* Vibrant Background Blurs */}
            <div className="absolute top-1/2 left-[-10%] w-[40rem] h-[40rem] bg-tambo-blue/5 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-1/2 right-[-10%] w-[40rem] h-[40rem] bg-tambo-lime/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-7xl mb-12 font-display leading-[1.1]">
                            TAMBO si tě <br />
                            <span className="text-tambo-lime italic">vybere samo.</span>
                        </h2>
                        <div className="space-y-12">
                            <div className="flex gap-8 group">
                                <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-tambo-cyan/20 transition-all duration-700">
                                    <Zap className="w-8 h-8 text-tambo-cyan" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-display text-white mb-2 uppercase tracking-widest">Nespoutaná volnost</h4>
                                    <p className="text-white/40 font-light leading-relaxed italic">Pro ty, které už nebaví omlouvat se za svou intenzitu, sny a vnitřní oheň.</p>
                                </div>
                            </div>

                            <div className="flex gap-8 group">
                                <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-tambo-purple/20 transition-all duration-700">
                                    <Moon className="w-8 h-8 text-tambo-purple" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-display text-white mb-2 uppercase tracking-widest">Hluboké stíny</h4>
                                    <p className="text-white/40 font-light leading-relaxed italic">Pro ženy, které se nebojí sestoupit do své tmy, aby tam našly nejčistší světlo.</p>
                                </div>
                            </div>

                            <div className="flex gap-8 group">
                                <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-tambo-lime/20 transition-all duration-700">
                                    <Wind className="w-8 h-8 text-tambo-lime" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-display text-white mb-2 uppercase tracking-widest">Syrová pravda</h4>
                                    <p className="text-white/40 font-light leading-relaxed italic">Pokud hledáš návod na štěstí, běž dál. Tady najdeš nástroj na vnitřní revoluci.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        viewport={{ once: true }}
                        className="glass-spirit p-20 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-12">
                            <Sun className="w-20 h-20 text-tambo-lime/10 animate-spin-slow" style={{ animationDuration: '20s' }} />
                        </div>

                        <h3 className="text-3xl font-display mb-12 text-tambo-lime italic">Slyšíš to volání?</h3>
                        <div className="space-y-8 text-lg text-white/60 leading-relaxed font-light italic border-l-2 border-tambo-cyan/30 pl-12">
                            <p>„TAMBO není pro každou ženu. Je jen pro ty, které cítí v kostech, že nadešel čas přestat hrát roli, kterou pro ně napsal někdo jiný.“</p>
                            <p>„Je pro ty, které vědí, že pravda bolí jen chvíli, ale lež zabíjí celý život.“</p>
                        </div>
                        <div className="mt-16 pt-16 border-t border-white/5">
                            <span className="text-[10px] tracking-[0.5em] uppercase text-white/30 block mb-4 font-black">POKUD CÍTÍŠ ODPOR, ČTI DÁL.</span>
                            <p className="text-sm text-white/20 font-light italic">Odpor je jen strach duše, že ji někdo konečně uvidí v plné nahotě.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default TargetAudience
