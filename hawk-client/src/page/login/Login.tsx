import { LoadingOutlined } from "@ant-design/icons";
import { Button, Card, Input, Row, Col, notification } from "antd";
import Password from "antd/es/input/Password";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginInfo } from "../../type/Authentication";
import { LoginUser } from "../../service/AuthenticationService";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const openErrorNotification = (title: string, description: string) => {
    notification.error({
      message: title,
      description: description,
      showProgress: true,
      pauseOnHover: false,
      placement: "top",
    });
  };

  const openNotification = (title: string, description: string) => {
    notification.open({
      message: title,
      description: description,
      showProgress: true,
      pauseOnHover: false,
      placement: "top",
    });
  };

  const loginUser = async () => {
    setLoading(true);
    if (!emailRegex.test(userInfo.email)) {
      setLoading(false);
      openErrorNotification("Email not valid", "Given email is not valid!");
      return;
    }
    const result = await LoginUser(userInfo);
    if (result) {
      openNotification("Login Successful", "You have logged in successfully.");
      navigate("/", { replace: true });
    } else {
      openErrorNotification(
        "Login Failed",
        "Invalid credentials. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <Card title="Login" className="text-center font-medium w-96">
          <Input
            placeholder="Email..."
            className="mt-5"
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                email: e.target.value,
              })
            }
          />
          <Password
            placeholder="Password..."
            className="mt-5"
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                password: e.target.value,
              })
            }
          />
          <Row
            className="mt-5"
            justify="space-between"
            align="middle"
            gutter={[16, 16]}
          >
            <Col>
              <Button
                type="primary"
                icon={loading ? <LoadingOutlined /> : null}
                loading={loading}
                onClick={loginUser}
              >
                Login
              </Button>
            </Col>
            <Col>
              <Link to="/register" className="font-medium">
                Register here.
              </Link>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}
