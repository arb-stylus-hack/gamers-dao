interface AchievementProgressProps {
  total: number;
  completed: number;
}

export const AchievementProgress = ({ total, completed }: AchievementProgressProps) => {
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="bg-base-200 p-6 rounded-xl">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Overall Progress</span>
        <span className="text-sm font-medium">
          {completed}/{total} Completed
        </span>
      </div>
      <div className="w-full bg-base-300 rounded-full h-4">
        <div className="bg-primary h-4 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};
