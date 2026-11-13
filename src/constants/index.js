import {
  neuralnet,
  neuralnet1,
  neuralnet2,
  neuralnet3,
  neuralnet4,
  astroPixel,
  krypton,
  krypton1,
  krypton2,
  krypton3,
  krypton4,
  krypton5,
  krypton6,
  code,
  concepts,
  coursera,
  cp,
  designs,
  fcc,
  hr,
  ideas,
  malariadetectionsystem,
  novalearn,
  portfolio,
  portfolioProject,
  astroPixel1,
  astroPixel2,
  astroPixel3,
  malariadetectionsystem1,
  malariadetectionsystem2,
  contact,
  skills,
  about,
  novalearn1,
  novalearn2,
} from "../assets";

export const navLinks = [
  {
    id: "testimonials",
    title: "Testimonials",
  },
  {
    id: "about",
    title: "About",
  },
  {
    id: "achievement",
    title: "Achievement",
  },
  {
    id: "contact",
    title: "Contact",
  },
];


const achievements = [
  {
    title: ["FreeCodeCamp"],
    company_name: "freeCodeCamp",
    icon: fcc,
    iconBg: "#383E56",
    date: "May 2024",
    points: ["Responsive Web Design", "JavaScript"],
  },
  {
    title: ["HackerRank"],
    company_name: "HackerRank",
    icon: hr,
    iconBg: "#E6DEDD",
    date: "Apr 2025",
    points: [
      "Python (Basic) Certificate",
      "SQL (Basic) Certificate",
      "CSS (Basic) Certificate",
      "Go (Basic) Certificate",
    ],
  },
  {
    title: ["Certiport"],
    company_name: "Certiport",
    icon: cp,
    iconBg: "#383E56",
    date: "Apr 2025",
    points: ["IT Specialist - HTML and CSS", "IT Specialist - Databases"],
  },
  {
    title: ["Coursera"],
    company_name: "Coursera",
    icon: coursera,
    iconBg: "#0056d2",
    date: "Jul 2025",
    points: ["IBM Full Stack Software Developer"],
  },
];

const testimonials = [
  {
    testimonial:
      "Abhijit is someone who takes ownership seriously, follows through on delivery, and communicates clearly along the way. He stays curious about new developments in the field, tests them out, and isn't afraid to go deep to understand how things really work. He backs this up with solid research and a habit of documenting and sharing his learnings for honest feedback. Overall, he's a dependable, growth oriented person to work with.",
    name: "Kunal Modi",
    linkedin: "https://www.linkedin.com/in/kunal-modi/",
    image: "/assets/testimonials/kunal-modi.jpg",
    designation: "Owner",
    company: "SkrypTech & Pure Billion Technologies",
  },
  {
    testimonial:
      "I had the pleasure of teaching and mentoring Abhijit during his postgraduate program, and he consistently impressed me with his curiosity, professionalism, and strong work ethic. Abhijit was one of the most engaged students in class, always asking thoughtful questions and going beyond the course material to understand concepts in depth. His enthusiasm for learning emerging AI technologies is matched by his willingness to experiment, research, and apply them to solve real-world problems. I also had the opportunity to work with Abhijit on a live client consulting project, where he demonstrated excellent ownership, attention to detail, and a high standard of professionalism. He approaches every task with integrity, delivers quality work, and can be trusted to follow through from start to finish. I am confident he will continue to excel and make meaningful contributions wherever his career takes him.",
    name: "Raghavshyam (Shaam) Ramamurthy",
    linkedin: "https://www.linkedin.com/in/shaam/",
    image: "/assets/testimonials/shaam.jpg",
    designation: "Analytics Translator and Visiting Faculty",
  },
  {
    testimonial:
      "Abhijit exudes a strong sense of curiosity, ownership and execution of AI projects. In my multiple interactions with Abhijit during the GenAI course that I taught at Jio Institute, I noticed that Abhijit dives deep into AI topics and is able to implement advanced AI workflows with thorough research. Abhijit also continues to stay at top of current industry trends and participates in several speaking events, showcasing his thought leadership across avenues. I'm confident that with his earnest and enterprising nature, he will be a strong asset at any organisation and team!",
    name: "Anant Agarwal",
    linkedin: "https://www.linkedin.com/in/agarwalanant/",
    image: "/assets/testimonials/agarwalanant.jpg",
    designation: "Principal Applied Scientist",
    company: "TrueFoundry",
  },
  {
    testimonial:
      "I had the opportunity to know Abhijit during our college days, and it has been great to see his growth over the years. He has always been someone who is genuinely passionate about technology and continuously invests time in learning and improving his skills. His journey into AI, Generative AI, DevOps, and backend technologies reflects his dedication and strong work ethic. What stands out most is his willingness to explore new ideas, solve challenging problems, and share his knowledge with the community. Abhijit is a curious learner, a dependable professional, and someone who approaches every challenge with a positive mindset. I'm confident he will continue to make meaningful contributions in the AI and technology space. I wish him continued success in his journey.",
    name: "Adnan Attar",
    linkedin: "https://www.linkedin.com/in/adnanattar/",
    image: "/assets/testimonials/adnanattar.jpg",
    designation: "Founder & CEO",
    company: "Andro Buddy Technologies Pvt. Ltd.",
  },
  {
    testimonial:
      "Abhijit is one of the brightest minds I have ever come across. His communication skills and quick grasp over new technologies is something which makes him unique from the crowd. He is a person who can relied upon for the end-to-end development and execution of projects due to his ownership attitude and high learning energy.",
    name: "Jayraj Choudhury",
    linkedin: "https://www.linkedin.com/in/jayraj-choudhury-0b003916b/",
    image: "/assets/testimonials/jayraj-choudhury-0b003916b.jpg",
    designation: "Data Scientist",
    company: "Motilal Oswal",
  },
  {
    testimonial:
      "I had the opportunity to work with Abhijit on an international project and have also seen him work and learn on numerous occasions. He has exceptional networking skills, strong expertise in DevOps and AIOps, and a remarkable ability to leverage AI tools to maximize productivity. If I were starting a startup tomorrow, Abhijit would be the first person I'd call to join the team.",
    name: "Ashutosh Patil",
    linkedin: "https://www.linkedin.com/in/ashutosh-patil-b9aa25242/",
    image: "/assets/testimonials/ashutosh-patil-b9aa25242.jpg",
    designation: "ADS",
    company: "GEP",
  },
  {
    testimonial:
      "Abhijit has a habit of going deep into problems rather than settling for a surface-level fix. He takes the time to understand how things actually work, and that's backed by the solid research he puts in before starting any task. It shows in the quality of the solutions he comes up with, they're well thought out and rarely need rework.",
    name: "Mayur Adlak",
    linkedin: "https://www.linkedin.com/in/mayur-adlak/",
    image: "/assets/testimonials/mayur-adlak.jpg",
    designation: "Senior Backend Engineer",
  },
  {
    testimonial:
      "Abhijit has a strong sense of ownership. He doesn't stop once his part is done, he makes sure the final product actually gets delivered. He communicates clearly with both team and clients along the way, which makes him easy to rely on.",
    name: "Ashutosh Singh",
    linkedin: "https://www.linkedin.com/in/ashutosh-singh-174886222/",
    image: "/assets/testimonials/ashutosh-singh-174886222.jpg",
    designation: "PGP in AI & DS",
    company: "Jio Institute",
  },
  {
    testimonial:
      "Working with Abhijeet showed me what true dedication to continuous learning looks like. Beyond his day-to-day responsibilities, he consistently invests time in open-source contributions and mini projects to expand his skills. His enthusiasm, curiosity, and drive to improve make him a great teammate and someone I'd gladly recommend.",
    name: "Jaival Patel",
    linkedin: "https://www.linkedin.com/in/jaival-patel/",
    image: "/assets/testimonials/jaival-patel.jpg",
    designation: "ADS",
    company: "GEP",
  },
  {
    testimonial:
      "I had the opportunity to be a batchmate of Abhijit during our time at Jio, and I also worked closely with him as part of the same group during a live project in college. What has always stood out about Abhijit is his dedication to learning and continuous improvement. He is naturally curious and consistently stays updated on the latest developments in AI, constantly exploring how emerging AI tools can be integrated to solve real-world challenges. Abhijit possesses a strong grasp of Generative AI and Agentic AI, combining technical understanding with a practical mindset. I highly recommend Abhijit for his strong expertise in Generative and Agentic AI, continuous learning mindset, and exceptional ability to collaborate effectively within a team.",
    name: "Siddhant Kankaria",
    linkedin: "https://www.linkedin.com/in/siddhant-kankaria-9982691aa/",
    image: "/assets/testimonials/siddhant-kankaria-9982691aa.jpg",
    designation: "Management Trainee",
    company: "Kotak AMC",
  },
  {
    testimonial:
      "I've had the pleasure of working with him and have always been impressed by his enthusiasm for learning new technologies and staying up to date with the latest industry trends. He is innovative, proactive, and always brings a positive attitude to the team. Technically, he has a strong understanding of his work and consistently delivers quality results. Beyond his technical skills, he also has excellent communication, presentation, and leadership abilities, making him a valuable team member and someone who can be relied upon in any collaborative environment. I highly recommend him and wish him continued success in his career.",
    name: "Durvesh Bodkar",
    linkedin: "https://www.linkedin.com/in/durvesh-bodkar-642a22217/",
    designation: "Associate Software Engineer",
    company: "Kanaka Software",
  },
  {
    testimonial:
      "Working alongside Abhijit, I've noticed he's always testing out new tools and technologies to see how they can be applied practically, and he doesn't stop at a shallow understanding either. He digs in until he actually understands how something works. That mix of curiosity and depth has been genuinely useful for the team.",
    name: "Satvashil Desai",
    linkedin: "https://www.linkedin.com/in/satvashil-desai-61a35220b/",
    image: "/assets/testimonials/satvashil-desai-61a35220b.jpg",
    designation: "Software Engineer",
  },
  {
    testimonial:
      "I worked with Abhijit at Kanaka Software and found him to be a sharp, hardworking engineer with a genuine passion for AI and DevOps. He's always eager to learn and takes on challenges with a positive attitude.",
    name: "Sanket Nagare",
    linkedin: "https://www.linkedin.com/in/sanket-nagare/",
    image: "/assets/testimonials/sanket-nagare.jpg",
    designation: "GenAI Engineer",
    company: "Deloitte",
  },
  {
    testimonial:
      "Hardworking, tech-savvy and highly dependable. He consistently delivers quality work, takes ownership of his responsibilities and always goes the extra mile. A great team player and a valuable asset to any organization.",
    name: "Rahil Kothari",
    linkedin: "https://www.linkedin.com/in/rahil-kothari-b0990a1ab/",
    image: "/assets/testimonials/rahil-kothari-b0990a1ab.jpg",
    designation: "AI Consultant",
    company: "Kotak Education Foundation",
  },
  {
    testimonial:
      "Abhijit is someone who takes ownership, is always eager to learn, and isn't afraid to try new things. His genuine curiosity, willingness to share knowledge with the community, and collaborative attitude make him a great teammate.",
    name: "Onkar Dighe",
    linkedin: "https://www.linkedin.com/in/onkardighe/",
    image: "/assets/testimonials/onkardighe.jpg",
    designation: "Associate Software Engineer",
    company: "Kanaka Software",
  },
  {
    testimonial:
      "Abhijit consistently performs at his best under pressure and tight deadlines. He is passionate about his work, remains focused in challenging situations, and is committed to delivering high-quality results.",
    name: "Jayesh Wadhe",
    linkedin: "https://www.linkedin.com/in/jayesh60/",
    image: "/assets/testimonials/jayesh60.jpg",
    designation: "SDE 1",
    company: "Pure Billion Technologies",
  },
];

const projects = [
  {
    name: "NeuralNet",
    description:
      "NeuralNet is a full-stack visual deep learning studio where you design neural networks with drag-and-drop nodes, compile to Keras, train with real TensorFlow metrics, and deploy secure prediction APIs.",
    tags: [
      {
        name: "react",
        color: "ruby-text-gradient",
      },
      {
        name: "Zustand",
        color: "green-text-gradient",
      },
      {
        name: "XYFlow",
        color: "violet-text-gradient",
      },
      {
        name: "TensorFlow",
        color: "pink-text-gradient",
      },
      {
        name: "Turso libsql",
        color: "blue-text-gradient",
      },
      {
        name: "Recharts",
        color: "orange-text-gradient",
      },
    ],
    image: neuralnet,
    images: [neuralnet, neuralnet1, neuralnet2, neuralnet3, neuralnet4], // Multiple screenshot support
    source_code_link: "https://github.com/Abhiz2411",
    metrics: {
      stars: 152,
      forks: 42,
      views: "2.3K",
    },
    features: [
      "Drag-and-drop layer nodes and connect them to design a model visually.",
      "Converts the visual graph into executable TensorFlow/Keras model code.",
      "Supports built-in datasets like MNIST, Fashion-MNIST, CIFAR-10, and CIFAR-100, plus custom dataset uploads.",
      "Lets users configure training and view metrics such as loss and accuracy over epochs.",
      "Trained models can be deployed as API endpoints with generated API keys.",
      "Provides a UI to test deployed models by sending inference requests and viewing predictions.",
    ],
  },
  {
    name: "Krypton",
    description:
      "Krypton is an AI-powered research assistant that searches arXiv and OpenAlex, ranks papers by relevance, recency, and citations, and helps users understand literature faster with Gemini-generated summaries, structured insights, research-gap analysis, and personalized topic recommendations in a FastAPI + React app.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "arxiv",
        color: "green-text-gradient",
      },
      {
        name: "fastapi",
        color: "pink-text-gradient",
      },
      {
        name: "openalex",
        color: "violet-text-gradient",
      },
      {
        name: "jwt-authentication",
        color: "orange-text-gradient",
      },
    ],
    image: krypton,
    images: [
      krypton,
      krypton1,
      krypton2,
      krypton3,
      krypton4,
      krypton5,
      krypton6,
    ], // Multiple screenshot support
    source_code_link: "https://github.com/Abhiz2411",
    metrics: {
      stars: 152,
      forks: 42,
      views: "2.3K",
    },
    features: [
      "Multi-source paper search across arXiv and OpenAlex in one query flow.",
      "Intelligent ranking using relevance (TF-IDF), recency, and citation-based scoring.",
      "AI-generated paper understanding with plain-English summaries and key contributions.",
      "Structured insight extraction for each paper: problem, method, result, and limitation.",
      "Research gap analysis that finds open questions and thematic opportunity clusters.",
      "Personalized research experience with user profiles, topic recommendations, and goal-aware suggestions.",
    ],
  },
  {
    name: "AstroPixel",
    description:
      "AstroPixel is a FastAPI + React platform for exploring NASA gigapixel imagery with buttery-smooth deep zoom, annotations, and secure user/admin workflows. It ingests GeoTIFF/PSB files, generates tile pyramids with GDAL, and serves them through an optimized viewer.",
    tags: [
      {
        name: "FastAPI",
        color: "blue-text-gradient",
      },
      {
        name: "GDAL",
        color: "green-text-gradient",
      },
      {
        name: "OpenSeadragon",
        color: "pink-text-gradient",
      },
      {
        name: "Cloudflare R2",
        color: "violet-text-gradient",
      },
      {
        name: "PostgreSQL",
        color: "orange-text-gradient",
      },
    ],
    image: astroPixel,
    images: [astroPixel, astroPixel1, astroPixel2, astroPixel3], // Multiple screenshot support
    source_code_link: "https://github.com/Abhiz2411",
    metrics: {
      stars: 152,
      forks: 42,
      views: "2.3K",
    },
    features: [
      "Deep zoom functionality for gigapixel imagery",
      "Secure user authentication and admin workflows",
      "Annotation system for collaborative marking",
      "GeoTIFF and PSB file ingestion",
      "Cloudflare R2 integration for scalable storage",
      "PostgreSQL database for persistent data",
    ],
  },
  {
    name: "Malaria Detection System",
    description:
      "AI-powered malaria detection system for hospitals with patient management, PDF report generation, and real-time analytics. Built with React, Supabase & FastAPI.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "Supabase",
        color: "green-text-gradient",
      },
      {
        name: "FastAPI",
        color: "pink-text-gradient",
      },
      {
        name: "Keras",
        color: "violet-text-gradient",
      },
    ],
    image: malariadetectionsystem,
    images: [
      malariadetectionsystem,
      malariadetectionsystem1,
      malariadetectionsystem2,
    ], // Multiple screenshot support
    source_code_link: "https://github.com/Abhiz2411",
    metrics: {
      stars: 89,
      forks: 28,
      views: "1.8K",
    },
    features: [
      "AI-powered malaria cell detection using Keras",
      "Patient management system",
      "Automated PDF report generation",
      "Real-time analytics dashboard",
      "Hospital workflow integration",
      "Secure data storage with Supabase",
    ],
  },
  {
    name: "3D Portfolio",
    description:
      "A dynamic React JS portfolio with immersive 3D graphics and smooth animations for an engaging user experience. Includes interactive sections like About, Education, Projects, Connect, and Contact. 🎨💻",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "green-text-gradient",
      },
      {
        name: "framer-motion",
        color: "pink-text-gradient",
      },
      {
        name: "three.js",
        color: "orange-text-gradient",
      },
      {
        name: "spline",
        color: "violet-text-gradient",
      },
    ],
    image: portfolioProject,
    images: [portfolioProject, about, skills, contact], // Multiple screenshot support
    source_code_link: "https://github.com/Abhiz2411",
    metrics: {
      stars: 234,
      forks: 67,
      views: "5.2K",
    },
    features: [
      "Immersive 3D graphics with Three.js",
      "Smooth scroll animations with Framer Motion",
      "Interactive 3D models and environments",
      "Responsive design across all devices",
      "Easter eggs and interactive elements",
      "Custom elastic cursor with physics",
    ],
  },
  {
    name: "Nova-Learn",
    description:
      "NovaLearn is an AI-powered platform that creates personalized learning paths with interactive content and quizzes. Designed with a futuristic 3D UI, it makes learning immersive, efficient, and goal-driven. 🚀",
    tags: [
      {
        name: "node",
        color: "blue-text-gradient",
      },
      {
        name: "spline",
        color: "green-text-gradient",
      },
      {
        name: "JavaScript",
        color: "pink-text-gradient",
      },
      {
        name: "Flask",
        color: "violet-text-gradient",
      },
      {
        name: "sqlite3",
        color: "orange-text-gradient",
      },
    ],
    image: novalearn,
    images: [novalearn, novalearn1, novalearn2], // Multiple screenshot support
    source_code_link: "https://github.com/Abhiz2411",
    metrics: {
      stars: 127,
      forks: 35,
      views: "3.1K",
    },
    features: [
      "Personalized learning path generation",
      "Interactive 3D user interface",
      "Dynamic quiz generation",
      "Progress tracking and analytics",
      "Futuristic design system",
      "Mobile-responsive learning experience",
    ],
  },
];

const words = [
  { text: "Ideas", imgPath: ideas, font: "Arial, sans-serif" },
  {
    text: "Concepts",
    imgPath: concepts,
    font: "'Courier New', Courier, monospace",
  },
  {
    text: "Designs",
    imgPath: designs,
    font: "'Times New Roman', Times, serif",
  },
  { text: "Code", imgPath: code, font: "'Fira Mono', monospace" },
  {
    text: "Ideas",
    imgPath: ideas,
    font: "'Comic Sans MS', cursive, sans-serif",
  },
  { text: "Concepts", imgPath: concepts, font: "'Roboto', sans-serif" },
  { text: "Designs", imgPath: designs, font: "'Georgia', serif" },
  { text: "Code", imgPath: code, font: "'Source Code Pro', monospace" },
];

export { achievements, projects, testimonials, words };
