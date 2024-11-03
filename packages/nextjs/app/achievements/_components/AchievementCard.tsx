interface Achievement {
  id: string;
  name: string;
  description: string;
  requiredProgress: number;
  currentProgress: number;
  badgeType: string;
  rarity: string;
  imageUrl: string;
  category: string;
}

interface AchievementCardProps {
  achievement: Achievement;
  onClaim: () => void;
  loading: boolean;
}

export const AchievementCard = ({ achievement, onClaim, loading }: AchievementCardProps) => {
  const isCompleted = achievement.currentProgress >= achievement.requiredProgress;
  const progressPercentage = Math.min((achievement.currentProgress / achievement.requiredProgress) * 100, 100);

  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-base-300 flex items-center justify-center">
            {/* In production, replace with actual achievement badge image */}
            <span className="text-2xl">🏆</span>
          </div>
          <div>
            <h2 className="card-title">{achievement.name}</h2>
            <span className="badge badge-secondary">{achievement.rarity}</span>
          </div>
        </div>

        <p className="mt-4 text-sm opacity-80">{achievement.description}</p>

        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm">Progress</span>
            <span className="text-sm font-medium">
              {achievement.currentProgress}/{achievement.requiredProgress}
            </span>
          </div>
          <div className="w-full bg-base-300 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <button
            className={`btn btn-primary btn-sm ${isCompleted ? "" : "btn-disabled"}`}
            onClick={onClaim}
            disabled={!isCompleted || loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : isCompleted ? (
              "Claim Badge"
            ) : (
              "In Progress"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
