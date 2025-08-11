"use client";
import styles from "./about.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslations } from "next-intl";

function About() {
  const t = useTranslations("About");

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.body}>
        <p className={styles.title}>{t("title1")}</p>
        <p>{t("paragraph1")}</p>
        <p className={styles.title}>{t("title2")}</p>
        <p style={{ whiteSpace: "pre-line" }}>{t("paragraph2")}</p>
      </div>
      <Footer />
    </div>
  );
}

export default About;

// 🧵 1/3 I am finally put something on my lorimer.arweave.dev site (a big fat image of my face).

// 👇 But also...

// 2/3 The other day I was complaining about life, but realized everything I was complaining about would have been something I would of killed for in the past.

// I am often told I have an inspiring story, so I have written it up from first begging work to now building @Liquid_Ops.

// 3/3 👉 Read it at lorimer.arweave.dev/about, I hope it can inspire you to follow your dreams and if nothing else be an interesting read!
