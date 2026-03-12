import { motion } from 'framer-motion'
import authorImg from '../assets/author.webp'
import womanImg from '../assets/meditation.png'

const AboutAuthor = () => {
    return (
        <section id="autorka" className="py-48 bg-mystic-950 overflow-hidden relative">
            {/* Background abstraction */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-tambo-purple/5 rounded-full blur-[200px] pointer-events-none"></div>
            <img src={womanImg} alt="" className="absolute -bottom-20 -right-20 w-[60vw] opacity-[0.02] scale-150 rotate-[-15deg] pointer-events-none grayscale" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 2 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2 relative group"
                    >
                        <div className="absolute -inset-10 bg-tambo-rose/10 rounded-full blur-[100px] group-hover:bg-tambo-rose/20 transition-all duration-1000"></div>
                        <div className="relative overflow-hidden rounded-[4rem] border border-white/10 shadow-2xl">
                            <img
                                src={authorImg}
                                alt="Karolína Pištěková"
                                className="w-full transition-all duration-[2000ms]"
                            />
                        </div>
                        {/* Sacred Seal / Badge */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-tambo-lavender rounded-full p-8 flex items-center justify-center text-mystic-950 text-center text-[10px] font-black tracking-widest leading-tight uppercase rotate-12 shadow-[0_20px_40px_rgba(15,10,24,0.5)]">
                            Syrová Autenticita
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2"
                    >
                        <span className="text-tambo-lavender font-body text-xs tracking-[0.8em] uppercase mb-10 block font-black">DUŠE PŘÍBĚHU</span>
                        <h2 className="text-5xl md:text-8xl mb-12 leading-[0.9] font-display">Karolína <br /><span className="text-white/40 italic font-light">Pištěková</span></h2>
                        <div className="space-y-10 text-xl text-white/50 leading-relaxed font-light">
                            <p className="italic border-l-4 border-tambo-lavender pl-10 text-2xl text-white/80">
                                „Nepíšu, abych se líbila. Píšu, abych unesla svou vlastní pravdu.“
                            </p>
                            <p>
                                TAMBO je manifest o cestě z hlučných striptýzových klubů až do ticha peruánské džungle. Karolína tě nevede tam, kde je to bezpečné, ale tam, kde se budeš cítit skutečně naživu.
                            </p>
                            <p>
                                Dnes provází ženy, které odkládají masku ‚hodné holky‘. Pomáhá jim objevit jejich skutečnou sílu – tu, která může okolí znepokojovat, ale kterou svět ve skutečnosti zoufale potřebuje.
                            </p>
                        </div>

                        <div className="mt-20 flex flex-wrap gap-12 opacity-20 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
                            <div className="text-[10px] tracking-[0.4em] uppercase font-black">Jsi božská</div>
                            <div className="text-[10px] tracking-[0.4em] uppercase font-black">Divine Festival</div>
                            <div className="text-[10px] tracking-[0.4em] uppercase font-black">Tambo Core</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default AboutAuthor
