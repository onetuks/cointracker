import { useParams } from "react-router-dom";

interface RouterParams {
    coinId : string;
}

function Coin() {
    // useParms() typescript 타입 선언법 1
    // const { coinId } = useParams<{coinId: string}>();
    const { coinId } = useParams<RouterParams>();
    return <h1>Coin: { coinId }</h1>;
}
export default Coin;