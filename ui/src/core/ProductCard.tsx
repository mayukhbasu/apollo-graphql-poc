import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Col, CardFooter } from 'reactstrap';

const ProductCard = (props:any) => {
  const imageUrl = "https://vignette.wikia.nocookie.net/tekken/images/4/4c/T7FR_DevilJin.jpg/revision/latest/scale-to-width-down/310?cb=20180827213232&path-prefix=en";
    return (
        
          <Col sm="4">
                    <Card style={{marginBottom: '1rem'}}>
                        <CardImg top width="100%" src={imageUrl} alt="Card image cap" />
                        <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
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