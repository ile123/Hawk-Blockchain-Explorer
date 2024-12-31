import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetTransactionInfo } from "../../service/ExplorerService";
import { Card, notification } from "antd";
import {
  LoadingOutlined,
} from "@ant-design/icons";
import {
  CoinbaseInput,
  Input,
  Output,
  Transaction,
} from "../../type/Transaction";

export default function SearchResultTransactions() {
  const [transaction, setTransaction] = useState<Transaction>({
    txid: "",
    hash: "",
    size: 0,
    weight: 0,
    version: 0,
    blockHash: "",
    inputs: [],
    outputs: []
  });
  const [loading, setLoading] = useState(true);
  const { query } = useParams();
  const navigate = useNavigate();

  const openErrorNotification = (title: string, description: string) => {
    notification.error({
      message: title,
      description: description,
      showProgress: true,
      pauseOnHover: false,
      placement: "top",
    });
  };

  const isCoinbaseInput = (input: unknown): input is CoinbaseInput => {
    return (
      typeof input === "object" &&
      input !== null &&
      "coinbase" in input &&
      "sequence" in input &&
      typeof (input as { coinbase: unknown }).coinbase === "string" &&
      typeof (input as { sequence: unknown }).sequence === "number"
    );
  };

  const navigateTransaction = (direction: "prev" | "next", txId: string) => {
    setLoading(true);
    const trimmedTxId = txId.replace("Coinbase Transaction", "").trim();
    if (direction === "prev") {
      navigate(`/transaction/${trimmedTxId}`);
    } else {
      navigate(`/transaction/${trimmedTxId}`);
    }
  };

  useEffect(() => {
    const getTransactionInfo = async () => {
      try {
        const { status, result } = await GetTransactionInfo(query);
        if (status === 200) {
          setTransaction(result);
        } else if (status === 401) {
          openErrorNotification("Authentication Error", result);
        } else if (status === 500) {
          openErrorNotification("Server Error", result);
        } else {
          openErrorNotification("Unknown Error", "Unknown error has occurred");
        }
      } catch (error) {
        console.error("Error fetching transaction info:", error);
        openErrorNotification("Error", "Failed to fetch transaction info");
      } finally {
        setLoading(false);
      }
    };

    getTransactionInfo();
  }, [query]);

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          {loading ? (
            <LoadingOutlined className="text-4xl" />
          ) : (
            <div className="w-full">

              <Card>
                <h6 className="text-center font-semibold text-4xl">
                  Transaction Info
                </h6>
                <div className="flex space-x-4 mb-4 mt-4 font-medium text-xl">
                  <h3>Txid: {transaction.txid}</h3>
                  <h3>Size: {transaction.size}</h3>
                </div>
                <div className="flex space-x-4 mb-4 font-medium text-xl">
                  <h3>Hash: {transaction.hash}</h3>
                  <h3>Weight: {transaction.weight}</h3>
                </div>
                <div className="flex space-x-4 mb-4 font-medium text-xl">
                  <h3>Block hash: {transaction.blockHash}</h3>
                  <h3>Version: {transaction.version}</h3>
                </div>
              </Card>

              <div className="flex space-x-4 mt-4">
                <Card className="w-[34rem]">
                  <h6 className="text-center font-semibold text-4xl">
                    Inputs (sequence-coinbase/txid-vout)
                  </h6>
                  <ul className="overflow-auto h-52 text-center mt-4">
                    {transaction.inputs.map(
                      (item: CoinbaseInput | Input, key: number) =>
                        isCoinbaseInput(item) ? (
                          <li key={key} className="font-medium text-xl">
                            {item.sequence} - {item.coinbase}
                          </li>
                        ) : (
                          <li key={key} className="font-medium text-xl cursor-pointer text-sky-400" onClick={() => navigateTransaction("prev", item.txid)}>
                            {item.txid} - {item.vout}
                          </li>
                        )
                    )}
                  </ul>
                </Card>
                <Card className="w-[34rem]">
                  <h6 className="text-center font-semibold text-4xl">
                    Outputs (n-value)
                  </h6>
                  <ul className="overflow-auto h-52 text-center mt-4">
                    {transaction.outputs.map((item: Output, key) => (
                      <li key={key} className="font-medium text-xl">
                        {item.n} - {item.value} BTC
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
