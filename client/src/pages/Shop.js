import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react';
import {Context} from '..';
import ItemList from '../components/ItemList';
import Pages from '../components/Pages';
import TypeBar from '../components/TypeBar';
import {fetchItems, fetchTypes, fetchCities} from '../http/itemAPI';
import '../index.css'
import Hero from "../components/Hero";
import CityBar from "../components/CityBar";
import {Col, Row} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import {ITEM_ROUTE} from "../utils/consts";

const Shop = observer(() => {
    const {item} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => item.setTypes(data))
        fetchCities().then(data => item.setCities(data))
        fetchItems(null, null, 1, 6).then(data => {
            item.setItems(data.rows)
            item.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchItems(item.selectedType.id, item.selectedCity.id, item.page, 6).then(data => {
            item.setItems(data.rows)
            item.setTotalCount(data.count)
        })
    }, [item.page, item.selectedType, item.selectedCity,])




    return (
        <div>
            <Hero/>

            <Container>


                <Row className="mt-2">
                    <Col md={3}>
                        <TypeBar/>
                    </Col>
                    <Col md={9}>
                        <CityBar/>
                        <ItemList/>
                        <Pages/>
                    </Col>
                    <YMaps>
                        <div>
                            <Map width='100%' height={420} defaultState={{
                                center: [57.136439, 65.583732],
                                zoom: 3.2,
                                controls: ["zoomControl", "fullscreenControl"],
                            }}
                                 modules={["control.ZoomControl", "control.FullscreenControl"]}
                            >
                                {item.items.map(it =>

                                    <Placemark  key={it.id} modules={["geoObject.addon.balloon"]}
                                               geometry={[it.latitude, it.longitude]}
                                               properties= {{
                                                   balloonContentHeader:
                                                       `<div>${it.name}</div>`,
                                                   balloonContentBody:
                                                   `<img
                                                           src=${process.env.REACT_APP_API_URL + it.img}
                                                           width=150
                                                           height=150       
                                                       />`,
                                                   balloonContentFooter:
                                                       `<a target='_blank' href='${ITEM_ROUTE}/${it.id}'>Подробнее...</a>`,
                                               }}
                                    />
                                )}
                            </Map>
                        </div>
                    </YMaps>
                </Row>
            </Container>
        </div>
    );
});

export default Shop;