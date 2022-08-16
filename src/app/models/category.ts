export class Category {
    _id: string
    name: string
    description: string
    items: string[]

    constructor( id?: string, name?: string, description?: string, items?: string[]){
        this._id = id!
        this.name = name!
        this.description = description!
        this.items = items!
    }
}