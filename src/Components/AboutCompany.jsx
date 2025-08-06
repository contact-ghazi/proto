import React, { useEffect, useRef, useState } from "react";
import "./AboutCompany.css";

const AboutCompany = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`about-company-section ${isVisible ? "visible" : ""}`}
    >
      <div className="about-box">
        <h2 className="about-title">Advocate AI</h2>
        <p className="about-description">
  Advocate AI bridges the gap between legal expertise and artificial intelligence,
  offering instant, smart, and user-friendly legal services 24/7. Our mission is to simplify
  justice and make legal support available to all. We strive to empower individuals by
  providing them with accurate legal advice, ensuring transparency in legal procedures,
  and eliminating the delays traditionally associated with legal consultations.
  <br /><br />
  With Advocate AI, users can access tailored legal guidance, connect with professionals
  instantly, and manage their legal needs from the comfort of their homes. Whether it’s
  resolving disputes, drafting documents, or understanding rights, Advocate AI is your
  24/7 digital legal partner.
</p>

      </div>
    </section>
  );
};

export default AboutCompany;
