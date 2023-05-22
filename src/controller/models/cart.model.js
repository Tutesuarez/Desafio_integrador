import { Schema, model } from "mongoose"

const cartsCollection = "carts"

const cartSchema = new Schema({
  products: {
      type: [
          {
              prod_Id: {
                  type: Schema.Types.ObjectId,
                  ref: "products",
              },
              quantity: {
                  type: Number,
                  default: 1,
              },
          },
      ],
      default: []
  }
});

export const cartModel = model(cartsCollection, cartSchema)
