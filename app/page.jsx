
import Head from 'next/head';
import Banner from "@/app/ui/dashboard/banner/banner";
import Link from "next/link";
import styles from "@/app/ui/dashboard/banner/banner.module.css";
const Homepage = () => {
  return (
      <div>
        <Head>
          <title>Магазин Одягу</title>
          <meta name="description" content="Адмінка для магазину одягу" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <Banner />


        </main>
      </div>
  )
}

export default Homepage