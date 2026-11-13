import {
  github,
  iconCampus,
  iconGlobe,
  iconGraduation,
  iconHackathon,
  iconLinkedIn,
  iconMedal,
  iconSpeaker,
  code,
  concepts,
  coursera,
  cp,
  designs,
  fcc,
  hr,
  ideas,
  mlBenchmark,
  portfolioSite,
  energyForecasting,
  dementiaCare,
  askMyPdf,
  pathfinder,
  cinematch,
  financeMe,
  smartParking,
  smartParkingDiagram,
  lsbStego,
  contact,
  skills,
  about,
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
    id: "achievements",
    title: "Achievement",
  },
  {
    id: "contact",
    title: "Contact",
  },
];


const achievements = [
  {
    title: ["Best Outgoing Student", "(CSE, 2023 batch)"],
    company_name: "TKIET, Warananagar",
    icon: iconGraduation,
    iconBg: "#2a2150",
    date: "Apr 2023",
    points: [
      "Nominated Best Outgoing Student from the Computer Science and Engineering branch at Tatyasaheb Kore Institute of Engineering & Technology (about 250 CSE and 750 students across branches).",
      "Graduated with an 8.9 CGPA, cracked campus placements with two companies and placed 3rd in the college project presentation.",
    ],
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7211815398814470144/",
  },
  {
    title: ["Kanaka Hackathon Winner"],
    company_name: "Kanaka Software",
    icon: iconHackathon,
    iconBg: "#1d2a4a",
    date: "Nov 2023",
    points: [
      "Team Medi-कवच won 1st prize (₹1 lakh) at the 3rd edition of the Kanaka Software hackathon.",
    ],
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7130067327064154112/",
  },
  {
    title: ["National AI Competition", "Winning Team Mentor"],
    company_name: "Tech4Change x Intel x Lodha Oakwood School",
    icon: iconMedal,
    iconBg: "#3b2a12",
    date: "Aug 2024",
    points: [
      "Mentored the Future of Technology Innovators team to win the junior category of a national AI competition on Sustainable Development Goal 12: Sustainable Smart Cities.",
      "The team built four projects, including an AI Smart Parking Assistant using Arduino UNO, IR sensors and a Python GUI.",
      "Won a ₹75,000 cash prize, scholarships and a 4-week internship opportunity at Ashoka University.",
    ],
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7226693377616973824/",
  },
  {
    title: ["Top 0.07% on LinkedIn"],
    company_name: "LinkedIn",
    icon: iconLinkedIn,
    iconBg: "#0a66c2",
    date: "Dec 2024",
    points: [
      "Named among LinkedIn's top 0.07% of users globally in the 2024 LinkedIn Unwrapped.",
      "28 posts, 1,648 total reactions and 56 comments in 2024.",
    ],
    link: "https://lnkd.in/p/dWqgm7ja",
  },
  {
    title: ["International Immersion Programme", "Nanyang Technological University"],
    company_name: "NTU Singapore",
    icon: iconGlobe,
    iconBg: "#14313f",
    date: "Aug 2025",
    points: [
      "Completed a 14-day International Immersion Programme at NTU Singapore (ranked #12 in QS 2026) through Jio Institute.",
      "Studied ML for Business and Strategy for AI: governance, business models and adoption challenges.",
    ],
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7378269798767624192/",
  },
  {
    title: ["Guest Speaker", "Somaiya Vidyavihar University"],
    company_name: "Somaiya Vidyavihar University",
    icon: iconSpeaker,
    iconBg: "#3a1a2e",
    date: "May 2026",
    points: [
      "Invited to deliver an expert session on Applications of AI/ML Techniques for Malware Analysis to the Information Technology department.",
      "Received an appreciation letter from the department.",
    ],
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7456908095689121792/",
  },
  {
    title: ["Guest of Honour", "Future Ready Engineers Program"],
    company_name: "TKIET, Warananagar",
    icon: iconCampus,
    iconBg: "#1f3a2a",
    date: "Oct 2026",
    points: [
      "Returned to my alma mater, Tatyasaheb Kore Institute of Engineering & Technology, as Guest of Honour for the Future Ready Engineers Program 2026-27.",
      "Spent 7 hours with students of the Department of CSE talking about the AI engineering work I do every day.",
    ],
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7519327357556387840/",
  },
  {
    title: ["GitHub", "322-star open-source portfolio"],
    company_name: "GitHub",
    icon: github,
    iconBg: "#E6DEDD",
    date: "Open source",
    points: [
      "My 3D interactive portfolio repository has earned 322 stars and 67 forks.",
      "GitHub achievements: Starstruck, Pull Shark, Pair Extraordinaire and Quickdraw.",
    ],
    link: "https://github.com/Abhiz2411/3D-interactive-portfolio",
    linkLabel: "View on GitHub",
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
    name: "ML Model Comparator",
    description:
      "A universal Streamlit app that trains and compares six machine learning models on any CSV dataset, entirely in the browser. Upload data, pick a task and target, and get side-by-side metrics and visualisations with no pre-training. Built for the PGP in AI & DS program at Jio Institute and validated on the UCI Bank Marketing dataset.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "streamlit", color: "pink-text-gradient" },
      { name: "scikit-learn", color: "orange-text-gradient" },
      { name: "xgboost", color: "green-text-gradient" },
    ],
    image: mlBenchmark,
    source_code_link: "https://github.com/Abhiz2411/ml-benchmark-app",
    live_demo_link: "https://ml-benchmark-app.streamlit.app/",
    metrics: { stars: 1, forks: 1 },
    features: [
      "Upload any CSV, preview its shape and column types, and auto-detect binary, multiclass or regression tasks.",
      "Trains 6 models on the fly with an 80/20 split: Logistic Regression, Decision Tree, KNN, Naive Bayes, Random Forest and XGBoost.",
      "One highlighted comparison table with the best value per metric (Accuracy, AUC, Precision, Recall, F1, MCC).",
      "Drill-down per model with confusion matrix, radar chart, bar chart and classification report.",
      "Automatic preprocessing: label encoding for categoricals and median fill for missing numerics.",
    ],
  },
  {
    name: "3D Portfolio Website",
    description:
      "This portfolio: a scroll-driven, space-themed site with an image-sequence hero, an interactive 3D skills keyboard, a testimonials marquee and smooth motion design, tuned to stay fast on low-end devices.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "vite", color: "violet-text-gradient" },
      { name: "three.js", color: "green-text-gradient" },
      { name: "spline", color: "pink-text-gradient" },
      { name: "gsap", color: "orange-text-gradient" },
      { name: "tailwindcss", color: "blue-text-gradient" },
    ],
    image: portfolioSite,
    source_code_link: "https://github.com/Abhiz2411/ai-3d-interactive-portfolio",
    live_demo_link: "https://ai-3d-portfolio.netlify.app/",
    metrics: { stars: 0, forks: 0 },
    features: [
      "Scrollytelling hero that scrubs a compressed frame sequence on canvas.",
      "Interactive Spline-powered 3D keyboard with skills as keycaps.",
      "Infinite, hover-to-pause testimonials marquee linking to LinkedIn profiles.",
      "Lazy-loaded sections and 3D scenes, code-splitting and staged asset loading for speed.",
      "Framer Motion and GSAP animations, a custom elastic cursor and a fully responsive layout.",
    ],
  },
  {
    name: "Energy Demand & Solar Forecasting",
    description:
      "A time series analysis project that forecasts Italy's 2016 electricity demand and solar power generation, supporting grid stability and renewable energy planning. Built as a team project for the Time Series Analysis course.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "statsmodels", color: "green-text-gradient" },
      { name: "prophet", color: "pink-text-gradient" },
      { name: "jupyter", color: "orange-text-gradient" },
    ],
    image: energyForecasting,
    source_code_link:
      "https://github.com/Abhiz2411/energy-demand-solar-forecasting",
    metrics: { stars: 0, forks: 0 },
    features: [
      "Preprocessing of hourly demand and solar records, with missing value and outlier handling.",
      "Exploratory analysis of daily, weekly and yearly seasonality and the demand/solar relationship.",
      "Trend, seasonality and residual decomposition, plus ADF stationarity tests and differencing.",
      "Forecasting with ARIMA, SARIMA, Holt-Winters and Facebook Prophet, evaluated with RMSE, MAPE and MAE.",
      "Forecast plots with confidence intervals and a model comparison report.",
    ],
  },
  {
    name: "Dementia Care Assistant",
    description:
      "A local-first, voice-based cognitive assessment agent for dementia care. A state-machine conversation engine runs memory, orientation, attention and planning tasks and scores them automatically, using locally hosted XTTS v2 for multilingual voice cloning.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "flask", color: "green-text-gradient" },
      { name: "xtts-v2", color: "pink-text-gradient" },
      { name: "gemini-asr", color: "orange-text-gradient" },
    ],
    image: dementiaCare,
    source_code_link: "https://github.com/Abhiz2411/dementia-care-assistant",
    metrics: { stars: 1, forks: 0 },
    features: [
      "Voice cloning with XTTS v2 so the assistant can speak in a familiar voice, all running locally.",
      "Cognitive test flow: greeting, three-word memory test, intervening questions, delayed recall and summary.",
      "Automated domain-wise scoring from Excellent to Needs Attention.",
      "Simple HTML/JS front end with microphone recording and playback.",
      "Local-first by design, with Docker Compose for the Flask and XTTS services.",
    ],
  },
  {
    name: "Ask My PDF",
    description:
      "A Next.js app that lets you upload a PDF and chat with it. It extracts and chunks the text, embeds it with OpenAI, retrieves the most relevant passages by cosine similarity and answers with GPT, with voice input for questions.",
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "typescript", color: "violet-text-gradient" },
      { name: "openai", color: "green-text-gradient" },
      { name: "rag", color: "pink-text-gradient" },
    ],
    image: askMyPdf,
    source_code_link: "https://github.com/Abhiz2411/ask-my-pdf-v02",
    metrics: { stars: 0, forks: 0 },
    features: [
      "PDF upload with automatic text extraction and chunking (about 500 words with overlap).",
      "Retrieval-augmented answers: embeddings plus cosine similarity pick the top matching chunks.",
      "Chat with message history and real-time responses.",
      "Speech-to-text question input using the Web Speech API.",
      "Responsive interface, ready to deploy on Vercel.",
    ],
  },
  {
    name: "Pathfinder Visualizer",
    description:
      "An interactive web tool that visualises the A* and Dijkstra shortest-path algorithms on a grid. Draw your own mazes and watch each algorithm explore nodes and trace the final path in real time.",
    tags: [
      { name: "javascript", color: "orange-text-gradient" },
      { name: "html", color: "pink-text-gradient" },
      { name: "css", color: "blue-text-gradient" },
      { name: "algorithms", color: "green-text-gradient" },
    ],
    image: pathfinder,
    source_code_link: "https://github.com/Abhiz2411/pathfinder-visualizer",
    metrics: { stars: 0, forks: 1 },
    features: [
      "Side-by-side exploration of A* and Dijkstra's algorithm with step-by-step animation.",
      "Interactive maze builder: place start and end points and draw obstacles with the mouse.",
      "Colour-coded open set, closed set and final path for easy reading.",
      "Responsive layout with a one-click grid reset.",
    ],
  },
  {
    name: "CineMatch",
    description:
      "A personalised movie recommendation app built with Streamlit. Pick a favourite film and it returns five similar titles using TF-IDF vectorisation and cosine similarity, with live posters pulled from the TMDB API.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "streamlit", color: "pink-text-gradient" },
      { name: "scikit-learn", color: "orange-text-gradient" },
      { name: "tmdb-api", color: "green-text-gradient" },
    ],
    image: cinematch,
    source_code_link: "https://github.com/Abhiz2411/cinematch",
    metrics: { stars: 2, forks: 1 },
    features: [
      "Recommends 5 similar movies for any selected title.",
      "Content-based filtering with TF-IDF and cosine similarity on the TMDB movie metadata dataset.",
      "Fetches real-time movie posters from the TMDB API.",
      "Simple Streamlit interface with precomputed similarity data for fast responses.",
    ],
  },
  {
    name: "FinanceMe DevOps Pipeline",
    description:
      "An end-to-end DevOps project for a banking and finance company moving from a monolith to microservices. Terraform provisions the AWS infrastructure, Jenkins automates build and deployment, and Prometheus and Grafana monitor everything.",
    tags: [
      { name: "aws", color: "orange-text-gradient" },
      { name: "terraform", color: "violet-text-gradient" },
      { name: "jenkins", color: "pink-text-gradient" },
      { name: "docker", color: "blue-text-gradient" },
      { name: "ansible", color: "green-text-gradient" },
    ],
    image: financeMe,
    source_code_link:
      "https://github.com/Abhiz2411/FinanceMe-Devops-Project-01",
    metrics: { stars: 6, forks: 1 },
    features: [
      "Terraform provisions four AWS EC2 servers: Jenkins master, build, production and monitoring.",
      "Jenkins CI/CD pipeline with a build slave that builds the app and Docker image and pushes to DockerHub.",
      "Ansible deploys the Docker container to the production server.",
      "Prometheus, Node Exporter and Grafana give continuous monitoring of the build and production servers.",
    ],
  },
  {
    name: "Smart Parking Assistant",
    description:
      "An IoT project that uses an Arduino and ten IR sensors to detect free parking spots and recommend the best one to drivers in real time, shown in a Python GUI. Built and demonstrated as a working hardware prototype.",
    tags: [
      { name: "arduino", color: "green-text-gradient" },
      { name: "python", color: "blue-text-gradient" },
      { name: "tkinter", color: "pink-text-gradient" },
      { name: "iot", color: "orange-text-gradient" },
    ],
    image: smartParking,
    images: [smartParking, smartParkingDiagram],
    source_code_link: "https://github.com/Abhiz2411/smart-parking-assistant",
    metrics: { stars: 2, forks: 0 },
    features: [
      "Real-time monitoring of up to 10 parking spots with an Arduino sensor network.",
      "Python and Tkinter GUI that visualises which spots are free or occupied.",
      "Recommendation logic that suggests the closest available spot.",
      "Customisable and expandable for different parking lot sizes.",
    ],
  },
  {
    name: "LSB Steganography",
    description:
      "A desktop app with a friendly GUI that hides secret text or files inside ordinary images using least significant bit steganography, and decodes them again without visibly changing the picture.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "tkinter", color: "pink-text-gradient" },
      { name: "steganography", color: "green-text-gradient" },
    ],
    image: lsbStego,
    source_code_link:
      "https://github.com/Abhiz2411/LSB-Steganography-Python-GUI",
    metrics: { stars: 0, forks: 0 },
    features: [
      "Encode text or image files inside any supported image format.",
      "Decode the hidden text or image back out of the carrier image.",
      "LSB technique keeps the carrier looking identical to the eye.",
      "Tkinter GUI following PEP 8 conventions.",
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
