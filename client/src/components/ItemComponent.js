import React, { useContext } from 'react';
import { Context } from '..';
import {useNavigate} from 'react-router-dom'
import { ITEM_ROUTE } from '../utils/consts';
import {BsGeoAlt} from "react-icons/bs";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import {
    StarIcon,
} from "@heroicons/react/24/solid";


const ItemComponent = ({it}) => {
    const navigate = useNavigate()
    const {item} = useContext(Context)

    return (
        <Card className="w-full max-w-[26rem] shadow-lg mt-3 mr-3 mr-20 " onClick={() => navigate(ITEM_ROUTE + '/' + it.id)}>
            <CardHeader floated={false} color="blue-gray">
                <div className="ratio ratio-4x3">
                <img
                    src={process.env.REACT_APP_API_URL + it.img}
                    alt="ui/ux review check"
                />
                </div>
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-medium" style={{color: 'black'}}>
                         {it.name}
                    </h3>
                    <p
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                        {it.rating_mod}
                    </p>
                </div>

                <div className="mb-3 flex items-center justify-start">
                    <p className="flex items-center gap-0.5 font-normal" style={{color: '#4169E1'}}
                    >
                        <BsGeoAlt size={20} style={{color: '#4169E1'}}/>{item.cities.map(city => <div className= "inline">{city.id === it.cityId ? `${city.name}` : ''}</div>)}
                    </p>
                </div>
                <div className='flex justify-end mt-3 font-medium text-lg md:text-lg'>От {it.price} ₽</div>
            </CardBody>
        </Card>

    );
};

export default ItemComponent;