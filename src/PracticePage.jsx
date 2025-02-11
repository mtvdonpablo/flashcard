import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { Card } from "antd";
import { Button, Layout, Form, Input, ConfigProvider,theme,Typography} from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faPlus, faMinus, faXmark, faDivide } from '@fortawesome/free-solid-svg-icons';

const { Content } = Layout;
const { Title } = Typography;

export default function PracticePage() {
  const location = useLocation();
  const formData = location.state; // Get the passed data
  const [form] = Form.useForm();


  const operationIcons = {
    add: faPlus,
    subtract: faMinus,
    multiply: faXmark,
    divide: faDivide
  }
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
    padding: "5px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  };

  const submitAnswerStyle = {
    width: "100%",
    height: 'auto',
    padding: '12px 24px',
    fontSize: 16,
    fontWeight: 600
  };
  const cardStyle = {
    width: '100%', 
    maxWidth: 480,
    borderRadius: 16,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center",
  }
  const displayQuestionStyle ={
    textAlign: "right"
  }
  const dividerStyle ={
     width: "100%",
      maxWidth: "190px", 
      borderBottom: "3px solid #1890ff", 
      marginTop: "8px"
  }



  const onFinish = (values) => {
    console.log('Form submitted with values:', values);
  };

  function getRandomArbitrary(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }
  const valueOne =[];
  const valueTwo = [];
  const randomOperation = Math.floor(Math.random() * formData.operations.length);
  for (let i = 0; i < formData.numQuestions; i++) {
    valueOne.push(getRandomArbitrary(formData.minNum,formData.maxNum));
    valueTwo.push(getRandomArbitrary(formData.minNum,formData.maxNum))
  }
  
  console.log("valueOne",valueOne);
  console.log("valueTwo",valueTwo);

//   <p><strong>Number of Questions:</strong> {formData.numQuestions}</p>
//   <p><strong>Min Number:</strong> {formData.minNum}</p>
//   <p><strong>Max Number:</strong> {formData.maxNum}</p>
//   <p><strong>Operations:</strong> {formData.operations.join(", ")}</p>
  return (
    <ConfigProvider theme={themeConfig}>
    <Layout style={layoutStyle}>
        <Content style={contentStyle}>
            <Card
                style={cardStyle}
                bodyStyle={{ padding: 32 }}
            >
                <div className='display-question' style={displayQuestionStyle} >
                <Title level={2} style={{ marginBottom: "0", color: "#1890ff" }}>
                    {valueOne[0]} 
                </Title>
                <Title level={2} style={{ marginTop: "0",marginBottom: "0", color: "#1890ff" }}>
                <FontAwesomeIcon icon={operationIcons[formData.operations[randomOperation]]} /> {valueTwo[0]} 
                </Title>   
                    
                </div>
                <div style={dividerStyle}></div>
                <Form
                    form={form}
                    style={formStyle}
                    onFinish={onFinish}
                    layout="vertical"
                >
                <Form.Item
                    
                    name="numQuestions"
                    rules={[{ required: true, message: "Please enter your answer" }]}
                >
                    <Input placeholder="Answer" type="number" style={{textAlign:"right", width:"100%", appearance: "textfield"}}/>
                </Form.Item>
                <Form.Item >
                    <Button 
                        type="primary" 
                        htmlType="submit"                   
                        size="large"
                        block
                        style={submitAnswerStyle}
                    >
                        Submit
                    </Button>
                </Form.Item>
                </Form>
            </Card>
        </Content>
    </Layout>
</ConfigProvider>
  );
}
