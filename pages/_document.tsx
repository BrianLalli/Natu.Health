// // pages/_document.tsx
// import Document, { Html, Head, Main, NextScript } from 'next/document'

// class MyDocument extends Document {
//   render() {
//     return (
//       <Html lang="en">
//         <Head>
//           <link rel="icon" href="/favicon.ico" />
//           {/* Include other head elements like meta tags here */}
//         </Head>
//         <body className="font-inter antialiased bg-off-white text-gray-800 tracking-tight">
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     )
//   }
// }

// export default MyDocument

// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          {/* Fonts can be loaded here if switching to <link> method */}
          {/* Example for Google Fonts (replace with your fonts if needed):
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet"> 
          <link href="https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap" rel="stylesheet"> */}
          {/* Include other head elements like meta tags here */}
        </Head>
        <body className="font-inter antialiased bg-off-white text-gray-800 tracking-tight">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

