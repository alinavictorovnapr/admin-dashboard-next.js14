"use client";
import styles from "./loginForm.module.css";
import {authenticate} from "@/app/lib/actions";
//import {useState} from "react";
import { useFormState } from "react-dom";

const LoginForm = () => {
    //version with hook
    const [state, formAction] = useFormState(authenticate, undefined);
   // const [err,setErr] = useState();
   // const handleLogin = async (formData) => {
        //1 version
        // const data = await authenticate(formData);
        // console.log("data",data);
        // data.error && setErr(data.error);

   // }

    return (
        <form action={formAction} className={styles.form}>
            <h1>Login</h1>
            <input type="text" placeholder="username" name="username" />
            <input type="password" placeholder="password" name="password" />
            <button>Login</button>
            {/*{err && err}*/}
            <span className={styles.errorSpan}> {state && state}</span>

        </form>
    );
};

export default LoginForm;