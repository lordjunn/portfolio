"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

export default function Contact() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    sendConfirmation: true, // Default to checked
    website: "", // Honeypot field - bots will fill this
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, sendConfirmation: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      toast({
        title: "Message sent!",
        description: formData.sendConfirmation
          ? "Thanks for reaching out. I'll get back to you soon. You'll also receive a confirmation email shortly."
          : "Thanks for reaching out. I'll get back to you soon.",
      })

      // Reset form
      setFormData({ name: "", email: "", message: "", sendConfirmation: true, website: "" })
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16">
      <h2 className="text-3xl font-bold mb-8">Contact.</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-lg mb-4">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <p className="text-lg">Feel free to reach out using the contact form or through my social media profiles.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Textarea
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Honeypot field - hidden from humans, visible to bots */}
          <div className="honeypot">
            <label htmlFor="website">Website (leave blank)</label>
            <Input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              disabled={isSubmitting}
            />
          </div>

          {/* Confirmation Email Opt-in */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sendConfirmation"
              checked={formData.sendConfirmation}
              onCheckedChange={handleCheckboxChange}
              disabled={isSubmitting}
            />
            <label
              htmlFor="sendConfirmation"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Send me a confirmation email with a copy of my message
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  )
}
