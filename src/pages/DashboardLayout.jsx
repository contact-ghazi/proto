import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavRail from "../Components/NavRail";   // Capital 'C' matches your tree
import "./Dashboard.css";                      // reuse your theme

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // active key from /dashboard/<key>
  const active = pathname.split("/")[2] || "lawyers";

  return (
    <div className="page-root">
      {/* brand background */}
      <div className="brand-haze" />
      <div className="brand-haze delay" />

      {/* left rail (desktop) / bottom tabs (mobile) */}
      <NavRail active={active} onChange={(key) => navigate(`/dashboard/${key}`)} />

      {/* page body; left margin handled by CSS (no overlap) */}
      <main className="shell">
        <Outlet />
      </main>
    </div>
  );
}
