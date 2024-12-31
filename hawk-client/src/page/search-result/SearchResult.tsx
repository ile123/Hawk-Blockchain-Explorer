import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Search } from "../../service/ExplorerService";
import axios from "axios";
import { Card, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function SearchResult() {
  const [searchResult, setSearchResult] = useState({
    addresses: [],
    transactions: [],
    blocks: [],
  });
  const [loading, setLoading] = useState(true);
  const openErrorNotification = (title: string, description: string) => {
    notification.error({
      message: title,
      description: description,
      showProgress: true,
      pauseOnHover: false,
      placement: "top",
    });
  };
  const { query } = useParams();
  const navigate = useNavigate();

  const handleNavigate = (type: string, id: string) => {
    navigate(`/${type}/${id}`);
  };

  useEffect(() => {
    const searchWithQuery = async () => {
      try {
        if (query && loading !== true) {
          const { status, result } = await Search(query);
          if (status === 200) {
            setSearchResult({
              addresses: result.addresses,
              transactions: result.transactions,
              blocks: result.blocks,
            });
          } else if (status === 401) {
            openErrorNotification("Authentication Error", result);
          } else if (status === 500) {
            openErrorNotification("Server Error", result);
          } else {
            openErrorNotification("Uknown Error", "Uknown error has occured.");
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
          console.log("Request timed out:", error.message);
          console.log("This is expected, no need to panic.");
        } else {
          if (error instanceof Error)
            console.error("Error fetching data:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    searchWithQuery();
  }, [query, loading]);
  return (
    <>
      <div className="h-screen flex items-center justify-center flex-col">
        {loading ? (
          <LoadingOutlined />
        ) : (
          <div className="flex space-x-8 p-8">
            <Card className="w-[34rem] h-72 text-center overflow-auto">
              <h3 className="text-2xl font-semibold mb-4">Addresses</h3>
              <ul className="space-y-2 flex items-center justify-center">
                {searchResult.addresses.map(
                  (address: string, index: number) => (
                    <li key={index} className="hover:bg-gray-100 rounded p-2">
                      <h4
                        onClick={() => handleNavigate("address", address)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        {address}
                      </h4>
                    </li>
                  )
                )}
              </ul>
            </Card>

            <Card className="w-[34rem] h-72 text-center overflow-auto">
              <h3 className="text-2xl font-semibold mb-4">Transactions</h3>
              <ul className="space-y-2 flex items-center justify-center">
                {searchResult.transactions.map(
                  (transaction: string, index: number) => (
                    <li key={index} className="hover:bg-gray-100 rounded p-2">
                      <h4
                        onClick={() =>
                          handleNavigate("transaction", transaction)
                        }
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        {transaction}
                      </h4>
                    </li>
                  )
                )}
              </ul>
            </Card>

            <Card className="w-[34rem] h-72 text-center overflow-auto">
              <h3 className="text-2xl font-semibold mb-4">Blocks</h3>
              <ul className="space-y-2 flex items-center justify-center">
                {searchResult.blocks.map((block, index) => (
                  <li key={index} className="hover:bg-gray-100 rounded p-2">
                    <h4
                      onClick={() => handleNavigate("block", block)}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      {block}
                    </h4>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
