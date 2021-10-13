import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []

        this._selectedType = {}
        this._selectedBrand = {}
        this._selectedDevice = {}
        
        this._pageCurrent = 1
        this._totalCount = 0
        this._limit = 8

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
}