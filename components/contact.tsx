"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { contactFormSchema, type ContactFormData } from "@/lib/contact-schema"

export default function Contact() {
  const { toast } = useToast()
  const [formToken, setFormToken] = useState<string>("")

  const fetchSecurityToken = async () => {
    try {
      const res = await fetch("/api/contact")
      const data = await res.json()
      if (data.token) {
        setFormToken(data.token)
      }
    } catch (err) {
      console.error("Failed to load security token", err)
    }
  }

  useEffect(() => {
    fetchSecurityToken()
  }, [])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      sendConfirmation: true,
      website: "",
    },
    mode: "onBlur",
  })

  const sendConfirmation = watch("sendConfirmation")

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, formToken }),
      })

      const resData = await response.json()

      if (!response.ok) {
        throw new Error(resData.error || "Failed to send message")
      }

      toast({
        title: "Message sent!",
        description: data.sendConfirmation
          ? "Thanks for reaching out. I'll get back to you soon. You'll also receive a confirmation email shortly."
          : "Thanks for reaching out. I'll get back to you soon.",
      })

      reset()
      fetchSecurityToken() // Refresh token for subsequent submissions
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      })
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <Input
              placeholder="Your Name"
              {...register("name")}
              disabled={isSubmitting}
              className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Input
              type="email"
              placeholder="Your Email"
              {...register("email")}
              disabled={isSubmitting}
              className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Textarea
              placeholder="Your Message"
              {...register("message")}
              rows={5}
              disabled={isSubmitting}
              className={errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>

          {/* Honeypot field - hidden from humans, visible to bots */}
          <div className="honeypot" style={{ display: "none" }}>
            <label htmlFor="website">Website (leave blank)</label>
            <Input
              type="text"
              id="website"
              {...register("website")}
              tabIndex={-1}
              autoComplete="off"
              disabled={isSubmitting}
            />
          </div>

          {/* Confirmation Email Opt-in */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sendConfirmation"
              checked={sendConfirmation}
              onCheckedChange={(checked) => setValue("sendConfirmation", Boolean(checked))}
              disabled={isSubmitting}
            />
            <label
              htmlFor="sendConfirmation"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Send me a confirmation email with a copy of my message
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>

          {/* PDPA consent notice */}
          <p className="text-xs text-muted-foreground text-center">
            By submitting this form, your name and email will be used solely to respond to your message.{" "}
            <a href="/privacy" className="underline underline-offset-2 hover:text-foreground transition-colors">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>
    </section>
  )
}
