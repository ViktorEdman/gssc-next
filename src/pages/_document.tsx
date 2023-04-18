import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" >
      <Head />
      <body className="
                  bg-gradient-to-b
                  dark:bg-gradient-to-t
                  from-[#d1138f]
                  to-[#183d88]
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
