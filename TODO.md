# TODO

## Planned work

1. **All recommendations on the site**
   Show every received LinkedIn recommendation (15 at last check), not just the current 6.
   Source: https://www.linkedin.com/in/zende-abhijit/details/recommendations/ (Received tab).

2. **Profile pictures on recommendations**
   Use each recommender's LinkedIn profile picture instead of the initial-letter circle.

3. **Infinite horizontal scroll for testimonials**
   - Marquee-style loop so the section doesn't use much vertical space.
   - Slow enough to read.
   - On hover: pause the scroll and pop up / enlarge the hovered card.

4. **Favicon -> "AZ"**

5. **Home page performance**
   Laggy and unresponsive to vertical scroll, very resource heavy. Optimize so low-end machines run it smoothly.

6. **Mobile version**
   - Vertical (portrait) hero video/frames for phones; phones get the mobile home page.
   - Responsive, mobile friendly, and optimized (no lag).
   - Measured on the performance tab: LCP 5.95s, CLS 0.42. Re-measure after fixes.

7. **Update resume link**

8. **Update Projects section** with Abhijit's current projects

9. **Update Achievements section**

10. **Testimonial order**
    1. Kunal Modi
    2. Raghavshyam (Shaam) Ramamurthy
    3. Anant Agarwal
    4. Adnan Attar (NOT in the 15 received recommendations seen on 2026-10-27; confirm name/where it is)
    5. The rest

## Future (after the above is done)

1. **AI chatbot** that answers questions about Abhijit.
2. **Voice agent** (voice calling version of the chatbot), answers questions about Abhijit, rate limited.

## Done / in progress

- Done on branch todo-batch-1: items 1, 2 (15 of 16 recs have photos; Durvesh has none on LinkedIn), 3, 4, 7, 10; performance pass for 5 (re-measure LCP/CLS on `npm run build && npm run preview` with real throttling).
- Remaining: 6 (mobile/portrait hero), 8 (projects), 9 (achievements), then future chatbot/voice agent.

## Observability / analytics (add to the future list)

- **Umami** for privacy-friendly analytics (page views, section views, resume downloads, contact submits).
- **Langfuse** for observability of the AI chatbot / voice agent (traces, prompts, latency, cost).
- **Sentry** for frontend error monitoring (React error boundary, source maps).

## Performance ideas (from the 2026-11-13 review)

- Defer remaining hero frames until idle and compress them (~13 MB loaded on desktop).
- Convert project screenshots (PNG, ~1.5 MB each) to WebP/AVIF at proper sizes.
- Remove unused `public/desktop_pc` (16 MB) and the old `Hero.jsx` / `Computers.jsx`.
- Split the ~2 MB Spline runtime chunk so it only loads with the skills keyboard (already lazy).
- Re-measure with Lighthouse on `npm run preview` with mobile + Slow 4G throttling.
