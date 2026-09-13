/**
 * App.jsx
 *
 * The root application component. It stays intentionally thin: its only
 * job is to render the route tree defined in routes/AppRoutes.jsx.
 *
 * WHY SEPARATE App.jsx FROM AppRoutes.jsx?
 * Keeping routing definitions in their own file (routes/AppRoutes.jsx)
 * means App.jsx doesn't get cluttered as the app grows, and it makes the
 * full list of pages easy to find in one place.
 */
import AppRoutes from "./routes/AppRoutes.jsx";

export default function App() {
  return <AppRoutes />;
}
