import styles from "@/app/ui/dashboard/products/addProduct/addProduct.module.css"
import {addProduct} from "@/app/lib/actions";

function AddProductPage(props) {
    return (
        <div className={styles.container}>
            <form action={addProduct} className={styles.form}>
                <input type="text" placeholder="title" name="title" required />
                <select name="cat" id="cat">
                    <option value="general">Choose a Category</option>
                    <option value="bag">Bag</option>
                    <option value="coat">Coat</option>
                    <option value="shirt">Shirt</option>
                    <option value="dress">Dress</option>
                </select>
                <input type="number" placeholder="price" name="price"/>
                <input type="number" placeholder="stock" name="stock"/>
                <input type="text" placeholder="color" name="color"/>
                <input type="text" placeholder="size" name="size"/>
                <textarea
                    name="desc"
                    id="desc"
                    rows="16"
                    placeholder="Description">
                </textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddProductPage;