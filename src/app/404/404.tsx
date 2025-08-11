import Link from "next/link";
import styles from "./404.module.css";

const FoF = () => {
  return (
    <div className={styles.content}>
      <p className={styles.title}>404</p>
      <p className={styles.description}>Sorry we couldn't find that page.</p>
      <Link href="/" className={styles.homeButton}>
        Return home
      </Link>
    </div>
  );
};

export default FoF;
