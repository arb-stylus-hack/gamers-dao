"use client";

import { useEffect, useState } from "react";
import { CreateMatchModal } from "./_components/CreateMatchModal";
import { MatchCard } from "./_components/MatchCard";
import { useAccount } from "wagmi";
import { notification } from "~~/utils/scaffold-eth";

interface Match {
  id: string;
  creator: string;
  game: string;
  gameType: "Casual" | "Competitive";
  players: string[];
  maxPlayers: number;
  wagerAmount: string;
  status: "Open" | "InProgress" | "Completed";
  timestamp: number;
}

const Matchmaking = () => {
  const { address } = useAccount();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Mock data - replace with contract calls in production
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockMatches: Match[] = [
          {
            id: "1",
            creator: "0x4b7866e717f27Fa1C38313D25F647aE0598571BD",
            game: "Fortnite",
            gameType: "Competitive",
            players: ["0x4b7866e717f27Fa1C38313D25F647aE0598571BD"],
            maxPlayers: 2,
            wagerAmount: "10",
            status: "Open",
            timestamp: Date.now(),
          },
          {
            id: "2",
            creator: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
            game: "CS:GO",
            gameType: "Competitive",
            players: [
              "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
              "0x46A1D8f9d52FF2fe75c9D728EbB5e82960398F10",
              "0xb7D76B38F12EDb6FA2b5A00A68a2Ccc1acdFB575",
            ],
            maxPlayers: 4,
            wagerAmount: "25",
            status: "InProgress",
            timestamp: Date.now() - 1800000, // 30 minutes ago
          },
          {
            id: "3",
            creator: "0x977f3c99Af1b1147c63F649303e704A1C9E93920",
            game: "League of Legends",
            gameType: "Casual",
            players: ["0x977f3c99Af1b1147c63F649303e704A1C9E93920"],
            maxPlayers: 5,
            wagerAmount: "5",
            status: "Open",
            timestamp: Date.now() - 3600000, // 1 hour ago
          },
          {
            id: "4",
            creator: "0x8D97689C9818892B700e27F316cc3E41e17fBeb9",
            game: "Valorant",
            gameType: "Competitive",
            players: [
              "0x8D97689C9818892B700e27F316cc3E41e17fBeb9",
              "0x65B0D7ede629bdf659F7b79fA400d082F2B5964D",
              "0x977f3c99Af1b1147c63F649303e704A1C9E93920",
              "0x4b7866e717f27Fa1C38313D25F647aE0598571BD",
            ],
            maxPlayers: 4,
            wagerAmount: "15",
            status: "InProgress",
            timestamp: Date.now() - 7200000, // 2 hours ago
          },
          {
            id: "5",
            creator: "0x2E7D1f3324d14C7B7147957B80B3c1e4565F4F42",
            game: "Fortnite",
            gameType: "Casual",
            players: ["0x2E7D1f3324d14C7B7147957B80B3c1e4565F4F42", "0x4b7866e717f27Fa1C38313D25F647aE0598571BD"],
            maxPlayers: 2,
            wagerAmount: "8",
            status: "Completed",
            timestamp: Date.now() - 86400000, // 24 hours ago
          },
          {
            id: "6",
            creator: "0xc2646134f6D52Ff640146308067dF7327E55F2B5",
            game: "CS:GO",
            gameType: "Competitive",
            players: ["0xc2646134f6D52Ff640146308067dF7327E55F2B5"],
            maxPlayers: 5,
            wagerAmount: "50",
            status: "Open",
            timestamp: Date.now() - 300000, // 5 minutes ago
          },
          {
            id: "7",
            creator: "0x9678c799e2Fca26966638745Fa8169A873D3d656",
            game: "Valorant",
            gameType: "Casual",
            players: ["0x9678c799e2Fca26966638745Fa8169A873D3d656"],
            maxPlayers: 3,
            wagerAmount: "12",
            status: "Open",
            timestamp: Date.now() - 900000, // 15 minutes ago
          },
          {
            id: "8",
            creator: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
            game: "League of Legends",
            gameType: "Competitive",
            players: ["0x742d35Cc6634C0532925a3b844Bc454e4438f44e", "0x46A1D8f9d52FF2fe75c9D728EbB5e82960398F10"],
            maxPlayers: 2,
            wagerAmount: "30",
            status: "InProgress",
            timestamp: Date.now() - 1200000, // 20 minutes ago
          },
        ];

        setMatches(mockMatches);
      } catch (error) {
        console.error("Error fetching matches:", error);
        notification.error("Failed to load matches");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleCreateMatch = async (matchData: Omit<Match, "id" | "creator" | "players" | "status" | "timestamp">) => {
    if (!address) {
      notification.error("Please connect your wallet first");
      return;
    }

    try {
      // TODO: Replace with actual contract interaction
      const newMatch: Match = {
        ...matchData,
        id: Math.random().toString(),
        creator: address,
        players: [address],
        status: "Open",
        timestamp: Date.now(),
      };

      setMatches(prev => [newMatch, ...prev]);
      setIsCreateModalOpen(false);
      notification.success("Match created successfully!");
    } catch (error) {
      console.error("Error creating match:", error);
      notification.error("Failed to create match");
    }
  };

  const handleJoinMatch = async (matchId: string) => {
    if (!address) {
      notification.error("Please connect your wallet first");
      return;
    }

    try {
      // TODO: Replace with actual contract interaction
      setMatches(prev =>
        prev.map(match => (match.id === matchId ? { ...match, players: [...match.players, address] } : match)),
      );
      notification.success("Successfully joined the match!");
    } catch (error) {
      console.error("Error joining match:", error);
      notification.error("Failed to join match");
    }
  };

  const filteredMatches = matches.filter(match => {
    if (filter === "all") return true;
    if (filter === "my") return match.creator === address || match.players.includes(address || "");
    if (filter === "open") return match.status === "Open";
    return true;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Matchmaking</h1>
          <p className="text-lg opacity-80">Find or create matches to compete with other gamers</p>
        </div>
        <button className="btn btn-primary mt-4 md:mt-0" onClick={() => setIsCreateModalOpen(true)}>
          Create Match
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-8">
        <button
          className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setFilter("all")}
        >
          All Matches
        </button>
        <button
          className={`btn btn-sm ${filter === "my" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setFilter("my")}
        >
          My Matches
        </button>
        <button
          className={`btn btn-sm ${filter === "open" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setFilter("open")}
        >
          Open Matches
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map(match => (
            <MatchCard key={match.id} match={match} onJoin={() => handleJoinMatch(match.id)} userAddress={address} />
          ))}
        </div>
      )}

      <CreateMatchModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateMatch}
      />
    </div>
  );
};

export default Matchmaking;
