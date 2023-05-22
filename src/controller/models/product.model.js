import { Schema, model } from "mongoose"

const productsCollection = "products"

const productSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  thumbnails: {
    type: Array,
    default: [],
    require: true
  },
  code: {
    type: String,
    require: true,
    unique: true
  },
  stock: {
    type: Number,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  status: {
    type: Boolean,
    require: true
  },
})

export const productModel = model(productsCollection, productSchema)
