import '../styles/global.css';
import Script from 'next/script'
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);
  const [name, setName] = useState('Y otsuka');
  const [pictureUrl, setPictureUrl] = useState('/images/profile.jpg');

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    console.log("start liff.init()...");
    (window).liff
      .init({ liffId: "1660671680-D8vjjVOl" })
      .then(() => {
        console.log("liff.init() done");
        (window).liff.getProfile().then(function (profile) {
          setName(profile.displayName);
          setPictureUrl(profile.pictureUrl);
        });
        setLiffObject((window).liff);
      })
      .catch((error) => {
        console.log(`liff.init() failed: ${error}`);
        if (!process.env.liffId) {
          console.info(
            "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
          );
        }
        setLiffError(error.toString());
      });
    },
    []
  );

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  pageProps.name = name;
  pageProps.pictureUrl = pictureUrl;
    console.log(pageProps)
  return (
    <>
      <Script charSet="utf-8" src="https://static.line-scdn.net/liff/edge/2/sdk.js" strategy="beforeInteractive"></Script>
      <Component {...pageProps} />
    </>
  );
}