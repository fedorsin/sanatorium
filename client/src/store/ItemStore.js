import {makeAutoObservable} from "mobx";

export default class ItemStore {
    constructor(){
        this._types = []
        this._cities = []
        this._items = []
        this._selectedType = {}
        this._selectedCity = {}
        this._selectedItem = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 6
        makeAutoObservable(this)
    }

    setTypes(types){
        this._types = types
    }

    setCities(cities) {
        this._cities = cities
    }

    setItems(items){
        this._items = items
    }

    setSelectedType(type){
        this.setPage(1)
        this._selectedType = type
    }

    setSelectedCity(city) {
        this.setPage(1)
        this._selectedCity = city
    }

    setSelectedItem(item){
        this._selectedItem = item
    }

    setPage(page){
        this._page = page
    }

    setTotalCount(count){
        this._totalCount = count
    }


    get types(){
        return this._types
    }

    get cities() {
        return this._cities
    }

    get items(){
        return this._items
    }

    get selectedType(){
        return this._selectedType
    }

    get selectedCity() {
        return this._selectedCity
    }

    get selectedItem(){
        return this._selectedItem
    }

    get page(){
        return this._page
    }

    get totalCount(){
        return this._totalCount
    }

    get limit(){
        return this._limit
    }
}