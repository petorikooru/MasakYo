import { CheckCircle } from "lucide-react";

export default function StepByStep({ steps }) {
  return (
    <div className="w-3/5">
      <div className="space-y-6">
        {steps.map((step, index) => (
          <StepItem 
            key={index}
            step={step}
          />
        ))}
      </div>

      {/* Completion Message */}
      <CompletionMessage />
    </div>
  );
}

function StepItem({ step }) {
  return (
    <div className="bg-neutral-700/30 rounded-2xl p-6 border border-neutral-600/30 hover:border-red-400/20 transition-all duration-300">
      <div className="flex items-start gap-4">
        {/* Step Number */}
        <div className="w-12 h-12 bg-red-400 rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">
            {step.step}
          </span>
        </div>
        
        {/* Step Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white">
              {step.title}
            </h3>
            <span className="text-red-400 text-sm font-semibold bg-red-400/10 px-3 py-1 rounded-full">
              {step.duration}
            </span>
          </div>
          <p className="text-gray-300 leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function CompletionMessage() {
  return (
    <div className="mt-8 p-6 bg-green-400/10 border border-green-400/20 rounded-2xl text-center">
      <CheckCircle size={48} className="text-green-400 mx-auto mb-3" />
      <h3 className="text-green-400 text-xl font-bold mb-2">
        Selamat! Rendang Anda Sudah Siap
      </h3>
      <p className="text-green-300">
        Hidangkan rendang dengan nasi hangat dan nikmati kelezatan masakan tradisional Indonesia.
      </p>
    </div>
  );
}
