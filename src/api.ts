const BASE_URL = `https://api.coinpaprika.com/v1`;
const CHART_URL = `https://ohlcv-api.nomadcoders.workers.dev`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) =>
    response.json()
  );
}

export function fetchInfo(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
        response.json()
    );
}

export function fetchTicker(coinId: string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
        response.json()
    );
}

export function fetchCoinHistory(coinId: string) {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60*60*24*7;
    return fetch(`${CHART_URL}?coinId=${coinId}`).then((response) =>
        response.json()
    );
}