/**
 * Header.jsx
 *
 * The top bar shown next to the page content. Its main job on mobile is
 * hosting the hamburger button that opens the Sidebar drawer — on
 * desktop the sidebar is already visible, so this bar mostly just gives
 * the page some breathing room and a place for a business name/avatar
 * later.
 */
import { MenuBurgerIcon } from "../components/icons/NavIcons.jsx";
import { businessSettings } from "../data/mockData.js";

export default function Header({ onOpenSidebar }) {
  return (
    <header className="flex items-center justify-between border-b border-ink-900/8 bg-white px-4 py-3 sm:px-8">
      <button
        onClick={onOpenSidebar}
        className="rounded-lg p-2 text-ink-700 hover:bg-ink-900/5 sm:hidden"
        aria-label="Open navigation"
      >
        <MenuBurgerIcon />
      </button>

      <div className="hidden sm:block" />

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-ink-900">{businessSettings.businessName}</p>
          <p className="text-xs text-ink-700/60">{businessSettings.country}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-100 font-display text-sm font-semibold text-gold-600">
          {businessSettings.businessName.charAt(0)}
        </div>
      </div>
    </header>
  );
}
