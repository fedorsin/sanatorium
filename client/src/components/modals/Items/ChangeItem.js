import React, {useContext, useEffect, useState} from 'react';
import {fetchCities, fetchItems, fetchOneItem, fetchTypes, updateItem} from '../../../http/itemAPI';
import {Context} from '../../../index';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {Input, Option, Select} from "@material-tailwind/react";
import changeItem from "./ChangeItem";


const ChangeItem = ({show, onHide}) => {
    const {item} = useContext(Context)

    const [showOptions, setShowOptions] = useState(false)
    const [showOptionsType, setShowOptionsType] = useState(false)
    const [showOptionsCity, setShowOptionsCity] = useState(false)

    const [name, setName] = useState(item.selectedItem.name)
    const [site, setSite] = useState(item.selectedItem.site)
    const [telegram_link, setTelegram_link] = useState(item.selectedItem.telegram_link)
    const [address, setAddress] = useState(item.selectedItem.address)
    const [_info, set_Info] = useState(item.selectedItem._info)
    const [phone, setPhone] = useState(item.selectedItem.phone)
    const [latitude, setLatitude] = useState(item.selectedItem.latitude)
    const [longitude, setLongitude] = useState(item.selectedItem.longitude)
    const [price, setPrice] = useState(item.selectedItem.price)
    const [file, setFile] = useState(item.selectedItem.img)

    const [info, setInfo] = useState([])

    const addInfo = () => {
        setInfo([...info, {title: '', content: '', id: Date.now()}])
    }

    const removeInfo = (id) => {
        setInfo(info.filter(i => i.id !== id))
    }

    const changeInfo = (key, value, id) => {
        setInfo(info.map(i => i.id === id ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const closeButton = () => {
        onHide(false);
        setShowOptions(false)
    }

    useEffect(() => {
        fetchItems(null, null, 1, 12).then(data => {
            item.setItems(data.rows)
        })
        fetchTypes().then(data => item.setTypes(data))
        fetchCities().then(data => item.setCities(data))
    }, [])

    const putItem = () => {
        const formData = new FormData()
        formData.append('name', name ? name : item.selectedItem.name)
        formData.append('price', price ? `${price}` : `${item.selectedItem.price}`)
        formData.append('site', site ? site : item.selectedItem.site)
        formData.append('telegram_link', telegram_link ? telegram_link : item.selectedItem.telegram_link)
        formData.append('address', address ? address : item.selectedItem.address)
        formData.append('phone', phone ? phone : item.selectedItem.phone)
        formData.append('_info', _info ? _info : item.selectedItem._info)
        formData.append('latitude', latitude ? `${latitude}` : `${item.selectedItem.latitude}`)
        formData.append('longitude', longitude ? `${longitude}` : `${item.selectedItem.longitude}`)
        formData.append('typeId', item.selectedType.id)
        formData.append('cityId', item.selectedCity.id)
        formData.append('img', file)
        formData.append('info', JSON.stringify(info))
        updateItem(item.selectedItem.id, formData).then(data => {
            onHide()
            item.setSelectedType({})
            item.setSelectedCity({})
        })
    }

    if (!show) {
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
                    Изменить санаторий
                </Modal.Title>
                <button onClick={closeButton} type="button"
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

                        <Select label={item.selectedItem.name || 'Выбрать санаторий'}>
                            {item.items.map(it =>
                                <Option onClick={() => {
                                    item.setSelectedItem(it);
                                    item.types.map(type => type.id === it.typeId ? item.setSelectedType(type) : '')
                                    item.cities.map(city => city.id === it.cityId ? item.setSelectedCity(city) : '')
                                    fetchOneItem(item.selectedItem.id).then(data => setInfo(data.info))
                                }}
                                        key={it.id}
                                >
                                    {it.name}
                                </Option>
                            )}
                        </Select>


                        {/* second dropdown */}

                        <Select label={item.selectedType.name || 'Выбрать метод лечения'}>
                            {item.types.map(type =>
                                <Option onClick={() => {
                                    item.setSelectedType(type);
                                }}
                                        key={type.id}
                                >
                                    {type.name}
                                </Option>
                            )}
                        </Select>


                        {/* third dropdown */}
                        <Select label={item.selectedCity.name || 'Выбрать город'}>
                            {item.cities.map(city =>
                                <Option onClick={() => {
                                    item.setSelectedCity(city);
                                }}
                                        key={city.id}
                                >
                                    {city.name}
                                </Option>
                            )}
                        </Select>
                    </div>

                    <Input
                        variant="static"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        color="blue"
                        label="Введите название"
                        placeholder={item.selectedItem.name}
                    />

                    <Input
                        variant="static"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        color="blue"
                        label="Введите адрес"
                        placeholder={item.selectedItem.address}
                    />

                    <Input
                        variant="static"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        color="blue"
                        label="Введите телефон"
                        placeholder={item.selectedItem.phone}
                    />

                    <Input
                        variant="static"
                        value={site}
                        onChange={e => setSite(e.target.value)}
                        color="blue"
                        label="Введите сайт"
                        placeholder={item.selectedItem.site}
                    />

                    <Input
                        variant="static"
                        value={telegram_link}
                        onChange={e => setTelegram_link(e.target.value)}
                        color="blue"
                        label="Введите ссылку на комментарии"
                        placeholder={item.selectedItem.telegram_link}
                    />


                    <Input
                        variant="static"
                        value={latitude}
                        onChange={e => setLatitude(Number(e.target.value))}
                        color="blue"
                        input type="number"
                        placeholder={item.selectedItem.latitude}
                        step="any"
                        label="Введите широту"

                    />

                    <Input
                        variant="static"
                        value={longitude}
                        onChange={e => setLongitude(Number(e.target.value))}
                        color="blue"
                        input type="number"
                        placeholder={item.selectedItem.longitude}
                        step="any"
                        label="Введите долготу"
                    />

                    <Input
                        variant="static"
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        color="blue"
                        input type="number"
                        placeholder={item.selectedItem.price}
                        label="Введите стоимость"

                    />

                    <Input
                        variant="static"
                        value={_info}
                        onChange={e => set_Info(e.target.value)}
                        color="blue"
                        label="Введите описание"
                        placeholder={item.selectedItem._info}
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
                        <Row className="mt-4" key={i.id}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.id)}
                                    placeholder="Введите название характеристики"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.content}
                                    onChange={(e) => changeInfo('content', e.target.value, i.id)}
                                    placeholder="Введите описание характеристики"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.id)}
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
                <Button variant="outline-success" onClick={putItem}>Изменить</Button>
            </Modal.Footer>
        </Modal>


    );
};

export default ChangeItem;