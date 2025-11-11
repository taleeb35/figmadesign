import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface VideoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoUrl: string | null;
}

const VideoDialog = ({ open, onOpenChange, videoUrl }: VideoDialogProps) => {
  if (!videoUrl) return null;

  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 bg-black">
        <VisuallyHidden>
          <DialogTitle>Video Player</DialogTitle>
        </VisuallyHidden>
        <div className="w-full aspect-video">
          {isYouTube ? (
            <iframe
              src={`${videoUrl}${videoUrl.includes('?') ? '&' : '?'}autoplay=1`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video player"
            />
          ) : (
            <video
              src={videoUrl}
              className="w-full h-full object-cover"
              controls
              autoPlay
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDialog;
