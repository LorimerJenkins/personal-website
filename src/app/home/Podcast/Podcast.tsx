"use client";
import styles from "./Podcast.module.css";
import { useTranslation } from "@/hooks/useTranslation";

interface PodcastEpisode {
  id: string;
  image: string;
  youtubeUrl: string;
}

interface PodcastPlatform {
  id: string;
  name: string;
  icon: string;
  url: string;
}

const podcastEpisodes: PodcastEpisode[] = [
  {
    id: "episode1",
    image: "/images/podcast/episode1.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=mbAtqEKZOLs",
  },
  {
    id: "episode2",
    image: "/images/podcast/episode2.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=4YJ5lHpQYLs&t=4267s",
  },
  {
    id: "episode3",
    image: "/images/podcast/episode1.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=mbAtqEKZOLs",
  },
  {
    id: "episode4",
    image: "/images/podcast/episode2.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=4YJ5lHpQYLs&t=4267s",
  },
  {
    id: "episode5",
    image: "/images/podcast/episode1.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=mbAtqEKZOLs",
  },
  {
    id: "episode6",
    image: "/images/podcast/episode2.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=4YJ5lHpQYLs&t=4267s",
  },
  {
    id: "episode7",
    image: "/images/podcast/episode1.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=mbAtqEKZOLs",
  },
  {
    id: "episode8",
    image: "/images/podcast/episode2.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=4YJ5lHpQYLs&t=4267s",
  },
  {
    id: "episode9",
    image: "/images/podcast/episode1.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=mbAtqEKZOLs",
  },
];

const podcastPlatforms: PodcastPlatform[] = [
  {
    id: "spotify",
    name: "Spotify",
    icon: "/images/icons/podcast/spotify.png",
    url: "https://open.spotify.com/show/1zX33EudHcW06K2I2i0Y79",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "/images/icons/podcast/youtube.png",
    url: "https://www.youtube.com/@lorimerjenkins/podcasts",
  },
  {
    id: "apple",
    name: "Apple Podcasts",
    icon: "/images/icons/podcast/applePodcasts.png",
    url: "https://podcasts.apple.com/us/podcast/lorimer-jenkins/id1859074446",
  },
  {
    id: "amazon",
    name: "Amazon Music",
    icon: "/images/icons/podcast/amazonMusic.png",
    url: "https://music.amazon.co.uk/podcasts/301f3ed5-e56a-4c5c-857f-792625815655/lorimer-jenkins",
  },
  {
    id: "castbox",
    name: "Castbox",
    icon: "/images/icons/podcast/castbox.png",
    url: "https://castbox.fm/channel/id6901588",
  },
  {
    id: "goodpods",
    name: "Goodpods",
    icon: "/images/icons/podcast/goodpods.png",
    url: "https://goodpods.com/podcasts/lorimer-jenkins-715357",
  },
  {
    id: "iheartradio",
    name: "iHeartRadio",
    icon: "/images/icons/podcast/iheartradio.png",
    url: "https://www.iheart.com/podcast/311238681/",
  },
  {
    id: "overcast",
    name: "Overcast",
    icon: "/images/icons/podcast/overcast.png",
    url: "https://overcast.fm/p5503771-jUYhUF",
  },
  {
    id: "pocketcasts",
    name: "Pocket Casts",
    icon: "/images/icons/podcast/pocketcasts.png",
    url: "https://pca.st/05wo15t3",
  },
];

function Podcast() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("Podcast");

  const title = isLoading ? "Lorimer's Podcast" : t("title");
  const description = isLoading
    ? "Join me for deep conversations with founders, investors, and builders in the startup ecosystem. I explore the stories behind the projects, the lessons learned, and the future of various technologies."
    : t("description");
  const listenOn = isLoading ? "Listen on" : t("listenOn");

  const handleEpisodeClick = (youtubeUrl: string) => {
    window.open(youtubeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className={styles.podcastSection}>
      <div className={styles.podcastContainer}>
        <div className={styles.gridSection}>
          <div className={styles.episodeGrid}>
            {podcastEpisodes.map((episode, index) => (
              <button
                key={episode.id}
                className={styles.episodeCard}
                onClick={() => handleEpisodeClick(episode.youtubeUrl)}
                aria-label={`Watch episode ${index + 1} on YouTube`}
              >
                <img
                  src={episode.image}
                  alt={`Podcast episode ${index + 1} thumbnail`}
                  className={styles.episodeImage}
                />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.textSection}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>

          <div className={styles.platformsSection}>
            <span className={styles.listenOnLabel}>{listenOn}</span>
            <div className={styles.platformsGrid}>
              {podcastPlatforms.map((platform) => (
                <a
                  key={platform.id}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.platformLink}
                  aria-label={platform.name}
                >
                  <img
                    src={platform.icon}
                    alt={platform.name}
                    className={styles.platformIcon}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Podcast;
