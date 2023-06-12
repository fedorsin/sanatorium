import React, {useContext, useEffect, useState} from 'react';
import StarRating from '../components/StarRating';
import '../index.css'
import {useParams} from 'react-router-dom';
import {addToBasket, checkRating, fetchBasketItems, fetchOneItem, setRating} from '../http/itemAPI';
import {Context} from '..';
import {observer} from 'mobx-react-lite';
import {RiCustomerService2Fill} from "react-icons/ri";
import {MdOutlineTravelExplore} from "react-icons/md";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import {Card, Typography} from "@material-tailwind/react";

const Item = observer(() => {
    const {basket, user} = useContext(Context)
    const [item, setItem] = useState({info: []})
    const [resRate, setResRate] = useState("");
    const [isAccessRating, setIsAccessRating] = useState(false);

    const {id} = useParams()

    const description = item.info.filter(object => object.title !== 'Description')
    const definition = item.info.filter(object => object.title === 'Description')

    useEffect(() => {
        fetchOneItem(id).then(data => setItem(data))
        if (user.isAuth) {
            checkRating({itemId: id}).then(res => setIsAccessRating(res.allow));
        }
    }, [id, resRate])

    const isItemInBasket = () => {
        const findItem = basket.basketItems.findIndex(prod => Number(prod.id) === Number(item.id));
        return findItem < 0
    }

    const addItem = (item) => {
        if (user.isAuth) {
            addToBasket(item).then(() => basket.setBasketItems(item))
        } else {
            alert('You must register')
        }
    }

    const changedRating = (rate) => {
        setRating({rate, itemId: id}).then(res => setResRate(res))
    }


    const TelegramChat = () => {
        useEffect(() => {
            const script = document.createElement("script");
            script.setAttribute("src", "https://telegram.org/js/telegram-widget.js?22");
            script.setAttribute("data-telegram-discussion", item.telegram_link);
            script.setAttribute("data-comments-limit", "8");
            document.getElementsByClassName("twitter-embed")[0].appendChild(script);
        }, []);

        return (
            <div className="twitter-embed"></div>
        );
    };


    const TABLE_HEAD = ["Характеристика", "Описание",];

    const YandexMap = () => (

        <YMaps>
            <div>
                <Map width='100%' defaultState={{
                    center: [item.latitude, item.longitude],
                    zoom: 15,
                    controls: ["zoomControl", "fullscreenControl"],
                }}
                     modules={["control.ZoomControl", "control.FullscreenControl"]}
                >

                    <Placemark geometry={[item.latitude, item.longitude]}/>
                </Map>
            </div>
        </YMaps>

    );


    return (
        <div className='container mx-auto py-56'>

            <div className='grid lg:grid-cols-3 grid-cols-2 gap-5'>
                <img src={process.env.REACT_APP_API_URL + item.img}
                     className='rounded-tl-2xl rounded-br-2xl md:w-80 lg:ml-6 w-48 ml-2 row-span-2' alt=''
                     key={item.id}/>
                <div>
                    <h2 className='md:text-2xl -ml-3 md:ml-5 text-2xl' key={item.id}>{item.name}</h2>
                    <div className='-ml-3 md:ml-5 md:mt-5' key={item.rating}>
                        <StarRating changeRating={changedRating} ratingValue={item.rating} isAuth={user.isAuth}
                                    isAccessRating={isAccessRating}/>
                        <h2 className='flex'>{resRate}</h2>
                        Наиболее частая оценка: {item.rating_mod}
                    </div>
                    <div className='grid max-w-sm w-full mt-4 -ml-3 md:ml-5 grid-rows-2'>
                        <h2 className='md:text-2xl md:pr-5 select-none text-xl font-semibold'
                            key={item.id}>от {item.price} руб.</h2>
                        <div>
                            {isItemInBasket() ?
                                <button className='button_buy mt-3' onClick={() => addItem(item)}>Добавить в
                                    избранное</button>
                                :
                                <h1 className='mt-3 text-lg font-semibold text-indigo-500'>Санаторий уже в
                                    избранном</h1>
                            }
                        </div>
                    </div>
                </div>


                <div className='text-2xl col-span-2 md:col-span-1 ml-2 items-stretch'>
                    {definition.map(info =>
                        <div className='' key={info.id}>
                            <h1 className='font-semibold'>{info.title}:</h1>
                            {info.content}
                        </div>
                    )}
                </div>
            </div>


            <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-4 px-4 py-4'>
                <div className='lg:col-span-2 flex flex-col justify-evenly'>
                    <div>
                        <h1>{item.name}</h1>
                        <h3 className='py-8' style={{fontWeight: 'normal'}}>
                            {item._info}
                        </h3>
                    </div>
                    <div className='grid sm:grid-cols-2 gap-8 py-4'>
                        <div className='flex flex-col lg:flex-row items-center text-center'>
                            <button>
                                <RiCustomerService2Fill size={50}/>
                            </button>
                            <div>
                                <h3 className='py-2'>НЕВЕРОЯТНЫЙ СЕРВИС</h3>
                                <p className='py-1'>ТАКОГО СЕРВИСА ВЫ НЕ УВИДИТЕ БОЛЬШЕ НИГДЕ И НИКОГДА</p>
                            </div>
                        </div>
                        <div className='flex flex-col lg:flex-row items-center text-center'>
                            <button>
                                <MdOutlineTravelExplore size={50}/>
                            </button>
                            <div>
                                <h3 className='py-2'>ФЕНОМЕНАЛЬНЫЙ СЕРВИС</h3>
                                <p className='py-1'>ТАКОГО СЕРВИСА ВЫ НЕ УВИДИТЕ БОЛЬШЕ НИГДЕ И НИКОГДА</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='border text-center'>
                        <p className='pt-2'>ПОЛУЧИТЕ 10% СКИДКУ</p>
                        <p className='py-4'>ОСТАЛОСЬ 12 ЧАСОВ</p>
                        <p className='bg-gray-800 text-gray-200 py-2'>НУЖНО ЛИШЬ ПЕРЕЙТИ ПО ССЫЛКИ НИЖЕ</p>
                    </div>
                    <form className='w-full'>
                        <div className='flex flex-col my-2'>
                            <label>Направление</label>
                            <select className='border rounded-md p-2'>
                                <option>Сочи</option>
                                <option>Геленджик</option>
                                <option>Анапа</option>
                                <option>Ессентуки</option>
                            </select>
                        </div>
                        <div className='flex flex-col my-4'>
                            <label>Заезд</label>
                            <input className='border rounded-md p-2' type="date"/>
                        </div>
                        <div className='flex flex-col my-2'>
                            <label>Выезд</label>
                            <input className='border rounded-md p-2' type="date"/>
                        </div>
                        <button className='w-full my-4'>Перейти на сайт санатория</button>
                    </form>
                </div>

            </div>

            <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-4 px-4 py-4'>
                <div className='lg:col-span-2 flex flex-col justify-evenly'>
                    <div>
                        <h1>Подробное описание</h1>
                    </div>
                </div>
            </div>

            <Card className="max-w-[1240px] mx-auto overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                Название:
                            </Typography>
                        </td>
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {item.name}
                            </Typography>
                        </td>
                    </tr>
                    <tr className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                Адрес:
                            </Typography>
                        </td>
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {item.address}
                            </Typography>
                        </td>
                    </tr>
                    <tr className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                Сайт:
                            </Typography>
                        </td>
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                <a href={item.site}> {item.site}</a>
                            </Typography>
                        </td>
                    </tr>
                    <tr className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                Телефон:
                            </Typography>
                        </td>
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {item.phone}
                            </Typography>
                        </td>
                    </tr>
                    {description.map((info) => (
                        <tr key={info.id} className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal" key={info.id}>
                                    {info.title}:
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {info.content}
                                </Typography>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Card>


            <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-4 px-4 py-4'>
                <div className='lg:col-span-2 flex flex-col justify-evenly'>
                    <div>
                        <h1>Расположение</h1>
                        <h3 className='py-8' style={{fontWeight: 'normal'}}>
                            Месторасположение санатория указано на карте.
                            Для удобства использования карту можно открыть на весь экран. Или перейти по ссылке в
                            Яндекс.карты.
                            При нажатии на кнопку "Как добраться" можно построить маршрут от точки направления до пункта
                            назначения.
                        </h3>
                    </div>
                    <div className='grid sm:grid-cols-2 gap-8 py-4'>
                        <div className='flex flex-col lg:flex-row items-center text-center'>
                            <button>
                                <RiCustomerService2Fill size={50}/>
                            </button>
                            <div>
                                <h3 className='py-2'>НЕВЕРОЯТНЫЙ СЕРВИС</h3>
                                <p className='py-1'>ТАКОГО СЕРВИСА ВЫ НЕ УВИДИТЕ БОЛЬШЕ НИГДЕ И НИКОГДА</p>
                            </div>
                        </div>
                        <div className='flex flex-col lg:flex-row items-center text-center'>
                            <button>
                                <MdOutlineTravelExplore size={50}/>
                            </button>
                            <div>
                                <h3 className='py-2'>ФЕНОМЕНАЛЬНЫЙ СЕРВИС</h3>
                                <p className='py-1'>ТАКОГО СЕРВИСА ВЫ НЕ УВИДИТЕ БОЛЬШЕ НИГДЕ И НИКОГДА</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='border text-center'>
                        <p className='py-4'>РАСПОЛОЖЕНИЕ САНАТОРИЯ</p>
                        <p className='bg-gray-800 text-gray-200 py-2'>Яндекс.карта</p>
                    </div>
                    <form className='w-full'>
                        <YandexMap/>
                        <button className='w-full my-4'>Перейти на сайт санатория</button>
                    </form>

                </div>

            </div>
            <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-4 px-4 py-4'>
                <div className='lg:col-span-2 flex flex-col justify-evenly'>
                    <div>
                        <h1>Комментарии</h1>
                    </div>
                </div>
            </div>
            <div className='max-w-[1240px] mx-auto'>
                <TelegramChat/>
            </div>
        </div>
    );
});

export default Item;

/**
 * @param {{rating}}
 */