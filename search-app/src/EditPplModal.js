import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';

export class EditPplModal extends Component {
    constructor(props) {
        super(props);
        this.state = { ppls: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH + this.photofilename;

    componentDidMount() {
        fetch(process.env.REACT_APP_API + 'people')
            .then(response => response.json())
            .then(data => {
                this.setState({ ppls: data });
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'people', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PeopleId: event.target.PeopleId.value,
                Name: event.target.Name.value,
                Address: event.target.Address.value,
                Age: event.target.Age.value,
                Interests: event.target.Interests.value,
                Photo: this.photofilename
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
                (error) => {
                    alert('Failed');
                })
    }

    handleFileSelected(event) {
        event.preventDefault();
        this.photofilename = event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API + 'People/SaveFile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then((result) => {
                this.imagesrc = process.env.REACT_APP_PHOTOPATH + result;
            },
                (error) => {
                    alert('Failed');
                })
    }

    render() {
        return (
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit People
        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="PeopleId">
                                        <Form.Label>PeopleId</Form.Label>
                                        <Form.Control type="text" name="PeopleId" required
                                            placeholder="PeopletId" 
                                            disabled
                                            defaultValue={this.props.pplid} />
                                    </Form.Group>

                                    <Form.Group controlId="Name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="Name" required
                                            defaultValue={this.props.pplname}
                                            placeholder="Name" />
                                    </Form.Group>

                                    <Form.Group controlId="Address">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" name="Address" required
                                            defaultValue={this.props.ppladdress}
                                            placeholder="Address" />
                                    </Form.Group>

                                    <Form.Group controlId="Age">
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control type="number" name="Age" required
                                            defaultValue={this.props.pplage}
                                            placeholder="Age" />
                                    </Form.Group>

                                    <Form.Group controlId="Interests">
                                        <Form.Label>Interests</Form.Label>
                                        <Form.Control type="text" name="Interests" required
                                            defaultValue={this.props.pplinterests}
                                            placeholder="Interests" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update People
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col sm={6}>
                                <Image width="200px" height="200px"
                                    src={process.env.REACT_APP_PHOTOPATH + this.props.photofilename} />
                                <input onChange={this.handleFileSelected} type="File" />
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}