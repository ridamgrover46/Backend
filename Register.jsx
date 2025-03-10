import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Typography, Modal } from "antd";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ visible: false, success: false, message: "" });
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { confirmPassword, ...data } = values; // Remove confirmPassword before sending
      const response = await axios.post("http://localhost:5000/api/auth/register", data);

      if (response.data.success) {
        setModal({ visible: true, success: true, message: "Registration successful! Redirecting to login..." });
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2s
      } else {
        setModal({ visible: true, success: false, message: response.data.message });
      }
    } catch (error) {
      setModal({ visible: true, success: false, message: error.response?.data?.message || "Registration failed! Please try again." });
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
        <Card className="shadow-lg rounded-xl w-[420px] bg-white p-8 border border-gray-300">
          <Typography.Title level={3} className="text-center text-gray-700 font-bold">
            Register
          </Typography.Title>

          <Form name="register-form" layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please enter your username!" }]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
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

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                loading={loading}
                className="py-3 bg-red-500 hover:bg-red-600 rounded-lg shadow-md"
              >
                Register
              </Button>
            </Form.Item>

            <div className="text-center">
              Already have an account? <a href="/login" className="font-semibold">Login here</a>
            </div>
          </Form>
        </Card>
      </motion.div>

      {/* Success/Error Modal with Attractive Animation */}
      <Modal
        visible={modal.visible}
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
            <CheckCircleOutlined className="text-green-500 text-6xl animate-bounce" />
          ) : (
            <CloseCircleOutlined className="text-red-500 text-6xl animate-pulse" />
          )}
          <Typography.Title level={4} className="mt-4 text-gray-700">{modal.message}</Typography.Title>
          <Button 
            type="primary" 
            onClick={() => setModal({ ...modal, visible: false })} 
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            OK
          </Button>
        </motion.div>
      </Modal>
    </div>
  );
};

export default Register;
