/**
 * NavIcons.jsx
 *
 * WHY INLINE SVG INSTEAD OF AN ICON LIBRARY:
 * The brief calls for a small, dependency-light bundle. A handful of
 * inline SVGs, each as its own tiny component, is enough for our
 * 8-item sidebar and costs nothing extra to install. Each icon accepts
 * a `className` so the Sidebar can control size/color (currentColor is
 * used everywhere below for that reason).
 */
export const DashboardIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <rect x="3" y="3" width="8" height="8" rx="1.5" />
    <rect x="13" y="3" width="8" height="5" rx="1.5" />
    <rect x="13" y="12" width="8" height="9" rx="1.5" />
    <rect x="3" y="15" width="8" height="6" rx="1.5" />
  </svg>
);

export const IngredientsIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M4 12c0-4.5 3.5-8 8-8s8 3.5 8 8-3.5 9-8 9-8-4.5-8-9Z" />
    <path d="M9 10c1-1 2-1.5 3-1.5s2 .5 3 1.5" strokeLinecap="round" />
  </svg>
);

export const RecipesIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M6 3h9l3 3v15H6z" />
    <path d="M9 9h6M9 13h6M9 17h4" strokeLinecap="round" />
  </svg>
);

export const MenuItemsIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M5 8h14l-1.5 11a1.5 1.5 0 0 1-1.5 1.3H8a1.5 1.5 0 0 1-1.5-1.3L5 8Z" />
    <path d="M9 8a3 3 0 0 1 6 0" />
  </svg>
);

export const ProfitabilityIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M4 19h16M6 15l4-4 3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AlertsIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M12 3l9 16H3z" strokeLinejoin="round" />
    <path d="M12 10v4" strokeLinecap="round" />
    <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const AIIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <rect x="4" y="7" width="16" height="12" rx="3" />
    <path d="M9 12h.01M15 12h.01" strokeLinecap="round" strokeWidth="2.5" />
    <path d="M12 3v4" strokeLinecap="round" />
  </svg>
);

export const SettingsIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <circle cx="12" cy="12" r="3" />
    <path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2-1.2L14 3h-4l-.6 2.6a7 7 0 0 0-2 1.2l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9c.6.5 1.3.9 2 1.2L10 21h4l.6-2.6a7 7 0 0 0 2-1.2l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z" />
  </svg>
);

export const MenuBurgerIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
  </svg>
);
