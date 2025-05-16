import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://85c14bba2de0254dce7ea13738ea0d85@o4509331184943104.ingest.us.sentry.io/4509331202768896",

  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: 1,

  replaysSessionSampleRate: 0.1,

  replaysOnErrorSampleRate: 1.0,

  debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
