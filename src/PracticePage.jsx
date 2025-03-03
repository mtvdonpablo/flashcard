import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Layout, Form, Input, ConfigProvider, theme, Typography } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faPlus, faMinus, faXmark, faDivide } from '@fortawesome/free-solid-svg-icons';

const { Content } = Layout;
const { Title } = Typography;

export default function PracticePage() {
  const location = useLocation();
  const formData = location.state; // Data passed from the previous route
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Arrays for numbers and operators for each question.
  const [valuesOne, setValuesOne] = useState([]);
  const [valuesTwo, setValuesTwo] = useState([]);
  const [operators, setOperators] = useState([]);

  // Score states
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalIncorrect, setTotalIncorrect] = useState(0);

  const operationIcons = {
    add: faPlus,
    subtract: faMinus,
    multiply: faXmark,
    divide: faDivide
  };

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
  };

  const displayQuestionStyle = {
    textAlign: "right"
  };

  const dividerStyle = {
    width: "100%",
    maxWidth: "190px", 
    borderBottom: "3px solid #1890ff", 
    marginTop: "8px"
  };

  // Helper function to get a random number (inclusive)
  function getRandomArbitrary(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

  // Function to initialize the quiz
  const initializeQuiz = () => {
    const arrOne = [];
    const arrTwo = [];
    const opArr = [];
    for (let i = 0; i < formData.numQuestions; i++) {
      arrOne.push(getRandomArbitrary(formData.minNum, formData.maxNum));
      arrTwo.push(getRandomArbitrary(formData.minNum, formData.maxNum));
      // Pick a random operator for each question
      opArr.push(formData.operations[Math.floor(Math.random() * formData.operations.length)]);
    }
    setValuesOne(arrOne);
    setValuesTwo(arrTwo);
    setOperators(opArr);
    setTotalCorrect(0);
    setTotalIncorrect(0);
    form.resetFields();
  };

  // Generate arrays for all questions when the component mounts
  useEffect(() => {
    initializeQuiz();
  }, [formData]);

  // Compute the correct answer for the current question (first element in each array)
  const computeAnswer = () => {
    if (valuesOne.length === 0 || valuesTwo.length === 0 || operators.length === 0) return null;
    const currentValueOne = valuesOne[0];
    const currentValueTwo = valuesTwo[0];
    const currentOperator = operators[0];
    switch(currentOperator) {
      case 'add':
        return currentValueOne + currentValueTwo;
      case 'subtract':
        return currentValueOne - currentValueTwo;
      case 'multiply':
        return currentValueOne * currentValueTwo;
      case 'divide':
        return currentValueOne / currentValueTwo;
      default:
        return null;
    }
  };

  const correctAnswer = computeAnswer();

  const onFinish = (values) => {
    const userAnswer = parseFloat(values.answer);
    if (userAnswer === correctAnswer) {
      setTotalCorrect(prev => prev + 1);
    } else {
      setTotalIncorrect(prev => prev + 1);
    }
    form.resetFields();

    // Remove the first elements from the arrays so that the flashcard updates
    setValuesOne(prev => prev.slice(1));
    setValuesTwo(prev => prev.slice(1));
    setOperators(prev => prev.slice(1));
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout style={layoutStyle}>
        <Content style={contentStyle}>
          <Card style={cardStyle} bodyStyle={{ padding: 32 }}>
            {valuesOne.length > 0 && valuesTwo.length > 0 && operators.length > 0 ? (
              <>
                <div className='display-question' style={displayQuestionStyle}>
                  <Title level={2} style={{ marginBottom: "0", color: "#1890ff" }}>
                    {valuesOne[0]}
                  </Title>
                  <Title level={2} style={{ marginTop: "0", marginBottom: "0", color: "#1890ff" }}>
                    <FontAwesomeIcon icon={operationIcons[operators[0]]} /> {valuesTwo[0]}
                  </Title>
                </div>
                <div style={dividerStyle}></div>
                <Form form={form} style={formStyle} onFinish={onFinish} layout="vertical">
                  <Form.Item
                    name="answer"
                    rules={[{ required: true, message: "Please enter your answer" }]}
                  >
                    <Input placeholder="Answer" autoFocus type="number" style={{ textAlign:"right", width:"100%", appearance: "textfield" }}/>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block style={submitAnswerStyle}>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </>
            ) : (
              <>
                <Title level={2} style={{ color: "#1890ff" }}>
                  Quiz Completed!
                </Title>
                <div style={{ marginTop: 8, fontSize: 18, fontWeight: 500 }}>
                  Score: {totalCorrect}/{formData.numQuestions}
                </div>
                <div style={{ marginTop: 16, display: 'flex', gap: '16px' }}>
                  <Button onClick={() => navigate("/")} type="primary">
                    Back to Home
                  </Button>
                  <Button onClick={initializeQuiz} type="primary">
                    Retry
                  </Button>
                </div>
              </>
            )}
          </Card>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
