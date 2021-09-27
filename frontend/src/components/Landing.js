
import { Button, Form } from "react-bootstrap";
import React, {useState} from 'react'

const Landing = () => {

    const [username, setUsername] = useState("")

    return (
        <div>
            <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick = {() => setUsername({username})}>
                        Submit
                    </Button>
                </Form>
        </div>
    )
}

export default Landing
