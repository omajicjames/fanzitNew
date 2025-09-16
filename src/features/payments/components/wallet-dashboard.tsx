"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card"
import { Button } from "@src/components/ui/button"
import { Input } from "@src/components/ui/input"
import { Label } from "@src/components/ui/label"
import { Badge } from "@src/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs"
import { ScrollArea } from "@src/components/ui/scroll-area"
import {
  Wallet,
  CreditCard,
  TrendingUp,
  Download,
  Upload,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react"

export function WalletDashboard() {
  const [balance] = useState(1247.83)
  const [pendingEarnings] = useState(342.5)

  const transactions = [
    {
      id: 1,
      type: "earning",
      description: "Subscription payment from Mike Johnson",
      amount: 19.99,
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: 2,
      type: "earning",
      description: "Pay-per-view purchase - Workout Video",
      amount: 4.99,
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: 3,
      type: "withdrawal",
      description: "Bank transfer to ****1234",
      amount: -500.0,
      date: "2024-01-12",
      status: "completed",
    },
    {
      id: 4,
      type: "earning",
      description: "Subscription payment from Emma Davis",
      amount: 9.99,
      date: "2024-01-10",
      status: "pending",
    },
  ]

  const subscriptions = [
    {
      id: 1,
      subscriber: "Mike Johnson",
      tier: "Premium",
      amount: 19.99,
      nextBilling: "2024-02-15",
      status: "active",
    },
    {
      id: 2,
      subscriber: "Emma Davis",
      tier: "Basic",
      amount: 9.99,
      nextBilling: "2024-02-10",
      status: "active",
    },
    {
      id: 3,
      subscriber: "Alex Chen",
      tier: "VIP",
      amount: 49.99,
      nextBilling: "2024-02-08",
      status: "active",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Wallet & Earnings</h1>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${balance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Ready for withdrawal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Earnings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">${pendingEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Processing (3-5 days)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">$892.45</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transactions and Subscriptions */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
              <TabsTrigger value="subscriptions">Active Subscriptions</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {transactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`p-2 rounded-full ${
                                transaction.type === "earning"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {transaction.type === "earning" ? (
                                <ArrowDownLeft className="h-4 w-4" />
                              ) : (
                                <ArrowUpRight className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-muted-foreground">{transaction.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p
                              className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                            </p>
                            <Badge
                              variant={transaction.status === "completed" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscriptions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Subscriptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subscriptions.map((subscription) => (
                      <div key={subscription.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{subscription.subscriber}</p>
                          <p className="text-sm text-muted-foreground">{subscription.tier} Tier</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">${subscription.amount}/month</p>
                          <p className="text-xs text-muted-foreground">Next: {subscription.nextBilling}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Withdrawal and Settings */}
        <div className="space-y-6">
          {/* Quick Withdrawal */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Withdrawal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="amount" type="number" placeholder="0.00" className="pl-10" max={balance} />
                </div>
                <p className="text-xs text-muted-foreground">Available: ${balance.toFixed(2)}</p>
              </div>

              <div className="space-y-2">
                <Label>Withdrawal Method</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-4 w-4" />
                      <div>
                        <p className="font-medium">Bank Account</p>
                        <p className="text-sm text-muted-foreground">****1234</p>
                      </div>
                    </div>
                    <Badge variant="outline">Primary</Badge>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Withdraw Funds
              </Button>

              <p className="text-xs text-muted-foreground text-center">Withdrawals typically take 3-5 business days</p>
            </CardContent>
          </Card>

          {/* Earnings Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Earnings Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Subscriptions</span>
                  <span className="font-semibold">$1,247.83</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pay-per-view</span>
                  <span className="font-semibold">$342.50</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tips & Gifts</span>
                  <span className="font-semibold">$89.20</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between font-semibold">
                    <span>Total Earnings</span>
                    <span className="text-primary">$1,679.53</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Payment Methods
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Auto-withdrawal Settings
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Tax Documents
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
