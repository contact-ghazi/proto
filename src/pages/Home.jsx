import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import TransNavbar from "../Components/TransNavbar";
import FeaturesSection from "../Components/FeaturesSection";
import ImmediateConsult2 from "../Components/ImmediateConsult2";
import AboutCompany from "../Components/AboutCompany";
import Footer from "./Pages/Footer";
import TypeWriter from "../Components/TypeWriter";

import { MessageSquare, Info, UserSearch, LogIn, ShieldCheck, Zap, CreditCard } from "lucide-react";
import "./Home.css";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.add("home-no-rail");
    return () => document.documentElement.classList.remove("home-no-rail");
  }, []);

  useEffect(() => {
    if (location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div className="home-root">
      <TransNavbar />

      {/* ===== HERO ===== */}
      <section className="hero-wrap">
        <div className="hero-inner">
          {/* TEXT (borderless) */}
          <div className="hero-copy borderless">
            <div className="welcome-pill">Welcome to</div>

            <h1 className="hero-title">
              Advocate <span className="title-glow">AI</span>
            </h1>

            <p className="hero-sub">
              Instant legal help, verified lawyers, and secure 1-on-1 communication — all in one place.
            </p>

            <div className="chip-row">
              <span className="chip"><ShieldCheck size={14}/>Verified</span>
              <span className="chip"><Zap size={14}/>Instant connect</span>
              <span className="chip"><CreditCard size={14}/>Secure payments</span>
            </div>
{/* 
            <div className="hero-cta">
              <a href="#immediate-consult" className="btn solid">
                <MessageSquare size={18} />
                <span>Consult now</span>
              </a>
              <Link to="/dashboard/lawyers" className="btn ghost">
                <UserSearch size={18} />
                <span>Find lawyers</span>
              </Link>
              <Link to="/about" className="btn ghost">
                <Info size={18} />
                <span>About us</span>
              </Link>
              <Link to="/login" className="btn ghost">
                <LogIn size={18} />
                <span>Sign in</span>
              </Link>
            </div> */}

            <div className="type-row">
              <TypeWriter
                strings={[
                  "Find property dispute experts",
                  "Talk to top criminal lawyers",
                  "Consult family law specialists",
                  "Get documentation done fast",
                ]}
              />
            </div>
          </div>

          {/* IMAGE (borderless) */}
          <figure className="hero-media borderless" aria-hidden>
            <img src="/jjj.png" alt="Lady of Justice" className="hero-media__img" />
            <div className="hero-media__glow" />
          </figure>
        </div>
      </section>

      {/* ===== REST (unchanged) ===== */}
      <main className="content-wrap">
        <FeaturesSection />
        <AboutCompany />
        <section id="immediate-consult">
          <ImmediateConsult2 />
        </section>
      </main>

      <Footer />
    </div>
  );
}
