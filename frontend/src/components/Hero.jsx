import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="info-bar">Our payment services have been restored, you can proceed with Event Registrations and accommodation booking</div>
      <div className="hero-backdrop">
        <img src="/sat.png" alt="Saturnalia Logo" className="sat-logo"/>
        <h1 className="sat-title"><span className="sat-50th">50th</span> Saturnalia</h1>
        <div className="sat-tagline">ECHOES OF ETERNITY</div>
      </div>
    </section>
  );
}
