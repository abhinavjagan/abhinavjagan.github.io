import type { Metadata } from 'next';

export const generateMetadata = (title: string, description: string, path: string): Metadata => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abhinavjagan.github.io";
  
  return {
    title: `${title} | Abhinav Jagan Polimera`,
    description,
    keywords: "AI infrastructure engineer, AI systems engineer, distributed systems, agent infrastructure, network software, ML systems, computer vision, geospatial data, photogrammetry, neural radiance fields",
    openGraph: {
      title: `${title} | Abhinav Jagan Polimera`,
      description,
      url: `${baseUrl}${path}`,
      siteName: "Abhinav Jagan Polimera",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Abhinav Jagan Polimera`,
      description,
      images: [`${baseUrl}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
  };
};

export const structuredData = (type: string, data: any) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abhinavjagan.github.io";
  
  if (type === "person") {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Abhinav Jagan Polimera",
      url: baseUrl,
      jobTitle: "Software Developer 2",
      knowsAbout: [
        "AI applications",
        "AI infrastructure",
        "Distributed systems",
        "Network software",
        "Computer vision",
        "Geospatial data",
        "Image processing",
        "Photogrammetry",
        "Neural Radiance Fields",
        "Computer graphics",
        "Internet of Things",
      ],
      sameAs: [
        "https://www.linkedin.com/in/abhinav-jagan-polimera-411b431b1/",
        "https://github.com/abhinavjagan",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "professional inquiries",
        email: "abhinavpolimera@gmail.com",
      },
    };
  }

  if (type === "webpage") {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: data.title,
      description: data.description,
      url: `${baseUrl}${data.path}`,
      datePublished: data.datePublished || new Date().toISOString(),
    };
  }

  return null;
};
