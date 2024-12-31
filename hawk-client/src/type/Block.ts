export type Block = {
  blockHash: string;
  blockHeight: number;
  timestamp: string;
  txs: number;
  maxtxsize: number;
  avgfeerate: number;
  transactions: BlockTransaction[];
};

export type BlockTransaction = {
  txid: string;
};
