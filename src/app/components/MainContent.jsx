"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Problems } from "./Problems";
import { LeaderBoard } from "./LeaderBoard";

export const MainContent = () => {
  const [problems, setProblems] = useState(true);
  const [leaderboard, setLeaderboard] = useState(false);

  const handleClick = () => {
    setProblems(!problems);
    setLeaderboard(!leaderboard);
  };

  return (
    <div className="w-full">
      <div className="w-[80%] mx-auto">
        <div className="flex justify-between flex-wrap gap-y-2">
          <div className="px-3 py-2 flex gap-x-2 items-center flex-wrap gap-y-1 bg-gray-400/20 rounded-md">
            <span>
              <Button
                variant={problems ? "default" : "outline"}
                onClick={handleClick}
              >
                Problems
              </Button>
              <span className="ml-2">|</span>
            </span>
            <Button
              variant={leaderboard ? "default" : "outline"}
              onClick={handleClick}
            >
              Leader Board
            </Button>
          </div>
          <div className="px-3 py-2 flex gap-x-2 items-center flex-wrap gap-y-1 bg-gray-400/20 rounded-md">
            <span>
              <Button disabled={true}>SORT</Button>
              <span className="ml-2">|</span>
            </span>
            <Button disabled={true}>FILTER</Button>
          </div>
        </div>
        <div className="w-full h-full mt-8">
          {problems ? <Problems /> : <LeaderBoard />}
        </div>
      </div>
    </div>
  );
};
