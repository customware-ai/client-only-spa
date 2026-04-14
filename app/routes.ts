/**
 * Route Configuration
 *
 * Simplified SPA routes for the generic starter shell.
 */

import {
  type RouteConfig,
  index,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("layouts/MainLayout.tsx", [
    index("routes/index.tsx"),
  ]),
] satisfies RouteConfig;
