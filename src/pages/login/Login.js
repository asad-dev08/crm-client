import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Layout, Typography } from "antd";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/auth/authSlice";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user]);

  const handleSubmit = async (values) => {
    const { username, password } = values;

    if (username !== "" && password !== "") {
      // Replace with actual authentication logic
      //await handleLogin({ username, password });
      const data = {
        username,
        password,
      };
      await dispatch(loginUser(data))
        .then((res) => {
          if (res && res.payload && res.payload.user) {
            const firstMenu =
              (res.payload.menus &&
                res.payload.menus.length > 0 &&
                res.payload.menus[0].url) ||
              undefined;
            toast.success("Logged in", { duration: 4000 });
            if (firstMenu) navigate(firstMenu, { replace: true });
            else navigate("/error", { replace: true });
          }
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    } else {
      toast.error("Enter username and password", { duration: 3000 });
    }
  };
  // if (user) {
  //   navigate("/dashboard", { replace: true });
  // }
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="min-w-96">
        <Title level={4} className="text-center pb-5">
          Login
        </Title>
        <Form
          className=""
          layout="vertical"
          name="login-form"
          initialValues={{
            username: "",
            password: "",
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your Password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
