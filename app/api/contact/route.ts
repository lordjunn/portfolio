import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { name, email, message, sendConfirmation } = await request.json()

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing email environment variables")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    console.log("Creating transporter with user:", process.env.EMAIL_USER)

    // Create a transporter with more explicit configuration
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    // Test the connection
    try {
      await transporter.verify()
      console.log("SMTP connection verified successfully")
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError)
      return NextResponse.json(
        {
          error: "Email service connection failed",
          details: verifyError instanceof Error ? verifyError.message : "Unknown verification error",
        },
        { status: 500 },
      )
    }

    // Email to yourself (notification)
    const notificationMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `Portfolio Contact: ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
Confirmation Email Requested: ${sendConfirmation ? "Yes" : "No"}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Message:</strong></p>
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
    ${message.replace(/\n/g, "<br>")}
  </div>
  <p><strong>Confirmation Email Requested:</strong> ${sendConfirmation ? "Yes" : "No"}</p>
  <p style="color: #777; margin-top: 20px; font-size: 12px;">
    This email was sent from your portfolio contact form.
  </p>
</div>
      `,
    }

    console.log("Sending notification email...")
    // Send notification email to yourself
    await transporter.sendMail(notificationMailOptions)
    console.log("Notification email sent successfully")

    // Send confirmation email to sender if they opted in
    if (sendConfirmation) {
      console.log("Sending confirmation email to sender...")
      const confirmationMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Thank you for contacting me!",
        html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #333;">Thank you for reaching out!</h2>
  
  <p>Hi ${name},</p>
  
  <p>Thank you for contacting me through my portfolio website. I've received your message and will get back to you as soon as possible.</p>
  
  <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #007bff;">
    <h3 style="margin-top: 0; color: #333;">Your Message Details:</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Date Sent:</strong> ${new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}</p>
    <p><strong>Message:</strong></p>
    <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
      ${message.replace(/\n/g, "<br>")}
    </div>
  </div>
  
  <p>I typically respond within 24-48 hours. If your inquiry is urgent, please feel free to reach out through my social media profiles.</p>
  
  <p>Best regards,<br>
  <strong>Your Name</strong></p>
  
  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  
  <p style="color: #666; font-size: 12px;">
    This is an automated confirmation email. Please do not reply to this email. 
    If you need to send additional information, please use the contact form on my website again.
  </p>
</div>
        `,
      }

      await transporter.sendMail(confirmationMailOptions)
      console.log("Confirmation email sent successfully")
    }

    return NextResponse.json({
      success: true,
      confirmationSent: sendConfirmation,
    })
  } catch (error) {
    console.error("Error sending email:", error)

    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)

      // Check for specific Gmail errors
      if (error.message.includes("Invalid login")) {
        return NextResponse.json(
          {
            error: "Email authentication failed. Please check your Gmail app password.",
          },
          { status: 500 },
        )
      }

      if (error.message.includes("Less secure app")) {
        return NextResponse.json(
          {
            error: "Gmail security settings issue. Please use an App Password instead of your regular password.",
          },
          { status: 500 },
        )
      }
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
