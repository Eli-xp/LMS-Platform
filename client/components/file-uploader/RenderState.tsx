import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

export const RenderState = ({ isDragActive }: { isDragActive: boolean }) => {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
        <CloudUploadIcon
          className={cn(
            "size-6 text-muted-foreground",
            isDragActive && "text-primary",
          )}
        />
      </div>
      <div>
        <p className="text-base font-semibold text-foreground">
          Drop your Files here or{" "}
          <span className="text-primary font-bold cursor-pointer">
            Click Here
          </span>
        </p>
      </div>
    </div>
  );
};

export const RenderErrorState = () => {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/30 mb-4">
        <ImageIcon className={cn("size-6 text-destructive")} />
      </div>{" "}
      <p className="text-base font-semibold">Upload Failed</p>
      <p className="text-xs text-muted-foreground mt-1">Something went wrong</p>
      <p className="text-xl mt-3 text-muted-foreground">
        Click or darg file to retry
      </p>
    </div>
  );
};

export const RenderUploadedState = ({
  previewUrl,
  setFileState,
  onFileChange,
}: {
  previewUrl: string | undefined;
}) => {
  const onClickFunc = (e) => {
    e.stopPropagation();

    console.log("onClickfunc test");
    setFileState({
      file: null,
      fileType: "image",
      id: null,
      objectUrl: undefined,
      progress: 0,
      error: false,
      uploading: false,
      isDeleting: false,
    });

    onFileChange();
  };

  return (
    <div className="relative flex items-center justify-center h-full w-full">
      <Button
        onClick={onClickFunc}
        type="button"
        variant={"destructive"}
        size={"icon"}
        className={cn(
          "absolute top-4 right-4 bg-red-500 hover:bg-red-500/50 z-50 cursor-pointer",
        )}
      >
        <XIcon className="size-4" />
      </Button>
      <Image
        src={previewUrl || "/logo.svg"}
        alt="Uploaded File"
        width={250}
        height={250}
        className="object-contain p-2"
        draggable={false}
        unoptimized
      />
    </div>
  );
};
