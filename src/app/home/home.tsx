"use client";
import styles from "./home.module.css";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/Footer";

function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.body}></div>
      <Footer />
    </div>
  );
}

export default Home;
