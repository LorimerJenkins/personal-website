"use client";
import styles from "./about.module.css";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/Footer";

function About() {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.body}>
        <p className={styles.title}>Who is Lorimer Jenkins?</p>
        <p>
          Lorimer Jenkins is a tech entrepreneur from the UK, building LiquidOps
          a decentralized lending and borrowing protocol built in the Arweave
          and AO Web3 ecosystem.
        </p>
        <p className={styles.title}>About me</p>
        <p>I was born in the United Kingdom on the 30th of July 2003.</p>
      </div>
      <Footer />
    </div>
  );
}

export default About;
