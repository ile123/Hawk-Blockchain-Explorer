import { Card, notification } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { GetAddressHistory } from "../service/HistoryService";

export default function ViewedAddresses() {
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState<string[]>([]);

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
    const getAddressHistory = async () => {
      try {
        const { status, result } = await GetAddressHistory();
        if (status === 200) {
          setAddresses(result);
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

    getAddressHistory();
  }, []);

  return (
    <>
      <Card className="w-[34rem] h-72 text-center overflow-auto">
        <h3 className="font-normal">Viewed Addresses</h3>
        {loading ? (
          <LoadingOutlined />
        ) : addresses.length === 0 ? (
          <h2 className="mt-8 font-medium">No addresses found</h2>
        ) : (
          <div className="mt-8 font-medium">
            <ul>
              {addresses.map((item, key) => (
                <li key={key}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </>
  );
}
