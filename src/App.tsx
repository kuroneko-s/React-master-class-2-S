import { useRecoilState } from "recoil";
import { minuteState } from "./recoil";

function App() {
  const [minute, setMinute] = useRecoilState(minuteState);
  const onMinuteChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinute(+event.currentTarget.value);
  };
  console.log(minute);
  return (
    <div>
      <input
        type={"text"}
        name="minute"
        placeholder="분"
        value={minute}
        onChange={onMinuteChange}
      />
      <input type={"text"} name="hour" placeholder="시간" />
    </div>
  );
}

export default App;
