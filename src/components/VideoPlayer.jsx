import { Play } from "lucide-react";

export default function VideoPlayer({ videoUrl, title }) {
  return (
    <div className="w-2/5">
      <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
        <div className="aspect-video bg-neutral-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-400 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
              <Play size={24} className="text-white ml-1" />
            </div>
            <div className="text-white font-semibold">Video Tutorial</div>
            <div className="text-gray-400 text-sm">Klik untuk memutar</div>
          </div>
          {/* Uncomment for actual video embed */}
          {/* <iframe
            src={videoUrl}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            title={title}
          /> */}
        </div>
      </div>

      {/* Video Tips */}
      <VideoTips />
    </div>
  );
}

function VideoTips() {
  const tips = [
    "Gunakan daging sapi yang masih segar",
    "Aduk sesekali agar tidak gosong",
    "Masak dengan api kecil untuk hasil terbaik",
    "Bisa disimpan hingga 2 minggu di kulkas"
  ];

  return (
    <div className="mt-4 p-4 bg-neutral-700/30 rounded-xl">
      <h3 className="text-white font-semibold mb-2">Tips Membuat Rendang</h3>
      <ul className="text-gray-300 text-sm space-y-1">
        {tips.map((tip, index) => (
          <li key={index}>• {tip}</li>
        ))}
      </ul>
    </div>
  );
}
