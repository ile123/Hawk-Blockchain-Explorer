import { Card, notification } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { GetTransactionHistory } from "../service/HistoryService";

export default function ViewedTransactions() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<string[]>([]);

  const openErrorNotification = (title: string, description: string) => {
    notification.error({
      message: title,
      description: description,
      showProgress: true,
      pauseOnHover: false,
      placement: "top",
    });
  };

  useEffect(() => {
    const getTransactionsHistory = async () => {
      try {
        const { status, result } = await GetTransactionHistory();
        if (status === 200) {
          setTransactions(result);
        } else if (status === 401) {
          openErrorNotification("Authentication Error", result);
        } else if (status === 500) {
          openErrorNotification("Server Error", result);
        } else {
          openErrorNotification("Unknown Error", "Unknown error has occurred");
        }
      } catch (error) {
        console.error("Error fetching address history:", error);
        openErrorNotification("Error", "Failed to fetch address history");
      } finally {
        setLoading(false);
      }
    };

    getTransactionsHistory();
  }, []);

  return (
    <>
      <Card className="w-[34rem] h-72 text-center overflow-auto ml-8 mr-8">
        <h3 className="font-normal">Viewed Transactions</h3>
        {loading ? (
          <LoadingOutlined />
        ) : transactions.length === 0 ? (
            <h2 className="mt-8 font-medium">No transactions found</h2>
        ) : (
          <div className="mt-8">
            <ul>
              {transactions.map((item, key) => (
                <li key={key} className="font-medium">{item}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </>
  );
}