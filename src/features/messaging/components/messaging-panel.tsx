"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card"
import { Button } from "@src/components/ui/button"
import { Input } from "@src/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@src/components/ui/avatar"
import { Badge } from "@src/components/ui/badge"
import { ScrollArea } from "@src/components/ui/scroll-area"
import { Search, MessageCircle, Phone, Video, MoreVertical, Send, Paperclip, Smile } from "lucide-react"

export function MessagingPanel() {
  const conversations = [
    {
      id: 1,
      creator: {
        name: "Sarah Fitness",
        avatar: "/fitness-woman.png",
        online: true,
      },
      lastMessage: "Thanks for subscribing! 💪",
      timestamp: "2m",
      unread: 2,
    },
    {
      id: 2,
      creator: {
        name: "Chef Marco",
        avatar: "/chef-cooking.png",
        online: false,
      },
      lastMessage: "New recipe coming tomorrow!",
      timestamp: "1h",
      unread: 0,
    },
    {
      id: 3,
      creator: {
        name: "Art by Luna",
        avatar: "/artist-painting.png",
        online: true,
      },
      lastMessage: "What do you think of the new piece?",
      timestamp: "3h",
      unread: 1,
    },
  ]

  const currentMessages = [
    {
      id: 1,
      sender: "Sarah Fitness",
      content: "Hey! Thanks so much for subscribing to my premium content! 🎉",
      timestamp: "2:30 PM",
      isCreator: true,
    },
    {
      id: 2,
      sender: "You",
      content: "Love your workouts! Can't wait to see more content.",
      timestamp: "2:32 PM",
      isCreator: false,
    },
    {
      id: 3,
      sender: "Sarah Fitness",
      content:
        "Thanks for subscribing! 💪 I have a special workout video dropping tomorrow just for premium subscribers!",
      timestamp: "2:35 PM",
      isCreator: true,
    },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Messages Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-card-foreground">Messages</h3>
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search conversations..." className="pl-10 bg-background" />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-2">
            {conversations.map((conversation) => (
              <Button
                key={conversation.id}
                variant="ghost"
                className="w-full justify-start p-3 h-auto mb-1 hover:bg-accent"
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={conversation.creator.avatar || "/placeholder.svg"}
                        alt={conversation.creator.name}
                      />
                      <AvatarFallback>
                        {conversation.creator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.creator.online && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-card rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-card-foreground truncate">{conversation.creator.name}</p>
                      <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                  </div>

                  {conversation.unread > 0 && (
                    <Badge variant="default" className="text-xs min-w-[20px] h-5">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Active Conversation */}
      <Card className="m-4 flex-shrink-0">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/fitness-woman.png" alt="Sarah Fitness" />
                <AvatarFallback>SF</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm">Sarah Fitness</CardTitle>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Messages */}
          <ScrollArea className="h-48 p-3">
            <div className="space-y-3">
              {currentMessages.map((message) => (
                <div key={message.id} className={`flex ${message.isCreator ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] p-2 rounded-lg text-sm ${
                      message.isCreator ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isCreator ? "text-muted-foreground" : "text-primary-foreground/70"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-3 border-t border-border">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input placeholder="Type a message..." className="flex-1" />
              <Button variant="ghost" size="sm">
                <Smile className="h-4 w-4" />
              </Button>
              <Button size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
