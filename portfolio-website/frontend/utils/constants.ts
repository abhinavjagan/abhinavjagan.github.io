export const SITE_NAME = 'Abhinav Jagan Polimera';
export const SITE_DESCRIPTION =
  'Software engineer building AI applications, developer platforms, and distributed systems with networking depth.';
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://abhinavjagan.github.io';

export const SOCIAL_LINKS = {
  github: 'https://github.com/abhinavjagan',
  linkedin: 'https://www.linkedin.com/in/abhinav-jagan-polimera-411b431b1/',
  email: 'abhinavpolimera@gmail.com',
};

export const PROFILE_FACTS = {
  proofPoints: [
    { value: '2+ years', label: 'systems engineering at Cisco' },
    { value: '2 papers', label: 'AI / computer-vision research' },
    { value: 'AIR 5,321', label: 'JEE Advanced · ≈1.5M entrance pool' },
    { value: '2,380 / 2,400', label: 'SAT Subject Tests · single attempt' },
  ],
  range: [
    {
      index: '01',
      label: 'Applied domains',
      title: 'Vision, spatial data, and 3D reconstruction',
      description:
        'Hands-on work with geospatial data, image processing, photogrammetry, and Neural Radiance Fields—connecting raw imagery to measurable 3D representations.',
      tags: ['Geospatial data', 'Image processing', 'Photogrammetry', 'NeRF'],
    },
    {
      index: '02',
      label: 'Coursework + teaching',
      title: 'Computing across visual and physical systems',
      description:
        'Coursework in Computer Vision, Computer Graphics, and Internet of Things, followed by selection as a teaching assistant on academic merit.',
      tags: ['Computer vision', 'Computer graphics', 'Internet of Things', 'Teaching'],
    },
  ],
  academics: [
    {
      value: 'AIR 5,321',
      label: 'JEE Advanced',
      detail:
        'Ranked 5,321 nationally after advancing through an engineering-entrance pool of approximately 1.5 million students.',
    },
    {
      value: '2,380 / 2,400',
      label: 'SAT Subject Tests',
      detail: 'Physics, Chemistry, and Mathematics · single attempt.',
    },
  ],
} as const;

export const EXPERIENCE = [
  {
    company: 'Cisco Systems',
    position: 'Software Developer 2',
    duration: 'Apr 2026 - Present',
    location: 'On-site',
    highlights: [
      'Built a semantic knowledge graph for the Cisco Silicon One router operating system, improving LLM context-retrieval precision by approximately 30% while reducing token use.',
      'Co-developed an infrastructure prototype that deployed 0.5-2 MB quantized ML models on Cisco routers at under 2% CPU and used large-scale telemetry to guide model selection.',
      'Designed and delivered ERSPAN over GUE for Microsoft, reducing tunnel overhead by 16%, avoiding approximately 5 PB/year of telemetry traffic, and increasing monitoring-fabric capacity by 2.3%.',
    ],
  },
  {
    company: 'Cisco Systems',
    position: 'Software Developer',
    duration: 'Aug 2024 - Apr 2026',
    location: 'On-site',
    highlights: [
      'Led egress traffic mirroring for Cisco 8000 (Silicon One), matching NCS 5000 behavior for SoftBank\'s migration and reducing delivery time by 60%.',
      'Built AI-assisted developer tools, including a metrics dashboard used by 100+ engineers and a traffic-mirroring platform that cut issue reproduction time from five days to one.',
      'Owned delivery and debugging for SPAN, Lawful Intercept, and NetFlow workflows operating at approximately 100 Mpps across the router OS stack.',
    ],
  },
  {
    company: 'Cisco Systems',
    position: 'Technical Intern',
    duration: 'Jan 2024 - Jun 2024',
    location: 'On-site',
    highlights: [
      'Automated NTP, VRF, and OpenConfig validation in Python with 88% code coverage.',
      'Redesigned and parallelized router-OS tests to cut execution time by 90%, earning a Cisco excellence award.',
    ],
  },
];

export const PROJECTS = [
  {
    slug: 'x-agent-local-multi-agent-system',
    title: 'X-Agent: Local Multi-Agent Content Workflow',
    description:
      'Built a local-first AI application that turned a consented persona interview into grounded drafts through retrieval, optional research, critique, and human approval.',
    details: [
      'Built a LangGraph workflow for persona retrieval, optional web research, drafting, formatting, consistency critique, and human-in-the-loop review.',
      'Implemented the system with FastAPI, Ollama, Docker, local embeddings, and a browser UI while keeping publication behind explicit human approval.',
      'Documented architecture, testing, privacy boundaries, SSRF/DoS hardening, and native-versus-container runtime tradeoffs.',
    ],
    tech: ['Python', 'LangGraph', 'FastAPI', 'Ollama', 'Docker', 'Embeddings'],
    links: [
      {
        label: 'Source + docs',
        href: 'https://github.com/abhinavjagan/multi-agent-content-generation-workflow',
      },
      {
        label: 'Architecture',
        href: 'https://github.com/abhinavjagan/multi-agent-content-generation-workflow/blob/main/docs/architecture.md',
      },
    ],
    category: 'AI Systems',
    status: 'AI application',
    proof: 'Code, tests, architecture, and setup instructions',
    skills: ['Python', 'Agentic Workflows', 'LLM Evaluation', 'FastAPI', 'Docker'],
  },
  {
    slug: 'spotify-liked-songs-to-playlist',
    title: 'From Liked Songs to a Shareable Playlist',
    description:
      "When a friend asked what I listened to, I realized my Spotify Liked Songs library had grown to nearly 2,000 tracks but still wasn't shareable—so I built the missing workflow.",
    details: [
      'Turned a real usability gap—one-tap likes but repetitive, multi-step playlist additions—into a working personal utility.',
      'Used Spotify OAuth, Spotipy, and the Spotify Web API to retrieve saved tracks in pages, create a playlist, and add songs in batches.',
      'Replaced the song-by-song workflow with a reusable path from a private music library to a playlist I could share.',
    ],
    tech: ['Python', 'Flask', 'Spotipy', 'Spotify Web API', 'OAuth 2.0'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/abhinavjagan/SavedToPlaylist-Spotify',
      },
    ],
    category: 'Personal Automation',
    status: 'Personal utility · started 2023',
    proof: 'Public source code · built from a problem I had',
    skills: ['Python'],
  },
  {
    slug: 'semantic-code-knowledge-graph',
    title: 'Semantic Code Knowledge Graph',
    description:
      'Built a semantic knowledge graph that converted a router-OS codebase into structured, agent-readable context for AI-assisted developer workflows.',
    details: [
      'Converted Cisco Silicon One router-OS source context into a structured graph for LLM retrieval.',
      'Improved context-retrieval precision by approximately 30% while reducing token use.',
      'Enabled AI agents to reason over the codebase with more reliable engineering context.',
    ],
    tech: ['Knowledge Graphs', 'Retrieval', 'LLMs', 'Cisco Silicon One'],
    links: [],
    category: 'AI Infrastructure',
    status: 'Knowledge system',
    proof: 'Architecture, evaluation approach, and implementation details available for discussion',
    skills: ['Python', 'Knowledge Graphs', 'Retrieval-Augmented Generation', 'Agentic Workflows'],
  },
  {
    slug: 'quantized-ml-router-deployment',
    title: 'Quantized ML Deployment on Routers',
    description:
      'Contributed to an infrastructure prototype that deployed compact, quantized ML models on Cisco routers and used network telemetry to guide model selection.',
    details: [
      'Deployed 0.5-2 MB quantized models while keeping measured CPU utilization under 2%.',
      'Applied data-driven analysis to large-scale network telemetry to compare candidate ML approaches.',
      'Moved the work from concept to customer evaluation as part of a four-person core team.',
    ],
    tech: ['Python', 'Quantization', 'Telemetry', 'Edge Inference', 'Router Systems'],
    links: [],
    category: 'AI Systems',
    status: 'Infrastructure prototype',
    proof: 'Design, benchmark context, and model-selection approach available for discussion',
    skills: ['Python', 'Quantized / Edge ML', 'Telemetry & Observability', 'Distributed Systems'],
  },
  {
    slug: 'network-systems-debugging-platform',
    title: 'Traffic-Mirroring Simulation and Debugging',
    description:
      'Built a unified platform for validating support, simulating router topologies, and reproducing issues across traffic-mirroring workflows.',
    details: [
      'Combined constant-time support-matrix lookup, drag-and-drop router simulation, and traffic-generator configuration in one workflow.',
      'Added MCP-based modular components and AI-assisted metrics analysis used by 100+ engineers.',
      'Reduced average issue reproduction time from five days to one.',
    ],
    tech: ['C/C++', 'Python', 'Linux', 'Packet Processing', 'Test Automation'],
    links: [],
    category: 'Distributed Systems',
    status: 'Developer platform',
    proof: 'Architecture and debugging workflow available for discussion',
    skills: ['C/C++', 'Python', 'Distributed Systems', 'Network Operating Systems'],
  },
  {
    slug: 'cisco-8000-traffic-mirroring',
    title: 'Cisco 8000 Traffic Mirroring',
    description:
      'Delivered customer-driven traffic-mirroring features across Cisco 8000 and Silicon One router platforms.',
    details: [
      'Designed ERSPAN over GUE for Microsoft as a UDP-based alternative to GRE, reducing tunnel overhead by 16% and avoiding approximately 5 PB/year of telemetry traffic.',
      'Delivered egress mirroring parity with NCS 5000 for SoftBank\'s migration and reduced development time by 60%.',
      'Owned delivery and debugging across SPAN, Lawful Intercept, NetFlow, and multi-platform router topologies.',
    ],
    tech: ['C/C++', 'Cisco Silicon One', 'GUE', 'ERSPAN', 'Packet Processing'],
    links: [],
    category: 'Network Systems',
    status: 'Router platform',
    proof: 'System design, protocol tradeoffs, and delivery approach available for discussion',
    skills: ['C/C++', 'Distributed Systems', 'Network Operating Systems', 'Telemetry & Observability'],
  },
  {
    slug: 'nerf-vs-photogrammetry',
    title: 'NeRF and Photogrammetry for 3D Reconstruction',
    description:
      'First-authored an ICAART 2024 paper comparing neural radiance fields and photogrammetry against ground-truth object dimensions.',
    details: [
      'First-authored a study reconstructing a man-made antenna and a natural bush with learned and classical 3D pipelines.',
      'The reported geometric-attribute results put NeRF between 99.157% and 99.89% accuracy, compared with photogrammetry between 87.91% and 98.99% across the evaluated dimensions.',
      'Presented the work at ICAART 2024 and documented reconstruction quality, input-image count, rendering behavior, and applications to complex natural geometry.',
    ],
    tech: ['Python', 'NeRF', 'Photogrammetry', 'Image Processing', '3D Reconstruction'],
    links: [
      {
        label: 'Published paper',
        href: 'https://www.scitepress.org/PublishedPapers/2024/123967/',
      },
      {
        label: 'DOI',
        href: 'https://doi.org/10.5220/0012396700003636',
      },
    ],
    category: 'Research · Published',
    status: 'Peer-reviewed',
    proof: 'ICAART 2024 proceedings · DOI 10.5220/0012396700003636',
    skills: [
      'Python',
      'Computer Vision',
      'Image Processing',
      'Geospatial Data',
      'Photogrammetry',
      'Neural Radiance Fields',
      'Computer Graphics',
      '3D Reconstruction',
    ],
  },
  {
    slug: 'uav-computer-vision',
    title: 'UAV-Based Suspicious-Activity Detection',
    description:
      'Co-authored an IEEE-published study of a UAV surveillance system that used object detection and activity-duration thresholds to flag suspicious actions.',
    details: [
      'Studied real-time object detection and classification from UAV video using Python and YOLO.',
      'Designed threshold logic based on object counts and activity duration.',
      'Published the work in IEEE conference proceedings.',
    ],
    tech: ['Python', 'OpenCV', 'YOLO', 'Object Detection'],
    links: [
      {
        label: 'DOI',
        href: 'https://doi.org/10.1109/ICPEEV58650.2023.10391907',
      },
    ],
    category: 'Research · Published',
    status: 'IEEE conference paper',
    proof: 'DOI 10.1109/ICPEEV58650.2023.10391907',
    skills: ['Python', 'Computer Vision', 'Object Detection'],
  },
];

export const SKILLS = {
  aiSystems: [
    'Agentic Workflows',
    'Knowledge Graphs',
    'Retrieval-Augmented Generation',
    'LLM Evaluation',
    'Quantized / Edge ML',
  ],
  infrastructureAndDistributedSystems: [
    'Distributed Systems',
    'Network Operating Systems',
    'Linux',
    'Telemetry & Observability',
    'Packet Processing',
    'Test Automation',
  ],
  engineering: ['Python', 'C/C++', 'Shell', 'FastAPI', 'Docker'],
  computerVisionAnd3D: [
    'Computer Vision',
    'Image Processing',
    'Geospatial Data',
    'Object Detection',
    'Photogrammetry',
    'Neural Radiance Fields',
    'Computer Graphics',
    '3D Reconstruction',
  ],
};
