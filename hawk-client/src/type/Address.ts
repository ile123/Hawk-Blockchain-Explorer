export type Address = {
  address: string;
  scriptPubKey: string;
  witness_version: number;
  witness_program: string;
  labels: string[];
};
