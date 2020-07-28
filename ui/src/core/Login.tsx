import React , {useState} from 'react';
import { Form,Col, FormGroup, Label, Input, Button, Card, CardBody, Row} from 'reactstrap';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import NavbarApp from './Navbar';
import './Login.css'

const LOGIN_QUERY = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            user{
                firstName
            }
            message
        }
    }
`

const Login = (props:any) => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginQuery] = useMutation(LOGIN_QUERY);
    const submit = async (event:any) => {
        event.preventDefault();
        const response = await loginQuery({variables: {email, password}});
        console.log(props);
        props.history.push("/shopping")
    }

    const loginWithGoogle = () => {
        window.open("http://localhost:4001/auth/google", "_self");
    }
    return (
        <React.Fragment>
            <NavbarApp/>
        
        <Card className="card-style">
            <Row>
            <CardBody>
                <Form onSubmit={submit}>
                <FormGroup row>
                    <Label md={4} for="exampleEmail">Email</Label>
                    <Col md={6}>
                        <Input type="email" name="email"
                        id="email" 
                        value={email} onChange={(event) => setEmail(event.target.value)}/>
                    </Col>
                    
                </FormGroup>
                <FormGroup row>
                    <Label md={4} for="exampleEmail">Password</Label>
                    <Col md={6}>
                        <Input type="password" name="password"
                        id="password" 
                        value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </Col>
                    
                </FormGroup>
                <FormGroup row style={{paddingLeft:'15px', paddingRight:'15px', paddingBottom:'2px'}}>
                    <Button color="primary" block type="submit">Login</Button>
                </FormGroup>
                </Form>
            </CardBody>
        
            </Row>
            </Card>
            <div className="d-flex p-2 bd-highlight justify-content-center mt-4" >
                <Button color="danger" style={{width:'60%'}} onClick={loginWithGoogle}>Sign in with google</Button>
            </div>
            
        </React.Fragment>
    
    )
}

export default Login;