"use client";

import { useState, useEffect } from "react";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

const fruits = ["apple", "banana", "cherry", "lemon"];

function getRandomFruit() {
  return fruits[Math.floor(Math.random() * fruits.length)];
}

export default function SlotMachine() {
  const [grid, setGrid] = useState<string[][]>([
    [getRandomFruit(), getRandomFruit(), getRandomFruit()],
    [getRandomFruit(), getRandomFruit(), getRandomFruit()],
    [getRandomFruit(), getRandomFruit(), getRandomFruit()],
  ]);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const interval = setInterval(() => {
      setGrid((prev) => {
        const newGrid = prev.map((col) => {
          const newCol = [getRandomFruit(), ...col.slice(0, 2)];
          return newCol;
        });
        return newGrid;
      });
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-2">
        {grid.map((col, colIdx) =>
          col.map((fruit, rowIdx) => (
            <img
              key={`${colIdx}-${rowIdx}`}
              src={`/${fruit}.png`}
              alt={fruit}
              width={64}
              height={64}
              className="border rounded"
            />
          ))
        )}
      </div>
      <button
        onClick={spin}
        disabled={isSpinning}
        className="px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </button>
      {!isSpinning && (
        (grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2] ||
         grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2] ||
         grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2] ||
         grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0] ||
         grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1] ||
         grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]) ? (
          <div className="flex flex-col items-center gap-2">
            <span className="text-xl font-bold">You Win!</span>
            <Share text={`Spin and win with fruit slots! ${url}`} />
          </div>
        ) : null
      )}
    </div>
  );
}
