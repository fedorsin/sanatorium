const uuid = require('uuid')
const path = require('path')
const {Item, ItemInfo, BasketItem} = require('../models/models')
const ApiError = require('../error/ApiError')

class ItemController {
    async create(req, res, next){
        try {
            let {name, price, typeId, cityId, info, _info, site, telegram_link, address, phone, latitude, longitude} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const item = await Item.create({name, price, typeId, cityId, _info, site, telegram_link, address, phone, latitude, longitude, img: fileName})

            if(info){
                info = JSON.parse(info)
                info.forEach(i => 
                    ItemInfo.create({
                        title: i.title,
                        content: i.content,
                        itemId: item.id
                    })
                )
            }

            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }
    async getAll(req, res){
        let {typeId, cityId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let items;
        if (!cityId && !typeId) {
            items = await Item.findAndCountAll({limit, offset})
        }
        if (cityId && !typeId) {
            items = await Item.findAndCountAll({where:{cityId}, limit, offset})
        }
        if (!cityId && typeId) {
            items = await Item.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (cityId && typeId) {
            items = await Item.findAndCountAll({where:{typeId, cityId}, limit, offset})
        }
        return res.json(items)
    }

    async getOne(req, res){
        const {id} = req.params
        const item = await Item.findOne({where: {id}, include: [{model: ItemInfo, as: 'info'}]})
        return res.json(item)
    }

    async delete(req, res, next){
        try {
            const {id} = req.params
            const item = await Item.findOne({where: {id}, include: [{model: ItemInfo, as: 'info'}]})
            if(!item){
                return res.json('Такой санаторий отсутствует в базе данных')
            }
            await BasketItem.destroy({where:{itemId: id}})
            await item.destroy()
            return res.json({message: "Санаторий был успешно удален"})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next){
        try {
            const {id} = req.params
            const {name, price, typeId, cityId, info, _info, site, telegram_link, address, phone, latitude, longitude} = req.body

            await Item.findOne({where: {id}, include: [{model: ItemInfo, as: 'info'}]}).then(async data => {
                if(data){
                    let updateItem = {}

                    name ? updateItem.name = name : false
                    price ? updateItem.price = price : false
                    _info ? updateItem._info = _info : false
                    site ? updateItem.site = site : false
                    telegram_link ? updateItem.telegram_link = telegram_link : false
                    address ? updateItem.address = address : false
                    phone ? updateItem.phone = phone : false
                    latitude ? updateItem.latitude = latitude : false
                    longitude ? updateItem.longitude = longitude : false
                    typeId ? updateItem.typeId = typeId : false
                    cityId ? updateItem.cityId = cityId : false

    
                    if(req.files){
                        const {img} = req.files
                        let fileName = uuid.v4() + '.jpg'
                        img.mv(path.resolve(__dirname, '..', 'static', fileName))
                        updateItem.img = fileName
                    }
    
                    if(info){
                        const parseInfo = JSON.parse(info)
                        for(const item of parseInfo){
                            await ItemInfo.findOne({where:{id: item.id}}).then(async data => {
                                if(data){
                                    await ItemInfo.update({title: item.title, content: item.content}, {where: {id: item.id}})
                                } else {
                                    await ItemInfo.create({title: item.title, content: item.content, itemId: id})
                                }
                            })
                        }
                    }
    
                    await Item.update({...updateItem}, {where: {id}}).then(() => res.json('Изменения применены'))
                } else {
                    return res.json('Данного санатория нет в базе данных')
                }
            })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ItemController()