/**
 * Route Configuration
 *
 * Simplified SPA routes for the single-page workflow shell.
 */

import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";
import { attachGlobalFrontendErrorHandlers } from "./utils/error-logger";

/**
 * @critical
 * @description
 * Attach global frontend error handlers once on app mount.
 * In the client-only template, these errors stay in the browser console unless
 * a logging endpoint is explicitly configured.
 * @important
 * Do NOT remove this initializer. Without it, frontend runtime errors
 * are no longer captured by the shared browser-side logger.
 */
attachGlobalFrontendErrorHandlers();

export default [
  layout("layouts/MainLayout.tsx", [
    index("routes/index.tsx"),
    route("workflow/:stepId", "routes/workflow.$stepId.tsx"),
  ]),
] satisfies RouteConfig;
