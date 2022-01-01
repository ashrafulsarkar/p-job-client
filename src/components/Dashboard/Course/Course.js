import React, { useState } from 'react';
import { Button,  Modal } from 'react-bootstrap';
import Checkout from '../Checkout/Checkout';


const Course = () => {
    const [modalShow, setModalShow] = useState(false);
    const handleClose = (data) => {
        setModalShow(data);
    };
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Car driving lessons</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <p className="card-text">Price: $200</p>
                            <Button variant="primary" onClick={() => setModalShow(true)}>
                            Buy Now
                            </Button>
                            <MydModalWithGrid show={modalShow} handleClose={handleClose} onHide={() => setModalShow(false)} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Bike driving lessons</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <p className="card-text">Price: $100</p>
                            <Button variant="primary" onClick={() => setModalShow(true)}>
                            Buy Now
                            </Button>
                            <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;

function MydModalWithGrid(props) {
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Pay your payment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Checkout handleClose={props.handleClose}></Checkout>
        </Modal.Body>
      </Modal>
    );
  }