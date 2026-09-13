/**
 * Sidebar.jsx
 *
 * PURPOSE:
 * The main navigation. It's a plain list of NavLinks — React Router's
 * NavLink gives us an "active" class automatically based on the current
 * URL, so we don't have to manually track which page is selected.
 *
 * MOBILE BEHAVIOR:
 * On small screens this renders as an off-canvas drawer controlled by
 * `open`/`onClose`, owned by DashboardLayout.jsx (see the "why state
 * lives in the layout" note there). On desktop (`sm:` breakpoint and up)
 * it's simply always visible and `open` is ignored via CSS.
 */
import { NavLink } from "react-router-dom";
import {
  DashboardIcon,
  IngredientsIcon,
  RecipesIcon,
  MenuItemsIcon,
  ProfitabilityIcon,
  AlertsIcon,
  AIIcon,
  SettingsIcon,
} from "../components/icons/NavIcons.jsx";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: DashboardIcon, end: true },
  { to: "/ingredients", label: "Ingredients", icon: IngredientsIcon },
  { to: "/recipes", label: "Recipes", icon: RecipesIcon },
  { to: "/menu-items", label: "Menu Items", icon: MenuItemsIcon },
  { to: "/profitability", label: "Profitability", icon: ProfitabilityIcon },
  { to: "/alerts", label: "Alerts", icon: AlertsIcon },
  { to: "/ai-analyst", label: "AI Analyst", icon: AIIcon },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile backdrop: only rendered (and clickable) while the drawer is open. */}
      {open && (
        <div className="fixed inset-0 z-30 bg-ink-950/40 sm:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-ink-950 text-white
          transition-transform duration-200 sm:static sm:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center gap-2 px-6 py-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500 font-display text-sm font-bold">
            FC
          </div>
          <span className="font-display text-[15px] font-semibold tracking-tight">
            Food Cost Intelligence
          </span>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                ${isActive ? "bg-white/10 text-gold-100" : "text-white/60 hover:bg-white/5 hover:text-white"}`
              }
            >
              <Icon className="h-6 w-6" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 px-6 py-4 text-xs text-white/40">
          v0.1.0 · Mock data mode
        </div>
      </aside>
    </>
  );
}
