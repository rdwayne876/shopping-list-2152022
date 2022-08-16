export class item {
    _id: string
    name: string
    quantity: number
    price: number
    category: string
    notes: string

    constructor( id?: string, name?: string, quantity?: number, price?: number, category?: string, notes?: string) {
        this._id = id!
        this.name = name!
        this.quantity = quantity!
        this.price = price!
        this.category = category!
        this.notes = notes!
    }
}