import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  testimonial,
  name,
  designation,
  company,
  image,
  linkedin,
}) => (
  <a
    href={linkedin}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${name} on LinkedIn`}
    className="testimonial-card block bg-[#0f0f0f] p-8 rounded-3xl w-[300px] xs:w-[340px] shrink-0 cursor-pointer outline-none no-underline"
  >
    <p className="text-white font-black text-[40px] leading-none">"</p>

    <div className="mt-1">
      <p className="testimonial-text text-white tracking-wide text-[15px] leading-relaxed">
        {testimonial}
      </p>

      <div className="mt-7 flex justify-between items-center gap-1">
        <div className="flex-1 flex flex-col">
          <p className="text-white font-medium text-[16px]">
            <span className="blue-text-gradient">@</span> {name}
          </p>
          <p className="mt-1 text-secondary text-[12px]">
            {designation}
            {company ? `, ${company}` : ""}
          </p>
        </div>

        {image ? (
          <img
            src={image}
            alt={`feedback_by-${name}`}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="w-10 h-10 shrink-0 rounded-full bg-[#111522] text-[#8ec5ff] flex items-center justify-center font-medium text-[14px]"
          >
            {name.charAt(0)}
          </div>
        )}
      </div>
    </div>
  </a>
);

// ~9s per card: slow enough to read, quick enough to feel alive.
const SECONDS_PER_CARD = 9;

// Full-bleed section (no boxed parent) so the marquee runs edge to edge of the
// viewport; only the heading is constrained to the page's content width.
const Feedbacks = () => {
  return (
    <section className="relative z-0 w-full overflow-x-clip">
      <span className="hash-span" id="testimonials">
        &nbsp;
      </span>

      <div className={`max-w-7xl mx-auto ${styles.padding} pb-0`}>
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className={`text-[#8ec5ff] ${styles.sectionSubText}`}>
            What others say
          </p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>

      <div className="testimonial-marquee w-full pt-10 pb-14 min-h-[520px]">
        <div
          className="testimonial-track"
          style={{
            "--marquee-duration": `${testimonials.length * SECONDS_PER_CARD}s`,
          }}
        >
          {/* Rendered twice so the -50% translate loops seamlessly. */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <FeedbackCard
              key={`${testimonial.name}-${index}`}
              {...testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feedbacks;
