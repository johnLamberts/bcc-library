import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";

// Mantine Import
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import "mantine-react-table/styles.css";

// React PDF Viewer
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { MantineProvider, rem } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalsProvider } from "@mantine/modals";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Helmet } from "react-helmet";

import { Worker } from "@react-pdf-viewer/core";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Helmet>
      <meta charSet="utf-8" />
      <title>
        Binangonan Catholic Library OPAC: Explore Books, Journals, and More
      </title>
      <meta name="author" content="Your Name" />
      <meta
        property="og:title"
        content="In-depth articles and guides on research techniques, recommended reading lists, and highlights from the library's collection, incorporating relevant keywords naturally throughout the content"
      />
      <meta
        property="og:description"
        content="Discover a wealth of knowledge at the Binangonan Catholic Library OPAC. Explore our extensive collection of books, journals, and academic resources to fuel your research and learning journey."
      />
      <meta property="og:image" content="https://example.com/image.jpg" />
      <meta property="og:url" content="https://bcc-opac-library.site/home" />
      <meta
        name="twitter:title"
        content="In-depth articles and guides on research techniques, recommended reading lists, and highlights from the library's collection, incorporating relevant keywords naturally throughout the content"
      />
      <meta
        name="twitter:description"
        content="Discover a wealth of knowledge at the Binangonan Catholic Library OPAC. Explore our extensive collection of books, journals, and academic resources to fuel your research and learning journey."
      />
      <meta name="twitter:image" content="https://example.com/image.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      {/* <link rel="canonical" href="http://mysite.com/example" /> */}
    </Helmet>
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={{
          fontSizes: {
            xs: rem(10),
            sm: rem(11),
            md: rem(14),
            lg: rem(16),
            xl: rem(20),
          },
          primaryColor: "red",
        }}
      >
        <ModalsProvider>
          <BrowserRouter>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <App />
            </Worker>
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>

      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </React.StrictMode>
);
