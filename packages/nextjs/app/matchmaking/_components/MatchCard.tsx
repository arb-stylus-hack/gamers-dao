import { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { Address } from "~~/components/scaffold-eth";

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

interface MatchCardProps {
  match: Match;
  onJoin: () => void;
  userAddress?: string;
}

export const MatchCard = ({ match, onJoin, userAddress }: MatchCardProps) => {
  const isCreator = match.creator === userAddress;
  const hasJoined = match.players.includes(userAddress || "");
  const isFull = match.players.length >= match.maxPlayers;

  const statusColor = useMemo(() => {
    switch (match.status) {
      case "Open":
        return "badge-success";
      case "InProgress":
        return "badge-warning";
      case "Completed":
        return "badge-neutral";
      default:
        return "badge-ghost";
    }
  }, [match.status]);

  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title">{match.game}</h2>
          <div className={`badge ${statusColor}`}>{match.status}</div>
        </div>

        <div className="space-y-2 mt-4">
          <div className="flex justify-between">
            <span className="opacity-70">Type:</span>
            <span className="font-medium">{match.gameType}</span>
          </div>

          <div className="flex justify-between">
            <span className="opacity-70">Players:</span>
            <span className="font-medium">
              {match.players.length}/{match.maxPlayers}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="opacity-70">Wager:</span>
            <span className="font-medium">{match.wagerAmount} USDC</span>
          </div>

          <div className="flex justify-between">
            <span className="opacity-70">Created:</span>
            <span className="font-medium">{formatDistanceToNow(match.timestamp, { addSuffix: true })}</span>
          </div>

          <div className="mt-4">
            <span className="text-sm opacity-70">Creator:</span>
            <Address address={match.creator} />
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          {!isCreator && !hasJoined && match.status === "Open" && (
            <button className="btn btn-primary btn-sm" onClick={onJoin} disabled={isFull}>
              {isFull ? "Match Full" : "Join Match"}
            </button>
          )}
          {hasJoined && <span className="badge badge-primary p-3">Joined</span>}
          {isCreator && <span className="badge badge-secondary p-3">Your Match</span>}
        </div>
      </div>
    </div>
  );
};
