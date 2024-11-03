"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

interface GamingProfile {
  username: string;
  bio: string;
  gamingAccounts: {
    platform: string;
    accountId: string;
  }[];
  achievements: {
    id: string;
    name: string;
    description: string;
    earnedDate: string;
  }[];
  reputation: number;
}

const Profile = () => {
  const { address: connectedAddress } = useAccount();
  const [profile, setProfile] = useState<GamingProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // TODO: Replace with actual contract call
        // Mocked data for demonstration
        const mockProfile: GamingProfile = {
          username: "ProGamer123",
          bio: "Competitive gamer passionate about FPS and strategy games",
          gamingAccounts: [
            { platform: "Steam", accountId: "steam123" },
            { platform: "Epic", accountId: "epic456" },
          ],
          achievements: [
            {
              id: "1",
              name: "Early Adopter",
              description: "One of the first 1000 users on GamersDAO",
              earnedDate: "2024-03-15",
            },
            {
              id: "2",
              name: "Social Butterfly",
              description: "Connected 3 gaming accounts",
              earnedDate: "2024-03-16",
            },
          ],
          reputation: 850,
        };
        setProfile(mockProfile);
      } catch (error) {
        notification.error("Error fetching profile");
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (connectedAddress) {
      fetchProfile();
    }
  }, [connectedAddress]);

  if (!connectedAddress) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="mb-4 text-lg">Please connect your wallet to view your profile</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="mb-4 text-lg">No profile found. Please create one first.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-base-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <Address address={connectedAddress} size="xl" />
          </div>
          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-2">{profile.username}</h1>
            <p className="text-lg mb-4">{profile.bio}</p>
            <div className="flex items-center gap-4">
              <div className="badge badge-primary p-3">Reputation: {profile.reputation}</div>
              <div className="badge badge-secondary p-3">{profile.achievements.length} Achievements</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gaming Accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-base-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Gaming Accounts</h2>
          <div className="space-y-4">
            {profile.gamingAccounts.map((account, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-base-300 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{account.platform === "Steam" ? "🎮" : "🎯"}</span>
                  <div>
                    <p className="font-semibold">{account.platform}</p>
                    <p className="text-sm opacity-70">{account.accountId}</p>
                  </div>
                </div>
                <button className="btn btn-sm btn-ghost">Verify</button>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-base-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Achievements</h2>
          <div className="space-y-4">
            {profile.achievements.map(achievement => (
              <div key={achievement.id} className="p-3 bg-base-300 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{achievement.name}</h3>
                    <p className="text-sm opacity-70">{achievement.description}</p>
                  </div>
                  <span className="text-sm opacity-70">{new Date(achievement.earnedDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
