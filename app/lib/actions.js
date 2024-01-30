"use server";
import {Product, User} from "@/app/lib/models";
import {connectToDB} from "@/app/lib/utils";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import bcrypt from "bcrypt";
import {signIn, signOut} from "@/app/auth";

export const addUser = async (formData) => {

    // const username =formData.get("username")
    const {username, email, password, phone, address, isAdmin, isActive} =
        Object.fromEntries(formData);
    try {
        await connectToDB();
        //salt for hash password (security)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            phone,
            address,
            isAdmin,
            isActive
        });
        await newUser.save();

    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
};

export const updateUser = async (formData) => {

    // const username =formData.get("username")
    const {id, username, email, password, phone, address, isAdmin, isActive} =
        Object.fromEntries(formData);
    try {
        await connectToDB();
        //salt for hash password (security)
        //const salt = await bcrypt.genSalt(10);
        //const hashedPassword = await bcrypt.hash(password, salt);
        const updateFields = {
            id,
            username,
            email,
            password,
            phone,
            address,
            isAdmin,
            isActive
        };
        Object.keys(updateFields).forEach(
            (key) =>
                (updateFields[key] === "" || undefined) && delete updateFields[key]
        );
        await User.findByIdAndUpdate(id, updateFields);

    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
};


export const deleteUser = async (formData) => {

    const {id} = Object.fromEntries(formData);
    try {
        await connectToDB();

        await User.findByIdAndDelete(id);

    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
    revalidatePath("/dashboard/users");
};

export const addProduct = async (formData) => {

    const {title, desc, price, stock, color, size} =
        Object.fromEntries(formData);
    try {
        await connectToDB();
        const newProduct = new Product({
            title,
            desc,
            price,
            stock,
            color,
            size
        });
        await newProduct.save();

    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
};

export const updateProduct = async (formData) => {


    const {id, title, desc, price, stock, color, size} =
        Object.fromEntries(formData);
    try {
        await connectToDB();
        const updateFields = {
            id,
            title,
            desc,
            price,
            stock,
            color,
            size
        };
        Object.keys(updateFields).forEach(
            (key) =>
                (updateFields[key] === "" || undefined) && delete updateFields[key]
        );
        await Product.findByIdAndUpdate(id, updateFields);

    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
};


export const deleteProduct = async (formData) => {

    const {id} = Object.fromEntries(formData);
    try {
        await connectToDB();

        await Product.findByIdAndDelete(id);

    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
    revalidatePath("/dashboard/products");
};

export const authenticate = async (prevState, formData) => {
    const {username, password} = Object.fromEntries(formData);
    try {
        await signIn("credentials", { username, password });
    } catch (err) {
        if (err.message.includes("CredentialsSignin")) {
            return "Wrong Credentials";
        }
        throw err;
    }
};
export const logOut =async () =>{

    await signOut();
}