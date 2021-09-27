import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Tab, Tabs, Col, Row } from "react-bootstrap";

const Chat = ({ username }) => {
    const [isPaused, setPause] = useState(false);
    const [newMessage, setNewMessage] = useState([]);
    const [key, setKey] = useState(1);
    const ws = useRef(null);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        ws.current = new WebSocket(`ws://localhost:8000/ws/${key}`);
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");

        return () => {
            ws.current.close();
        };
    }, []);

    useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = (e) => {
            if (isPaused) return;
            const message = JSON.parse(e.data);
            console.log(message);
            setNewMessage(message.msgs);
        };
    }, [isPaused]);

    useEffect(() => {
        scrollToBottom();
    }, [newMessage]);

    return (
        <div>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="1" title="Home">
                    <Row>
                        <Col sm={1}>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => setPause(!isPaused)}
                            >
                                {isPaused ? "Resume " : "Pause"}
                            </Button>
                        </Col>
                        <Col sm={11}>
                            <div
                                style={{
                                    height: `700px`,
                                    overflowY: "scroll",
                                    backgroundColor: "#282A36",
                                    fontFamily: "Consolas",
                                    color: "white",
                                    fontSize: "18px",
                                }}
                            >
                                <p>
                                    {username}
                                    {newMessage.map((msg, i) => (
                                        <p>{msg} </p>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="2" title="Profile">
                    HI
                </Tab>
                <Tab eventKey="3" title="Contact">
                    Hi
                </Tab>
            </Tabs>

            <div />
        </div>
    );
};

export default Chat;
