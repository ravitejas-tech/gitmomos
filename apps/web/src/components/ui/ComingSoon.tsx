import * as React from 'react';
import { motion } from 'framer-motion';
import { Construction, ArrowLeft } from 'lucide-react';
import { Button } from './Button';
import { useNavigate } from 'react-router';

interface ComingSoonProps {
    title?: string;
    description?: string;
    showBackButton?: boolean;
}

export function ComingSoon({ 
    title = "Feature Coming Soon", 
    description = "We're working hard to bring this feature to life. Stay tuned for updates!",
    showBackButton = true
}: ComingSoonProps) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20 
                }}
                className="mb-8 p-6 rounded-3xl bg-primary-gradient/10 border border-primary-purple/20 relative"
            >
                <Construction className="w-16 h-16 text-primary-purple" />
                <motion.div 
                    animate={{ 
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{ 
                        repeat: Infinity, 
                        duration: 3,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-2 -right-2 bg-amber-400 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-lg"
                >
                    WIP
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-text-primary mb-4">
                    {title}
                </h2>
                <p className="text-text-secondary max-w-md mx-auto mb-10 leading-relaxed">
                    {description}
                </p>
                
                {showBackButton && (
                    <Button 
                        variant="outline" 
                        onClick={() => navigate('/dashboard')}
                        className="group hover:border-primary-purple/50"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Return to Dashboard
                    </Button>
                )}
            </motion.div>
        </div>
    );
}
