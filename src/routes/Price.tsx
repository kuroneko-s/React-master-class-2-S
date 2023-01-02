import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { IHistory } from "./Chart";
import Chart from "react-apexcharts";

interface PriceProps {
  coinId: string;
}

export default function Price({ coinId }: PriceProps) {
  const { data, isLoading } = useQuery<IHistory[]>(
    ["price", "history", coinId],
    () => fetchCoinHistory(coinId)
  );

  const seriesData = data?.map((price, idx) => ({
    x: new Date(2023, 1, idx + 1),
    y: [+price.open, +price.high, +price.low, +price.close],
  }));

  const seriesDataLinear = data?.map((price, idx) => {
    return {
      x: new Date(2023, 1, idx + 1),
      y: +price.open - +price.close,
    };
  });

  console.log(seriesDataLinear);
  return (
    <div>
      {isLoading
        ? "Loading..."
        : seriesData &&
          seriesDataLinear && (
            <div>
              <Chart
                type="candlestick"
                height={290}
                series={[{ data: seriesData }]}
                options={{
                  chart: {
                    type: "candlestick",
                    height: 290,
                    id: "candles",
                    toolbar: {
                      autoSelected: "pan",
                      show: false,
                    },
                    zoom: {
                      enabled: false,
                    },
                  },
                  plotOptions: {
                    candlestick: {
                      colors: {
                        upward: "#3C90EB",
                        downward: "#DF7D46",
                      },
                    },
                  },
                  xaxis: {
                    type: "datetime",
                  },
                  theme: {
                    mode: "dark",
                  },
                }}
              />
              <div>
                <Chart
                  type="bar"
                  height={160}
                  series={[
                    {
                      name: "volume",
                      data: seriesDataLinear,
                    },
                  ]}
                  options={{
                    chart: {
                      height: 160,
                      type: "bar",
                      brush: {
                        enabled: true,
                        target: "candles",
                      },
                      selection: {
                        enabled: true,
                        xaxis: {
                          min: new Date("20 Jan 2017").getTime(),
                          max: new Date("10 Dec 2017").getTime(),
                        },
                        fill: {
                          color: "#ccc",
                          opacity: 0.4,
                        },
                        stroke: {
                          color: "#0D47A1",
                        },
                      },
                    },
                    dataLabels: {
                      enabled: false,
                    },
                    plotOptions: {
                      bar: {
                        columnWidth: "80%",
                        colors: {
                          ranges: [
                            {
                              from: -1000,
                              to: 0,
                              color: "#F15B46",
                            },
                            {
                              from: 1,
                              to: 10000,
                              color: "#FEB019",
                            },
                          ],
                        },
                      },
                    },
                    stroke: {
                      width: 0,
                    },
                    xaxis: {
                      type: "datetime",
                      axisBorder: {
                        offsetX: 13,
                      },
                    },
                    yaxis: {
                      labels: {
                        show: false,
                      },
                    },
                    theme: {
                      mode: "dark",
                    },
                  }}
                />
              </div>
            </div>
          )}
    </div>
  );
}
