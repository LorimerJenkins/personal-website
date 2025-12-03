export interface TimelinePhoto {
  src: string;
  link?: string;
  titleKey?: string;
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
        src: "/images/lorimerjenkins/2025/1.jpg",
        link: "https://www.youtube.com/@lorimerjenkins",
        titleKey: "photo2025_1",
      },
      {
        src: "/images/lorimerjenkins/2025/2.png",
        link: "https://www.youtube.com/watch?v=aAAQboCoW7M&t=119s",
        titleKey: "photo2025_2",
      },
      {
        src: "/images/lorimerjenkins/2025/3.jpeg",
        link: "https://x.com/Liquid_Ops/status/1949900896873410665?s=20",
        titleKey: "photo2025_3",
      },
      {
        src: "/images/lorimerjenkins/2025/4.jpg",
        link: "https://www.youtube.com/watch?v=H6D9CRv7fz8&t=1799s",
        titleKey: "photo2025_4",
      },
      {
        src: "/images/lorimerjenkins/2025/5.png",
        link: "https://www.youtube.com/watch?v=KgImEda4Mlw&t=11s",
        titleKey: "photo2025_5",
      },
      {
        src: "/images/lorimerjenkins/2025/6.png",
        link: "https://www.youtube.com/watch?v=k4HRwbEr0UE",
        titleKey: "photo2025_6",
      },
      {
        src: "/images/lorimerjenkins/2025/7.jpeg",
        titleKey: "photo2025_7",
      },
      {
        src: "/images/lorimerjenkins/2025/8.jpeg",
        titleKey: "photo2025_8",
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
        titleKey: "photo2024_1",
      },
      {
        src: "/images/lorimerjenkins/2024/2.png",
        link: "https://medium.com/@perma_dao/devs-partner-to-build-arweaves-first-lending-protocol-built-with-ao-92abb69c9829",
        titleKey: "photo2024_2",
      },
      {
        src: "/images/lorimerjenkins/2024/3.jpeg",
        link: "https://www.ibtimes.co.uk/revolutionizing-defi-how-lorimer-jenkins-marton-lederer-are-transforming-arweave-liquidops-1729945",
        titleKey: "photo2024_3",
      },
      {
        src: "/images/lorimerjenkins/2024/4.png",
        link: "https://www.youtube.com/watch?v=3YKbquuyjq0",
        titleKey: "photo2024_4",
      },
      {
        src: "/images/lorimerjenkins/2024/5.png",
        link: "https://x.com/aoTheVentures/status/1813676139795374171?s=20",
        titleKey: "photo2024_5",
      },
      {
        src: "/images/lorimerjenkins/2024/6.jpeg",
        titleKey: "photo2024_6",
      },
    ],
  },
  {
    year: 2023,
    titleKey: "timeline2023Title",
    descriptionKey: "timeline2023Description",
    milestone: "/images/lorimerjenkins/2023/milestone.svg",
    photos: [
      { src: "/images/lorimerjenkins/2023/1.jpeg", titleKey: "photo2023_1" },
      { src: "/images/lorimerjenkins/2023/2.jpeg", titleKey: "photo2023_2" },
      { src: "/images/lorimerjenkins/2023/3.jpeg", titleKey: "photo2023_3" },
      {
        src: "/images/lorimerjenkins/2023/4.webp",
        link: "https://podcasts.apple.com/us/podcast/using-web2-credentials-for-arweave-transactions-with/id1591551590?i=1000616156424",
        titleKey: "photo2023_4",
      },
      {
        src: "/images/lorimerjenkins/2023/5.png",
        link: "https://www.youtube.com/watch?v=0ink14_nKtQ",
        titleKey: "photo2023_5",
      },
      {
        src: "/images/lorimerjenkins/2023/6.png",
        link: "https://www.instagram.com/p/CtcmkWarMKK/",
        titleKey: "photo2023_6",
      },
      {
        src: "/images/lorimerjenkins/2023/7.jpeg",
        titleKey: "photo2023_7",
      },
      {
        src: "/images/lorimerjenkins/2023/8.jpeg",
        titleKey: "photo2023_8",
      },
      {
        src: "/images/lorimerjenkins/2023/9.jpeg",
        titleKey: "photo2023_9",
      },
    ],
  },
  {
    year: 2022,
    titleKey: "timeline2022Title",
    descriptionKey: "timeline2022Description",
    milestone: "/images/lorimerjenkins/2022/milestone.jpeg",
    photos: [
      { src: "/images/lorimerjenkins/2022/1.png", titleKey: "photo2022_1" },
      {
        src: "/images/lorimerjenkins/2022/2.png",
        link: "https://x.com/Lorimer_Jenkins/status/1598084401719832576?s=20",
        titleKey: "photo2022_2",
      },
      { src: "/images/lorimerjenkins/2022/3.png", titleKey: "photo2022_3" },
      {
        src: "/images/lorimerjenkins/2022/4.jpg",
        link: "https://open.spotify.com/episode/4EQf8R55hFbTJJ510Zrftv",
        titleKey: "photo2022_4",
      },
      {
        src: "/images/lorimerjenkins/2022/5.jpeg",
        titleKey: "photo2022_5",
      },
    ],
  },
  {
    year: 2021,
    titleKey: "timeline2021Title",
    descriptionKey: "timeline2021Description",
    milestone: "/images/lorimerjenkins/2021/milestone.webp",
    photos: [
      { src: "/images/lorimerjenkins/2021/1.jpeg", titleKey: "photo2021_1" },
      { src: "/images/lorimerjenkins/2021/2.png", titleKey: "photo2021_2" },
      { src: "/images/lorimerjenkins/2021/3.jpeg", titleKey: "photo2021_3" },
      {
        src: "/images/lorimerjenkins/2021/4.png",
        link: "https://www.youtube.com/watch?v=5m1jbThj49Y&t=632s",
        titleKey: "photo2021_4",
      },
      {
        src: "/images/lorimerjenkins/2021/5.jpeg",
        titleKey: "photo2021_5",
      },
      {
        src: "/images/lorimerjenkins/2021/6.jpeg",
        titleKey: "photo2021_6",
      },
      {
        src: "/images/lorimerjenkins/2021/7.jpg",
        titleKey: "photo2021_7",
      },
      {
        src: "/images/lorimerjenkins/2021/8.jpeg",
        titleKey: "photo2021_8",
      },
      {
        src: "/images/lorimerjenkins/2021/9.jpeg",
        titleKey: "photo2021_9",
      },
    ],
  },
  {
    year: 2020,
    titleKey: "timeline2020Title",
    descriptionKey: "timeline2020Description",
    milestone: "/images/lorimerjenkins/2020/milestone.png",
    photos: [
      { src: "/images/lorimerjenkins/2020/1.jpeg", titleKey: "photo2020_1" },
      { src: "/images/lorimerjenkins/2020/2.jpeg", titleKey: "photo2020_2" },
      {
        src: "/images/lorimerjenkins/2020/3.png",
        link: "/projects#crypto-teen",
        titleKey: "photo2020_3",
      },
      {
        src: "/images/lorimerjenkins/2020/4.jpg",
        titleKey: "photo2020_4",
      },

      {
        src: "/images/lorimerjenkins/2020/5.jpg",
        titleKey: "photo2020_5",
      },
    ],
  },
  {
    year: 2019,
    titleKey: "timeline2019Title",
    descriptionKey: "timeline2019Description",
    milestone: "/images/lorimerjenkins/2019/milestone.png",
    photos: [
      {
        src: "/images/lorimerjenkins/2019/1.jpeg",
        titleKey: "photo2019_1",
      },
    ],
  },
  {
    year: 2017,
    titleKey: "timeline2017Title",
    descriptionKey: "timeline2017Description",
    milestone: "/images/lorimerjenkins/2017/milestone.svg",
    photos: [
      { src: "/images/lorimerjenkins/2017/1.jpg", titleKey: "photo2017_1" },
    ],
  },
];
