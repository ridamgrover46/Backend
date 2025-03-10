import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Typography, Modal } from "antd";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ visible: false, success: false, message: "" });
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/auth/login", values);
      
      if (response.data.success) {
        // Store username and email in localStorage
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);
      
        setModal({ visible: true, success: true, message: "Login successful! Redirecting..." });
        setTimeout(() => navigate("/home"), 2000);
      } else {
        setModal({ visible: true, success: false, message: response.data.message });
      }
    } catch (error) {
      setModal({ visible: true, success: false, message: error.response?.data?.message || "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[radial-gradient(circle,_#fff,_#ffd6d6)]">
      <motion.div
        className="w-1/2 flex justify-center items-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img 
          src="./src/Images/Home-Photoroom.png" 
          alt="Headphone"
          className="w-[70%] h-auto object-contain"
        />
      </motion.div>

      <motion.div
        className="w-1/2 flex justify-center items-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card
          className="shadow-lg rounded-xl w-[420px] bg-white p-8 border border-gray-300"
          title={
            <Typography.Title level={3} className="text-center text-gray-700 font-bold">
              Login
            </Typography.Title>
          }
        >
          <Form
            name="login-form"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                loading={loading}
                className="py-3 bg-red-500 hover:bg-red-600 rounded-lg shadow-md"
              >
                Login
              </Button>
            </Form.Item>

            <div className="text-center text-gray-600">
              Don't have an account? <Link to="/register" className="text-black font-semibold">Register here</Link>
            </div>
          </Form>
        </Card>
      </motion.div>

      <Modal
        open={modal.visible}
        onCancel={() => setModal({ ...modal, visible: false })}
        footer={null}
        centered
        closeIcon={false}
        className="custom-modal"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center p-6"
        >
          {modal.success ? (
            <CheckCircleOutlined className="text-green-500 text-6xl" />
          ) : (
            <CloseCircleOutlined className="text-red-500 text-6xl" />
          )}
          <Typography.Title level={4} className="mt-4">{modal.message}</Typography.Title>
          <Button 
            type="primary" 
            onClick={() => setModal({ ...modal, visible: false })} 
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
          >
            OK
          </Button>
        </motion.div>
      </Modal>
    </div>
  );
};

export default Login;
