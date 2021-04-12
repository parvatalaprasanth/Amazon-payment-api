
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51IfQQjSENfulLeatwC5rlASAgn3rOeP3nLYCZWYH9EbfnCbZxveUJjL4ayaSmDxlTE1VdXvCUQSaeT0o5tLOAFPy00EzXGHZuQ"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
  
    console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "inr",
    });
  
    // OK - Created
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  });
  

// - Listen command


app.listen(process.env.PORT || 5000,function(){
    console.log("server is running");
  })
  

// Example endpoint

//http://localhost:5001/clone-e46cc/us-central1/api
