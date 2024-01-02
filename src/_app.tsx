import { AppProps } from "next/app";
import { useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyAPP({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap');
  }, []);
  return (
    <Component {...pageProps} />
  );
}