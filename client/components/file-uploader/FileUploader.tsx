"use client";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { RenderState, RenderErrorState } from "./RenderState";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number; // upload progres percetage
  isDeleting: boolean;
  error: boolean;
  fileType: "image" | "video";
  key?: string;
  objectUrl?: string;
}

const FileUploader = () => {
  const [fileState, setFileState] = useState<UploaderState>({
    error: false,
    file: null,
    id: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    fileType: "image",
  });

  const onDrop = useCallback((acceptFiles: File[]) => {
    if (acceptFiles.length > 0) {
      const file = acceptFiles[0];
      console.log(file);
      setFileState({
        file:file,
        uploading:false,
        progress:0,
        isDeleting:false,
        error:false,
        fileType:"image",
        objectUrl: URL.createObjectURL(file)
      })
    }
  }, []);

  function rejectedFiled(filRejection: FileRejection[]) {
    if (rejectedFiled.length) {
      filRejection?.find((rejection) =>
        toast.error(rejection?.errors[0]?.message),
      );
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5mb calculation
    // Handle different errors
    onDropRejected: rejectedFiled,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary",
      )}
    >
      <CardContent className="flex items-center justify-center w-full h-full p-4">
        <input {...getInputProps()} />
        <RenderState isDragActive={isDragActive} />
        {/* <RenderErrorState /> */}
        <div></div>
      </CardContent>
    </Card>
  );
};

export default FileUploader;
