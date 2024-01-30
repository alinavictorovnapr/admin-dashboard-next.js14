import { cards } from "../lib/data";
import Card from "@/app/ui/dashboard/card/card";
import styles from "../ui/dashboard/dashboard.module.css"
import Rightbar from "@/app/ui/dashboard/rightbar/rightbar";
import Transactions from "@/app/ui/dashboard/transactions/transactions";
import Chart from "@/app/ui/dashboard/chart/chart";

const Dashboard = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
            <div className={styles.cards}>
                {cards.map((item) =>(
                    <Card item={item} key={item.id}/>
                    ))}
            </div>
                <Transactions/>
                <Chart/>
            </div>
            <div className={styles.side}>
                <Rightbar/>
            </div>
        </div>
    )
}

export default Dashboard