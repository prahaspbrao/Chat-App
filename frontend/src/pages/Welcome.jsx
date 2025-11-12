import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle, Send, Sparkles } from "lucide-react";

const WelcomePage = () => {
  return (
    <div className="absolute inset-0 h-screen w-screen flex flex-col items-center justify-center overflow-hidden bg-slate-900 text-white px-4 sm:px-6">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#4f4f4f1e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1e_1px,transparent_1px)] bg-[size:18px_28px]" />

      {/* Glowing background motion */}
      <motion.div
        className="absolute top-0 left-0 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-pink-500 opacity-25 blur-[100px] sm:blur-[140px]"
        animate={{ x: [0, 30, -30, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-cyan-500 opacity-25 blur-[100px] sm:blur-[140px]"
        animate={{ x: [0, -30, 30, 0], y: [0, 20, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating icons */}
      <motion.div
        className="absolute top-24 sm:top-32 right-12 sm:right-24 text-cyan-400/40"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Send size={36} className="sm:size-48" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 sm:bottom-28 left-12 sm:left-20 text-pink-400/40"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <MessageCircle size={36} className="sm:size-48" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center max-w-sm sm:max-w-2xl mt-12 sm:mt-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          ChatSphere
        </motion.h1>

        <motion.p
          className="text-gray-300 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Real-time conversations that feel effortless.  
          Connect, share, and stay close — all in one secure place.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Link
            to="/login"
            className="group px-8 py-3 sm:px-10 sm:py-4 rounded-2xl bg-cyan-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transition-all flex items-center gap-2"
          >
            Get Started
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              →
            </motion.span>
          </Link>

          <Link
            to="/signup"
            className="px-8 py-3 sm:px-10 sm:py-4 rounded-2xl border border-cyan-400 text-cyan-400 font-semibold text-sm sm:text-base hover:bg-cyan-500/10 transition-all flex items-center gap-2"
          >
            <Sparkles size={16} className="sm:size-18" />
            Create Account
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer className="absolute bottom-3 sm:bottom-4 text-gray-500 text-xs sm:text-sm">
        © {new Date().getFullYear()} ChatSphere • Built for seamless connection.
      </footer>
    </div>
  );
};

export default WelcomePage;
