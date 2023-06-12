import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../..';
import { deleteType, fetchTypes } from '../../../http/itemAPI';
import {Button, Form, Modal} from "react-bootstrap";
import {Input, Option, Select} from "@material-tailwind/react";

const DeleteType = ({show, onHide}) => {
    const {item} = useContext(Context)

    const [showOptions, setShowOptions] = useState(false)

    useEffect(() => {
        fetchTypes().then(data => item.setTypes(data))
    })

    const removeType = () => {
        deleteType(item.selectedType.id).then(data => {
            onHide()
            item.setSelectedType({})
        })
    }


    return (

        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить метод лечения
                </Modal.Title>
                <button onClick={onHide} type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        data-modal-toggle="type-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"></path>
                    </svg>
                </button>
            </Modal.Header>
            <Modal.Body>
                <Form className="flex flex-col gap-6">

                    <div className="flex flex-col gap-6 w-72">
                        <Select label={"Выбрать метод лечения"}>
                            {item.types.map(type =>
                                <Option onClick={() => item.setSelectedType(type)}
                                        key={type.id}
                                >
                                    {type.name}
                                </Option>
                            )}
                        </Select>
                    </div>
                </Form>
            </Modal.Body>
            {/* <!-- Modal footer --> */}
            <Modal.Footer>

                <Button variant="outline-secondary" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-danger" onClick={removeType}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteType;