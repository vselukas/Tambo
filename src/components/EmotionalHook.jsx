import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { Eye, Shield, Flame } from 'lucide-react'

const EmotionalHook = () => {
    const sectionRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    // Mouse Parallax Logic
    const mouseX = useMotionValue(0.5)
    const mouseY = useMotionValue(0.5)

    const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
    const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Using window coordinates for smoother global tracking
            const x = e.clientX / window.innerWidth
            const y = e.clientY / window.innerHeight
            mouseX.set(x - 0.5)
            mouseY.set(y - 0.5)
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    const scrollY_0 = useTransform(scrollYProgress, [0, 1], [100, -100])
    const mouseY_0 = useTransform(springY, [-0.5, 0.5], [-50, 50])

    const scrollY_2 = useTransform(scrollYProgress, [0, 1], [-100, 100])
    const mouseY_2 = useTransform(springY, [-0.5, 0.5], [50, -50])

    const y0 = useSpring(useMotionValue(0))
    const y2 = useSpring(useMotionValue(0))

    // Simple additive effect
    const combinedY0 = useTransform([scrollY_0, mouseY_0], ([s, m]) => s + m)
    const combinedY2 = useTransform([scrollY_2, mouseY_2], ([s, m]) => s + m)

    const steps = [
        {
            icon: <Flame className="w-8 h-8" />,
            title: "Pád",
            text: "Ten záblesk pravdy v hluboké noci, kdy zjistíš, že celý tvůj dosavadní život byla jen falešná, bezpečná kulisa.",
            y: combinedY0
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Stud",
            text: "Tekutý stud, který tě pálí v hrdle, dokud nenajdeš odvahu ho vyplakat a přestat se omlouvat za to, že cítíš víc než ostatní.",
            y: 0
        },
        {
            icon: <Eye className="w-8 h-8" />,
            title: "Návrat",
            text: "Znovuzrození do tvé divoké, nespoutané podstaty. Domů, do těla, k moudrosti kosti a krve.",
            y: combinedY2
        }
    ]

    return (
        <section
            ref={sectionRef}
            id="o-knize"
            className="py-40 bg-mystic-950 relative overflow-hidden"
        >
            {/* Sacred Geometry / Background Spirit */}
            <div className="absolute top-1/2 left-[-10%] w-[50rem] h-[50rem] bg-tambo-purple/10 rounded-full blur-[180px] pointer-events-none animate-pulse-spirit"></div>
            <div className="absolute bottom-0 right-[-10%] w-[40rem] h-[40rem] bg-tambo-cyan/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-32"
                >
                    <span className="text-tambo-cyan font-body text-xs tracking-[0.8em] uppercase mb-8 block font-black">CEREMONIE PRAVDY</span>
                    <h2 className="text-5xl md:text-8xl mb-12 font-display leading-tight">
                        Kniha, která je <br />
                        zrcadlem vaší <span className="text-spirit italic">duše.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/40 leading-relaxed font-light max-w-3xl mx-auto italic border-y border-white/5 py-12">
                        „TAMBO je průvodcem k tvé vlastní vnitřní džungli. Je to tiché zrcadlo postavené před tvou duši ve chvíli, kdy už nemůžeš dál lhát sama sobě.“
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12 relative">
                    {/* Connecting line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10"></div>

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            style={{
                                y: step.y
                            }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-spirit p-16 text-center group hover:border-tambo-lime/30 transition-all duration-1000"
                        >
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 text-tambo-lime mb-10 group-hover:scale-110 group-hover:bg-tambo-lime/10 transition-all duration-700 shadow-[0_0_20px_rgba(212,255,0,0.1)]">
                                {step.icon}
                            </div>
                            <h3 className="text-3xl text-white mb-6 font-display group-hover:text-tambo-lime transition-colors">{step.title}</h3>
                            <p className="text-white/50 leading-relaxed font-light text-base italic">
                                {step.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default EmotionalHook
