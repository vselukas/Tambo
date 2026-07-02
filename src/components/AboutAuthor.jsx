import { motion } from 'framer-motion'
import authorImg from '../assets/author.webp'
import womanImg from '../assets/meditation.png'
import { useLanguage } from '../context/LanguageContext'

const AboutAuthor = () => {
    const { t, dict } = useLanguage()
    const tags = dict?.author?.tags || []

    return (
        <section id="autorka" className="py-20 md:py-32 lg:py-48 bg-mystic-950 overflow-hidden relative">
            {/* Background abstraction */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-tambo-purple/5 rounded-full blur-[200px] pointer-events-none"></div>
            <img src={womanImg} alt="" className="absolute -bottom-20 -right-20 w-[60vw] opacity-[0.02] scale-150 rotate-[-15deg] pointer-events-none grayscale" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-20 lg:gap-32">
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
                        <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-tambo-lavender rounded-full p-4 md:p-6 lg:p-8 flex items-center justify-center text-mystic-950 text-center text-[8px] md:text-[9px] lg:text-[10px] font-black tracking-widest leading-tight uppercase rotate-12 shadow-[0_20px_40px_rgba(15,10,24,0.5)]">
                            {t('author.badge')}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2"
                    >
                        <span className="text-tambo-lavender font-body text-[10px] md:text-xs tracking-[0.8em] uppercase mb-6 md:mb-10 block font-black">{t('author.tagline')}</span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-8 md:mb-12 leading-[1.1] md:leading-[0.9] font-display">{t('author.title1')} <br /><span className="text-white/40 italic font-light">{t('author.title2')}</span></h2>
                        <div className="space-y-8 md:space-y-10 text-lg md:text-xl text-white/50 leading-relaxed font-light">
                            <p className="italic border-l-4 border-tambo-lavender pl-6 md:pl-10 text-xl md:text-2xl text-white/80">
                                {t('author.quote')}
                            </p>
                            <p>
                                {t('author.desc1')}
                            </p>
                            <p>
                                {t('author.desc2')}
                            </p>
                        </div>

                        <div className="mt-20 flex flex-wrap gap-12 opacity-20 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
                            {tags.map((tag, i) => (
                                <div key={i} className="text-[10px] tracking-[0.4em] uppercase font-black">{tag}</div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default AboutAuthor
