import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const paymentData = {
      cardNumber,
      expirationDate,
      cvv,
    };

    // Make a request to the payment gateway with the payment data.
  };

  return (
    <>
      
    <Helmet>
        <title> Payment | IIT Bhilai Dining Page </title>
    </Helmet>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Card number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Expiration date"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
    </>
  );
};

export default Payment;