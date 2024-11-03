import { useState } from "react";
import { useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface CreateMatchFormData {
  game: string;
  gameType: "Casual" | "Competitive";
  maxPlayers: number;
  wagerAmount: string;
}

interface CreateMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CreateMatchFormData) => void;
}

export const CreateMatchModal = ({ isOpen, onClose, onCreate }: CreateMatchModalProps) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateMatchFormData>();

  const onSubmit = async (data: CreateMatchFormData) => {
    setLoading(true);
    try {
      await onCreate(data);
      reset();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />

        <div className="relative bg-base-200 rounded-lg w-full max-w-md p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>

          <h2 className="text-2xl font-bold text-center mb-6">Create Match</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Game</span>
              </label>
              <select
                className={`select select-bordered w-full ${errors.game ? "select-error" : ""}`}
                {...register("game", { required: "Game is required" })}
              >
                <option value="">Select a game</option>
                <option value="Fortnite">Fortnite</option>
                <option value="CS:GO">CS:GO</option>
                <option value="League of Legends">League of Legends</option>
                <option value="Valorant">Valorant</option>
              </select>
              {errors.game && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.game.message}</span>
                </label>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Match Type</span>
              </label>
              <select
                className={`select select-bordered w-full ${errors.gameType ? "select-error" : ""}`}
                {...register("gameType", { required: "Match type is required" })}
              >
                <option value="">Select match type</option>
                <option value="Casual">Casual</option>
                <option value="Competitive">Competitive</option>
              </select>
              {errors.gameType && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.gameType.message}</span>
                </label>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Max Players</span>
              </label>
              <input
                type="number"
                className={`input input-bordered w-full ${errors.maxPlayers ? "input-error" : ""}`}
                {...register("maxPlayers", {
                  required: "Max players is required",
                  min: { value: 2, message: "Minimum 2 players required" },
                  max: { value: 10, message: "Maximum 10 players allowed" },
                })}
              />
              {errors.maxPlayers && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.maxPlayers.message}</span>
                </label>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Wager Amount (USDC)</span>
              </label>
              <input
                type="text"
                className={`input input-bordered w-full ${errors.wagerAmount ? "input-error" : ""}`}
                {...register("wagerAmount", {
                  required: "Wager amount is required",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Invalid amount format",
                  },
                })}
              />
              {errors.wagerAmount && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.wagerAmount.message}</span>
                </label>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Create Match"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
