export type Team = "HOME" | "AWAY";
export type GoalListener = (teamThatScored: Team) => void;

class GameSubject {
  private listener: GoalListener[] = [];

  public attach(listener: GoalListener) {
    this.listener.push(listener);
  }

  public detach(listenerToRemove: GoalListener) {
    this.listener = this.listener.filter(
      (listener) => listener !== listenerToRemove
    );
  }

  private notify(team: Team) {
    this.listener.forEach((listener) => listener(team));
  }

  public score(team: Team) {
    this.notify(team);
  }
}

const gameSubject = new GameSubject();

export default gameSubject;
