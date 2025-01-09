"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

        const cookieStore = await cookies();
        const session = cookieStore.get("aurum-appwrite-session");

        // Instead of throwing error, return a new client if no session
        if (!session || !session.value) {
            return {
                account: new Account(client)
            };
        }

        // If we have a session, set it
        client.setSession(session.value);
        
        return {
            account: new Account(client)
        };

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get database(){
        return new Databases(client);
    },
    get user(){
        return new Users(client);
    }
  };
}