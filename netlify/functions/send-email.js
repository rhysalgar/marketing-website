// Netlify Function: send-email
// Sends an email to interested@rootedag.com using Resend's HTTP API

const TO_ADDRESS = "interested@rootedag.com";
const FROM_ADDRESS = "Rooted <onboarding@resend.dev>"; // Replace with a verified sender when available

exports.handler = async function handler(event) {
  // Allow only POST
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const { name, email, comment } = JSON.parse(event.body || "{}");

    if (!name || !email || !comment) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Missing required fields" }),
      };
    }

    const subject = `Learn More - ${name}`;
    const text = [
      "Someone requested to learn more:",
      `Name: ${name}`,
      `Email: ${email}`,
      `Comment: ${comment}`,
    ].join("\n");

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Missing RESEND_API_KEY env var" }),
      };
    }

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [TO_ADDRESS],
        subject,
        text,
      }),
    });

    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      return {
        statusCode: 502,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: data?.message || "Failed to send email" }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Unexpected error" }),
    };
  }
}


