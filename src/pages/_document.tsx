import React from 'react';
import Document, { Html, Main, NextScript, Head } from 'next/document';

export default class MyDocument extends Document<any> {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        href="https://bnr-design-system.vercel.app/assets/fonts/fonts.css"
                        rel="stylesheet"
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `try {
    var query = window.matchMedia("(prefers-color-scheme: dark)");
    var preference = window.localStorage.getItem("theme");
    if (preference) {
        if ((preference === "system" && query.matches) || preference === "dark") {
            document.documentElement.style.backgroundColor = "#191919";
        } else {
            document.documentElement.style.backgroundColor = "#FFFFFF";
            document.documentElement.classList.add('light');
        }
    } else {
        document.documentElement.classList.add('light');
    }
} catch (e) {}`,
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
