"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@src/components/ui/dialog"
import { Button } from "@src/components/ui/button"
import { Card, CardContent } from "@src/components/ui/card"
import { Input } from "@src/components/ui/input"
import { Label } from "@src/components/ui/label"
import { Separator } from "@src/components/ui/separator"
import { CreditCard, Lock, Play, ImageIcon } from "lucide-react"

interface PayPerViewModalProps {
  isOpen: boolean
  onClose: () => void
  content: {
    id: string
    title: string
    thumbnail: string
    price: number
    type: "image" | "video"
    creator: string
  }
}

export function PayPerViewModal({ isOpen, onClose, content }: PayPerViewModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePurchase = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-primary" />
            <span>Unlock Premium Content</span>
          </DialogTitle>
          <DialogDescription>Purchase this exclusive content to view it instantly</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Content Preview */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="relative overflow-hidden rounded-lg z-0">
                  <img
                    src={content.thumbnail || "/placeholder.svg"}
                    alt={content.title}
                    className="w-16 h-16 object-cover rounded-lg z-0"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center z-0">
                    {content.type === "video" ? (
                      <Play className="h-6 w-6 text-white" />
                    ) : (
                      <ImageIcon className="h-6 w-6 text-white" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold line-clamp-2">{content.title}</h3>
                  <p className="text-sm text-muted-foreground">by {content.creator}</p>
                  <p className="text-lg font-bold text-primary">${content.price}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Content Purchase</span>
              <span>${content.price}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Processing Fee</span>
              <span>$0.30</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${(content.price + 0.3).toFixed(2)}</span>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted p-3 rounded-lg">
            <Lock className="h-4 w-4" />
            <span>Secure one-time payment • Instant access</span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handlePurchase} disabled={isProcessing} className="flex-1">
              {isProcessing ? "Processing..." : `Pay $${(content.price + 0.3).toFixed(2)}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
