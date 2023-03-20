import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

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

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouteState {
  state: {
    name: string,
    symbol: string,
  };
}

function Coin() {
//   const { state: {
//     name, symbol
//   } } = useLocation() as RouteState;
    const { state } = useLocation() as RouteState;
  const { coinId } = useParams();
  const [loading, setLoading] = useState(true);

  console.log(state?.name, state?.symbol, coinId);

  return (
    <Container>
      <Header>
        {/** 
         * state?.name
         * 
         * - "/" 에서 Link를 통해 Coin 컴포넌트로 이동한 경우 state가 전달되어서 제대로 state.name이 렌더링
         * - "/id" 로 직접 방문하여 "/" 에서 이동한게 아닌 경우 state가 없기 때문에 "Loading..." 텍스트가 렌더링
         * - ?(optional)이 없는 경우 state가 undefined 이므로 크래시가 발생.
         */}
        <Title>{ state?.name || "Loading..." }</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}
export default Coin;
