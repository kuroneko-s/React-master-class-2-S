import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";

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
  position: relative;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const Btn = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  background: none;
  border: none;
  color: ${(props) => props.theme.accentColor};
  font-size: 1.5rem;
  cursor: pointer;
`;

interface Params {
  coinId: string;
}

interface RouterState {
  name: string;
}

interface QuotesUSD {
  ath_date: string;
  ath_price: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_1h: number;
  percent_change_1y: number;
  percent_change_6h: number;
  percent_change_7d: number;
  percent_change_12h: number;
  percent_change_15m: number;
  percent_change_24h: number;
  percent_change_30d: number;
  percent_change_30m: number;
  percent_from_price_ath: number;
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
}

interface ICoinPrice {
  beta_value: number;
  circulating_supply: number;
  first_data_at: string;
  id: string;
  last_updated: string;
  max_supply: number;
  name: string;
  quotes: { USD?: QuotesUSD; BTC?: QuotesUSD };
  rank: number;
  symbol: string;
  total_supply: number;
}

interface ICoinInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface ICoinProps {
  isDark: boolean;
}

export default function Coin({ isDark }: ICoinProps) {
  const { coinId } = useParams<Params>(); // route path :/coindId <<<< 요거 받아오는거 @PathValidable이랑 같은 듯?
  const { state } = useLocation<RouterState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const history = useHistory();
  const backBtnHandler = () => {
    history.goBack();
  };

  const { data: infoData, isLoading: infoIsLoading } = useQuery<ICoinInfo>(
    ["coinInfo", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { data: tickerData, isLoading: tickerIsLoading } = useQuery<ICoinPrice>(
    ["coinTickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      // refetchInterval: 5000,
    }
  );
  const loading = infoIsLoading || tickerIsLoading;

  return (
    <Container>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Btn type="button" onClick={backBtnHandler}>
          &#60;
        </Btn>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickerData?.quotes.USD?.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickerData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link
                to={{
                  pathname: `/${coinId}/chart`,
                  state: { name: infoData?.name },
                }}
              >
                Chart
              </Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link
                to={{
                  pathname: `/${coinId}/price`,
                  state: { name: infoData?.name },
                }}
              >
                Price
              </Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/:coinId/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} isDark={isDark} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
