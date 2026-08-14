"use client"

import React from "react"
import Image from "next/image"
import { Download, FileText } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ResumeModalProps {
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ResumeModal({ children, open, onOpenChange }: ResumeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="max-w-4xl w-[95vw] max-h-[92vh] flex flex-col p-4 sm:p-6 gap-4">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b pr-8">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <DialogTitle className="text-base sm:text-lg font-semibold">Resume Preview</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground hidden sm:block">
                View inline without forcing a download.
              </DialogDescription>
            </div>
          </div>
          <div className="flex items-center gap-2 mr-2">
            <a
              href="/Resume.pdf"
              download="Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "gap-1.5 text-xs sm:text-sm font-medium"
              )}
            >
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </a>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto rounded-lg border bg-muted/20 p-2 sm:p-4 flex justify-center items-start">
          <div className="relative w-full max-w-3xl bg-card shadow-sm rounded border overflow-hidden">
            <Image
              src="/Resume.png"
              alt="Resume Preview"
              width={1200}
              height={1600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
