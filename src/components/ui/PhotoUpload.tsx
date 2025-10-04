import React, { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
// import { useLanguage } from "@/context/LanguageContext"; // Will be used later for translations
import { Camera, Upload, X, RotateCcw, Check } from "lucide-react";
import CustomButton from "./CustomButton";

interface PhotoUploadProps {
  currentPhoto?: string;
  fallbackText?: string;
  size?: "sm" | "md" | "lg" | "xl";
  onPhotoChange?: (photo: string | null) => void;
  editable?: boolean;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  currentPhoto,
  fallbackText = "U",
  size = "lg",
  onPhotoChange,
  editable = true,
}) => {
  // const { t } = useLanguage(); // Not needed for now
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(
    currentPhoto || null
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Size mappings
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      alert("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewPhoto(result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSavePhoto = () => {
    onPhotoChange?.(previewPhoto);
    setIsDialogOpen(false);
  };

  const handleRemovePhoto = () => {
    setPreviewPhoto(null);
  };

  const handleReset = () => {
    setPreviewPhoto(currentPhoto || null);
  };

  const handleCameraClick = () => {
    if (editable) {
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      {/* Avatar with Camera Button */}
      <div className="relative group">
        <Avatar
          className={`${sizeClasses[size]} transition-all duration-300 ${
            editable ? "cursor-pointer hover:opacity-80" : ""
          }`}
        >
          {currentPhoto && (
            <AvatarImage
              src={currentPhoto}
              alt="Profile photo"
              className="object-cover"
            />
          )}
          <AvatarFallback className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-2xl font-bold">
            {fallbackText}
          </AvatarFallback>
        </Avatar>

        {editable && (
          <CustomButton
            size="sm"
            variant="secondary"
            icon={Camera}
            className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 shadow-lg opacity-90 hover:opacity-100 transition-all duration-200"
            onClick={handleCameraClick}
            title="Upload Photo"
          />
        )}
      </div>

      {/* Upload Modal */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="sm:max-w-lg bg-white dark:bg-gray-800 border-0 shadow-2xl">
          <AlertDialogHeader className="text-center pb-2">
            <AlertDialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                <Camera className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              Upload Photo
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400 mt-2">
              Upload a new profile photo. Drag and drop or click to browse.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-6 py-4">
            {/* Preview */}
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-gray-100 dark:border-gray-700 shadow-lg">
                  {previewPhoto && (
                    <AvatarImage
                      src={previewPhoto}
                      alt="Preview"
                      className="object-cover"
                    />
                  )}
                  <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 text-blue-600 dark:text-blue-400 text-3xl font-bold">
                    {fallbackText}
                  </AvatarFallback>
                </Avatar>
                {previewPhoto && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                isDragging
                  ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 scale-[1.02]"
                  : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div
                className={`transition-all duration-300 ${
                  isDragging ? "scale-110" : "scale-100"
                }`}
              >
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-full flex items-center justify-center mb-4">
                  <Upload
                    className={`h-8 w-8 text-blue-600 dark:text-blue-400 transition-transform duration-300 ${
                      isDragging ? "rotate-12" : "rotate-0"
                    }`}
                  />
                </div>
                <p className="text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isDragging
                    ? "Drop your photo here!"
                    : "Drag and drop your photo here, or"}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white dark:bg-gray-800 border-2 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-400 transition-all duration-200"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Browse Files
                </Button>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 font-medium">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            {previewPhoto && (
              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 transition-all duration-200"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemovePhoto}
                  className="flex items-center gap-2 text-red-600 border-red-200 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-300 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                  Remove
                </Button>
              </div>
            )}
          </div>

          <AlertDialogFooter className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <AlertDialogCancel
              onClick={() => setIsDialogOpen(false)}
              className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border-0 h-11 font-medium transition-all duration-200"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSavePhoto}
              disabled={!previewPhoto}
              className={`flex-1 h-11 font-medium transition-all duration-200 ${
                previewPhoto
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              <Check className="w-4 h-4 mr-2" />
              Save Photo
            </AlertDialogAction>
          </AlertDialogFooter>

          {/* Hidden File Input */}
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PhotoUpload;
