"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Lock, Crown } from "lucide-react"

interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  creator: {
    name: string
    avatar: string
    subscriptionTiers: Array<{
      id: string
      name: string
      price: number
      description: string
      features: string[]
    }>
  }
}

export function SubscriptionModal({ isOpen, onClose, creator }: SubscriptionModalProps) {
  const [selectedTier, setSelectedTier] = useState(creator.subscriptionTiers[1]?.id || "")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [isProcessing, setIsProcessing] = useState(false)

  const selectedTierData = creator.subscriptionTiers.find((tier) => tier.id === selectedTier)
  const yearlyDiscount = 0.2 // 20% discount for yearly
  const finalPrice = selectedTierData
    ? billingCycle === "yearly"
      ? selectedTierData.price * 12 * (1 - yearlyDiscount)
      : selectedTierData.price
    : 0

  const handleSubscribe = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsProcessing(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Crown className="h-5 w-5 text-primary" />
            <span>Subscribe to {creator.name}</span>
          </DialogTitle>
          <DialogDescription>Choose your subscription tier and start enjoying exclusive content</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tier Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Choose Your Tier</h3>
            <RadioGroup value={selectedTier} onValueChange={setSelectedTier}>
              {creator.subscriptionTiers.map((tier) => (
                <div key={tier.id} className="relative">
                  <RadioGroupItem value={tier.id} id={tier.id} className="sr-only" />
                  <Label
                    htmlFor={tier.id}
                    className={`block cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                      selectedTier === tier.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{tier.name}</h4>
                          {tier.id === "premium" && (
                            <Badge variant="secondary" className="text-xs">
                              Most Popular
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {tier.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {tier.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{tier.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          $
                          {billingCycle === "yearly" ? (tier.price * 12 * (1 - yearlyDiscount)).toFixed(0) : tier.price}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          /{billingCycle === "yearly" ? "year" : "month"}
                        </div>
                        {billingCycle === "yearly" && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            Save 20%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Billing Cycle */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Billing Cycle</h3>
            <RadioGroup value={billingCycle} onValueChange={(value) => setBillingCycle(value as "monthly" | "yearly")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span>Monthly</span>
                    <span className="text-muted-foreground">Billed monthly</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yearly" id="yearly" />
                <Label htmlFor="yearly" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span>Yearly</span>
                      <Badge variant="secondary" className="text-xs">
                        Save 20%
                      </Badge>
                    </div>
                    <span className="text-muted-foreground">Billed annually</span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
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
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input id="zipCode" placeholder="12345" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>{selectedTierData?.name} Subscription</span>
                <span>${selectedTierData?.price}/month</span>
              </div>
              {billingCycle === "yearly" && (
                <>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Annual billing (12 months)</span>
                    <span>${selectedTierData ? (selectedTierData.price * 12).toFixed(2) : "0.00"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-green-600">
                    <span>Annual discount (20%)</span>
                    <span>
                      -${selectedTierData ? (selectedTierData.price * 12 * yearlyDiscount).toFixed(2) : "0.00"}
                    </span>
                  </div>
                </>
              )}
              <Separator />
              <div className="flex items-center justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${finalPrice.toFixed(2)}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {billingCycle === "yearly" ? "Billed annually" : "Billed monthly"} • Cancel anytime
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted p-3 rounded-lg">
            <Lock className="h-4 w-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSubscribe} disabled={isProcessing} className="flex-1">
              {isProcessing ? "Processing..." : `Subscribe for $${finalPrice.toFixed(2)}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
