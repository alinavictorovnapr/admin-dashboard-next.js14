import styles from "./banner.module.css"
import Image from "next/image";
import banner from "@/public/banner.jpg"
import Link from "next/link";

const Banner = () => {
    return (
        <div className={styles.banner}>
            <Image src={banner}
                   alt="img"
                   className={styles.bannerImg}/>
            <div className={styles.bannerContent}>
                <h1 className={styles.title}>Welcome to Clothing Store Admin Dashboard</h1>
                <p className={styles.text}>Streamline your store management with our intuitive platform</p>
                <Link href="/login">
                    <button className={styles.loginButton}>Login</button>
                </Link>

            </div>
        </div>
    );
}

export default Banner;