import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { loginApi } from "@/api/modules/login";
import { ReqLogin } from "@/api/interface";
import type { FormInstance, FormProps } from "antd/es/form";
import { LockOutlined, UserOutlined, CloseCircleOutlined } from "@ant-design/icons";

const LoginForm: React.FC = () => {

  const formRef = React.useRef<FormInstance>(null);
  const [loading, setLoading] = useState(false);


  const onFinish = async (values: ReqLogin) => {
    try {
      // loading
      setLoading(true);
      // user login
      const { data } = await loginApi({ ...values, password: (values.password) });
      console.log(data);

    } finally {
      console.log("finally");
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
