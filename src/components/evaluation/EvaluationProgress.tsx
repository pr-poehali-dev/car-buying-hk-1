import { Button } from "@/components/ui/button";

interface EvaluationProgressProps {
  currentStep: number;
  totalSteps: number;
  handleBack: () => void;
}

const EvaluationProgress = ({ currentStep, totalSteps, handleBack }: EvaluationProgressProps) => {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        {currentStep > 1 && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-900 text-sm md:text-base"
          >
            ← Назад
          </Button>
        )}
        <span className="text-gray-600 text-sm md:text-base ml-auto">
          Шаг {currentStep} из {totalSteps}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gray-900 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default EvaluationProgress;
