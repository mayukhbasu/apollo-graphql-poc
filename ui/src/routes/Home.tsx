import React from "react";
import { Jumbotron, Button } from 'reactstrap';

const Home = (props:any) => {
    return (
        <div>
            <Jumbotron>
                <h1 className="display-3">Hello, world!</h1>
                <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-2" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <p className="lead">
                <Button color="success" onClick={() => props.history.push("/login")}>Login</Button>
                <Button className="ml-4"  color="primary" onClick={() => props.history.push("/register")}>Register</Button>
                    
                </p>
            </Jumbotron>
        </div>
    )
}

export default Home;