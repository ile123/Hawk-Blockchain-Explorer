import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isJwtValid } from "../../helper/Jwt";
import { Button, Input } from "antd";
import ViewedBlocks from "../../component/ViewedBlocks";
import ViewedTransactions from "../../component/ViewedTransaction";
import ViewedAddresses from "../../component/ViewedAddresses";
import { SearchOutlined } from "@ant-design/icons";

export default function Main() {
  const navigate = useNavigate();
  const [serachValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!isJwtValid()) navigate("/login", { replace: true });
  }, [navigate]);

  const search = () => {
    navigate(`/search/${serachValue}`);
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center flex-col">
        <div className="flex items-center space-x-4 mb-6">
          <Input
            placeholder="Search for blocks, transactions and addresses"
            className="w-[30rem]"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button onClick={search} icon={<SearchOutlined />}>Search</Button>
        </div>
        <div className="flex flex-row">
          <div className="flex-1">
            <ViewedBlocks />
          </div>
          <div className="flex-1">
            <ViewedTransactions />
          </div>
          <div className="flex-1">
            <ViewedAddresses />
          </div>
        </div>
      </div>
    </>
  );
}
