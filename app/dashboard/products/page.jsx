import styles from "@/app/ui/dashboard/products/products.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import {fetchProducts} from "@/app/lib/data";
import {deleteProduct} from "@/app/lib/actions";

const ProductsPage =async ({ searchParams }) => {
    //for search
    const q = searchParams?.q ||"";
    //for pagination
    const page = searchParams?.page || 1;
    const {products, count} = await fetchProducts(q,page);
    console.log(products);
    return (
        <div className={styles.container}>
            <div className={styles.top}>

                <Search placeholder="Search for a product..." />
                <Link href="/dashboard/products/add">
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                <tr>
                    <td>Title</td>
                    <td>Description</td>
                    <td>Price</td>
                    <td>Created At</td>
                    <td>Stock</td>
                    <td>Action</td>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>
                            <div className={styles.product}>
                                <Image src={product.img || "/noproduct.jpg"}
                                       alt="img"
                                       width={40}
                                       height={40}
                                       className={styles.productImage}/>
                            </div>
                            {product.title}
                        </td>
                        <td>{product.desc}</td>
                        <td>{product.price} $</td>
                        <td>{product.createdAt?.toString().slice(4,16)}</td>
                        <td>{product.stock}</td>
                        <td>
                            <div className={styles.buttons}>
                            <Link href={`/dashboard/products/${product.id}`}>
                                <button className={`${styles.button} ${styles.view}`}> View</button>
                            </Link>
                           <form action={deleteProduct}>
                               <input type="hidden" name="id" value={product.id}/>
                                <button className={`${styles.button} ${styles.delete}`}> Delete </button>
                           </form>
                            </div>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
            <Pagination count={count}/>
        </div>
    )
}

export default ProductsPage