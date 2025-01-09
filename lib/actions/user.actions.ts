'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"

export const signIn = async ({email, password} : signInProps) => {
    try {
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(email, password);
        
        // Set the session cookie after successful login
        const cookieStore = await cookies();
        cookieStore.set("aurum-appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        
        return parseStringify(session);
    } catch (error) {
        console.error('Sign in error:', error);
        throw error; // Propagate error to handle it in the UI
    }
}

export const signUp = async (userData: SignUpParams) => {
    try {
        const { account } = await createAdminClient();
        const {email, password, firstName, lastName} = userData;
        
        // Create user account
        const newUserAcc = await account.create(
            ID.unique(), 
            email, 
            password, 
            `${firstName} ${lastName}`
        );
        
        // Create session immediately after signup
        const session = await account.createEmailPasswordSession(email, password);
        
        // Set session cookie
        const cookieStore = await cookies();
        cookieStore.set("aurum-appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        
        return parseStringify(newUserAcc);
    } catch (error) {
        console.error('Sign up error:', error);
        throw error;
    }
}

export async function getLoggedInUser() {
    try {
        // Check for session cookie first
        const cookieStore = await cookies();
        const sessionSecret = cookieStore.get("aurum-appwrite-session");
        
        if (!sessionSecret?.value) {
            return null; // No session exists
        }
        
        const { account } = await createSessionClient();
        
        // Verify session is still valid
        const session = await account.getSession('current');
        if (!session) {
            cookieStore.delete("aurum-appwrite-session");
            return null;
        }
        
        const user = await account.get();
        return parseStringify(user);
    } catch (error) {
        console.error('Get logged in user error:', error);
        // If session is invalid, clean up
        const cookieStore = cookies();
        cookieStore.delete("aurum-appwrite-session");
        return null;
    }
}

export const logoutAccount = async () => {
    try {
        const {account} = await createSessionClient();
        const cookieStore = await cookies();
        
        // Delete session from Appwrite
        await account.deleteSession("current");
        
        // Clear session cookie
        cookieStore.delete("aurum-appwrite-session");
        
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}