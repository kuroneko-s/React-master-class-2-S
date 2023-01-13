import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./recoil";

function App() {
  const [minute, setMinute] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
  const onMinuteChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinute(+event.currentTarget.value);
  };
  const onHourChange = (e: React.FormEvent<HTMLInputElement>) => {
    setHours(+e.currentTarget.value);
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
      <input
        type={"text"}
        name="hour"
        placeholder="시간"
        value={hours}
        onChange={onHourChange}
      />
    </div>
  );
}

export default App;
