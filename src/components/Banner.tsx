import styles from "./banner.module.css";
import Image from "next/image";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <Image
        src="/img/cover.jpg"
        alt="cover"
        fill={true}
        priority
        objectFit="cover"
      />
      <div className={styles.bannerText}>
        <h1 className="text-4xl font-medium text-white">
          where every event finds its venue
        </h1>
        <h3 className="text-xl font-serif text-white">
          Host your party at our venue where every event finds its perfect
          place!
        </h3>
      </div>
    </div>
  );
}
