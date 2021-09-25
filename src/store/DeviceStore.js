import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [
            {id: 1, name: "Холодильники"},
            {id: 2, name: "Смартфоны"},
            {id: 3, name: "Ноутбуки"},
            {id: 4, name: "Телевизоры"},

        ]
        this._brands = [
            {id: 1, name: "Samsung"},
            {id: 2, name: "Apple"},
            {id: 3, name: "Lenovo"},
            {id: 4, name: "Beko"},
            {id: 5, name: "Vivo"},
        ]
        this._devices = [
            {
                id: 1,
                name: "Iphone 12 Pro",
                price: 15000,
                rating: 5,
                img: 'https://files.foxtrot.com.ua/PhotoNew/img_0_60_7610_2.webp'
            },
            {
                id: 2,
                name: "Iphone 12 Pro",
                price: 15000,
                rating: 5,
                img: 'https://files.foxtrot.com.ua/PhotoNew/img_0_60_7610_2.webp'
            },
            {
                id: 3,
                name: "Iphone 12 Pro",
                price: 15000,
                rating: 5,
                img: 'https://files.foxtrot.com.ua/PhotoNew/img_0_60_7610_2.webp'
            },
            {
                id: 4,
                name: "Iphone 12 Pro",
                price: 15000,
                rating: 5,
                img: 'https://files.foxtrot.com.ua/PhotoNew/img_0_60_7610_2.webp'
            },
            {
                id: 5,
                name: "Iphone 12 Pro",
                price: 15000,
                rating: 5,
                img: 'https://files.foxtrot.com.ua/PhotoNew/img_0_60_7610_2.webp'
            },
            {
                id: 6,
                name: "Iphone 12 Pro",
                price: 15000,
                rating: 5,
                img: 'https://files.foxtrot.com.ua/PhotoNew/img_0_60_7610_2.webp'
            },
            {
                id: 7,
                name: "Iphone 12 Pro",
                price: 15000,
                rating: 5,
                img: 'https://files.foxtrot.com.ua/PhotoNew/img_0_60_7610_2.webp'
            },
            {
                id: 8,
                name: "Iphone 12 Pro",
                price: 15000,
                rating: 5,
                img: 'https://files.foxtrot.com.ua/PhotoNew/img_0_60_7610_2.webp'
            },
            {
                id: 9,
                name: "Iphone 12 Pro",
                price: 15000,
                rating: 5,
                img: 'https://files.foxtrot.com.ua/PhotoNew/img_0_60_7610_2.webp'
            },
            {
                id: 10,
                name: "Iphone 12 Pro",
                price: 15000,
                rating: 5,
                img: 'https://files.foxtrot.com.ua/PhotoNew/img_0_60_7610_2.webp'
            },
        ]
        this._selectedType = {}

        this._selectedBrand = {}

        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setBrands(brands) {
        this._brands = brands
    }

    setDevices(devices) {
        this._devices = devices
    }

    setSelectedType(type) {
        this._selectedType = type
    }

    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }

    get types() {
        return this._types
    }

    get brands() {
        return this._brands
    }

    get devices() {
        return this._devices
    }

    get selectedType() {
        return this._selectedType
    }

    get selectedBrand() {
        return this._selectedBrand
    }
}