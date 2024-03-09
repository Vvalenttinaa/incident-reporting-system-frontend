import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, Row, Col } from 'antd';
import LoginService from '../services/LoginService';
import { useNavigate } from 'react-router-dom'; 

const { Title } = Typography;

const Login = ({ setUserRole }) => {
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (values) => {
    const { username, password } = values;

    try {
      console.log(username + " " + password);

      const response = await LoginService.login(username, password);

      console.log('Login successful:', response.data);
      setUserRole(response.data.role);

      if (response.data.role === 'ADMIN') {
        navigate('/viewing'); 
      } else if (response.data.role === 'USER' || response.data.role === 'USER_WITH_ACCOUNT') {
        console.log("iz logina " + response.data.role);
        navigate('/viewing');
      }

    } catch (error) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <Row justify="center" style={{ height: '100vh' }}>
      <Col span={8}>
        <Card title={<Title level={3}>Login</Title>}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Form onFinish={handleLogin}>
            <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
