import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const Testimonials = () => {
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
        <section className="py-32 bg-mystic-900 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl md:text-5xl font-display mb-6">Hlasy žen, které <span className="text-gold italic font-light">slyšely volání</span></h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="glass p-12 relative flex flex-col justify-between group hover:border-gold/20 transition-all duration-700"
                        >
                            <Quote className="w-12 h-12 text-tambo-rose/10 absolute top-8 left-8 group-hover:text-tambo-rose/20 transition-colors" />
                            <p className="text-lg text-white/60 leading-relaxed font-light italic mb-8 relative z-10">
                                "{review.text}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-px bg-gold/30"></div>
                                <span className="text-sm font-body font-bold uppercase tracking-[0.2em] text-gold/80">{review.author}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
