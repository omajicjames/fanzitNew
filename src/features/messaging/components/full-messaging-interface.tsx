"use client"

import { useState } from "react"
import { Button } from "@src/components/ui/button"
import { Input } from "@src/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@src/components/ui/avatar"
import { Badge } from "@src/components/ui/badge"
import { ScrollArea } from "@src/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@src/components/ui/dialog"
import { Textarea } from "@src/components/ui/textarea"
import {
  Search,
  MessageCircle,
  Phone,
  Video,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  ImageIcon,
  Gift,
  Pin,
  Users,
  Crown,
} from "lucide-react"

export function FullMessagingInterface() {
  const [selectedConversation, setSelectedConversation] = useState("1")
  const [messageText, setMessageText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const conversations = [
    {
      id: "1",
      type: "individual",
      participant: {
        name: "Sarah Fitness",
        avatar: "/fitness-woman.png",
        online: true,
        isCreator: true,
        tier: "VIP",
      },
      lastMessage: "Thanks for subscribing! 💪 I have a special workout video dropping tomorrow!",
      timestamp: "2m",
      unread: 2,
      isPinned: true,
    },
    {
      id: "2",
      type: "individual",
      participant: {
        name: "Chef Marco",
        avatar: "/chef-cooking.png",
        online: false,
        isCreator: true,
        tier: "Premium",
      },
      lastMessage: "New recipe coming tomorrow! It's going to be amazing 🍝",
      timestamp: "1h",
      unread: 0,
      isPinned: false,
    },
    {
      id: "3",
      type: "individual",
      participant: {
        name: "Art by Luna",
        avatar: "/artist-painting.png",
        online: true,
        isCreator: true,
        tier: "Basic",
      },
      lastMessage: "What do you think of the new piece? I'd love your feedback!",
      timestamp: "3h",
      unread: 1,
      isPinned: false,
    },
    {
      id: "4",
      type: "group",
      name: "VIP Fitness Group",
      avatar: "/fitness-workout-video.png",
      participants: 12,
      lastMessage: "Mike: Great workout today everyone!",
      timestamp: "5h",
      unread: 3,
      isPinned: false,
    },
  ]

  const messages = [
    {
      id: "1",
      senderId: "sarah",
      senderName: "Sarah Fitness",
      content: "Hey! Thanks so much for subscribing to my premium content! 🎉",
      timestamp: "2:30 PM",
      type: "text",
      isCreator: true,
    },
    {
      id: "2",
      senderId: "user",
      senderName: "You",
      content: "Love your workouts! Can't wait to see more content.",
      timestamp: "2:32 PM",
      type: "text",
      isCreator: false,
    },
    {
      id: "3",
      senderId: "sarah",
      senderName: "Sarah Fitness",
      content:
        "Thanks for subscribing! 💪 I have a special workout video dropping tomorrow just for premium subscribers!",
      timestamp: "2:35 PM",
      type: "text",
      isCreator: true,
    },
    {
      id: "4",
      senderId: "sarah",
      senderName: "Sarah Fitness",
      content: "/fitness-workout-video.png",
      timestamp: "2:36 PM",
      type: "image",
      isCreator: true,
    },
    {
      id: "5",
      senderId: "user",
      senderName: "You",
      content: "This looks amazing! When will it be available?",
      timestamp: "2:38 PM",
      type: "text",
      isCreator: false,
    },
  ]

  const currentConversation = conversations.find((conv) => conv.id === selectedConversation)

  const filteredConversations = conversations.filter((conv) =>
    searchQuery
      ? (conv.type === "individual" ? conv.participant?.name : conv.name)
          ?.toLowerCase()
          ?.includes(searchQuery.toLowerCase())
      : true,
  )

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Add message logic here
      setMessageText("")
    }
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-foreground">Messages</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Message</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Search creators..." />
                  <Textarea placeholder="Write your message..." />
                  <Button className="w-full">Send Message</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Conversation Tabs */}
        <Tabs defaultValue="all" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-4 mt-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="flex-1 mt-2">
            <ScrollArea className="h-full">
              <div className="p-2">
                {filteredConversations.map((conversation) => (
                  <Button
                    key={conversation.id}
                    variant="ghost"
                    className={`w-full justify-start p-3 h-auto mb-1 ${
                      selectedConversation === conversation.id ? "bg-accent" : "hover:bg-accent"
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={
                              conversation.type === "individual"
                                ? conversation.participant?.avatar || "/placeholder.svg"
                                : conversation.avatar || "/placeholder.svg"
                            }
                            alt={conversation.type === "individual" ? conversation.participant?.name : conversation.name}
                          />
                          <AvatarFallback>
                            {conversation.type === "individual"
                              ? conversation.participant?.name
                                  ?.split(" ")
                                  ?.map((n) => n[0])
                                  ?.join("") || "?"
                              : conversation.name
                                  ?.split(" ")
                                  ?.map((n) => n[0])
                                  ?.join("") || "?"}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.type === "individual" && conversation.participant?.online && (
                          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                        )}
                        {conversation.type === "group" && (
                          <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                            <Users className="h-3 w-3 text-primary-foreground" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-foreground truncate">
                              {conversation.type === "individual" ? conversation.participant?.name : conversation.name}
                            </p>
                            {conversation.type === "individual" && conversation.participant?.isCreator && (
                              <Crown className="h-3 w-3 text-primary" />
                            )}
                            {conversation.isPinned && <Pin className="h-3 w-3 text-muted-foreground" />}
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                          {conversation.unread > 0 && (
                            <Badge variant="default" className="text-xs min-w-[20px] h-5">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        {conversation.type === "individual" && conversation.participant?.tier && (
                          <Badge variant="outline" className="text-xs mt-1">
                            {conversation.participant?.tier}
                          </Badge>
                        )}
                        {conversation.type === "group" && (
                          <p className="text-xs text-muted-foreground">{conversation.participants} members</p>
                        )}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="creators" className="flex-1 mt-2">
            <ScrollArea className="h-full">
              <div className="p-2">
                {filteredConversations
                  .filter((conv) => conv.type === "individual" && conv.participant?.isCreator)
                  .map((conversation) => (
                    <Button
                      key={conversation.id}
                      variant="ghost"
                      className={`w-full justify-start p-3 h-auto mb-1 ${
                        selectedConversation === conversation.id ? "bg-accent" : "hover:bg-accent"
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      {/* Same content as above */}
                      <div className="flex items-center space-x-3 w-full">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={conversation.participant?.avatar || "/placeholder.svg"}
                              alt={conversation.participant?.name}
                            />
                            <AvatarFallback>
                              {conversation.participant?.name
                                ?.split(" ")
                                ?.map((n) => n[0])
                                ?.join("") || "?"}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.participant?.online && (
                            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-foreground truncate">
                                {conversation.participant?.name}
                              </p>
                              <Crown className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {conversation.participant?.tier}
                          </Badge>
                        </div>
                      </div>
                    </Button>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="groups" className="flex-1 mt-2">
            <ScrollArea className="h-full">
              <div className="p-2">
                {filteredConversations
                  .filter((conv) => conv.type === "group")
                  .map((conversation) => (
                    <Button
                      key={conversation.id}
                      variant="ghost"
                      className={`w-full justify-start p-3 h-auto mb-1 ${
                        selectedConversation === conversation.id ? "bg-accent" : "hover:bg-accent"
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name || "Group"} />
                            <AvatarFallback>
                              {conversation.name
                                ?.split(" ")
                                ?.map((n) => n[0])
                                ?.join("") || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                            <Users className="h-3 w-3 text-primary-foreground" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-foreground truncate">{conversation.name}</p>
                            <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                          <p className="text-xs text-muted-foreground">{conversation.participants} members</p>
                        </div>
                      </div>
                    </Button>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={
                        currentConversation.type === "individual"
                          ? currentConversation.participant?.avatar || "/placeholder.svg"
                          : currentConversation.avatar || "/placeholder.svg"
                      }
                      alt={
                        currentConversation.type === "individual"
                          ? currentConversation.participant?.name
                          : currentConversation.name
                      }
                    />
                    <AvatarFallback>
                      {currentConversation.type === "individual"
                        ? currentConversation.participant?.name
                            ?.split(" ")
                            ?.map((n) => n[0])
                            ?.join("") || "?"
                        : currentConversation.name
                            ?.split(" ")
                            ?.map((n) => n[0])
                            ?.join("") || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-foreground">
                        {currentConversation.type === "individual"
                          ? currentConversation.participant?.name
                          : currentConversation.name}
                      </h3>
                      {currentConversation.type === "individual" && currentConversation.participant?.isCreator && (
                        <Crown className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {currentConversation.type === "individual"
                        ? currentConversation.participant?.online
                          ? "Online"
                          : "Last seen 2h ago"
                        : `${currentConversation.participants} members`}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Gift className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isCreator ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[70%] ${message.isCreator ? "order-2" : "order-1"}`}>
                      {message.isCreator && (
                        <div className="flex items-center space-x-2 mb-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/fitness-woman.png" alt="Sarah Fitness" />
                            <AvatarFallback>SF</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{message.senderName}</span>
                        </div>
                      )}
                      <div
                        className={`p-3 rounded-lg ${
                          message.isCreator ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {message.type === "text" ? (
                          <p className="text-sm">{message.content}</p>
                        ) : message.type === "image" ? (
                          <div className="space-y-2">
                            <img
                              src={message.content || "/placeholder.svg"}
                              alt="Shared image"
                              className="rounded-lg max-w-full h-auto"
                            />
                          </div>
                        ) : null}
                        <p
                          className={`text-xs mt-2 ${
                            message.isCreator ? "text-muted-foreground" : "text-primary-foreground/70"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-end space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="resize-none"
                  />
                </div>
                <Button variant="ghost" size="sm">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={handleSendMessage} disabled={!messageText.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
