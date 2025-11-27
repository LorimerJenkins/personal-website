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
      { src: "/images/lorimerjenkins/2025/1.jpeg" },
      { src: "/images/lorimerjenkins/2025/2.png" },
      { src: "/images/lorimerjenkins/2025/3.jpeg" },
    ],
  },
  {
    year: 2024,
    titleKey: "timeline2024Title",
    descriptionKey: "timeline2024Description",
    milestone: "/images/lorimerjenkins/2024/milestone.svg",
    photos: [
      { src: "/images/lorimerjenkins/2024/1.jpeg" },
      { src: "/images/lorimerjenkins/2024/2.png" },
      { src: "/images/lorimerjenkins/2024/3.jpeg" },
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
    ],
  },
  {
    year: 2022,
    titleKey: "timeline2022Title",
    descriptionKey: "timeline2022Description",
    milestone: "/images/lorimerjenkins/2022/milestone.svg",
    photos: [
      { src: "/images/lorimerjenkins/2022/1.png" },
      { src: "/images/lorimerjenkins/2022/2.png" },
      { src: "/images/lorimerjenkins/2022/3.png" },
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
      { src: "/images/lorimerjenkins/2020/3.png" },
    ],
  },
];
