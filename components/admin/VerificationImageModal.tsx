"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface VerificationImageModalProps {
  isOpen: boolean
  onClose: () => void
  frontImage: string
  backImage: string
  userName: string
}

export function VerificationImageModal({
  isOpen,
  onClose,
  frontImage,
  backImage,
  userName,
}: VerificationImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-800 text-white border-gray-700">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Xác minh danh tính - {userName}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-300">Mặt trước CCCD</h3>
            <div className="border border-gray-600 rounded-lg overflow-hidden">
              <img
                src={frontImage || "/placeholder.svg"}
                alt="Mặt trước CCCD"
                className="w-full h-auto object-contain bg-gray-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=300&width=400&text=Không thể tải ảnh"
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-300">Mặt sau CCCD</h3>
            <div className="border border-gray-600 rounded-lg overflow-hidden">
              <img
                src={backImage || "/placeholder.svg"}
                alt="Mặt sau CCCD"
                className="w-full h-auto object-contain bg-gray-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=300&width=400&text=Không thể tải ảnh"
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
