import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { isbot } from "isbot";

// Suppress unnecessary warnings and logs in development
if (process.env.NODE_ENV === "development") {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    // Filter out React SSR warnings
    if (
      typeof args[0] === "string" &&
      (args[0].includes("useLayoutEffect") ||
       args[0].includes("Warning: useLayoutEffect does nothing on the server"))
    ) {
      return;
    }
    originalConsoleError.apply(console, args);
  };

  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    // Filter out React SSR warnings
    if (
      typeof args[0] === "string" &&
      (args[0].includes("useLayoutEffect") ||
       args[0].includes("Warning: useLayoutEffect does nothing on the server"))
    ) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };

  const originalConsoleLog = console.log;
  console.log = (...args) => {
    // Filter out Loader error redirects (Shopify auth redirects are normal)
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Loader error") ||
       args[0].includes("Response {"))
    ) {
      return;
    }
    // Filter out Response object logs
    if (
      args[0] &&
      typeof args[0] === "object" &&
      args[0].constructor &&
      args[0].constructor.name === "Response"
    ) {
      return;
    }
    originalConsoleLog.apply(console, args);
  };
}

const ABORT_DELAY = 5000;

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  const callbackName = isbot(request.headers.get("user-agent"))
    ? "onAllReady"
    : "onShellReady";

  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        [callbackName]: () => {
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          didError = true;

          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
