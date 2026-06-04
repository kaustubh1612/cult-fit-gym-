/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface CultFitLogoProps {
  showWordmark?: boolean;
  className?: string; // controls outer dimensions and text scaling
  iconColor?: string; // default is 'currentColor' (white/slate)
  isAnimated?: boolean;
}

export const CultFitLogo: React.FC<CultFitLogoProps> = ({
  showWordmark = true,
  className = '',
  iconColor = 'stroke-white',
  isAnimated = true,
}) => {
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  const drawPath = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const scaleCircle = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2
      }
    }
  };

  const pinkRayAnimation = {
    hover: {
      y: -4,
      scaleY: 1.15,
      transition: { duration: 0.2, yoyo: Infinity }
    }
  };

  const blueRayAnimation = {
    hover: {
      scale: 1.1,
      rotate: -5,
      transition: { duration: 0.3 }
    }
  };

  const yellowRayAnimation = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial={isAnimated ? "initial" : undefined}
      animate={isAnimated ? "animate" : undefined}
      whileHover="hover"
      className={`inline-flex items-center gap-3.5 select-none ${className}`}
    >
      {/* CULT.FIT VECTOR BRAND ICON */}
      <svg
        width="44"
        height="44"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Central Head Circle */}
        <motion.circle
          cx="50"
          cy="42"
          r="8.5"
          className={`${iconColor} fill-transparent`}
          strokeWidth="7"
          strokeLinecap="round"
          variants={isAnimated ? scaleCircle : undefined}
        />

        {/* Top/Vertical Pink Ray */}
        <motion.line
          x1="50"
          y1="13"
          x2="50"
          y2="24"
          stroke="#FF2D55"
          strokeWidth="7"
          strokeLinecap="round"
          variants={isAnimated ? drawPath : undefined}
          whileHover={pinkRayAnimation.hover}
        />

        {/* Up-Left Black/White Diagonal Ray */}
        <motion.line
          x1="23"
          y1="25"
          x2="33.5"
          y2="33"
          className={iconColor}
          strokeWidth="7.5"
          strokeLinecap="round"
          variants={isAnimated ? drawPath : undefined}
        />

        {/* Up-Right Black/White Diagonal Ray */}
        <motion.line
          x1="77"
          y1="25"
          x2="66.5"
          y2="33"
          className={iconColor}
          strokeWidth="7.5"
          strokeLinecap="round"
          variants={isAnimated ? drawPath : undefined}
        />

        {/* Main Thick Horizontal Bar (Arms) */}
        <motion.line
          x1="14"
          y1="50"
          x2="86"
          y2="50"
          className={iconColor}
          strokeWidth="7.5"
          strokeLinecap="round"
          variants={isAnimated ? drawPath : undefined}
        />

        {/* Down-Left Sky Blue Diagonal Ray */}
        <motion.line
          x1="21.5"
          y1="71.5"
          x2="33"
          y2="63"
          stroke="#00E5FF"
          strokeWidth="7.5"
          strokeLinecap="round"
          variants={isAnimated ? drawPath : undefined}
          whileHover={blueRayAnimation.hover}
        />

        {/* Down-Right Bright Yellow Diagonal Ray */}
        <motion.line
          x1="78.5"
          y1="71.5"
          x2="67"
          y2="63"
          stroke="#FFD200"
          strokeWidth="7.5"
          strokeLinecap="round"
          variants={isAnimated ? drawPath : undefined}
          whileHover={yellowRayAnimation.hover}
        />

        {/* Strong Legs Arch - Inverted 'V' shape */}
        <motion.path
          d="M29 82 L50 60 L71 82"
          className={iconColor}
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={isAnimated ? drawPath : undefined}
        />

        {/* Bottom vertical baseline tick */}
        <motion.line
          x1="50"
          y1="74"
          x2="50"
          y2="87"
          className={iconColor}
          strokeWidth="7.5"
          strokeLinecap="round"
          variants={isAnimated ? drawPath : undefined}
        />
      </svg>

      {/* CULT.FIT TEXT WORDMARK */}
      {showWordmark && (
        <div className="flex flex-col justify-center select-none font-sans">
          <div className="flex items-baseline leading-none">
            <span className="text-[25px] font-black lowercase tracking-tight text-white font-sans">
              cult
            </span>
            <span className="text-[25px] font-bold text-[#FF2D15] lowercase leading-none select-none font-sans">
              .
            </span>
            <span className="text-[25px] font-semibold lowercase tracking-tight text-white font-sans">
              fit
            </span>
          </div>
          <span className="text-[9px] font-mono font-medium tracking-[0.25em] text-[#00E5FF] uppercase mt-0.5 leading-none">
            KHARADI ELITE
          </span>
        </div>
      )}
    </motion.div>
  );
};
