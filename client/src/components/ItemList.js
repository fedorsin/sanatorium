import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import ItemComponent from './ItemComponent';

const ItemList = observer(() => {
    const {item} = useContext(Context)

    return (
        <div className='max-w-[1240px] mx-auto px-4 py-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {item.items.map(i => 
                <ItemComponent key={i.id} it={i}/>
            )}
        </div>
    );
});

export default ItemList;