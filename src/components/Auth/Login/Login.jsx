import { Form, Input, Checkbox, Button, Divider, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = "http://127.0.0.1:8000/login";
  const handleSubmit1 = async (values) => {
    const { email, password } = values;
    setLoading(true);
    try {
      // Call the API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Save token or any relevant data
        localStorage.setItem("token", result.token);
        message.success("Login successful!");

        // Redirect user to home page or desired route
        navigate("/");
      } else {
        // Handle API errors
        message.error(result.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (values) => {
    const { email, password } = values;
    setLoading(true);
    try {
      // Call the API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Save token and additional user data to local storage
        localStorage.setItem("token", result.token); // Save token
        localStorage.setItem("user", JSON.stringify(result.user)); // Save user info or other relevant data

        message.success("Login successful!");

        // Redirect user to home page or desired route
        navigate("/");
      } else {
        // Handle API errors
        message.error(result.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          remember: true,
        }}
      >
        {/* Email Input */}
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter Email" />
        </Form.Item>

        {/* Password Input */}
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Enter Password" />
        </Form.Item>

        {/* Remember Me and Forgot Password */}
        <div className="flex justify-between items-center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember Me</Checkbox>
          </Form.Item>
          <a href="#" className="text-sm text-pink-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Sign In Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </Form.Item>

        {/* OR Separator */}
        <Divider>OR</Divider>

        {/* Google Sign In Button */}
        <Link to="/register">
          <Button
            type="link"
            className="w-full flex items-center justify-center"
          >
            Sign Up
          </Button>
        </Link>
      </Form>
    </div>
  );
}
