'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"


export const signIn = async ({email, password} : signInProps) => {
    try {
        const { account } = await createAdminClient();
        const response = await account.createEmailPasswordSession(email, password)
        return parseStringify(response)
    } catch (error) {
        console.log(error)
    }
}

export const signUp = async (userData: SignUpParams) => {
    try {
        const { account } = await createAdminClient();
        const {email, password, firstName, lastName} = userData;
        const newUserAcc = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
        const session = await account.createEmailPasswordSession(email, password);
        const cookieStore = await cookies();
        
        cookieStore.set("aurum-appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
        return parseStringify(newUserAcc)
    } catch (error) {
        console.log(error)
    }
}



export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const resUser = await account.get();
        console.log({resUser})
        return parseStringify(resUser)
    } catch (error) {
        console.log(error)
    }
}
  
export const logoutAccount = async () => {
    try {
        const {account} = await createSessionClient();
        (await cookies()).delete("aurum-appwrite-session")
        await account.deleteSession("current")
    } catch (error) {
        return error;
    }
}