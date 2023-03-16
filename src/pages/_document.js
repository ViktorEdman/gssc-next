import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" >
      <Head />
      <body className="
                  bg-gradient-to-b
                  from-serverYellow
                  to-serverOrange
                 {/*  bg-serverOrange */}
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
