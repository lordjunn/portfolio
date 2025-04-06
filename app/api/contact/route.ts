import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Create a transporter with simple username/password auth
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `Portfolio Contact: ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">
  <h2 style="font-size: 24px; color: #0056b3; margin-bottom: 20px;">New Contact Form Submission</h2>
  <p style="font-size: 16px; margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
  <p style="font-size: 16px; margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
  
  <p style="font-size: 16px; margin-bottom: 20px;"><strong>Message:</strong></p>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <p style="font-size: 16px; line-height: 1.5;">${message.replace(/\n/g, "<br>")}</p>
  </div>

  <p style="font-size: 12px; color: #777; margin-top: 30px; text-align: center;">
    This email was sent from your portfolio contact form. If you did not request this, please ignore.
  </p>

  <div style="text-align: center; margin-top: 30px;">
    <a href="mailto:${email}" style="color: #0056b3; text-decoration: none; font-weight: bold;">Reply to ${name}</a>
  </div>
</div>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)

    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }

    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

