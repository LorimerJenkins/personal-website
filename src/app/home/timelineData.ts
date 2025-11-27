export interface TimelinePhoto {
  src: string;
  link?: string;
}

export interface TimelineYear {
  year: number;
  titleKey: string;
  descriptionKey: string;
  milestone: string;
  photos: TimelinePhoto[];
}

export const timelineData: TimelineYear[] = [
  {
    year: 2025,
    titleKey: "timeline2025Title",
    descriptionKey: "timeline2025Description",
    milestone: "/images/lorimerjenkins/2025/milestone.svg",
    photos: [
      {
        src: "/images/lorimerjenkins/2025/2.png",
        link: "https://www.youtube.com/watch?v=aAAQboCoW7M&t=119s",
      },
      {
        src: "/images/lorimerjenkins/2025/3.jpeg",
        link: "https://x.com/Liquid_Ops/status/1949900896873410665?s=20",
      },
      {
        src: "/images/lorimerjenkins/2025/4.jpg",
        link: "https://www.youtube.com/watch?v=H6D9CRv7fz8&t=1799s",
      },
      {
        src: "/images/lorimerjenkins/2025/5.png",
        link: "https://www.youtube.com/watch?v=KgImEda4Mlw&t=11s",
      },
      {
        src: "/images/lorimerjenkins/2025/6.png",
        link: "https://www.youtube.com/watch?v=k4HRwbEr0UE",
      },
    ],
  },
  {
    year: 2024,
    titleKey: "timeline2024Title",
    descriptionKey: "timeline2024Description",
    milestone: "/images/lorimerjenkins/2024/milestone.svg",
    photos: [
      {
        src: "/images/lorimerjenkins/2024/1.jpeg",
        link: "https://venturebeat.com/business/unlocking-the-future-of-decentralized-finance-lorimer-jenkins-journey-in-building-defi-and-web3",
      },
      {
        src: "/images/lorimerjenkins/2024/2.png",
        link: "https://medium.com/@perma_dao/devs-partner-to-build-arweaves-first-lending-protocol-built-with-ao-92abb69c9829",
      },
      {
        src: "/images/lorimerjenkins/2024/3.jpeg",
        link: "https://www.ibtimes.co.uk/revolutionizing-defi-how-lorimer-jenkins-marton-lederer-are-transforming-arweave-liquidops-1729945",
      },
      {
        src: "/images/lorimerjenkins/2024/4.png",
        link: "https://www.youtube.com/watch?v=3YKbquuyjq0",
      },
      {
        src: "/images/lorimerjenkins/2024/5.png",
        link: "https://x.com/aoTheVentures/status/1813676139795374171?s=20",
      },
    ],
  },
  {
    year: 2023,
    titleKey: "timeline2023Title",
    descriptionKey: "timeline2023Description",
    milestone: "/images/lorimerjenkins/2023/milestone.svg",
    photos: [
      { src: "/images/lorimerjenkins/2023/1.jpeg" },
      { src: "/images/lorimerjenkins/2023/2.jpeg" },
      { src: "/images/lorimerjenkins/2023/3.jpeg" },
      {
        src: "/images/lorimerjenkins/2023/4.webp",
        link: "https://podcasts.apple.com/us/podcast/using-web2-credentials-for-arweave-transactions-with/id1591551590?i=1000616156424",
      },
      {
        src: "/images/lorimerjenkins/2023/5.png",
        link: "https://www.youtube.com/watch?v=0ink14_nKtQ",
      },
    ],
  },
  {
    year: 2022,
    titleKey: "timeline2022Title",
    descriptionKey: "timeline2022Description",
    milestone: "/images/lorimerjenkins/2022/milestone.svg",
    photos: [
      { src: "/images/lorimerjenkins/2022/1.png" },
      {
        src: "/images/lorimerjenkins/2022/2.png",
        link: "https://x.com/Lorimer_Jenkins/status/1598084401719832576?s=20",
      },
      { src: "/images/lorimerjenkins/2022/3.png" },
      {
        src: "/images/lorimerjenkins/2022/4.jpg",
        link: "https://open.spotify.com/episode/4EQf8R55hFbTJJ510Zrftv",
      },
    ],
  },
  {
    year: 2021,
    titleKey: "timeline2021Title",
    descriptionKey: "timeline2021Description",
    milestone: "/images/lorimerjenkins/2021/milestone.webp",
    photos: [
      { src: "/images/lorimerjenkins/2021/1.jpeg" },
      { src: "/images/lorimerjenkins/2021/2.png" },
      { src: "/images/lorimerjenkins/2021/3.jpeg" },
      {
        src: "/images/lorimerjenkins/2021/4.png",
        link: "https://www.youtube.com/watch?v=5m1jbThj49Y&t=632s",
      },
    ],
  },
  {
    year: 2020,
    titleKey: "timeline2020Title",
    descriptionKey: "timeline2020Description",
    milestone: "/images/lorimerjenkins/2020/milestone.jpeg",
    photos: [
      { src: "/images/lorimerjenkins/2020/1.png" },
      { src: "/images/lorimerjenkins/2020/2.jpeg" },
      {
        src: "/images/lorimerjenkins/2020/3.png",
        link: "/projects#crypto-teen",
      },
    ],
  },
];
