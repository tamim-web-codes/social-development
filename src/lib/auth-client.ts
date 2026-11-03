import { createAuthClient } from "better-auth/react"
import { jwtClient } from "better-auth/client/plugins"
export const authClient = createAuthClient({
     plugins: [
    jwtClient() 
  ],
    baseURL: process.env.BETTER_AUTH_URL
})
export const { signIn, signUp, useSession } = createAuthClient()