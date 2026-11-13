import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <div
    tabIndex={0}
    className="testimonial-card bg-[#0f0f0f] p-8 rounded-3xl w-[300px] xs:w-[340px] shrink-0 cursor-default outline-none"
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
  </div>
);

// ~14s per card keeps the scroll slow enough to read.
const SECONDS_PER_CARD = 14;

const Feedbacks = () => {
  return (
      <div className={`mt-12 bg-[#0a0c14] rounded-[20px]`}>
        <div
          className={` bg-[#111522] rounded-2xl ${styles.padding} min-h-[300px]`}
        >
          <motion.div variants={textVariant()}>
            <p className={`text-[#8ec5ff] ${styles.sectionSubText}`}>
              What others say
            </p>
            <h2 className={styles.sectionHeadText}>Testimonials.</h2>
          </motion.div>
        </div>
        <div className="testimonial-marquee -mt-20 pb-14 min-h-[480px]">
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
    </div>
  );
};

export default SectionWrapper(Feedbacks, "testimonials");
