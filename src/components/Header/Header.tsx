"use client";
import Link from "next/link";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <Link href="/">
        <h1 className={styles.title}>Lorimer Jenkins</h1>
      </Link>
      <div className={styles.rightSection}>
        <Link href="/about">
          <p>About</p>
        </Link>
      </div>
    </div>
  );
}

export default Header;
