import React from "react";
import ReactDOM from "react-dom/client";
import useMockAdapter from "src/api/useMockAdapter";
import "./index.css";
import App from "./App";
import {Helmet} from "react-helmet";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

const RootApp = () => {
    useMockAdapter();

    return <App />;
};

root.render(
    <React.StrictMode>
        <Helmet>
            <title>My Title</title>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                rel="stylesheet"
            ></link>
        </Helmet>
        <RootApp />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </React.StrictMode>,
);
