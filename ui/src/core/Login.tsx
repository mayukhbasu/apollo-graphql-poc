import React , {useState} from 'react';
import { Container, Form, Row, Col, FormGroup, Label, Input, Button} from 'reactstrap';
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
        console.log(response);
        props.history.push("/shopping")
    }
    return (
        <React.Fragment>
            <NavbarApp/>
        
        <Container className="mt-5 login">
        
        <Form onSubmit={submit}>
        <Row>
            <Col sm="6">
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email"
                    id="exampleEmail" placeholder="with a placeholder" 
                    value={email} onChange={(event) => setEmail(event.target.value)}/>
                </FormGroup>
            </Col>
            <Col sm="6"><Button type="button" className="facebook" color="danger" size="lg" 
             block>
                <a style={{textDecoration: 'none', color: 'white'}} href="/auth/google">Sign in with Google</a>
            </Button></Col>
        </Row>
        <Row>
            <Col sm="6">
                <FormGroup>
                    <Label for="exampleEmail">Password</Label>
                    <Input type="password" name="password" 
                     id="password" placeholder="with a placeholder" 
                    value={password} onChange={(event) => setPassword(event.target.value)}/>
                </FormGroup>
            </Col>
        </Row>
        
        <Row>
            <Col sm="6">
                <Button size="sm" block>Login</Button>
            </Col>
        </Row>
        </Form>
        
    </Container>
    </React.Fragment>
    
    )
}

export default Login;