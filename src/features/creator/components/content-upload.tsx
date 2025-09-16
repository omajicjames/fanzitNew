"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card"
import { Button } from "@src/components/ui/button"
import { Input } from "@src/components/ui/input"
import { Label } from "@src/components/ui/label"
import { Textarea } from "@src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select"
import { Switch } from "@src/components/ui/switch"
import { Progress } from "@src/components/ui/progress"
import { Upload, X, ImageIcon, Video, FileText, Eye, Calendar, DollarSign } from "lucide-react"

export function ContentUpload() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [contentType, setContentType] = useState<"image" | "video" | "text">("image")
  const [isPremium, setIsPremium] = useState(false)
  const [isScheduled, setIsScheduled] = useState(false)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (file.type.startsWith("video/")) return <Video className="h-4 w-4" />
    return <FileText className="h-4 w-4" />
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Upload Content</h1>
        <Button variant="outline">
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Upload Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Media Upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload your content</h3>
                <p className="text-muted-foreground mb-4">Drag and drop files here, or click to browse</p>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Choose Files
                  </label>
                </Button>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Selected Files</h4>
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getFileIcon(file)}
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uploading...</span>
                    <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Content Details */}
          <Card>
            <CardHeader>
              <CardTitle>Content Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter content title..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your content..." rows={4} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="fitness, workout, health (comma separated)" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="nutrition">Nutrition</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-6">
          {/* Publishing Options */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Premium Content</Label>
                  <p className="text-sm text-muted-foreground">Require subscription to view</p>
                </div>
                <Switch checked={isPremium} onCheckedChange={setIsPremium} />
              </div>

              {isPremium && (
                <div className="space-y-2">
                  <Label htmlFor="price">Pay-per-view Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="price" type="number" placeholder="0.00" className="pl-10" step="0.01" />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Schedule Post</Label>
                  <p className="text-sm text-muted-foreground">Publish at a specific time</p>
                </div>
                <Switch checked={isScheduled} onCheckedChange={setIsScheduled} />
              </div>

              {isScheduled && (
                <div className="space-y-2">
                  <Label htmlFor="schedule">Publish Date & Time</Label>
                  <Input id="schedule" type="datetime-local" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Content Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">342</p>
                <p className="text-sm text-muted-foreground">Total Posts</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-lg font-semibold text-foreground">89.2K</p>
                  <p className="text-xs text-muted-foreground">Total Views</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">12.5K</p>
                  <p className="text-xs text-muted-foreground">Total Likes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule for Later
              </Button>
              <Button className="w-full" onClick={handleUpload} disabled={isUploading || selectedFiles.length === 0}>
                {isUploading ? "Publishing..." : "Publish Now"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
