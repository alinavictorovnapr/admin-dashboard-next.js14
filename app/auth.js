import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import {connectToDB} from "@/app/lib/utils";
import {User} from "@/app/lib/models";
import bcrypt from "bcrypt";
import {authConfig} from "@/app/authconfig";

const login = async (credentials) => {
    //fetch users
    try {
        await connectToDB();
        const user = await User.findOne({username: credentials.username});
        if (!user) throw new Error("user isn't exist");
        //can check if user is admin
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if(!isPasswordCorrect) throw new Error("wrong password");
        return user;

    } catch (err) {
        console.log(err);
        throw new Error(err);
    }

};
export const {signIn, signOut, auth} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;

                }catch (err) {
                    console.log(err);
                    return null
                }

            },
        }),
    ],
    callbacks: {
        async jwt ({token, user}){
            if(user){
                token.username=user.username;
                token.img = user.img;
                token.isAdmin=user.isAdmin;


            }
            return token;
        },
        async session ({session,token}){
            if(token){
                session.user.username=token.username;
                session.user.img = token.img;
                session.user.isAdmin = token.isAdmin;

            }
            return session;
        }
    }
})