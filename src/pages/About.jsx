import React from "react";
import "./About.css";
import TransNavbar from "../components/TransNavbar";  // adjust path if needed
import FounderImage from "../assets/Founder.jpg";

function About() {
    return (
        <div className="about-container">
             <TransNavbar /> {/* ✅ Navbar added */}
            {/* Main Info Section */}
            <div className="about-container">
            {/* Main Info Section */}
            <div className="about-card">
                {/* Left Section - Founder Image & Name */}
                <div className="about-left">
                    <img
                        src={FounderImage}
                        alt="Founder"
                        className="about-logo-rect"
                    />
                    <h3 className="founder-name">Huzaifa Taj</h3>
                </div>

                {/* Right Section - Founder Bio + Company Details */}
                <div className="about-right">
                    <div className="company-about">
                        <h1 className="about-title">About Advocate AI</h1>
                        <p className="about-text">
                            Advocate AI is an innovative platform that connects clients
                            with legal professionals in real-time. Our mission is to make
                            legal support accessible, fast, and reliable.
                        </p>
                        <p className="about-text">
                            With features like <strong>emergency lawyer chat</strong>,{" "}
                            <strong>case tracking</strong>, and{" "}
                            <strong>document assistance</strong>, we simplify your legal
                            journey. Our AI-driven system ensures privacy, security, and
                            verified legal guidance.
                        </p>
                    </div>
                    <h3 className="founder-title">Founder & CEO</h3>
                    <p className="founder-desc">
                        Huzaifa Taj is passionate about blending law and technology to make legal
                        solutions more accessible. He
                        leads Advocate AI in creating a smarter legal future.
                    </p>
                </div>
            </div>
        </div>

            {/* Services Section */}
            <div className="our-services">
                <h2 className="section-title">Our Services</h2>
                <div className="services-grid">
                    <div className="service-card">
                        <div className="service-icon">⚡</div>
                        <h3>Emergency Legal Assistance</h3>
                        <p>Instant help from experienced lawyers via real-time messaging.</p>
                    </div>
                    <div className="service-card">
                        <div className="service-icon">🤖</div>
                        <h3>AI-Based Legal Guidance</h3>
                        <p>Quick initial guidance to help you understand your case better.</p>
                    </div>
                    <div className="service-card">
                        <div className="service-icon">🔒</div>
                        <h3>Secure Case Management</h3>
                        <p>Track cases and store documents securely in one place.</p>
                    </div>
                </div>
            </div>


            {/* Why Choose Us Section */}
            {/* Why Choose Us Section */}
            <div className="choose-section">
                <h2 className="choose-title">Why Choose Us?</h2>
                <div className="choose-cards">
                    <div className="choose-card">
                        <h3>✔ Real-Time Legal Help</h3>
                        <p>Get instant legal advice anytime, anywhere with our quick-response platform.</p>
                    </div>
                    <div className="choose-card">
                        <h3>✔ Verified Lawyers</h3>
                        <p>We connect you with only verified and experienced legal professionals for your safety.</p>
                    </div>
                    <div className="choose-card">
                        <h3>✔ AI-Powered Assistance</h3>
                        <p>Smart AI tools help you understand your case, track progress, and suggest next steps.</p>
                    </div>
                    <div className="choose-card">
                        <h3>✔ 24/7 Availability</h3>
                        <p>Legal emergencies don’t wait, and neither do we. Support is available round the clock.</p>
                    </div>
                </div>
            </div>


            {/* Mission & Vision Section */}
            {/* Our Mission & Vision */}
            <section className="text-center mt-12 px-6">
                <h2 className="text-3xl font-bold mb-6 text-purple-400">Our Mission & Vision</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                    {/* Mission Card */}
                    <div className="bg-gray-900 rounded-xl shadow-lg p-8 hover:shadow-purple-500/40 transition duration-300 border border-purple-600/20">
                        <div className="text-4xl mb-4 text-purple-400">🎯</div>
                        <h3 className="text-xl font-semibold mb-3 text-purple-300">Our Mission</h3>
                        <p className="text-gray-300">
                            Our mission is to provide <strong>accessible, reliable, and fast legal help</strong>
                            for everyone. We aim to ensure <strong>accuracy, transparency, and trust</strong>
                            in every legal interaction through AI-driven solutions.
                        </p>
                    </div>

                    {/* Vision Card */}
                    <div className="bg-gray-900 rounded-xl shadow-lg p-8 hover:shadow-purple-500/40 transition duration-300 border border-purple-600/20">
                        <div className="text-4xl mb-4 text-purple-400">🚀</div>
                        <h3 className="text-xl font-semibold mb-3 text-purple-300">Our Vision</h3>
                        <p className="text-gray-300">
                            Our vision is to <strong>empower users with AI tools</strong>,
                            making legal services more efficient, secure, and user-friendly.
                            We strive for a future where legal help is just a click away.
                        </p>
                    </div>

                </div>
            </section>

        </div>
    );
}

export default About;
