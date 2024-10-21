import axios from "axios";

const API_URL = "http://localhost:5000/api/payment/test";

// Function to initiate a checkout
export const initiateCheckout = async (amount) => {
  try {
    const response = await axios.post(`${API_URL}/checkout`, { amount });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to initiate checkout"
    );
  }
};

// Function to verify the payment
export const verifyPayment = async (paymentData) => {
  try {
    const response = await axios.post(
      `${API_URL}/paymentverification`,
      paymentData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Payment verification failed"
    );
  }
};
