import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";

export const config:NextAuthConfig={
    providers:[Github({
        clientId:process.env.AUTH_GITHUB_ID,
        clientSecret:process.env.AUTH_GITHUB_SECRET,
    })],
    basePath:"/api/auth",
    callbacks:{
        authorized({request,auth}){
            try{
                const {pathname}=request.nextUrl;
                if(pathname==="/protected-page") return !!auth;
                return true;
            }catch(error){
                console.log(error);
            }
        },
        jwt({token,trigger,session}){
            if(trigger==="update") token.name=session.user.name;
            return token;
        }
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth(config);