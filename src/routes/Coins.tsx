import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${props => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid white;
  display: flex;
  align-items: center;
  padding: 20px;
  a {
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;


const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  type: string;
  rank: number;
  is_active: boolean;
  is_new: boolean;
}

interface IContext { 
  isDark: boolean,
}

function Coins() {
  // react-query를 사용하면 데이터가 캐시에 남기 때문에 뒤로가기를 해도 코인 정보가 남아있음
  // 쿼리가 다시 발생하지 않는다는 의미.
  const { isLoading, data } = useQuery<ICoins[]>(["allCoins"], fetchCoins);
  // const [coins, setCoins] = useState<ICoins[]>([]);
  // const [loading, setLoading] = useState(true);

  const { isDark } = useOutletContext<IContext>();

  // useEffect(() => {
  //   // ()();
  //   // () 안의 내용은 바로 실행됨.
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     // console.log(json);
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <Container>
      <Helmet>
        <title>
          코인
        </title>
      </Helmet>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Img
                src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                alt={coin.name}
              />
              <Link
                to={`/${coin.id}`}
                state={ { name: coin.name, symbol: coin.symbol } }
              >
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
