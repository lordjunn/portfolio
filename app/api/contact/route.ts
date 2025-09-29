import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { name, email, message, sendConfirmation, website } = await request.json()

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Honeypot spam protection
    if (website && website.trim() !== "") {
      console.log("Spam detected - honeypot field filled:", website)
      return NextResponse.json({ error: "Spam detected" }, { status: 400 })
    }

    // Create a transporter with simple username/password auth
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

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

    // Send notification email to yourself
    await transporter.sendMail(notificationMailOptions)

    // Send confirmation email to sender if they opted in
    if (sendConfirmation) {
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
      timeZone: "Asia/Kuala_Lumpur",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })} (My timezone, GMT +8)</p>
    <p><strong>Message:</strong></p>
    <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
      ${message.replace(/\n/g, "<br>")}
    </div>
  </div>
  
  <p>I typically respond within 24-48 hours. If your inquiry is urgent, please feel free to reach out through my social media profiles.</p>
  
  <p>Best regards,<br>
  <strong>Lord Junn :)</strong></p>
  
  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  
  <p style="color: #666; font-size: 12px;">
    This is an automated confirmation email.<br>
    If you need to send additional information, please use the contact form on my website again, or this email.<br><br>
    If you did not contact me, someone likely has used your email in my contact form. Feel free to ignore this message.
  </p>
</div>
        `,
      }

      await transporter.sendMail(confirmationMailOptions)
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
