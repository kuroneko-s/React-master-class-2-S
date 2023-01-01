import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface ChartProps {
  coinId: string;
}

export default function Chart({ coinId }: ChartProps) {
  const { data, isLoading } = useQuery(["history", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return <h1>Chart</h1>;
}
