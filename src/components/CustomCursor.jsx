import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    const mouseX = useSpring(0, { stiffness: 800, damping: 40 })
    const mouseY = useSpring(0, { stiffness: 800, damping: 40 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isVisible) setIsVisible(true)
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }

        const handleMouseOver = (e) => {
            const target = e.target
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer')
            ) {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }

        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseover', handleMouseOver)
        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseover', handleMouseOver)
            document.removeEventListener('mouseleave', handleMouseLeave)
            document.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [mouseX, mouseY, isVisible])

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
            {/* Main Orb */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? [2, 2.2, 2] : [1, 1.1, 1],
                    backgroundColor: isHovering ? 'rgba(212, 255, 0, 0.4)' : 'rgba(0, 229, 255, 0.3)',
                    opacity: [0.6, 1, 0.6]
                }}
                transition={{
                    scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                    opacity: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                }}
                className="w-8 h-8 rounded-full blur-md"
            />

            {/* Inner Spark */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 0.5 : [1, 1.2, 1],
                    opacity: [1, 0.8, 1],
                }}
                transition={{
                    scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                    opacity: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                }}
                className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#fff]"
            />
        </div>
    )
}

export default CustomCursor
