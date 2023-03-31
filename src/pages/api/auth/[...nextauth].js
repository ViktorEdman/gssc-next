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
      async authorize(credentials, req) {
        if (!credentials.username) return null
        // Add logic here to look up the user from the credentials supplied
       
        const user = await getUserByName(credentials.username)
        if (await bcrypt.compare(credentials.password, user.password)) {
          // Any object returned will be saved in `user` property of the JWT
          const userSession = {
                                id: user.id,
                                name: user.name,
                                role: user.role
                              }
          return userSession
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
    
    
  ],

}
export default NextAuth(authOptions)