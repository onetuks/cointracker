import ReactApexChart from "react-apexcharts";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Calculator from "./Calculator";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

interface IState {
  priceData: {
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
  };
}

function Price() {
  const { priceData } = useLocation().state as IState;

  console.log(priceData);

  return (
    <Container>
      <Calculator price={priceData?.price} />
      <br/>
      <ReactApexChart
        type="candlestick"
        series={[
          {
            name: "histogram",
            data: [
              {x: "15m", y:priceData?.percent_change_15m},
              {x: "30m", y:priceData?.percent_change_30m},
              {x: "1h", y:priceData?.percent_change_1h},
              {x: "6h", y:priceData?.percent_change_6h},
              {x: "12h", y:priceData?.percent_change_12h},
              {x: "24h", y:priceData?.percent_change_24h},
              {x: "7d", y:priceData?.percent_change_7d},
              {x: "30d", y:priceData?.percent_change_30d},
              {x: "1y", y:priceData?.percent_change_1y},
            ],
          },
        ]}
        options={{
          theme: {
            mode: "dark",
          },
          chart: {
            height: 300,
            width: 500,
          },
          title: {
            text: "Rate of Change",
          },
          yaxis: {
            min: -40,
            max: 40,
          }
        }}
      />
    </Container>
  );
}
export default Price;
