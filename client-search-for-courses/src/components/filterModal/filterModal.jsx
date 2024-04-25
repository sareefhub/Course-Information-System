import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './filterModal.css'

const FilterModal = ({ showModal, handleClose }) => {
    const [checkboxState, setCheckboxState] = useState({
        hatyai: false,
        pattani: false,
        suratthani: false,
        trang: false,
        phuket: false,
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxState({
            ...checkboxState,
            [name]: checked,
        });
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>ตัวกรองข้อมูล</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className="check-campus">
                        <h4>วิทยาเขต</h4>
                    </div>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="หาดใหญ่"
                            name="hatyai"
                            checked={checkboxState.hatyai}
                            onChange={handleCheckboxChange}
                        />
                        <Form.Check
                            type="checkbox"
                            label="ปัตตานี"
                            name="pattani"
                            checked={checkboxState.pattani}
                            onChange={handleCheckboxChange}
                        />
                        <Form.Check
                            type="checkbox"
                            label="สุราษฎร์ธานี"
                            name="suratthani"
                            checked={checkboxState.suratthani}
                            onChange={handleCheckboxChange}
                        />
                        <Form.Check
                            type="checkbox"
                            label="ตรัง"
                            name="trang"
                            checked={checkboxState.trang}
                            onChange={handleCheckboxChange}
                        />
                        <Form.Check
                            type="checkbox"
                            label="ภูเก็ต"
                            name="phuket"
                            checked={checkboxState.phuket}
                            onChange={handleCheckboxChange}
                        />
                    </Form.Group>
                    <Button className="Btn-filter" >ตกลง</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default FilterModal;
