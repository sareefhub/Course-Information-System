import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './filterModal.css';

const FilterModal = ({ showModal, handleClose, handleFilterByCampus }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedOption(value); // เมื่อติ๊กเลือกให้เก็บค่าที่เลือก
        } else {
            setSelectedOption(null); // เมื่อเลือกยกเลิกให้เคลียร์ค่าที่เก็บไว้
        }
    };

    const handleSubmit = () => {
        console.log("Selected option:", selectedOption);
        handleClose(); // ปิด Modal เมื่อกดปุ่ม "ตกลง"
        handleFilterByCampus(selectedOption); // ส่งค่าที่เลือกไปให้ Component หลักเพื่อทำการกรองข้อมูล
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton className="modal-header">
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
                            name="campus"
                            value="วิทยาเขตหาดใหญ่"
                            checked={selectedOption === "วิทยาเขตหาดใหญ่"}
                            onChange={handleCheckboxChange}
                        />
                        <Form.Check
                            type="checkbox"
                            label="ปัตตานี"
                            name="campus"
                            value="วิทยาเขตปัตตานี"
                            checked={selectedOption === "วิทยาเขตปัตตานี"}
                            onChange={handleCheckboxChange}
                        />
                        <Form.Check
                            type="checkbox"
                            label="สุราษฎร์ธานี"
                            name="campus"
                            value="วิทยาเขตสุราษฎร์ธานี"
                            checked={selectedOption === "วิทยาเขตสุราษฎร์ธานี"}
                            onChange={handleCheckboxChange}
                        />
                        <Form.Check
                            type="checkbox"
                            label="ตรัง"
                            name="campus"
                            value="วิทยาเขตตรัง"
                            checked={selectedOption === "วิทยาเขตตรัง"}
                            onChange={handleCheckboxChange}
                        />
                        <Form.Check
                            type="checkbox"
                            label="ภูเก็ต"
                            name="campus"
                            value="วิทยาเขตภูเก็ต"
                            checked={selectedOption === "วิทยาเขตภูเก็ต"}
                            onChange={handleCheckboxChange}
                        />
                    </Form.Group>
                    <Button className="Btn-filter-xx" onClick={handleSubmit}>ตกลง</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default FilterModal;
