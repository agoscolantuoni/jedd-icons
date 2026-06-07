import {
  ArrowDown,
  ArrowUp,
  Bolt,
  Check,
  ChevronRight,
  RefreshCw,
} from "@jedd/react";
import { CircleCheck } from "@jedd/react/fill";
import { useState } from "react";

const strokeIcons = [
  { name: "ArrowDown", Icon: ArrowDown },
  { name: "ArrowUp", Icon: ArrowUp },
  { name: "Check", Icon: Check },
  { name: "RefreshCw", Icon: RefreshCw },
  { name: "ChevronRight", Icon: ChevronRight },
  { name: "Bolt", Icon: Bolt },
];

const fillIcons = [{ name: "CircleCheck", Icon: CircleCheck }];

export default function App() {
  const [size, setSize] = useState(32);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [color, setColor] = useState("");

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: "2rem",
        color: "#0f172a",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
        jedd-icons — React
      </h1>
      <p
        style={{
          fontSize: "0.875rem",
          color: "#64748b",
          marginBottom: "1.5rem",
        }}
      >
        Smoke test for the React package.
      </p>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "2rem",
          fontSize: "0.875rem",
        }}
      >
        <label>
          Size
          <input
            max={64}
            min={16}
            onChange={(e) => setSize(Number(e.target.value))}
            type="range"
            value={size}
          />
          {size}
        </label>
        <label>
          Stroke
          <input
            max={3}
            min={0.5}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            step={0.25}
            type="range"
            value={strokeWidth}
          />
          {strokeWidth}
        </label>
        <label>
          Color
          <input
            onChange={(e) => setColor(e.target.value)}
            type="color"
            value={color || "#0f172a"}
          />
        </label>
      </div>

      <h2
        style={{ fontSize: "1rem", color: "#64748b", marginBottom: "0.75rem" }}
      >
        Stroke icons
      </h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {strokeIcons.map(({ name, Icon }) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem",
              border: "1px solid #e2e8f0",
              borderRadius: "0.5rem",
            }}
          >
            <Icon
              size={size}
              strokeWidth={strokeWidth}
              {...(color ? { color } : {})}
            />
            <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
              {name}
            </span>
          </div>
        ))}
      </div>

      <h2
        style={{ fontSize: "1rem", color: "#64748b", margin: "2rem 0 0.75rem" }}
      >
        Fill icons
      </h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {fillIcons.map(({ name, Icon }) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem",
              border: "1px solid #e2e8f0",
              borderRadius: "0.5rem",
            }}
          >
            <Icon size={size} {...(color ? { color } : {})} />
            <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
