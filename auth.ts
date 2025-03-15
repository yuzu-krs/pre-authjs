import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";

export const config:NextAuthConfig={
    theme:{
        logo: "https://media2.dev.to/dynamic/image/width=1080,height=1080,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fmf8mmr9ha1t2oarll8y4.png",
    },
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