"use client";

import { useState } from "react";
import { AchievementCard } from "./_components/AchievementCard";
import { AchievementProgress } from "./_components/AchievementProgress";
import { useAccount } from "wagmi";
import { notification } from "~~/utils/scaffold-eth";

// Mock achievement data (in production, this would come from the smart contract)
const MOCK_ACHIEVEMENTS = [
  {
    id: "1",
    name: "First Blood",
    description: "Win your first competitive match",
    requiredProgress: 1,
    currentProgress: 0,
    badgeType: "Achievement",
    rarity: "Common",
    imageUrl: "/achievements/first-blood.png",
    category: "General",
  },
  {
    id: "2",
    name: "Fortnite Warrior",
    description: "Eliminate 3 enemies in a single Fortnite solo match",
    requiredProgress: 3,
    currentProgress: 2,
    badgeType: "Achievement",
    rarity: "Rare",
    imageUrl: "/achievements/fortnite.png",
    category: "Fortnite",
  },
  {
    id: "3",
    name: "Social Butterfly",
    description: "Connect 5 gaming accounts to your profile",
    requiredProgress: 5,
    currentProgress: 1,
    badgeType: "Achievement",
    rarity: "Epic",
    imageUrl: "/achievements/social.png",
    category: "Platform",
  },
  {
    id: "4",
    name: "Stream Master",
    description: "Complete your first 4-hour streaming session",
    requiredProgress: 1,
    currentProgress: 0,
    badgeType: "Achievement",
    rarity: "Rare",
    imageUrl: "/achievements/stream.png",
    category: "Platform",
  },
  {
    id: "5",
    name: "League Legend",
    description: "Reach Gold rank in League of Legends",
    requiredProgress: 1,
    currentProgress: 0,
    badgeType: "Achievement",
    rarity: "Epic",
    imageUrl: "/achievements/lol.png",
    category: "League of Legends",
  },
  {
    id: "6",
    name: "Tournament Victor",
    description: "Win a GamersDAO tournament",
    requiredProgress: 1,
    currentProgress: 0,
    badgeType: "Achievement",
    rarity: "Legendary",
    imageUrl: "/achievements/tournament.png",
    category: "Platform",
  },
  {
    id: "7",
    name: "CS:GO Marksman",
    description: "Achieve 25 headshots in a single CS:GO match",
    requiredProgress: 25,
    currentProgress: 18,
    badgeType: "Achievement",
    rarity: "Rare",
    imageUrl: "/achievements/csgo.png",
    category: "CS:GO",
  },
  {
    id: "8",
    name: "Community Champion",
    description: "Receive 50 positive player reviews",
    requiredProgress: 50,
    currentProgress: 12,
    badgeType: "Achievement",
    rarity: "Epic",
    imageUrl: "/achievements/community.png",
    category: "Platform",
  },
  {
    id: "9",
    name: "Apex Predator",
    description: "Win 3 Apex Legends matches in a row",
    requiredProgress: 3,
    currentProgress: 2,
    badgeType: "Achievement",
    rarity: "Epic",
    imageUrl: "/achievements/apex.png",
    category: "Apex Legends",
  },
  {
    id: "10",
    name: "Early Adopter",
    description: "Join GamersDAO in its first month",
    requiredProgress: 1,
    currentProgress: 1,
    badgeType: "Achievement",
    rarity: "Legendary",
    imageUrl: "/achievements/early.png",
    category: "Platform",
  },
  {
    id: "11",
    name: "Valorant Ace",
    description: "Get an ace in Valorant competitive match",
    requiredProgress: 1,
    currentProgress: 0,
    badgeType: "Achievement",
    rarity: "Epic",
    imageUrl: "/achievements/valorant.png",
    category: "Valorant",
  },
  {
    id: "12",
    name: "Wagering Whale",
    description: "Place 100 skill-based wagers",
    requiredProgress: 100,
    currentProgress: 45,
    badgeType: "Achievement",
    rarity: "Rare",
    imageUrl: "/achievements/wager.png",
    category: "Platform",
  },
  {
    id: "13",
    name: "Content Creator",
    description: "Upload 10 gaming highlights",
    requiredProgress: 10,
    currentProgress: 3,
    badgeType: "Achievement",
    rarity: "Common",
    imageUrl: "/achievements/content.png",
    category: "Platform",
  },
  {
    id: "14",
    name: "Rocket League Aerial",
    description: "Score 5 aerial goals in Rocket League",
    requiredProgress: 5,
    currentProgress: 2,
    badgeType: "Achievement",
    rarity: "Rare",
    imageUrl: "/achievements/rocket.png",
    category: "Rocket League",
  },
  {
    id: "15",
    name: "Diamond Hands",
    description: "Hold GamersDAO tokens for 6 months",
    requiredProgress: 1,
    currentProgress: 0,
    badgeType: "Achievement",
    rarity: "Legendary",
    imageUrl: "/achievements/diamond.png",
    category: "Platform",
  },
];

// Update the category buttons to match all available categories
const ACHIEVEMENT_CATEGORIES = [
  "All",
  "Platform",
  "General",
  "Fortnite",
  "League of Legends",
  "CS:GO",
  "Apex Legends",
  "Valorant",
  "Rocket League",
];

const Achievements = () => {
  const { address } = useAccount();
  const [achievements, setAchievements] = useState(MOCK_ACHIEVEMENTS);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredAchievements = achievements.filter(
    achievement => selectedCategory === "All" || achievement.category === selectedCategory,
  );

  const handleClaimBadge = async (achievementId: string) => {
    if (!address) {
      notification.error("Please connect your wallet first");
      return;
    }

    setLoading(true);
    try {
      // Mock API call - in production, this would interact with the smart contract
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update local state to reflect claimed badge
      setAchievements(prev =>
        prev.map(achievement =>
          achievement.id === achievementId
            ? { ...achievement, currentProgress: achievement.requiredProgress }
            : achievement,
        ),
      );

      notification.success("Badge claimed successfully!");
    } catch (error) {
      console.error("Error claiming badge:", error);
      notification.error("Failed to claim badge");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Achievements</h1>
        <p className="text-lg opacity-80">Complete challenges to earn unique badges</p>
      </div>

      {/* Updated Achievement Categories */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {ACHIEVEMENT_CATEGORIES.map(category => (
          <button
            key={category}
            className={`btn ${selectedCategory === category ? "btn-primary" : "btn-outline"}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Achievement Progress Overview */}
      <AchievementProgress
        total={achievements.length}
        completed={achievements.filter(a => a.currentProgress >= a.requiredProgress).length}
      />

      {/* Updated Achievements Grid with filtered achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredAchievements.map(achievement => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            onClaim={() => handleClaimBadge(achievement.id)}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default Achievements;
