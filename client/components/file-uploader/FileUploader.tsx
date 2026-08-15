"use client";

import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  RenderState,
  RenderErrorState,
  RenderUploadedState,
} from "./RenderState";
import { useCallback, useEffect, useState } from "react";
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
  objectUrl?: string | undefined;
}

interface FileMetadata {
  originalName: string;
  contentType: string;
  size: number;
}

interface FileUploaderProps {
  onFileChange: (metadata: FileMetadata) => void;
}

const FileUploader = ({ onFileChange }: FileUploaderProps) => {
  const [fileState, setFileState] = useState<UploaderState>({
    file: null,
    fileType: "image",
    id: null,
    objectUrl: undefined,
    progress: 0,
    error: false,
    uploading: false,
    isDeleting: false,
  });

  // Drop and Pre-view
  const onDrop = useCallback(
    (acceptFiles: File[]) => {
      if (acceptFiles.length > 0) {
        const file = acceptFiles[0];
        console.log(file);
        console.log({
          originalName: file.name,
          contentType: file.type,
          size: file.size,
        });

        // Reset client state and add new file info to state
        setFileState({
          file: file,
          fileType: "image",
          id: "default",
          progress: 0,
          uploading: false,
          isDeleting: false,
          error: false,
        });

        onFileChange({
          originalName: file.name,
          contentType: file.type,
          size: file.size,
        });
      }
    },
    [onFileChange],
  );

  // Error Handling
  function rejectedFile(filRejection: FileRejection[]) {
    if (filRejection.length) {
      filRejection?.forEach((rejection) => {
        toast.error(rejection?.errors[0]?.message);
      });
      // Reset and error: true
      setFileState({
        file: null,
        fileType: "image",
        id: "ff",
        objectUrl: undefined,
        progress: 0,
        uploading: false,
        isDeleting: false,
        error: true,
      });
    }
  }

  // Drag'n'Drop Functionatlity
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5mb calculation
    // Handle different errors
    onDropRejected: rejectedFile,
    disabled: fileState.objectUrl || fileState.file,
  });

  // Prevent memory leak
  useEffect(() => {
    if (!fileState.file) return;

    const url = URL.createObjectURL(fileState.file);
    setFileState((prev) => ({ ...prev, objectUrl: url }));

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [fileState.file]);

  useEffect(() => {
    console.log(fileState);
  }, [fileState]);
  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64 cursor-pointer",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary",
      )}
    >
      <CardContent className="flex items-center justify-center w-full h-full p-4">
        <input {...getInputProps()} />

        {fileState.error ? (
          <RenderErrorState />
        ) : fileState.file === null ? (
          <RenderState isDragActive={isDragActive} />
        ) : (
          <RenderUploadedState
            previewUrl={fileState.objectUrl}
            setFileState={setFileState}
        onFileChange={onFileChange}          />
        )}
      </CardContent>
    </Card>
  );
};
export default FileUploader;
