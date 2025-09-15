"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, Heart, MessageCircle, Share, Play, Lock, Calendar, MapPin, LinkIcon, Star, Gift } from "lucide-react"

interface CreatorProfileProps {
  creatorId: string
}

export function CreatorProfile({ creatorId }: CreatorProfileProps) {
  const [isSubscribed, setIsSubscribed] = useState(false)

  // Mock creator data
  const creator = {
    id: creatorId,
    name: "Sarah Fitness",
    handle: "@sarahfit",
    avatar: "/fitness-woman.png",
    coverImage: "/fitness-workout-video.png",
    bio: "Certified personal trainer helping you achieve your fitness goals. Join me for daily workouts, nutrition tips, and wellness content.",
    location: "Los Angeles, CA",
    website: "https://sarahfitness.com",
    joinedDate: "January 2023",
    verified: true,
    stats: {
      subscribers: 12500,
      posts: 342,
      likes: 89200,
    },
    subscriptionTiers: [
      {
        id: "basic",
        name: "Basic",
        price: 9.99,
        description: "Access to basic workout videos and nutrition tips",
        features: ["Weekly workout videos", "Basic nutrition guides", "Community access"],
      },
      {
        id: "premium",
        name: "Premium",
        price: 19.99,
        description: "Everything in Basic plus personalized content",
        features: [
          "Daily workout videos",
          "Personalized meal plans",
          "1-on-1 monthly check-ins",
          "Exclusive live streams",
        ],
      },
      {
        id: "vip",
        name: "VIP",
        price: 49.99,
        description: "Ultimate fitness experience with direct access",
        features: [
          "All Premium features",
          "Direct messaging access",
          "Custom workout plans",
          "Weekly video calls",
          "Priority support",
        ],
      },
    ],
  }

  const posts = [
    {
      id: 1,
      type: "video",
      thumbnail: "/fitness-workout-video.png",
      title: "Full Body HIIT Workout",
      duration: "25:30",
      likes: 1247,
      comments: 89,
      isLocked: false,
      timestamp: "2 days ago",
    },
    {
      id: 2,
      type: "image",
      thumbnail: "/gourmet-pasta.png",
      title: "Post-Workout Nutrition Guide",
      likes: 892,
      comments: 156,
      isLocked: true,
      price: "$2.99",
      timestamp: "4 days ago",
    },
    {
      id: 3,
      type: "video",
      thumbnail: "/digital-art-portrait.png",
      title: "Morning Yoga Flow",
      duration: "15:45",
      likes: 634,
      comments: 67,
      isLocked: false,
      timestamp: "1 week ago",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Cover Image */}
      <div className="relative h-64 rounded-lg overflow-hidden">
        <img src={creator.coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="relative -mt-20 px-6">
        <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
            <AvatarFallback className="text-2xl">
              {creator.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 mt-4 md:mt-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-3xl font-bold text-foreground">{creator.name}</h1>
                  {creator.verified && (
                    <Badge variant="secondary" className="text-xs">
                      <Crown className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{creator.handle}</p>
              </div>

              <div className="flex space-x-3 mt-4 md:mt-0">
                <Button
                  variant={isSubscribed ? "outline" : "default"}
                  onClick={() => setIsSubscribed(!isSubscribed)}
                  className="flex-1 md:flex-none"
                >
                  {isSubscribed ? "Subscribed" : "Subscribe"}
                </Button>
                <Button variant="outline" size="icon">
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Gift className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex space-x-6 mt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{creator.stats.subscribers.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Subscribers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{creator.stats.posts}</p>
                <p className="text-sm text-muted-foreground">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{creator.stats.likes.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Likes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio and Info */}
        <div className="mt-6 space-y-4">
          <p className="text-foreground">{creator.bio}</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{creator.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <LinkIcon className="h-4 w-4" />
              <a href={creator.website} className="text-primary hover:underline">
                {creator.website}
              </a>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Joined {creator.joinedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="tiers">Subscription Tiers</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={post.thumbnail || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Play Button */}
                  {post.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="lg" className="rounded-full">
                        <Play className="h-6 w-6 ml-1" />
                      </Button>
                    </div>
                  )}

                  {/* Lock Overlay */}
                  {post.isLocked && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-black/70 text-white">
                        <Lock className="h-3 w-3 mr-1" />
                        {post.price}
                      </Badge>
                    </div>
                  )}

                  {/* Duration */}
                  {post.type === "video" && post.duration && (
                    <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">{post.duration}</Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2">{post.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{post.timestamp}</span>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{post.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{post.comments}</span>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">About {creator.name}</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{creator.bio}</p>
              <div className="space-y-2">
                <h4 className="font-semibold">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {["HIIT Training", "Yoga", "Nutrition", "Weight Loss", "Strength Training"].map((specialty) => (
                    <Badge key={specialty} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Certifications</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>NASM Certified Personal Trainer</li>
                  <li>200-Hour Yoga Teacher Training</li>
                  <li>Precision Nutrition Level 1</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tiers" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creator.subscriptionTiers.map((tier) => (
              <Card key={tier.id} className="relative">
                {tier.id === "premium" && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">Most Popular</Badge>
                )}
                <CardHeader className="text-center">
                  <h3 className="text-xl font-semibold">{tier.name}</h3>
                  <div className="text-3xl font-bold text-primary">
                    ${tier.price}
                    <span className="text-sm text-muted-foreground font-normal">/month</span>
                  </div>
                  <p className="text-muted-foreground">{tier.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={tier.id === "premium" ? "default" : "outline"}>
                    Subscribe to {tier.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-4">
            {[
              {
                user: "Mike Johnson",
                avatar: "/user-profile-illustration.png",
                rating: 5,
                comment: "Sarah's workouts are amazing! I've seen incredible results in just 3 months.",
                date: "2 weeks ago",
              },
              {
                user: "Emma Davis",
                avatar: "/user-profile-illustration.png",
                rating: 5,
                comment: "The nutrition guides are so helpful. Finally found a sustainable approach to eating healthy.",
                date: "1 month ago",
              },
              {
                user: "Alex Chen",
                avatar: "/user-profile-illustration.png",
                rating: 4,
                comment: "Great content overall. Would love to see more beginner-friendly options.",
                date: "1 month ago",
              },
            ].map((review, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                      <AvatarFallback>
                        {review.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{review.user}</h4>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "text-yellow-400 fill-current" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground mt-2">{review.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
