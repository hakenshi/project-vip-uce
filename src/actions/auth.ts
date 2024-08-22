'use server'

import {signIn} from "@/app/auth";

export const login = async (formData) => {

    console.log(formData);

    return

    await signIn(formData);
}