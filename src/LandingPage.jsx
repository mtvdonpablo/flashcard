import React, { useState } from 'react';
import { Button, Layout, Form, Input, ConfigProvider,theme,Typography} from "antd";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faPlus, faMinus, faXmark, faDivide } from '@fortawesome/free-solid-svg-icons';

const { Content } = Layout;
const { Title } = Typography;

export default function LandingPage() {
  const [form] = Form.useForm();
  const [selectedButtons, setSelectedButtons] = useState([]);
  const navigate = useNavigate(); // Hook for navigation


  const themeConfig = {
    token: {
      colorPrimary: '#1890ff',
      colorBgContainer: '#ffffff',
      borderRadius: 8,
      colorBgLayout: '#f0f2f5',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    },
    algorithm: theme.defaultAlgorithm,
  };


  const layoutStyle = {
    background: 'linear-gradient(135deg, #e6f7ff 0%, #f0f5ff 100%)',
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "500px",
    boxSizing: "border-box",
  };

  const formStyle = {
    backgroundColor: "#FFF",
    padding: "20px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  };

  const buttonContainerStyle = {
    display: 'grid', 
    gridTemplateColumns: '1fr 1fr',
    gap: 12 
  };

  const startPracticeStyle = {
    width: "100%",
    marginTop: "20px",
    height: 'auto',
    padding: '12px 24px',
    fontSize: 16,
    fontWeight: 600
  };
  const cardStyle = {
    width: '100%', 
    maxWidth: 480,
    borderRadius: 16,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
  }
  const buttonStyle = {
    height: 'auto',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  }

  // Toggle button selection
  const handleToggle = (operation) => {
    setSelectedButtons(prev => {
      const updatedButtons = prev.includes(operation)
        ? prev.filter(item => item !== operation)
        : [...prev, operation];

      form.setFieldsValue({ operations: updatedButtons }); // Update form value
      return updatedButtons;
    });
  };

  const onFinish = (values) => {
    console.log('Form submitted with values:', values);
    navigate("/practice", { state: values });
  };

  return (
    <ConfigProvider theme={themeConfig}>
        <Layout style={layoutStyle}>
            <Content style={contentStyle}>
                <Card
                    style={cardStyle}
                    bodyStyle={{ padding: 32 }}
                >
                    <Title level={2} style={{ textAlign: 'center', marginBottom: 32, color: '#1890ff' }}>
                    Math Practice
                    </Title>
                    <Form
                        form={form}
                        style={formStyle}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                    <Form.Item
                        label="Number of Questions"
                        name="numQuestions"
                        rules={[{ required: true, message: "Please enter the number of questions" }]}
                    >
                        <Input  type="number"  min={1} />
                    </Form.Item>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <Form.Item
                        label="Minimum Number"
                        name="minNum"
                        rules={[{ required: true, message: 'Please enter minimum number' }]}
                        >
                        <Input type="number" />
                        </Form.Item>

                        <Form.Item
                        label="Maximum Number"
                        name="maxNum"
                        rules={[
                            { required: true, message: 'Please enter maximum number' },
                            ({getFieldValue}) => ({
                                validator(_,value){
                                    const minValue = getFieldValue("minNum");
                                    if (parseFloat(value) > parseFloat(minValue)){
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Max must be greater than Min"));
                                },
                            }),
                        ]}
                        >
                        <Input type="number" />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label="Select Operations"
                        name="operations"
                        rules={[{ 
                        required: true, 
                        validator: (_, value) => 
                            value && value.length > 0 
                            ? Promise.resolve() 
                            : Promise.reject(new Error("Please select at least one operation"))
                        }]}
                    >
                        <div className="buttons" style={buttonContainerStyle}>
                        <Button
                            type={selectedButtons.includes("add") ? "primary" : "default"}
                            onClick={() => handleToggle("add")}
                            style={buttonStyle}
                        >
                            <FontAwesomeIcon icon={faPlus} /> Addition
                        </Button>
                        <Button
                            type={selectedButtons.includes("subtract") ? "primary" : "default"}
                            onClick={() => handleToggle("subtract")}
                            style={buttonStyle}
                        >
                            <FontAwesomeIcon icon={faMinus} /> Subtraction
                        </Button>
                        <Button
                            type={selectedButtons.includes("multiply") ? "primary" : "default"}
                            onClick={() => handleToggle("multiply")}
                            style={buttonStyle}
                        >
                            <FontAwesomeIcon icon={faXmark} /> Multiplication
                        </Button>
                        <Button
                            type={selectedButtons.includes("divide") ? "primary" : "default"}
                            onClick={() => handleToggle("divide")}
                            style={buttonStyle}
                        >
                            <FontAwesomeIcon icon={faDivide} /> Division
                        </Button>
                        </div>
                    </Form.Item>

                    <Form.Item >
                        <Button 
                            type="primary" 
                            htmlType="submit"                   
                            size="large"
                            block
                            style={startPracticeStyle}
                        >
                        Start Practice
                        </Button>
                    </Form.Item>
                    </Form>
                </Card>

            </Content>
        </Layout>
    </ConfigProvider>

  );
}
