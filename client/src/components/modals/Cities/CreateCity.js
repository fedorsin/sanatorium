import React, { useState } from 'react';
import { createCity } from '../../../http/itemAPI';
import '../../../index.css';
import {Form,  Modal, Button} from "react-bootstrap";



const CreateCity = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const addCity = () => {
        createCity({name: value}).then(data => {
            setValue('')
            onHide()
        })
    }

    if (!show){
        return null
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header>

                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить город
                </Modal.Title>
                <button onClick={onHide} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="type-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название города"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addCity}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCity;