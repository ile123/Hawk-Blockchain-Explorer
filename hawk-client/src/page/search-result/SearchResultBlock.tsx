import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetBlockInfo } from "../../service/ExplorerService";
import { Button, Card, notification } from "antd";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Block, BlockTransaction } from "../../type/Block";

export default function SearchResultBlock() {
  const [block, setBlock] = useState<Block>({
    blockHash: "",
    blockHeight: -1,
    timestamp: "",
    txs: -1,
    maxtxsize: -1,
    avgfeerate: -1,
    transactions: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { query } = useParams();

  const navigateBlockchain = (direction: string) => {
    setLoading(true);
    if(direction === "prev") {
      navigate(`/block/${block.blockHeight - 1}`);
    } else {
      navigate(`/block/${block.blockHeight + 1}`);
    }
  }

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
    const getBlockInfo = async () => {
      try {
        const { status, result } = await GetBlockInfo(query);
        if (status === 200) {
          setBlock(result);
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

    getBlockInfo();
  }, [query]);

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <Button onClick={() => navigateBlockchain("prev")} icon={<DoubleLeftOutlined />} />
            <Button onClick={() => {navigateBlockchain("next")}} icon={<DoubleRightOutlined />} />
          </div>

          <Card>
            {loading ? (
              <LoadingOutlined />
            ) : (
              <div>
                <h6 className="text-center font-semibold text-4xl">Block</h6>
                <div>
                  <div>
                    <h3 className="mt-4">Block hash: {block.blockHash}</h3>
                    <h3 className="mt-4">Block height: {block.blockHeight}</h3>
                  </div>
                  <div>
                    <h3 className="mt-4">Timestamp: {block.timestamp}</h3>
                    <h3 className="mt-4">Txs: {block.txs}</h3>
                  </div>
                  <div>
                    <h3 className="mt-4">Max txs size: {block.maxtxsize}</h3>
                    <h3 className="mt-4">
                      Average fee rate: {block.avgfeerate}
                    </h3>
                  </div>
                </div>
                <h3 className="text-center font-medium text-xl">
                  Transactions
                </h3>
                <ul className="overflow-auto h-52 text-center mt-4">
                  {block.transactions.map(
                    (item: BlockTransaction, key: number) => {
                      return (
                        <div key={key}>
                          <li>{item.txid}</li>
                        </div>
                      );
                    }
                  )}
                </ul>
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
