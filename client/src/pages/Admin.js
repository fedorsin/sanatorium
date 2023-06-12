import React, {useState} from 'react';
import CreateType from '../components/modals/Types/CreateType';
import CreateItem from '../components/modals/Items/CreateItem';
import CreateCity from "../components/modals/Cities/CreateCity";
import ChangeType from '../components/modals/Types/ChangeType';
import ChangeItem from '../components/modals/Items/ChangeItem';
import ChangeCity from "../components/modals/Cities/ChangeCity";
import DeleteType from '../components/modals/Types/DeleteType';
import DeleteItem from '../components/modals/Items/DeleteItem';
import DeleteCity from "../components/modals/Cities/DeleteCity";
import { Card, Typography } from "@material-tailwind/react";
import beachVid from "../assets/beachVid.mp4";
const Admin = () => {
    const [createTypeVisable, setCreateTypeVisable] = useState(false)
    const [changeTypeVisable, setChangeTypeVisable] = useState(false)
    const [deleteTypeVisable, setDeleteTypeVisable] = useState(false)

    const [createItemVisable, setCreateItemVisable] = useState(false)
    const [changeItemVisable, setChangeItemVisable] = useState(false)
    const [deleteItemVisable, setDeleteItemVisable] = useState(false)

    const [createCityVisable, setCreateCityVisable] = useState(false)
    const [changeCityVisable, setChangeCityVisable] = useState(false)
    const [deleteCityVisable, setDeleteCityVisable] = useState(false)


    const TABLE_HEAD = ["Инструменты", "", "", ""];

    return (

        <div className='w-full h-screen relative'>
            <video
                className='w-full h-full object-cover'
                src={beachVid}
                autoPlay
                loop
                muted
            />
            <div className='absolute w-full h-full top-0 left-0 bg-gray-900/30'></div>
            <div className='absolute top-0 w-full h-full flex flex-col justify-center text-center text-black p-4'>
        <div className='flex justify-center items-center py-64'>
            <Card className="overflow-scroll h-full">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal text-lg leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                        <tr className="even:bg-blue-gray-80/50">
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal text-lg">
                                    Город
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography as="a" href="#" variant="small" color="green" className="font-medium text-base hover:text-teal-900" onClick={() => setCreateCityVisable(true)}>
                                    Создать
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography as="a" href="#" variant="small" color="blue" className="font-medium text-base" onClick={() => setChangeCityVisable(true)}>
                                    Изменить
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography as="a" href="#" variant="small" color="red" className="font-medium text-base hover:text-red-900" onClick={() => setDeleteCityVisable(true)}>
                                    Удалить
                                </Typography>
                            </td>
                        </tr>

                        <tr className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal text-lg">
                                    Метод лечения
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography as="a" href="#" variant="small" color="green" className="font-medium text-base hover:text-teal-900" onClick={() => setCreateTypeVisable(true)}>
                                    Создать
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography as="a" href="#" variant="small" color="blue" className="font-medium text-base" onClick={() => setChangeTypeVisable(true)}>
                                    Изменить
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography as="a" href="#" variant="small" color="red" className="font-medium text-base hover:text-red-900" onClick={() => setDeleteTypeVisable(true)}>
                                    Удалить
                                </Typography>
                            </td>
                        </tr>

                        <tr className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal text-lg">
                                    Санаторий
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography as="a" href="#" variant="small" color="green" className="font-medium text-base hover:text-teal-900" onClick={() => setCreateItemVisable(true)}>
                                    Создать
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography as="a" href="#" variant="small" color="blue" className="font-medium text-base" onClick={() => setChangeItemVisable(true)}>
                                    Изменить
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography as="a" href="#" variant="small" color="red" className="font-medium text-base hover:text-red-900" onClick={() => setDeleteItemVisable(true)}>
                                    Удалить
                                </Typography>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Card>

            <CreateType show={createTypeVisable} onHide={() => setCreateTypeVisable(false)}/>
            <ChangeType show={changeTypeVisable} onHide={() => setChangeTypeVisable(false)}/>
            <DeleteType show={deleteTypeVisable} onHide={() => setDeleteTypeVisable(false)}/>

            <CreateItem show={createItemVisable} onHide={() => setCreateItemVisable(false)}/>
            <ChangeItem show={changeItemVisable} onHide={() => setChangeItemVisable(false)}/>
            <DeleteItem show={deleteItemVisable} onHide={() => setDeleteItemVisable(false)}/>

            <CreateCity show={createCityVisable} onHide={() => setCreateCityVisable(false)}/>
            <ChangeCity show={changeCityVisable} onHide={() => setChangeCityVisable(false)}/>
            <DeleteCity show={deleteCityVisable} onHide={() => setDeleteCityVisable(false)}/>
        </div>
        </div>
        </div>
    );
};

export default Admin;