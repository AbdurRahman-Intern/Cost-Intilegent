/**
 * DashboardLayout.jsx
 *
 * PURPOSE:
 * The shell every authenticated page renders inside: Sidebar + Header +
 * page content (via React Router's <Outlet />).
 *
 * DATA FLOW:
 *   AppRoutes
 *        ↓ (wraps every dashboard route)
 *   DashboardLayout
 *        ↓ renders
 *   Sidebar + Header + <Outlet /> (the actual page: DashboardPage,
 *   IngredientsPage, etc., chosen by React Router based on the URL)
 *
 * WHY SIDEBAR-OPEN STATE LIVES HERE, NOT IN Sidebar.jsx ITSELF:
 * Header.jsx needs to OPEN the sidebar (via its hamburger button) and
 * Sidebar.jsx needs to CLOSE itself (backdrop click, or clicking a
 * link). Two components can't share state unless it "lives" in a common
 * parent — this is the classic React "lift state up" pattern.
 */
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen flex-1 flex-col">
        <Header onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">
          {/* Outlet renders whichever page matched the current route. */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
