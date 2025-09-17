"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@src/components/ui/card"
import { Button } from "@src/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@src/components/ui/avatar"
import { Badge } from "@src/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs"
import { Crown, Heart, MessageCircle, Share, Play, Lock, Calendar, MapPin, LinkIcon, Star, Gift, ChevronUp, ChevronDown, Bell, BellRing } from "lucide-react"
import LockedBranch from "@src/features/paywall/LockedBranch"

interface CreatorProfileProps {
  creatorId: string
}

export function CreatorProfile({ creatorId }: CreatorProfileProps) {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isBioExpanded, setIsBioExpanded] = useState(false)
  const [isTabsSticky, setIsTabsSticky] = useState(false)

  // ----------------------
  // Scroll Behavior for Compact Profile
  // Location: Tracks scroll position for mini-header and sticky tabs
  // Design: Triggers after compact profile section (~280-320px)
  // ----------------------
  useEffect(() => {
    const handleScroll = () => {
      const compactProfileHeight = 280 // Compact profile height target
      setIsTabsSticky(window.scrollY > compactProfileHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mock creator data
  const creator = {
    id: creatorId,
    name: "Sarah Fitness",
    handle: "@sarahfit",
    avatar: "/fitness-woman-avatar.svg",
    coverImage: "/fitness-workout-banner.svg",
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
      thumbnail: "/fitness-workout-video.svg",
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
    <div className="w-full space-y-0 bg-black">
      {/* ----------------------
      // Slim Gradient Banner Strip
      // Location: Compact hero section - 96-128px desktop, 72px mobile
      // Design: Subtle accent strip with all essential elements layered on top
      // ---------------------- */}
      <div className="relative h-[72px] md:h-[96px] lg:h-[128px] w-full overflow-hidden bg-black">
        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 bg-gradient-radial from-white/8 via-transparent to-transparent" />
        
        {/* Cover Image Overlay */}
        <img
          src={creator.coverImage}
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
        />
        
        {/* Profile Content Container */}
        <div className="relative h-full max-w-7xl mx-auto px-6 z-20">
          <div className="flex items-end justify-between h-full pb-3 z-30">
            
            {/* ----------------------
            // Avatar + Name Block (Left Side)
            // Location: Avatar overlaps bottom edge, name/handle beside it
            // Design: Compact layout with all identity elements grouped
            // ---------------------- */}
            <div className="flex items-end gap-4 z-40">
              {/* Avatar - Overlapping Bottom Edge */}
              <div className="relative z-50">
                {/* Outer Ring - Gold Hairline */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-yellow-400/60 via-yellow-500/40 to-yellow-600/60 shadow-lg" />
                
                {/* Inner Ring - Neutral */}
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 shadow-md" />
                
                {/* Avatar */}
                <Avatar className="h-16 w-16 md:h-20 md:w-20 relative z-10 border-2 border-black">
                  <AvatarImage src={creator.avatar} alt={creator.name} />
                  <AvatarFallback className="text-lg font-semibold">{creator.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              
              {/* Name + Handle + Badge */}
              <div className="flex flex-col justify-end pb-1 z-40">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg md:text-xl font-bold text-white drop-shadow-sm">{creator.name}</h1>
                  <Crown className="h-4 w-4 text-yellow-400 drop-shadow-sm" />
                </div>
                <p className="text-sm text-white/80 drop-shadow-sm">{creator.handle}</p>
              </div>
            </div>
            
            {/* ----------------------
            // Subscribe Button (Right Side)
            // Location: Right side of banner for instant CTA visibility
            // Design: Ultra-modern subscribe button with glassmorphism, advanced animations, and premium styling
            // ---------------------- */}
            <Button 
              className={`
                relative overflow-hidden group z-40
                ${isSubscribed 
                  ? 'bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 hover:from-emerald-500 hover:via-green-600 hover:to-teal-700' 
                  : 'bg-gradient-to-br from-primary/80 via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary'
                } 
                text-white font-semibold px-8 py-3 
                shadow-2xl hover:shadow-3xl 
                transition-all duration-300 ease-out
                transform hover:scale-110 hover:-translate-y-1 active:scale-95 active:translate-y-0
                border-0 rounded-2xl flex items-center gap-3
                backdrop-blur-sm bg-opacity-90
                before:absolute before:inset-0 before:bg-gradient-to-r 
                ${isSubscribed 
                  ? 'before:from-white/20 before:via-transparent before:to-white/10' 
                  : 'before:from-white/25 before:via-transparent before:to-white/15'
                }
                before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/10 after:to-transparent
                ring-2 ring-white/20 hover:ring-white/40
              `}
              onClick={() => setIsSubscribed(!isSubscribed)}
            >
              <div className="relative z-10 flex items-center gap-3">
                {isSubscribed ? (
                  <>
                    <div className="relative">
                      <BellRing className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                    </div>
                    <span className="text-sm font-bold tracking-wide">Subscribed</span>
                  </>
                ) : (
                  <>
                    <Bell className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                    <span className="text-sm font-bold tracking-wide">Subscribe</span>
                  </>
                )}
              </div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
            </Button>
          </div>
        </div>
      </div>

      {/* ----------------------
      // Inline Stats Pills
      // Location: Directly under banner for compact vertical rhythm
      // Design: Inline format - "342 Posts · 12.5K Followers · 89.2K Following"
      // ---------------------- */}
      <div className="px-6 pt-4 pb-3 relative z-20">
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <span className="font-medium text-white">{creator.stats.posts}</span>
          <span>Posts</span>
          <span className="mx-2 text-gray-500">·</span>
          <span className="font-medium text-white">{(creator.stats.subscribers / 1000).toFixed(1)}K</span>
          <span>Followers</span>
          <span className="mx-2 text-gray-500">·</span>
          <span className="font-medium text-white">{(creator.stats.likes / 1000).toFixed(1)}K</span>
          <span>Following</span>
        </div>
      </div>

      {/* ----------------------
      // Tight Bio Clamp
      // Location: Directly under inline stats for efficient vertical rhythm
      // Design: 2-line clamp with smooth expand, positioned for content flow
      // ---------------------- */}
      <div className="px-6 pb-4 relative z-20">
        <div className="relative">
          {/* Main Bio - Utility Information */}
          <div className={`text-white leading-relaxed transition-all duration-200 ease-in-out ${
            isBioExpanded ? '' : 'line-clamp-2'
          }`}>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1.5">
                <LinkIcon className="h-3.5 w-3.5" />
                <a href={creator.website} className="text-primary hover:underline text-sm">
                  {creator.website?.replace('https://', '')}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <span className="text-sm">{creator.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span className="text-sm">Joined {creator.joinedDate}</span>
              </div>
            </div>
          </div>
          {!isBioExpanded && (
            <button
              onClick={() => setIsBioExpanded(true)}
              className="text-sm text-primary hover:text-primary/80 font-medium mt-1 transition-colors duration-150"
            >
              More
            </button>
          )}
        </div>
        
        {isBioExpanded && (
          <div className="mt-3 space-y-3 animate-in slide-in-from-top-2 duration-200">
            {/* Expanded Bio - Personal Description */}
            <p className="text-white leading-relaxed">
              Certified personal trainer helping you achieve your fitness goals. Join me for daily workouts, nutrition tips, and wellness content.
            </p>
            <button
              onClick={() => setIsBioExpanded(false)}
              className="text-sm text-gray-400 hover:text-white font-medium transition-colors duration-150"
            >
              Show less
            </button>
          </div>
        )}
      </div>



      {/* ----------------------
      // Content Anchor Tabs
      // Location: Immediately under bio for strong "content starts here" anchor
      // Design: Clean tabs with sticky behavior, positioned for optimal content flow
      // ---------------------- */}
      <Tabs defaultValue="posts" className="w-full">
        <div className={`transition-all duration-200 ease-in-out ${
          isTabsSticky 
            ? 'fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-border/50' 
            : 'relative border-t border-border/20 z-20'
        }`}>
          <div className="max-w-7xl mx-auto px-6">
            <TabsList className="grid w-full grid-cols-4 bg-transparent border-0 p-0 h-auto gap-0">
              <TabsTrigger 
                 value="posts" 
                 className="relative px-4 py-3 text-sm font-medium text-gray-400 hover:text-white data-[state=active]:text-white data-[state=active]:bg-transparent border-0 rounded-none transition-colors duration-150 data-[state=active]:shadow-none group"
               >
                 <span className="relative z-10">Posts</span>
                 <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-150" />
               </TabsTrigger>
              <TabsTrigger 
                 value="about" 
                 className="relative px-4 py-3 text-sm font-medium text-gray-400 hover:text-white data-[state=active]:text-white data-[state=active]:bg-transparent border-0 rounded-none transition-colors duration-150 data-[state=active]:shadow-none group"
               >
                 <span className="relative z-10">About</span>
                 <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-150" />
               </TabsTrigger>
              <TabsTrigger 
                 value="tiers" 
                 className="relative px-4 py-3 text-sm font-medium text-gray-400 hover:text-white data-[state=active]:text-white data-[state=active]:bg-transparent border-0 rounded-none transition-colors duration-150 data-[state=active]:shadow-none group"
               >
                 <span className="relative z-10">Subscriptions</span>
                 <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-150" />
               </TabsTrigger>
              <TabsTrigger 
                 value="reviews" 
                 className="relative px-4 py-3 text-sm font-medium text-gray-400 hover:text-white data-[state=active]:text-white data-[state=active]:bg-transparent border-0 rounded-none transition-colors duration-150 data-[state=active]:shadow-none group"
               >
                 <span className="relative z-10">Reviews</span>
                 <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-150" />
               </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="posts" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article key={post.id} className="rounded-2xl border border-border/50 bg-black overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative overflow-hidden z-0 h-48">
                  {post.isLocked ? (
                    <LockedBranch
                      postId={String(post.id)}
                      title={post.title}
                      priceCents={parseFloat(post.price?.replace('$', '') || '2.99') * 100}
                      previewUrl={post.thumbnail || "/placeholder.svg"}
                      openPricingPlansModal={() => console.log('Open pricing modal')}
                      author={{ name: creator.name, avatar: creator.avatar, username: creator.handle }}
                      createdAt={post.timestamp}
                      requiredTier="premium"
                      className="absolute inset-0"
                    />
                  ) : (
                    <>
                      <img
                        src={post.thumbnail || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover z-0"
                      />

                      {/* Hover Overlay - Only for unlocked content */}
                      <div className="absolute inset-0 bg-black/20 invisible group-hover:visible transition-all z-0" />

                      {/* Play Button */}
                      {post.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center invisible group-hover:visible transition-all z-10">
                          <Button size="lg" className="rounded-full">
                            <Play className="h-6 w-6 ml-1" />
                          </Button>
                        </div>
                      )}

                      {/* Duration - Only for unlocked videos */}
                      {post.type === "video" && post.duration && (
                        <Badge className="absolute bottom-2 right-2 bg-black/30 text-white z-10">{post.duration}</Badge>
                      )}
                    </>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-white line-clamp-2">{post.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{post.timestamp}</span>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          <Card className="bg-black">
            <CardHeader>
              <h3 className="text-xl font-semibold">About {creator.name}</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400">{creator.bio}</p>
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
                <ul className="list-disc list-inside text-gray-400 space-y-1">
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
              <Card key={tier.id} className="relative bg-black">
                {tier.id === "premium" && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">Most Popular</Badge>
                )}
                <CardHeader className="text-center">
                  <h3 className="text-xl font-semibold">{tier.name}</h3>
                  <div className="text-3xl font-bold text-primary">
                    ${tier.price}
                    <span className="text-sm text-gray-400 font-normal">/month</span>
                  </div>
                  <p className="text-gray-400">{tier.description}</p>
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
              <Card key={index} className="bg-black">
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
                        <span className="text-sm text-gray-400">{review.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "text-yellow-400 fill-current" : "text-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-400 mt-2">{review.comment}</p>
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
