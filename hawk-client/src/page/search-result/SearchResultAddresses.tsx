import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetAddressInfo } from "../../service/ExplorerService";
import { Card, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Address } from "../../type/Address";

export default function SearchResultAddresses() {

    const [address, setAddress] = useState<Address>({
      address: "",
  scriptPubKey: "",
  witness_version: 0,
  witness_program: "",
  labels: []
      });
      const [loading, setLoading] = useState(true);
      const { query } = useParams();
    
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
        const getAddressInfo = async () => {
          try {
            const { status, result } = await GetAddressInfo(query);
            if (status === 200) {
              setAddress(result);
            } else if (status === 401) {
              openErrorNotification("Authentication Error", result);
            } 
            else if(status === 404) {
              openErrorNotification("Not found", result);
            }
            else if (status === 500) {
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
    
        getAddressInfo();
      }, [query]);

    return (
        <>
          <div className="h-screen flex items-center justify-center">
            <Card>
              {loading ? (
                <LoadingOutlined />
              ) : (
                <div>
                    <h6 className="text-center font-semibold text-4xl">Address</h6>
                  <div>
                    <h3 className="mt-4">Address: {address.address}</h3>
                    <h3 className="mt-4">Script Pub key: {address.scriptPubKey}</h3>
                  </div>
                  <div>
                    <h3 className="mt-4">Witness Version: {address.witness_version}</h3>
                    <h3 className="mt-4">Witness Program: {address.witness_program}</h3>
                  </div>
                  <h3 className="text-center font-medium text-xl mt-4">Labels</h3>
                  <ul className="overflow-auto h-52 text-center mt-4">
                    {address.labels.map((item: string, key: number) => {
                      return (
                        <div key={key}>
                          <li>{item}</li>
                        </div>
                      );
                    })}
                  </ul>
                </div>
              )}
            </Card>
          </div>
        </>
      );
}