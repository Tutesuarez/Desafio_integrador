import ProductManager from "./ProductManager.js"
import { cartModel } from "../models/cart.model.js"

export default class CartManager {
  async addCart() {
    try {
      let result = await cartModel.create({ products: [] })
      return { success: `The cart was created succesfully.`, payload: result }
    } catch (error) {
      return { error: `The cart was created succesfully.`, payload: error }
    }
  }
s
  async #getCarts() {
    let result = await cartModel.find({}, { __v: 0 }).lean()
    return result
  }

  async getCart(id) {
    try {
      let result = await cartModel.find({ _id: id }, { __v: 0 }).lean()
      if (result.length === 0) throw new Error(`The cart not exist.`)
      return result
    } catch (error) {
      return { error: error.message }
    }
  }

  async addProductToCart(cid, pid) {
    try {
      let product = await this.#checkIfProductExist(pid)

      if (product?.error)
        throw new Error(`The product does not exist.`)

      let cartExist = await this.getCart(cid)

      if (cartExist?.error)
        throw new Error(`The cart does not exist.`)

      let cart = await cartModel.find({ "products.pid": pid })

      let result

      if (cart.length) {
        const newProducts = cart[0].products.map((product) => {
          if (product.pid === pid) {
            return { ...product, quantity: product.quantity + 1 }
          }
          return product
        })
        result = await cartModel.updateOne(
          { _id: cid },
          { products: newProducts }
        )
      } else {
        result = await cartModel.updateOne(
          { _id: cid },
          { $push: { products: { pid, quantity: 1 } } }
        )
      }
      return {
        success: `The product was added successfully`,
        payload: result,
      }
    } catch (error) {
      return { error: error.message }
    }
  }

  //Check si existe
  async #checkIfProductExist(pid) {
    let productManager = new ProductManager()
    let product = await productManager.getProductById(pid)
    return product
  }
}
