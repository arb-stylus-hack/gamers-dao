"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

// Referencing achievement interface from achievements component
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

interface GameStats {
  game: string;
  stats: {
    label: string;
    value: string | number;
  }[];
}

interface GamingProfile {
  username: string;
  bio: string;
  gamingAccounts: {
    platform: string;
    accountId: string;
    verified: boolean;
    imageUrl: string;
  }[];
  achievements: Achievement[];
  reputation: number;
  gameStats: GameStats[];
  featuredBadges: Achievement[];
}

const Profile = () => {
  const { address: connectedAddress } = useAccount();
  const [profile, setProfile] = useState<GamingProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // TODO: Replace with actual contract call
        const mockProfile: GamingProfile = {
          username: "fac3_m4n",
          bio: "Competitive gamer passionate about FPS and strategy games",
          gamingAccounts: [
            { platform: "Steam", accountId: "steam123", verified: true, imageUrl: "/achievements/steam.png" },
            { platform: "Epic", accountId: "epic456", verified: false, imageUrl: "/achievements/epic.png" },
            { platform: "Riot", accountId: "riot123", verified: true, imageUrl: "/achievements/riot.png" },
          ],
          achievements: [
            {
              id: "1",
              name: "Early Adopter",
              description: "One of the first 1000 users on GamersDAO",
              requiredProgress: 1,
              currentProgress: 1,
              badgeType: "Platform",
              rarity: "Legendary",
              imageUrl: "🦄",
              category: "Platform",
            },
            // ... existing achievements
          ],
          reputation: 850,
          gameStats: [
            {
              game: "CS:GO",
              stats: [
                { label: "K/D Ratio", value: "1.85" },
                { label: "Win Rate", value: "58%" },
                { label: "Headshot %", value: "62%" },
                { label: "Hours Played", value: 1200 },
              ],
            },
            {
              game: "Fortnite",
              stats: [
                { label: "Victory Royales", value: 150 },
                { label: "Win Rate", value: "12%" },
                { label: "K/D Ratio", value: "2.3" },
                { label: "Matches Played", value: 1500 },
              ],
            },
          ],
          featuredBadges: [
            // Featured badges would be a subset of achievements
            {
              id: "6",
              name: "Tournament Victor",
              description: "Win a GamersDAO tournament",
              requiredProgress: 1,
              currentProgress: 1,
              badgeType: "Achievement",
              rarity: "Legendary",
              imageUrl: "🏆",
              category: "Platform",
            },
            {
              id: "1",
              name: "Early Adopter",
              description: "One of the first 1000 users on GamersDAO",
              requiredProgress: 1,
              currentProgress: 1,
              badgeType: "Platform",
              rarity: "Legendary",
              imageUrl: "🦄",
              category: "Platform",
            },
          ],
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

      {/* Featured Badges */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {profile?.featuredBadges.map(badge => (
            <div key={badge.id} className="bg-base-200 rounded-xl p-4 text-center">
              <div className="text-4xl mb-2">{badge.imageUrl}</div>
              <h3 className="font-semibold text-sm mb-1">{badge.name}</h3>
              <span className={`badge badge-sm ${badge.rarity.toLowerCase()}`}>{badge.rarity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {profile?.gameStats.map((gameStat, index) => (
          <div key={index} className="bg-base-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">{gameStat.game} Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              {gameStat.stats.map((stat, statIndex) => (
                <div key={statIndex} className="bg-base-300 rounded-lg p-4">
                  <div className="text-sm opacity-70">{stat.label}</div>
                  <div className="text-xl font-bold">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Gaming Accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-base-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Gaming Accounts</h2>
          <div className="space-y-4">
            {profile.gamingAccounts.map((account, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-base-300 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">
                    <Image src={account.imageUrl} alt={account.platform} width={32} height={32} />
                  </span>
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
