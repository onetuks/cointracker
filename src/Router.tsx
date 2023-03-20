import { createBrowserRouter } from "react-router-dom";
import App from './App';
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Coins />
            },
            {
                path: ":coinId/*",
                element: <Coin />,
                // React-Router-Dom@6.x 
                // Nested Routes 사용 방법
                children: [
                    {
                        path: "price",
                        element: <Price />
                    },
                    {
                        path: "chart",
                        element: <Chart />
                    }
                ],
            }
        ],
    }
]);

export default router;
