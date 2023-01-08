import { useEffect, useState } from "react";
import game, { GoalListener, Team } from "./GameSubject";

interface Goal {
  team: Team;
  time: string;
}

export const GoalHistory: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const onGoalScored: GoalListener = (teamThatScored: Team) => {
    const goal = {
      team: teamThatScored,
      time: Date.now().toString(),
    };

    setGoals((old) => old.concat(goal));
  };

  useEffect(() => {
    game.attach(onGoalScored);

    return () => {
      game.detach(onGoalScored);
    };
  }, []);

  return <span>{goals.map((v) => `${v.team} ${v.time}`)}</span>;
};
