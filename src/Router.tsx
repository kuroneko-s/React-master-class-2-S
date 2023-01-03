import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps {
  clickHandler: () => void;
  isDark: boolean;
}

export default function Router({ clickHandler, isDark }: IRouterProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/:coinId"}>
          <Coin isDark={isDark} />
        </Route>
        <Route path={"/"}>
          <Coins clickHandler={clickHandler} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
