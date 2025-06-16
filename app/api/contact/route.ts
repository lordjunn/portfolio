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
      console.error("EMAIL_USER exists:", !!process.env.EMAIL_USER)
      console.error("EMAIL_PASS exists:", !!process.env.EMAIL_PASS)
      return NextResponse.json({ error: "Email service not configured properly" }, { status: 500 })
    }

    console.log("Email configuration check:")
    console.log("EMAIL_USER:", process.env.EMAIL_USER)
    console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length)

    // Try multiple transporter configurations
    let transporter
    let transporterType = "unknown"

    try {
      // First try: Standard Gmail configuration
      transporterType = "gmail-standard"
      transporter = nodemailer.createTransporter({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })

      console.log(`Attempting with ${transporterType}`)
      await transporter.verify()
      console.log(`${transporterType} verification successful`)
    } catch (error1) {
      console.error(`${transporterType} failed:`, error1)

      try {
        // Second try: Explicit SMTP configuration
        transporterType = "smtp-explicit"
        transporter = nodemailer.createTransporter({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
          tls: {
            rejectUnauthorized: false,
          },
        })

        console.log(`Attempting with ${transporterType}`)
        await transporter.verify()
        console.log(`${transporterType} verification successful`)
      } catch (error2) {
        console.error(`${transporterType} failed:`, error2)

        try {
          // Third try: Port 465 with SSL
          transporterType = "smtp-ssl"
          transporter = nodemailer.createTransporter({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          })

          console.log(`Attempting with ${transporterType}`)
          await transporter.verify()
          console.log(`${transporterType} verification successful`)
        } catch (error3) {
          console.error(`${transporterType} failed:`, error3)

          // All transporter attempts failed
          return NextResponse.json(
            {
              error: "All email configurations failed",
              details: {
                gmail: error1 instanceof Error ? error1.message : "Unknown error",
                smtp: error2 instanceof Error ? error2.message : "Unknown error",
                ssl: error3 instanceof Error ? error3.message : "Unknown error",
              },
            },
            { status: 500 },
          )
        }
      }
    }

    console.log(`Using transporter: ${transporterType}`)

    // Email to yourself (notification)
    const notificationMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
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
    This email was sent from your portfolio contact form using ${transporterType}.
  </p>
</div>
      `,
    }

    console.log("Sending notification email...")
    try {
      const notificationResult = await transporter.sendMail(notificationMailOptions)
      console.log("Notification email sent successfully:", notificationResult.messageId)
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError)
      throw new Error(
        `Notification email failed: ${emailError instanceof Error ? emailError.message : "Unknown error"}`,
      )
    }

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

      try {
        const confirmationResult = await transporter.sendMail(confirmationMailOptions)
        console.log("Confirmation email sent successfully:", confirmationResult.messageId)
      } catch (confirmationError) {
        console.error("Failed to send confirmation email:", confirmationError)
        // Don't fail the entire request if confirmation email fails
        console.log("Continuing despite confirmation email failure...")
      }
    }

    return NextResponse.json({
      success: true,
      confirmationSent: sendConfirmation,
      transporterUsed: transporterType,
    })
  } catch (error) {
    console.error("=== DETAILED ERROR INFORMATION ===")
    console.error("Error type:", typeof error)
    console.error("Error constructor:", error?.constructor?.name)
    console.error("Error message:", error instanceof Error ? error.message : String(error))
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace")

    if (error && typeof error === "object") {
      console.error("Error properties:", Object.keys(error))
      console.error("Full error object:", JSON.stringify(error, null, 2))
    }

    // Return a more specific error message
    let errorMessage = "Failed to send email"
    let errorDetails = "Unknown error occurred"

    if (error instanceof Error) {
      errorDetails = error.message

      // Check for common Gmail/SMTP errors
      if (error.message.includes("Invalid login")) {
        errorMessage = "Email authentication failed"
        errorDetails =
          "Please check your Gmail app password. Make sure you're using an App Password, not your regular Gmail password."
      } else if (error.message.includes("Less secure app")) {
        errorMessage = "Gmail security issue"
        errorDetails = "Please enable 2-factor authentication and use an App Password."
      } else if (error.message.includes("ECONNREFUSED")) {
        errorMessage = "Connection refused"
        errorDetails = "Unable to connect to Gmail SMTP server. Check your internet connection."
      } else if (error.message.includes("ETIMEDOUT")) {
        errorMessage = "Connection timeout"
        errorDetails = "Connection to Gmail SMTP server timed out."
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: errorDetails,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
