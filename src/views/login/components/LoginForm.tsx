import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { loginApi } from "@/api/modules/login";
import { ReqLogin } from "@/api/interface";
import type { FormInstance, FormProps } from "antd/es/form";
import { LockOutlined, UserOutlined, CloseCircleOutlined, CheckCircleFilled } from "@ant-design/icons";
import md5 from "md5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import usePermissions from "@/hooks/usePermissions";
import { message, notification } from "@/hooks/useMessage";
import { HOME_URL } from "@/config";
import { setToken } from "@/redux/modules/user";
import { getTimeState } from "@/utils";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { initPermission } = usePermissions();

  const formRef = React.useRef<FormInstance>(null);
  const [loading, setLoading] = useState(false);

  const key = "loading";

  const onFinish = async (values: ReqLogin) => {
    try {
      // loading
      setLoading(true);
      console.log(message, "message");
      message.open({ key, content: "登录中...", type: "loading" });
      // user login
      const { data } = await loginApi({ ...values, password: md5(values.password) });
      dispatch(setToken(data.access_token));

      await initPermission(data.access_token);

      notification.success({
        message: getTimeState(),
        description: "欢迎登录 Hooks-Admin",
        icon: <CheckCircleFilled style={{ color: "#73d13d" }} />
      });

      navigate(HOME_URL);
    } finally {
      setLoading(false);
      message.destroy(key);
    }
  };

  const onFinishFailed: FormProps["onFinishFailed"] = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  useEffect(() => {
    document.onkeydown = event => {
      if (event.code === "Enter") {
        event.preventDefault();
        formRef.current?.submit();
      }
    };
    return () => {
      document.onkeydown = () => {};
    };
  }, []);
  return (
    <div className="login-form-content">
      <Form name="login" size="large" autoComplete="off" ref={formRef} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input prefix={<UserOutlined />} placeholder="User：admin / user" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Password：123456" />
        </Form.Item>
        <Form.Item className="login-form-button">
          <Button shape="round" icon={<CloseCircleOutlined />} onClick={onReset}>
            Reset
          </Button>
          <Button type="primary" shape="round" icon={<UserOutlined />} loading={loading} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
