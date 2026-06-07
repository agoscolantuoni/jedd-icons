import {
  ArrowDown,
  ArrowUp,
  Bolt,
  Check,
  ChevronRight,
  createElement,
  createIcons,
  RefreshCw,
} from "@jedd/core";

import { CircleCheck } from "@jedd/core/fill";

// ── createElement ────────────────────────────────────────────────────

const container = document.getElementById("create-element");

const demos = [
  { name: "ArrowDown", icon: ArrowDown },
  { name: "ArrowUp", icon: ArrowUp },
  { name: "Check", icon: Check },
  { name: "RefreshCw", icon: RefreshCw },
  { name: "ChevronRight", icon: ChevronRight },
  { name: "Bolt", icon: Bolt },
];

for (const { name, icon } of demos) {
  const card = document.createElement("div");
  card.className = "icon-card";
  card.appendChild(createElement(icon, { size: 32 }));
  const label = document.createElement("span");
  label.textContent = name;
  card.appendChild(label);
  container.appendChild(card);
}

// ── createElement — Fill variant ─────────────────────────────────────

const fillContainer = document.getElementById("create-element-fill");

const fillDemos = [{ name: "CircleCheck", icon: CircleCheck }];

for (const { name, icon } of fillDemos) {
  const card = document.createElement("div");
  card.className = "icon-card";
  card.appendChild(createElement(icon, { size: 32, variant: "fill" }));
  const label = document.createElement("span");
  label.textContent = name;
  card.appendChild(label);
  fillContainer.appendChild(card);
}

// ── createIcons (auto-replace) ───────────────────────────────────────

createIcons({
  icons: { ArrowDown, Check, RefreshCw },
  attrs: { size: 32 },
});
