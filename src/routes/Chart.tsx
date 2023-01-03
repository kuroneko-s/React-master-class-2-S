import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
  isDark: boolean;
}

export interface IHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

export default function Chart({ coinId, isDark }: ChartProps) {
  const { data, isLoading } = useQuery<IHistory[]>(
    ["chart", "history", coinId],
    () => fetchCoinHistory(coinId),
    {
      // refetchInterval: 10000,
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              data: data!.map((price) => +price.close),
              name: "price",
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            grid: {
              show: false,
            },
            yaxis: {
              show: true,
            },
            xaxis: {
              labels: {
                show: false,
              },
            },
          }}
        />
      )}
    </div>
  );
}
