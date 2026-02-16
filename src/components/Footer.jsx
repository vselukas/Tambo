import { motion } from 'framer-motion'
import { Instagram, Facebook, Mail, Phone, Sparkles } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="py-48 bg-mystic-950 border-t border-white/5 relative overflow-hidden">
            {/* Background Spirit */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[50rem] bg-tambo-lime/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto text-center mb-48">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        viewport={{ once: true }}
                    >
                        <Sparkles className="w-12 h-12 text-tambo-lime mx-auto mb-12 animate-pulse" />
                        <h2 className="text-6xl md:text-9xl mb-16 font-display leading-[0.9]">
                            TVÁ DIVOKOST <br />
                            <span className="text-spirit italic font-light">JE TVÁ SÍLA.</span>
                        </h2>
                        <a href="#koupit" className="btn-bold translate-y-0 hover:-translate-y-4 transition-transform">
                            CHCI KNIHU TAMBO
                        </a>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-32 pt-32 border-t border-white/5 items-start">
                    <div className="space-y-12">
                        <h3 className="text-3xl font-display text-tambo-lime italic">Tambo</h3>
                        <p className="text-lg text-white/30 leading-relaxed font-light italic border-l border-white/10 pl-8">
                            Autentický manifest o odvaze a pravdě. První kniha Karolíny Pištěkové.
                        </p>
                        <div className="flex gap-6">
                            {[Instagram, Facebook].map((Icon, i) => (
                                <a key={i} href="#" className="w-16 h-16 rounded-2xl border border-white/5 flex items-center justify-center hover:border-tambo-lime hover:text-tambo-lime transition-all duration-700 bg-white/[0.02]">
                                    <Icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-12">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">SPOJENÍ</h4>
                        <ul className="space-y-8 text-base text-white/60 font-light">
                            <li className="flex items-center gap-6 group">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-tambo-cyan/20 transition-all duration-700">
                                    <Mail className="w-5 h-5 text-tambo-cyan" />
                                </div>
                                <a href="mailto:tambobook@gmail.com" className="hover:text-tambo-lime transition-colors tracking-widest uppercase text-xs font-bold">tambobook@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-6 group">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-tambo-cyan/20 transition-all duration-700">
                                    <Phone className="w-5 h-5 text-tambo-cyan" />
                                </div>
                                <a href="tel:+420604561690" className="hover:text-tambo-lime transition-colors tracking-widest uppercase text-xs font-bold">+420 604 561 690</a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-12">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">PŮVOD</h4>
                        <div className="text-xs text-white/30 space-y-4 font-bold tracking-[0.3em] uppercase">
                            <p className="text-white">Karolína Pištěková</p>
                            <p>Hořice, Srdce Evropy</p>
                            <div className="pt-12 text-[10px] opacity-40 font-light lowercase tracking-widest">
                                <p>© {new Date().getFullYear()} TAMBO.</p>
                                <p>všechna práva v květu.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
