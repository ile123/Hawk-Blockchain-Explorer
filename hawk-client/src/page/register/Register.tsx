import { LoadingOutlined } from "@ant-design/icons";
import { Button, Card, Input } from "antd";
import Password from "antd/es/input/Password";
import { useState } from "react";
import { RegisterInfo } from "../../type/Authentication";
import { RegisterUser } from "../../service/AuthenticationService";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<RegisterInfo>({
    name: "",
    password: "",
    repeatedPassword: "",
    email: "",
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

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

  const registerUser = async () => {
    setLoading(true);
    if (userInfo.password != userInfo.repeatedPassword) {
      setLoading(false);
      openErrorNotification(
        "Password missmatch",
        "Password and repeated password are not the same!"
      );
      return;
    }
    if (!passwordRegex.test(userInfo.password)) {
      setLoading(false);
      openErrorNotification(
        "Password not valid",
        "Password has to be 8+ characters and has to have at least 1 upper case letter and 1 number!"
      );
      return;
    }
    if (!emailRegex.test(userInfo.email)) {
      setLoading(false);
      openErrorNotification("Email not valid", "Given email is not valid!");
      return;
    }
    const result = await RegisterUser({
      name: userInfo.name,
      password: userInfo.password,
      email: userInfo.email,
    });
    if (result) {
      openNotification(
        "Registration success",
        "User was registered with no problems."
      );
      navigate("/login", { replace: true });
    } else {
      openErrorNotification(
        "Registration error",
        "There was a error while trying to save user info!"
      );
    }
    setLoading(false);
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <Card title="Register" className="text-center font-medium w-96">
          <Input
            placeholder="Name..."
            className="mt-5"
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                name: e.target.value,
              })
            }
          />
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
          <Password
            placeholder="Repeat password..."
            className="mt-5"
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                repeatedPassword: e.target.value,
              })
            }
          />
          <Button
            type="primary"
            className="mt-5"
            icon={loading ? <LoadingOutlined /> : ""}
            loading={loading}
            onClick={registerUser}
          >
            Register
          </Button>
        </Card>
      </div>
    </>
  );
}
