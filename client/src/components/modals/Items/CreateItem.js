import React, { useContext, useEffect, useState } from 'react';
import '../../../index.css';
import { Context } from '../../../index';
import { observer } from 'mobx-react-lite';
import { createItem, fetchTypes, fetchCities } from '../../../http/itemAPI';
import {Button, Form, Row, Col, Modal} from "react-bootstrap";
import { Select, Option, Input } from "@material-tailwind/react";

const CreateItem = observer(({show, onHide}) => {
    const {item} = useContext(Context)
    const [showOptions, setShowOptions] = useState(false)

    const [name, setName] = useState('')
    const [site, setSite] = useState('')
    const [telegram_link, setTelegram_link] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [_info, set_Info] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)

    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => item.setTypes(data))
        fetchCities().then(data => item.setCities(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '' , content: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addItem = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('site', site)
        formData.append('telegram_link', telegram_link)
        formData.append('address', address)
        formData.append('phone', phone)
        formData.append('_info', _info)
        formData.append('latitude', `${latitude}`)
        formData.append('longitude', `${longitude}`)
        formData.append('price', `${price}`)
        formData.append('typeId', item.selectedType.id)
        formData.append('cityId', item.selectedCity.id)
        formData.append('img', file)
        formData.append('info', JSON.stringify(info))
        createItem(formData).then(data => {
            onHide()
            //item.setSelectedType({})
        })
    }

    const closeButton = () => {
        onHide(false);
        setShowOptions(false)
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
                    Добавить санаторий
                </Modal.Title>
                <button onClick={closeButton} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="type-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </Modal.Header>
            <Modal.Body>
                <Form className="flex flex-col gap-6">

                    <div className= "flex flex-col gap-6 w-72">
                        <Select label={"Выбрать метод лечения"}>
                            {item.types.map(type =>
                                <Option onClick={() => item.setSelectedType(type)}
                                        key={type.id}
                                >
                                    {type.name}
                                </Option>
                            )}
                        </Select>


                        <Select label={"Указать город"}>
                            {item.cities.map(city =>
                                <Option onClick={() => item.setSelectedCity(city)}
                                        key={city.id}
                                >
                                    {city.name}
                                </Option>
                            )}
                        </Select>
                    </div>

                    <Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        color="blue"
                        label="Введите название"
                    />

                    <Input
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        color="blue"
                        label="Введите адрес"
                    />

                    <Input
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        color="blue"
                        label="Введите телефон"
                    />

                    <Input
                        value={site}
                        onChange={e => setSite(e.target.value)}
                        color="blue"
                        label="Введите сайт"
                    />

                    <Input
                        value={telegram_link}
                        onChange={e => setTelegram_link(e.target.value)}
                        color="blue"
                        label="Введите ссылку на комментарии"
                    />


                    <Input
                        value={latitude}
                        onChange={e => setLatitude(Number(e.target.value))}
                        color="blue"
                        input type="number"
                        step="any"
                        label="Введите широту"
                    />

                    <Input
                        value={longitude}
                        onChange={e => setLongitude(Number(e.target.value))}
                        color="blue"
                        input type="number"
                        step="any"
                        label="Введите долготу"
                    />

                    <Input
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        color="blue"
                        input type="number"
                        label="Введите стоимость"
                    />

                    <Input
                        value={_info}
                        onChange={e => set_Info(e.target.value)}
                        color="blue"
                        label="Введите описание"
                    />

                    <Form.Control
                        type="file"
                        onChange={selectFile}
                    />

                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить новую характеристику
                    </Button>
                    {info.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название характеристики"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.content}
                                    onChange={(e) => changeInfo('content', e.target.value, i.number)}
                                    placeholder="Введите описание характеристики"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addItem}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateItem;