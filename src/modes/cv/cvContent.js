import { publicUrl } from "../../lib/publicUrl.js";

/**
 * CV copy and structured data from the previous production build.
 * Resume: `public/assets/docs/...` (`RESUME_HREF`). Miles GLB: `public/assets/media/miles_...glb`.
 */

export const RESUME_HREF = publicUrl(
  "assets/docs/Abhinav_resume___SDE___USA%20(2).pdf",
);

export const LINKEDIN_HREF =
  "https://www.linkedin.com/in/abhinav-jagan-polimera-411b431b1/";

export const GITHUB_HREF = "https://github.com/abhinavjagan";
export const EMAIL_HREF = "mailto:abhinavpolimera@gmail.com";

export const introParagraphs = [
  "I'm an SDE 2 at Cisco Systems, working on next-generation 8000 series routers with a focus on traffic mirroring systems. I've delivered major customer-facing features for clients like Microsoft and SoftBank, including a first-of-its-kind GUE encapsulation capability not currently offered by competing routers. My work spans deep systems engineering, cross-functional execution, and contributions to AI-driven initiatives across the organization, where I've been recognized for performance and early leadership.",
  "I graduated in Computer Science from Birla Institute of Technology and Science, Hyderabad (CGPA 8.2), after securing an All India Rank of 5321 in JEE Advanced among 1.3 million candidates. I've published research papers in international conferences, worked closely with faculty on advanced projects, and served as a Teaching Assistant for Internet of Things based on academic merit.",
  "At my core, I'm a builder, driven to create across domains, from exploring computer graphics, computer vision and coding to art and product design. My competitive edge comes from experiences like state-level chess, karate, and high-altitude treks, while my curiosity fuels hands-on exploration, whether it's 3D printing, sim racing, or experimenting with new creative mediums.",
];

export const experienceHeading =
  "Distributed systems, router software, and AI-backed execution.";

export const experiencePretext =
  "Traffic mirroring in Cisco 8000 series routers, Router OS";

export const projectsHeading =
  "Applied product thinking, research, and machine intelligence.";

export const extracurricularsHeading =
  "Competitive discipline, visual craft, and adventure off the clock.";

export const extracurricularsPretext =
  "State-level sport. Karate training. Visual design. Photography. Himalayas. Vietnam cave expedition.";

export const beyondWorkNarrative = [
  "Beyond my professional work, what truly sets me apart is the intensity and curiosity I bring to everything I pursue. I don't just do things. I go deep, get obsessed, and build. Whether it's setting up a 3D printing workflow at home, creating across mediums from digital art to 3D modelling, or designing and experimenting with new ideas, I treat every interest like a craft to be mastered. This mindset has led me to explore a wide spectrum: robotics, filming, art, and product thinking, not as side hobbies, but as extensions of how I think and solve problems.",
  "That same drive shows up in how I approach challenges. My background in competitive chess and karate built discipline, strategic thinking, and resilience early on, while experiences like high-altitude Himalayan treks and exploring extreme environments shaped my ability to stay calm and push limits. I'm naturally inclined to go beyond what's required, whether that means refining a system until it's elegant, experimenting until something clicks, or building something from scratch just to understand it better.",
  "I'm not someone who is satisfied with just getting the job done. I care about how things are built, how they can be improved, and what more they can become. That curiosity and ownership translate directly into my work. I bring energy, creativity, and a genuine passion for building things that stand out, not just function.",
];

export const experience = [
  {
    company: "Cisco Systems",
    role: "Software Developer, Distributed Systems organization",
    period: "Aug 2024 - Present",
    mode: "On-site",
    pointsLayout: "project-cards",
    points: [
      "Designed a next-generation ERSPAN solution using GUE encapsulation as a scalable alternative to GRE, leading end-to-end delivery for Microsoft-driven packet mirroring requirements with hardware-accelerated performance gains.",
      "Led end-to-end delivery of egress traffic mirroring for Cisco 8000 (Silicon One) routers, helping achieve parity with NCS 5000 capabilities for SoftBank's migration while reducing delivery time by 60%.",
      "Contributed to an AI-driven Infrastructure-as-a-Service initiative for deploying quantized ML models on Cisco routers, moving from concept to prototype in a 4-member core team and reaching customer evaluation.",
      "Owned traffic mirroring feature delivery, debugging, and POC work across SPAN, Lawful Intercept, and NetFlow on Cisco 8000, including multi-platform topology bring-up for upcoming hardware.",
      "Built scalable automation infrastructure and AI-powered internal tools, including a leadership metrics analyzer and a drag-and-drop traffic mirroring platform with MCP-based modular components.",
    ],
  },
  {
    company: "Cisco Systems",
    role: "Technical Intern, Distributed Systems organization",
    period: "Jan 2024 - Jun 2024",
    mode: "On-site",
    points: [
      "Optimized router OS feature testing and deployment through improved test design and parallel execution, earning an internal Cisco excellence award.",
      "Led the automation lifecycle in Python for NTP VRF OpenConfig feature delivery.",
    ],
  },
  {
    company: "Shris Infotech",
    role: "Software Intern",
    period: "Jun 2022 - Jul 2022",
    mode: "Remote",
    points: [
      "Developed a one-click face-recognition calling app using Python, DeepFace, OpenCV, Flutter, and Dart.",
    ],
  },
];

export const projects = [
  {
    name: "Playlistify",
    category: "Web Development",
    summary:
      "Built a Python and Flask product on top of the Spotify Web API that turns liked songs into shareable playlists with one click, closing a clear product usability gap.",
    skillsAndTechnologies:
      "Product design, backend integration, user workflow automation; Python, Flask, Spotify Web API",
    link: "https://github.com/abhinavjagan",
    ctaLabel: "GitHub",
  },
  {
    name: "Remote Drone Surveillance",
    category: "Machine Learning / Image Processing",
    summary:
      "Designed a drone-based surveillance pipeline with Python, OpenCV, YOLO, and threshold-based activity analysis to detect, classify, and flag illegal actions in real time.",
    skillsAndTechnologies:
      "Computer vision, real-time detection, surveillance analytics; Python, OpenCV, YOLO",
    link: "https://www.researchgate.net/publication/377547504_Detection_of_Suspicious_Activities_at_Remote_Locations_by_using_UAVs_and_Computer_Vision",
    ctaLabel: "Publication",
  },
  {
    name: "Performance Assessment of Neural Radiance Fields and Photogrammetry",
    category: "3D Reconstruction Research",
    summary:
      "Implemented and presented a comparative NeRF vs Photogrammetry study for 3D reconstruction of man-made and natural scenes at the ICAART conference.",
    skillsAndTechnologies:
      "Research, 3D reconstruction benchmarking, technical presentation; NeRF pipelines, Photogrammetry tools",
    link: "https://www.researchgate.net/publication/378826735_Performance_Assessment_of_Neural_Radiance_Fields_NeRF_and_Photogrammetry_for_3D_Reconstruction_of_Man-Made_and_Natural_Features",
    ctaLabel: "Publication",
  },
];

export const extracurriculars = [
  "Represented school at the state-level CBSE Clusters South Zone tournament.",
  "Karate blue belt.",
  "Artist, graphic designer, and photographer.",
  "Trekked the Himalayas and the world's largest cave ecosystem in Vietnam.",
];
