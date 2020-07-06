import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Col, CardFooter } from 'reactstrap';
import './ProductCard.css'
const ProductCard = (props:any) => {
  
    return (
        
          <Col sm="4">
                    <Card style={{marginBottom: '1rem'}}>
                        <CardImg top width="100%" src={props.product.url} alt="Card image cap" />
                        <CardBody>
                        <CardTitle>{props.product.title}</CardTitle>
                        <CardSubtitle>{props.product.category}</CardSubtitle>
                        <CardText>{props.product.price}</CardText>
                        </CardBody>
                        <CardFooter>
                        <div className="d-flex justify-content-between bg-white">
                            <div>
                                <button className="btn btn-primary btn-block">+</button>
                            </div>
                            <div className="text-justify">Flex item 2</div>
                            <div>
                                <button className="btn btn-primary btn-block">-</button>
                            </div>
                        </div>
                        </CardFooter>
                    </Card>
                    </Col>
      );
}

export default ProductCard;