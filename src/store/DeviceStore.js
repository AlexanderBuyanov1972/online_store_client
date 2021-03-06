import { makeAutoObservable } from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._basketDevices = []
        this._favoriteDevices = []

        this._selectedType = {}
        this._selectedBrand = {}
        this._selectedDevice = {}

        this._pageCurrent = 1
        this._totalCount = 0
        this._limit = 8

        this._totalPrice = 0
        this._flagReload = false

        makeAutoObservable(this)
    }

    setTypes(types) {
        this.setPageCurrent(1)
        this._types = types
    }

    setBrands(brands) {
        this.setPageCurrent(1)
        this._brands = brands
    }

    setDevices(devices) {
        this._devices = devices
    }
    setBasketDevices(basketDevices) {
        this._basketDevices = basketDevices
    }
    setFavoriteDevices(favoriteDevices) {
        this._favoriteDevices = favoriteDevices
    }

    setSelectedType(type) {
        this._selectedType = type
    }

    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }
    setSelectedDevice(device) {
        this._selectedDevice = device
    }
    setPageCurrent(page) {
        this._pageCurrent = page
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount
    }
    setLimit(limit) {
        this._limit = limit
    }

    setTotalPrice(totalPrice) {
        this._totalPrice = totalPrice
    }

    setFlagReload(flagReload) {
        this._flagReload = flagReload
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
    get basketDevices() {
        return this._basketDevices
    }
    get favoriteDevices() {
        return this._favoriteDevices
    }

    get selectedType() {
        return this._selectedType
    }

    get selectedBrand() {
        return this._selectedBrand
    }
    get selectedDevice() {
        return this._selectedDevice
    }
    get pageCurrent() {
        return this._pageCurrent
    }
    get totalCount() {
        return this._totalCount
    }
    get limit() {
        return this._limit
    }
    get totalPrice() {
        return this._totalPrice
    }
    get flagReload() {
        return this._flagReload
    }
}