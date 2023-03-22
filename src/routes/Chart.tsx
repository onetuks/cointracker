import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";

interface IContext {
    coinId: string;
}

function Chart() {
    const { coinId } = useOutletContext<IContext>();
    const {isLoading, data} = useQuery(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    console.log(data);
    return <h1>Chart - {coinId}</h1>
}
export default Chart;