import Link from "next/link";
import styles from "./page.module.css";
import { metadata as data } from "@/utils/SEO/SEO";

export const metadata = data;

const Page = () => {
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

export default Page;
