import Image from "next/image";
import styles from "../styles/page.module.css";

const Home = () => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p>
      </div>

    </main>
  );
};

export default Home;