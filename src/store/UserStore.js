import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._isAdmin = false
        this._user = {}
        this._address = {nameRecipient: '', familyRecipient: '', emailRecipient: '', phoneNumberRecipient: '',
        city: '', street: '', house: '', apatment: '', index: ''}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setIsAdmin(bool) {
        this._isAdmin = bool
    }
    setUser(user) {
        this._user = user
    }
    setAddress(address) {
        this._address = address
    }
    get isAuth() {
        return this._isAuth
    }
    get isAdmin() {
        return this._isAdmin
    }
    get user() {
        return this._user
    }
    get address() {
        return this._address
    }

}