import ReactApexChart from "react-apexcharts";
import { useLocation, useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atom";
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
  // Recoil
  const isDark = useRecoilValue(isDarkAtom);
  const { priceData } = useLocation().state as IState;

  return (
    <Container>
      <Calculator price={priceData?.price} />
      <br/>
      <ReactApexChart
        type="bar"
        series={[
          {
            name: "rate_of_change",
            data: [
              priceData.percent_change_12h
            ]
          },
        ]}
        options={{
          theme: {
            mode: isDark ? "dark" : "light",
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
