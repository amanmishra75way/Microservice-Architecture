import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

// Convert ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load proto file
const packageDef = protoLoader.loadSync(path.resolve(__dirname, "./product.proto"));
const grpcObject = grpc.loadPackageDefinition(packageDef);
const productPackage = grpcObject.product;

// Sample product data
const products = [
  { id: "1", name: "Laptop", price: 1200.99 },
  { id: "2", name: "Phone", price: 799.5 },
  { id: "3", name: "Monitor", price: 299.99 },
];

// gRPC Service methods
const server = new grpc.Server();

server.addService(productPackage.ProductService.service, {
  GetProduct: (call, callback) => {
    const product = products.find((p) => p.id === call.request.id);
    if (!product) return callback(new Error("Product not found"), null);
    callback(null, product);
  },
  ListProducts: (_, callback) => {
    callback(null, { products });
  },
});

server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
  console.log("gRPC ProductService running at http://localhost:50051");
});
