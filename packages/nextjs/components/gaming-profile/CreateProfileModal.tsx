import { useState } from "react";
import { useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/outline";

type ProfileFormData = {
  username: string;
  bio: string;
  steamId?: string;
  epicId?: string;
  riotId?: string;
};

interface CreateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProfileModal = ({ isOpen, onClose }: CreateProfileModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>();

  const onSubmit = async (data: ProfileFormData) => {
    try {
      console.log("Form submitted with data:", data);
      // TODO: Contract interaction will go here
      // await createProfile(data);
      onClose();
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />

        {/* Modal */}
        <div className="relative bg-base-200 rounded-lg w-full max-w-md p-6">
          {/* Close button */}
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>

          {/* Modal content */}
          <div className="mt-4">
            {/* Progress indicator */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${currentStep >= 1 ? "bg-primary" : "bg-gray-300"}`} />
                <div className={`w-12 h-1 ${currentStep >= 2 ? "bg-primary" : "bg-gray-300"}`} />
                <div className={`w-3 h-3 rounded-full ${currentStep >= 2 ? "bg-primary" : "bg-gray-300"}`} />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {currentStep === 1 ? (
                // Step 1: Basic Profile
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-center mb-6">Create Your Gaming Profile</h2>

                  <div>
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <input
                      type="text"
                      className={`input input-bordered w-full ${errors.username ? "input-error" : ""}`}
                      {...register("username", {
                        required: "Username is required",
                        minLength: { value: 3, message: "Username must be at least 3 characters" },
                        maxLength: { value: 20, message: "Username must be less than 20 characters" },
                      })}
                    />
                    {errors.username && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.username.message}</span>
                      </label>
                    )}
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Bio</span>
                    </label>
                    <textarea
                      className={`textarea textarea-bordered w-full ${errors.bio ? "textarea-error" : ""}`}
                      {...register("bio", {
                        required: "Bio is required",
                        maxLength: { value: 160, message: "Bio must be less than 160 characters" },
                      })}
                    />
                    {errors.bio && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.bio.message}</span>
                      </label>
                    )}
                  </div>

                  <button type="button" className="btn btn-primary w-full" onClick={() => setCurrentStep(2)}>
                    Next
                  </button>
                </div>
              ) : (
                // Step 2: Gaming Accounts
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-center mb-6">Link Gaming Accounts</h2>

                  <div>
                    <label className="label">
                      <span className="label-text">Steam ID</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Optional"
                      {...register("steamId")}
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Epic Games ID</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Optional"
                      {...register("epicId")}
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Riot Games ID</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Optional"
                      {...register("riotId")}
                    />
                  </div>

                  <div className="flex gap-4">
                    <button type="button" className="btn btn-outline flex-1" onClick={() => setCurrentStep(1)}>
                      Back
                    </button>
                    <button type="submit" className="btn btn-primary flex-1">
                      Create Profile
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
