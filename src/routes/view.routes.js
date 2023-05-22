import { Router } from "express";
import ProductManager from "../controller/MongoDbManagers/ProductManager.js";
//import MessageManager from "../controller/MongoDbManagers/MessageManager.js";

const router = Router();
const productManager = new ProductManager("./products.json");
//const messageManager = new MessageManager()

router.get("/", async (request, response) => {
  const products = await productManager.getProducts();
  response.render("index", { products, title: "FASHION PRODUCTS", style: "home" });
});

router.get("/realtimeproducts", async (request, response) => {
  const io = request.app.get("socketio");
  const productos = await productManager.getProducts();
  response.render("realTimeProducts", {
    title: "FASHION - Real Time Products",
    style: "home",
  });
  io.on("connection", (socket) => {
    console.log("Client Conected");
    socket.emit("products", productos);
  });
});

router.get("/chat", (request, response) => {
  response.render("chat", { style: "chatStyles" });
});

export default router;
