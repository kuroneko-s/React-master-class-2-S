import { useParams } from "react-router";

interface Params {
  coinId: string;
}

export default function Coin() {
  const params = useParams<Params>(); // route path :/coindId <<<< 요거 받아오는거 @PathValidable이랑 같은 듯?
  console.log(params);

  return <h1>Coin {params.coinId}</h1>;
}
