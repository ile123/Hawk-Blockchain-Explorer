export type Input = {
    txid: string;
    vout: number;
}

export type CoinbaseInput = {
    coinbase: string;
    sequence: number;
}

export type Output = {
    value: number;
    n: number;
}

export type Transaction = {
    txid: string;
    hash: string;
    size: number;
    weight: number;
    version: number;
    blockHash: string;
    inputs: Input[] | CoinbaseInput[];
    outputs: Output[];
}

