import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useLocation, useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { fetchCoinHistory } from "../api";
import { isDarkAtom } from "../atom";

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

interface IState {
  coinId: string;
}

function Chart() {
  // recoil
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useLocation().state as IState;
  const { isLoading, data } = useQuery<IHistory[]>(
    ["ohlcv", coinId], () =>
    fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
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
              mode: isDark? "dark" : "light",
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
            stroke: { curve: "smooth", width: 4 },
            xaxis: {
              axisTicks: { show: false },
              axisBorder: { show: false },
              labels: { show: false },
              categories: data?.map((hist) => hist.time_close*1000),
              type: "datetime",
            },
            yaxis: {
              show: false,
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
                y: {
                    formatter: (value) => value.toFixed(2)
                }
            }
          }}
        />
      )}
    </div>
  );
}
export default Chart;
