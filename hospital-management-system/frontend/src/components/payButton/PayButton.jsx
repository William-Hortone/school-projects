import axios from "axios";
import React, { useEffect } from "react";
import { selectUserId } from "../../redux/slice/userSlide";
import { useSelector } from "react-redux";

const PayButton = ({ bill }) => {
  console.log("The inputs that e are passsing", bill);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/";
    script.async = true;

    script.onload = () => {
      const stripe = window.Stripe(
        "pk_test_51M1CnNHy4z3Ls6KKcAZWtBS4V6GgpTC6F9jY9v32usUI6nF8Q6rL1Mynn5Df2cSW4Yj9SHBlgrcSqC3B3gnFgfww00mtARqSmy"
      );
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/stripe/create-checkout-session",
        {
          bill,
          userId,
        }
      );

      const { sessionId } = response.data;

      const stripe = window.Stripe(
        "pk_test_51M1CnNHy4z3Ls6KKcAZWtBS4V6GgpTC6F9jY9v32usUI6nF8Q6rL1Mynn5Df2cSW4Yj9SHBlgrcSqC3B3gnFgfww00mtARqSmy"
      );
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error("Error redirecting to checkout:", result.error.message);
      }
    } catch (error) {
      console.error("Checkout request failed:", error.message);
    }
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};

export default PayButton;
