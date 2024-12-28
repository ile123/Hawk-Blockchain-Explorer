import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isJwtValid } from "../../helper/Jwt";
import { Card, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Main() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!isJwtValid()) navigate("/login", { replace: true });
  }, [navigate]);

  const openErrorNotification = (title: string, description: string) => {
    notification.error({
      message: title,
      description: description,
      showProgress: true,
      pauseOnHover: false,
      placement: "top",
    });
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <Card className="text-center font-medium w-96">

        </Card>
      </div>
    </>
  );
}
