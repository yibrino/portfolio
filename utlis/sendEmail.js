import axios from "axios";

export async function sendEmail({ message, user }) {
  const API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY; // Use NEXT_PUBLIC if used on client-side

  if (!API_KEY) {
    throw new Error("Brevo API key not found in environment variables");
  }

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        to: [{ email: "yibrahmehary128@gmail.com" }], // Email of the recipient
        templateId: 2, // Brevo email template ID
        params: {
          message: message,
          user: user,
        },
      },
      {
        headers: {
          "api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to send email");
  }
}
