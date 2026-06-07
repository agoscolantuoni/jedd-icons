"use client";

import { motion } from "motion/react";

const GRID = 24;
const CELL = 12;
const PAD = 80;
const SIZE = GRID * CELL;
const W = SIZE + PAD * 2;
const H = SIZE + PAD * 2;

// Box icon: sharp rect from (3,3) to (21,21)
const BOX = { x: 3, y: 3, w: 18, h: 18 };

// Dimension line helpers
function toSvg(gridVal: number) {
  return PAD + gridVal * CELL;
}

const gridFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 },
};
const drawIn = { initial: { pathLength: 0 }, animate: { pathLength: 1 } };

export function HeroBlueprint() {
  const muted = "var(--color-muted-foreground)";
  const gridColor = "var(--color-border)";
  const accent = "var(--color-foreground)";

  return (
    <div className="flex items-center justify-center">
      <svg
        aria-hidden
        className="h-[320px] w-auto sm:h-[380px]"
        fill="none"
        role="img"
        viewBox={`0 0 ${W} ${H}`}
      >
        <title>Blueprint hero illustration</title>
        {/* Dot grid */}
        <motion.g {...gridFade} transition={{ duration: 0.8 }}>
          {Array.from({ length: GRID + 1 }, (_, i) =>
            Array.from({ length: GRID + 1 }, (_, j) => (
              <rect
                fill={gridColor}
                height={1}
                key={`${i}-${j}`}
                opacity={i % 6 === 0 && j % 6 === 0 ? 0.5 : 0.15}
                width={1}
                x={PAD + i * CELL - 0.5}
                y={PAD + j * CELL - 0.5}
              />
            ))
          )}
        </motion.g>

        {/* Major grid lines at 6-unit intervals */}
        <motion.g {...gridFade} transition={{ duration: 0.8, delay: 0.2 }}>
          {[0, 6, 12, 18, 24].map((v) => (
            <g key={`major-${v}`}>
              <line
                opacity={0.1}
                stroke={gridColor}
                strokeWidth={0.5}
                x1={PAD + v * CELL}
                x2={PAD + v * CELL}
                y1={PAD}
                y2={PAD + SIZE}
              />
              <line
                opacity={0.1}
                stroke={gridColor}
                strokeWidth={0.5}
                x1={PAD}
                x2={PAD + SIZE}
                y1={PAD + v * CELL}
                y2={PAD + v * CELL}
              />
            </g>
          ))}
        </motion.g>

        {/* Registration marks at canvas corners */}
        {[
          [0, 0, 1, 1],
          [GRID, 0, -1, 1],
          [0, GRID, 1, -1],
          [GRID, GRID, -1, -1],
        ].map(([gx, gy, dx, dy], i) => (
          <motion.g
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            key={`reg-${i}`}
            style={{ transformOrigin: `${toSvg(gx)}px ${toSvg(gy)}px` }}
            transition={{ duration: 0.2, delay: 0.4 + i * 0.05 }}
          >
            <line
              stroke={muted}
              strokeWidth={1}
              x1={toSvg(gx)}
              x2={toSvg(gx) + dx * 10}
              y1={toSvg(gy)}
              y2={toSvg(gy)}
            />
            <line
              stroke={muted}
              strokeWidth={1}
              x1={toSvg(gx)}
              x2={toSvg(gx)}
              y1={toSvg(gy)}
              y2={toSvg(gy) + dy * 10}
            />
          </motion.g>
        ))}

        {/* Construction lines — dashed box outline */}
        <motion.rect
          height={BOX.h * CELL}
          opacity={0.4}
          stroke={muted}
          strokeDasharray="4 4"
          strokeWidth={1}
          width={BOX.w * CELL}
          x={toSvg(BOX.x)}
          y={toSvg(BOX.y)}
          {...drawIn}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
        />

        {/* Final box stroke */}
        <motion.rect
          height={BOX.h * CELL}
          stroke={accent}
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth={2}
          width={BOX.w * CELL}
          x={toSvg(BOX.x)}
          y={toSvg(BOX.y)}
          {...drawIn}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
        />

        {/* Crosshair marks at box corners */}
        {[
          [BOX.x, BOX.y],
          [BOX.x + BOX.w, BOX.y],
          [BOX.x, BOX.y + BOX.h],
          [BOX.x + BOX.w, BOX.y + BOX.h],
        ].map(([gx, gy], i) => (
          <motion.g
            animate={{ opacity: 0.6 }}
            initial={{ opacity: 0 }}
            key={`cross-${i}`}
            transition={{ duration: 0.3, delay: 1.0 + i * 0.08 }}
          >
            <line
              stroke={accent}
              strokeWidth={0.5}
              x1={toSvg(gx) - 4}
              x2={toSvg(gx) + 4}
              y1={toSvg(gy)}
              y2={toSvg(gy)}
            />
            <line
              stroke={accent}
              strokeWidth={0.5}
              x1={toSvg(gx)}
              x2={toSvg(gx)}
              y1={toSvg(gy) - 4}
              y2={toSvg(gy) + 4}
            />
          </motion.g>
        ))}

        {/* Dimension line — width (top) */}
        <motion.g
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.4, delay: 1.8 }}
        >
          <line
            stroke={muted}
            strokeWidth={0.5}
            x1={toSvg(BOX.x)}
            x2={toSvg(BOX.x + BOX.w)}
            y1={toSvg(BOX.y) - 20}
            y2={toSvg(BOX.y) - 20}
          />
          {/* Ticks */}
          <line
            stroke={muted}
            strokeWidth={0.5}
            x1={toSvg(BOX.x)}
            x2={toSvg(BOX.x)}
            y1={toSvg(BOX.y) - 24}
            y2={toSvg(BOX.y) - 16}
          />
          <line
            stroke={muted}
            strokeWidth={0.5}
            x1={toSvg(BOX.x + BOX.w)}
            x2={toSvg(BOX.x + BOX.w)}
            y1={toSvg(BOX.y) - 24}
            y2={toSvg(BOX.y) - 16}
          />
          <text
            fill={muted}
            fontFamily="monospace"
            fontSize={9}
            textAnchor="middle"
            x={(toSvg(BOX.x) + toSvg(BOX.x + BOX.w)) / 2}
            y={toSvg(BOX.y) - 26}
          >
            18px
          </text>
        </motion.g>

        {/* Dimension line — height (right) */}
        <motion.g
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -4 }}
          transition={{ duration: 0.4, delay: 2.0 }}
        >
          <line
            stroke={muted}
            strokeWidth={0.5}
            x1={toSvg(BOX.x + BOX.w) + 20}
            x2={toSvg(BOX.x + BOX.w) + 20}
            y1={toSvg(BOX.y)}
            y2={toSvg(BOX.y + BOX.h)}
          />
          <line
            stroke={muted}
            strokeWidth={0.5}
            x1={toSvg(BOX.x + BOX.w) + 16}
            x2={toSvg(BOX.x + BOX.w) + 24}
            y1={toSvg(BOX.y)}
            y2={toSvg(BOX.y)}
          />
          <line
            stroke={muted}
            strokeWidth={0.5}
            x1={toSvg(BOX.x + BOX.w) + 16}
            x2={toSvg(BOX.x + BOX.w) + 24}
            y1={toSvg(BOX.y + BOX.h)}
            y2={toSvg(BOX.y + BOX.h)}
          />
          <text
            fill={muted}
            fontFamily="monospace"
            fontSize={9}
            textAnchor="start"
            x={toSvg(BOX.x + BOX.w) + 32}
            y={(toSvg(BOX.y) + toSvg(BOX.y + BOX.h)) / 2 + 3}
          >
            18px
          </text>
        </motion.g>

        {/* Coordinate labels at corners */}
        {(
          [
            [BOX.x, BOX.y, "start", -6],
            [BOX.x + BOX.w, BOX.y, "end", -6],
            [BOX.x, BOX.y + BOX.h, "start", 12],
            [BOX.x + BOX.w, BOX.y + BOX.h, "end", 12],
          ] as const
        ).map(([gx, gy, anchor, dy], i) => (
          <motion.text
            animate={{ opacity: 0.6 }}
            fill={muted}
            fontFamily="monospace"
            fontSize={7}
            initial={{ opacity: 0 }}
            key={`coord-${i}`}
            textAnchor={anchor}
            transition={{ duration: 0.3, delay: 2.2 + i * 0.1 }}
            x={toSvg(gx) + (anchor === "start" ? -6 : 6)}
            y={toSvg(gy) + dy}
          >
            ({gx},{gy})
          </motion.text>
        ))}

        {/* Annotation: viewBox */}
        <motion.text
          animate={{ opacity: 0.5 }}
          fill={muted}
          fontFamily="monospace"
          fontSize={8}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 2.6 }}
          x={PAD}
          y={PAD + SIZE + 30}
        >
          viewBox 0 0 24 24
        </motion.text>

        {/* Annotation: stroke */}
        <motion.text
          animate={{ opacity: 0.5 }}
          fill={muted}
          fontFamily="monospace"
          fontSize={8}
          initial={{ opacity: 0 }}
          textAnchor="end"
          transition={{ duration: 0.4, delay: 2.8 }}
          x={PAD + SIZE}
          y={PAD + SIZE + 30}
        >
          stroke: 2 · linecap: square
        </motion.text>

        {/* Scale bar bottom-left */}
        <motion.g
          animate={{ opacity: 0.4 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 3.0 }}
        >
          <line
            stroke={muted}
            strokeWidth={0.5}
            x1={PAD}
            x2={PAD + CELL}
            y1={PAD + SIZE + 44}
            y2={PAD + SIZE + 44}
          />
          <line
            stroke={muted}
            strokeWidth={0.5}
            x1={PAD}
            x2={PAD}
            y1={PAD + SIZE + 41}
            y2={PAD + SIZE + 47}
          />
          <line
            stroke={muted}
            strokeWidth={0.5}
            x1={PAD + CELL}
            x2={PAD + CELL}
            y1={PAD + SIZE + 41}
            y2={PAD + SIZE + 47}
          />
          <text
            fill={muted}
            fontFamily="monospace"
            fontSize={7}
            x={PAD + CELL + 6}
            y={PAD + SIZE + 47}
          >
            1 unit = 1px
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
