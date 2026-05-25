"use client";

export function PageBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background: "#07071a",
      }}
    >
      {/* Subtle dot-grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(167,139,250,0.13) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          opacity: 0.3,
        }}
      />

      {/* Orb 1 — top-left primary */}
      <div
        style={{
          position: "absolute",
          top: "-5%",
          left: "-8%",
          width: "70vw",
          height: "70vw",
          maxWidth: 900,
          maxHeight: 900,
          background:
            "radial-gradient(circle, rgba(109,40,217,0.10) 0%, transparent 65%)",
          animation: "orb-drift-a 34s ease-in-out infinite",
        }}
      />

      {/* Orb 2 — bottom-right secondary */}
      <div
        style={{
          position: "absolute",
          bottom: "-8%",
          right: "-5%",
          width: "60vw",
          height: "60vw",
          maxWidth: 780,
          maxHeight: 780,
          background:
            "radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 65%)",
          animation: "orb-drift-b 28s ease-in-out infinite",
        }}
      />

      {/* Orb 3 — center-right accent */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          right: "15%",
          width: "45vw",
          height: "45vw",
          maxWidth: 600,
          maxHeight: 600,
          background:
            "radial-gradient(circle, rgba(91,33,182,0.05) 0%, transparent 65%)",
          animation: "orb-drift-c 42s ease-in-out infinite",
        }}
      />

      {/* Orb 4 — lower-left fill */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "10%",
          width: "40vw",
          height: "40vw",
          maxWidth: 520,
          maxHeight: 520,
          background:
            "radial-gradient(circle, rgba(109,40,217,0.05) 0%, transparent 65%)",
          animation: "orb-drift-d 38s ease-in-out infinite",
        }}
      />

      {/* Very subtle top vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "30%",
          background:
            "linear-gradient(180deg, rgba(7,7,26,0.6) 0%, transparent 100%)",
        }}
      />

      {/* Very subtle bottom vignette */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "20%",
          background:
            "linear-gradient(0deg, rgba(7,7,26,0.5) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
