import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
export default NextAuth ({
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: '#7BA18E', // Hex color code
    logo: "/images/logo.png" // Absolute URL to image
  },
  pages: {
    signIn: "/auth/connect",
  },
  providers:[
    GoogleProvider({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECERET
    }),
  ]
})
