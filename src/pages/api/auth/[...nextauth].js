import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByName } from "db";
import bcrypt from "bcrypt"

export const authOptions = {
  // Configure one or more authentication providers
  strategy: "jwt",
  jwt: {
    maxAge: 10
  },
  providers: [
    CredentialsProvider({
        
      
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "username",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin", value: "admin" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials.username) return null
        // Add logic here to look up the user from the credentials supplied
       
        const user = await getUserByName(credentials.username)
        console.log(user)
        if (await bcrypt.compare(credentials.password, user.password)) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    
    
  ],

}
export default NextAuth(authOptions)