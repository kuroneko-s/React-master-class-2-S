import React, { useEffect, useReducer } from "react";
import game, { GoalListener, Team } from "./GameSubject";

interface Score {
  home: number;
  away: number;
}

const onGoalScored = (score: Score, team: Team) => {
  if ((team = "HOME")) {
    return {
      home: score.home + 1,
      away: score.away,
    };
  }

  return {
    home: score.home,
    away: score.away + 1,
  };
};

export const ScoreBoard: React.FC = () => {
  const [score, dispatch] = useReducer(onGoalScored, {
    home: 0,
    away: 0,
  });

  useEffect(() => {
    game.attach(dispatch as GoalListener);

    return () => {
      game.detach(dispatch);
    };
  }, []);

  return (
    <span>
      {`Home - ${score.home}`}
      {`Away - ${score.away}`}
    </span>
  );
};
