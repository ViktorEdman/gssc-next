import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" >
      <Head />
      <body className="
                  bg-gradient-to-b
                  from-serverYellow
                  to-serverOrange
                  dark:bg-gradient-to-t
                  dark:from-[#d1138f]
                  dark:to-[#183d88]
                  bg-cover
                  bg-repeat-x

                  min-h-screen
                  max-w-screen"
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
