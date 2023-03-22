import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";

interface IHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: string;
}

interface IContext {
  coinId: string;
}

function Chart() {
  const { coinId } = useOutletContext<IContext>();
  const { isLoading, data } = useQuery<IHistory[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((hist) => Number(hist.close)),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: { curve: "smooth", width: 4},
            xaxis: {
              axisTicks: {show: false,},
              axisBorder: {show: false,},
              labels: { show: false },
            },
            yaxis: {
              show: false,
            },
          }}
        />
      )}
    </div>
  );
}
export default Chart;
