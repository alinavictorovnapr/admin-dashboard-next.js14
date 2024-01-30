import {Product, User} from "@/app/lib/models";
import {connectToDB} from "@/app/lib/utils";

export const fetchUsers = async (q,page) => {
    const regex = new RegExp(q,"i");
    //how many users will be shown on page for pagination
    const ITEM_PER_PAGE = 2;
    try {
        await connectToDB();
        const count = await User.find({username:{$regex:regex}}).count();
        const users = await User.find({username:{$regex:regex}}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page-1));
        return {users,count};
    }catch (err) {
        console.log(err);
        throw new Error(err);
    }

};

export const fetchUser = async (id) => {

    try {
        await connectToDB();
        const user = await User.findById(id)
        return user;
    }catch (err) {
        console.log(err);
        throw new Error(err);
    }

};

export const fetchProducts = async (q,page) => {
    const regex = new RegExp(q,"i");
    //how many products will be shown on page for pagination
    const ITEM_PER_PAGE = 2;
    try {
        await connectToDB();
        const count = await Product.find({title:{$regex:regex}}).count();
        const products = await Product.find({title:{$regex:regex}}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page-1));
        return {products,count};
    }catch (err) {
        console.log(err);
        throw new Error(err);
    }

};

export const fetchProduct = async (id) => {

    try {
        await connectToDB();
        const product = await Product.findById(id)
        return product;
    }catch (err) {
        console.log(err);
        throw new Error(err);
    }

};


export const cards = [
    {
        id: 1,
        title: "Total Users",
        number: 10.928,
        change: 12,
    },
    {
        id: 2,
        title: "Stock",
        number: 8.236,
        change: -2,
    },
    {
        id: 3,
        title: "Revenue",
        number: 6.642,
        change: 18,
    },
];