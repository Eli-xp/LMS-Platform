import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon } from "lucide-react";

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
