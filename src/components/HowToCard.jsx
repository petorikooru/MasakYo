import { Play } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import StepByStep from "./StepByStep";

export default function HowToCard({ steps, videoUrl }) {
  return (
    <div className="bg-neutral-800/50 rounded-2xl p-8 border border-neutral-700/50 backdrop-blur-sm">
      <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <Play size={28} className="text-red-400" />
        Cara Membuat
      </h2>

      {/* Video and Steps Container */}
      <div className="flex gap-8">
        <VideoPlayer videoUrl={videoUrl} title="Recipe Tutorial" />
        <StepByStep steps={steps} />
      </div>
    </div>
  );
}
