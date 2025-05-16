import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://85c14bba2de0254dce7ea13738ea0d85@o4509331184943104.ingest.us.sentry.io/4509331202768896",

  tracesSampleRate: 1,

  debug: false,
});
