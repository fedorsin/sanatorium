import React, {Fragment, useState} from 'react';
import {RiCustomerService2Fill} from "react-icons/ri";
import {MdOutlineTravelExplore} from "react-icons/md";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
const Admin = () => {

    const [open, setOpen] = useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const customAnimation = {
        mount: { scale: 1 },
        unmount: { scale: 0.9 },
    };



    return (
        <div className='container mx-auto py-56'>

            <div className='max-w-[1240px] mx-auto'>
                <Fragment>
                    <Accordion open={open === 1} animate={customAnimation}>
                        <AccordionHeader onClick={() => handleOpen(1)}>
                            Как воспользоваться фильтром поиска?
                        </AccordionHeader>
                        <AccordionBody>
                            Чтобы воспользоваться фильтром поиска.
                            Необходимо выбрать город или соответствующий метод лечения в фильтре поиска.
                            Тогда санатории отфильтруются и вы получите подборку под ваш запрос.
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 2} animate={customAnimation}>
                        <AccordionHeader onClick={() => handleOpen(2)}>
                            Как открыть карту на полный экран?
                        </AccordionHeader>
                        <AccordionBody>
                            Чтобы открыть карту на полный экран.
                            Необходимо нажать на кнопку "открыть полный экран" в верхнем правом углу карты.
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 3} animate={customAnimation}>
                        <AccordionHeader onClick={() => handleOpen(3)}>
                            Что мне даст авторизация на сайте?
                        </AccordionHeader>
                        <AccordionBody>
                            Авторизация на сайте предоставит возможность оценить санаторий, добавить санаторий в избранное
                            и оставить комментарии.
                        </AccordionBody>
                    </Accordion>
                </Fragment>
            </div>
        </div>
    );
};

export default Admin;