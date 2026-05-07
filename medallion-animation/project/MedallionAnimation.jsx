import { motion, useReducedMotion } from "motion/react";
import medallionSrc from "../uploads/medallion.svg";

export default function MedallionAnimation({
  size = 96,
  title = "Congratulations!",
  intro = "Your certificate for completing the course",
  courseName = "Creating Culture: Tips From the World’s Top CEOs and Leaders",
  outro = "is ready to download",
  ctaLabel = "Get Certificate",
  onCta,
}) {
  const reduced = useReducedMotion();

  const ease = [0.2, 0, 0, 1];
  const entranceDuration = 0.6;
  const rotationDuration = 12;
  const glowDuration = 2.4;
  const shimmerDuration = 2.8;

  const stageSize = size;

  if (reduced) {
    return (
      <div className="medallion-stage">
        <img src={medallionSrc} alt="" width={size} height={size} className="medallion-img" />
        <div className="medallion-info">
          <p className="medallion-title">{title}</p>
          <p className="medallion-body">{intro}</p>
          <p className="medallion-body medallion-body--bold">{courseName}</p>
          <p className="medallion-body">{outro}</p>
        </div>
        <button type="button" className="medallion-cta" onClick={onCta}>{ctaLabel}</button>
        <Styles />
      </div>
    );
  }

  return (
    <div className="medallion-stage">
      <motion.div
        className="medallion-entrance"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: entranceDuration, ease }}
        style={{ width: stageSize, height: stageSize, position: "relative" }}
      >
        <motion.div
          className="medallion-glow"
          animate={{
            opacity: [0, 0.85, 1, 0.85],
            scale: [1, 1, 1.08, 1],
          }}
          transition={{
            opacity: {
              times: [0, 0.25, 0.6, 1],
              duration: glowDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            },
            scale: {
              duration: glowDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            },
          }}
        />

        <motion.div
          className="medallion-rotator"
          animate={{ rotate: 360 }}
          transition={{
            duration: rotationDuration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <img src={medallionSrc} alt="" width={size} height={size} className="medallion-img" />
        </motion.div>

        <div className="medallion-shimmer" style={{ width: size, height: size }}>
          <motion.div
            className="medallion-shimmer-bar"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "400%", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: shimmerDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.9,
              times: [0, 0.15, 0.85, 1],
            }}
          />
        </div>
      </motion.div>

      <motion.div
        className="medallion-info"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12, delayChildren: 0.48 } },
        }}
      >
        <motion.p className="medallion-title" variants={lineVariants(ease)}>{title}</motion.p>
        <motion.p className="medallion-body" variants={lineVariants(ease)}>{intro}</motion.p>
        <motion.p className="medallion-body medallion-body--bold" variants={lineVariants(ease)}>{courseName}</motion.p>
        <motion.p className="medallion-body" variants={lineVariants(ease)}>{outro}</motion.p>
      </motion.div>

      <motion.button
        type="button"
        className="medallion-cta"
        onClick={onCta}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.48, delay: 0.98, ease }}
      >
        {ctaLabel}
      </motion.button>

      <Styles />
    </div>
  );
}

const lineVariants = (ease) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease } },
});

function Styles() {
  return (
    <style>{`
      .medallion-stage {
        width: 900px;
        height: 900px;
        background: radial-gradient(ellipse at 50% 40%, #2a2d3a 0%, #16181f 70%);
        border-radius: 36px;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 24px;
        padding: 32px;
        box-sizing: border-box;
        isolation: isolate;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
      }
      .medallion-entrance {
        display: grid;
        place-items: center;
      }
      .medallion-glow {
        position: absolute;
        inset: -64px;
        background: radial-gradient(circle at 50% 50%, rgba(255, 200, 80, 0.5) 0%, rgba(255, 187, 56, 0.26) 25%, rgba(255, 187, 56, 0.1) 50%, transparent 75%);
        filter: blur(18px);
        z-index: 0;
        pointer-events: none;
      }
      .medallion-rotator {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        z-index: 1;
      }
      .medallion-img {
        display: block;
        filter: drop-shadow(0 0 10px rgba(255, 195, 80, 0.55)) drop-shadow(0 6px 14px rgba(0, 0, 0, 0.35));
      }
      .medallion-shimmer {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        pointer-events: none;
        overflow: hidden;
        -webkit-mask-image: url('../uploads/medallion.svg');
        -webkit-mask-size: contain;
        -webkit-mask-position: center;
        -webkit-mask-repeat: no-repeat;
                mask-image: url('../uploads/medallion.svg');
                mask-size: contain;
                mask-position: center;
                mask-repeat: no-repeat;
                mask-mode: alpha;
      }
      .medallion-shimmer-bar {
        position: absolute;
        top: -20%;
        left: 0;
        width: 40%;
        height: 140%;
        background: linear-gradient(
          100deg,
          transparent 20%,
          rgba(255, 255, 255, 0) 35%,
          rgba(255, 255, 255, 0.55) 50%,
          rgba(255, 255, 255, 0) 65%,
          transparent 80%
        );
        transform: rotate(8deg);
      }
      .medallion-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        text-align: center;
        max-width: 800px;
      }
      .medallion-title,
      .medallion-body,
      .medallion-body--bold {
        margin: 0;
        line-height: 1.5;
      }
      .medallion-title {
        font-weight: 700;
        font-size: 24px;
        color: #f9f9fa;
      }
      .medallion-body {
        font-weight: 400;
        font-size: 16px;
        color: #bfc2cc;
      }
      .medallion-body--bold {
        font-weight: 700;
        font-size: 16px;
        color: #bfc2cc;
      }
      .medallion-cta {
        background: #00cee6;
        color: #20222a;
        border: 0;
        padding: 12px 24px;
        border-radius: 8px;
        font-family: inherit;
        font-weight: 700;
        font-size: 16px;
        line-height: 1.5;
        cursor: pointer;
      }
      .medallion-cta:hover { background: #00b9cf; }
    `}</style>
  );
}
