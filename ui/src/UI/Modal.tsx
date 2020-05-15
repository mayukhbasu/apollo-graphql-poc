import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ConfirmEmail = (props:any) => {
    
    const [backdrop] = useState(true);
    const [keyboard] = useState(true);
    const {
        buttonLabel,
        className
      } = props;

    const toggle = () => {
        props.toggle();
    }
    return (
        <Modal isOpen={props.modal} toggle={toggle} className={className} backdrop="static" keyboard={keyboard}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Your Registration is successful, Please go to email address to confirm
        </ModalBody>
        <ModalFooter>
          
          <Button color="secondary" onClick={() => props.history.push("/")}>Return to home page</Button>
        </ModalFooter>
      </Modal>
    )
}

export default ConfirmEmail;