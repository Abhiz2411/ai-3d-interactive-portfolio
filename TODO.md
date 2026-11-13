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

- Done on branch todo-batch-1: 1, 2 (15 of 16 recs have photos; Durvesh has none on LinkedIn), 3, 4, 7, 8 (projects), 9 (achievements), 10; testimonials link to LinkedIn; frames/images compressed; hero frames load when idle; unused 3D hero + desktop_pc removed.
- Remaining: 6 (mobile/portrait hero: needs a 9:16 video), re-check Lighthouse after each big change, then future chatbot/voice agent.
- Note: the info file listed the FinanceMe repo for both FinanceMe and Smart Parking; the smart-parking-assistant repo was used for Smart Parking.

## Observability / analytics (add to the future list)

- **Umami** for privacy-friendly analytics (page views, section views, resume downloads, contact submits).
- **Langfuse** for observability of the AI chatbot / voice agent (traces, prompts, latency, cost).
- **Sentry** for frontend error monitoring (React error boundary, source maps).

## Performance ideas

- Done (2026-11-14): hero frames compressed + idle-loaded, project/nav images to WebP/SVG, unused 3D hero + desktop_pc removed.
- Open: further trim the ~2 MB Spline runtime if Lighthouse still flags unused JS; consider AVIF; portrait hero frames for mobile.
- Re-measure with Lighthouse (mobile + Slow 4G) after each big change.

## Lighthouse (mobile, simulated Slow 4G, `vite preview`) - 2026-11-14

| Run | Score | LCP | CLS | TBT |
|---|---|---|---|---|
| Before fixes | 14 | 5.3 s | 0.774 | 1,970 ms |
| After self-hosted fonts, idle below-fold, lazy audio | 37 | 3.9 s | 0.723 | 620 ms |
| After preloader uses transform (not `top`) | 60 | 3.9 s | 0.002 | 680 ms |

- Open: TTI 14.6 s and TBT ~680 ms (main bundle ~1 MB / 295 KB gzip; Spline chunk 586 KB gzip loads late). Try splitting three/r3f/framer-motion out of the entry chunk.
