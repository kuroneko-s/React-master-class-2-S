import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { useQuery } from "react-query";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 3rem;
`;

const Container = styled.div`
  padding: 10px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  display: flex;
  align-items: center;
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 20px;
  transition: color 0.1s ease-in;

  &:hover {
    color: ${(props) => props.theme.accentColor};

    img {
      opacity: 0.5;
    }
  }
`;

const Image = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 5px;
  transition: all 0.1s ease-in;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Coins() {
  /* const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []); */

  const { data, isLoading } = useQuery<CoinInterface[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      <CoinList>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data?.slice(0, 100)?.map((coin) => (
            <Link
              to={{
                pathname: `/${coin.id}`,
                /* search: "?sort=name", */
                /* hash: "#the-hash", */
                state: { name: coin.name },
              }}
              key={coin.id}
            >
              <Coin>
                <Image
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt={`${coin.name} 이미지`}
                />
                {coin.name} &rarr;
              </Coin>
            </Link>
          ))
        )}
      </CoinList>
    </Container>
  );
}
