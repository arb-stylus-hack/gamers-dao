import { PhaseCard } from "./_components/PhaseCard";
import { TechnicalConsiderations } from "./_components/TechnicalConsiderations";
import { NextPage } from "next";

const Roadmap: NextPage = () => {
  const phases: {
    title: string;
    timing: string;
    features: string[];
    status: "planned" | "active" | "upcoming";
  }[] = [
    {
      title: "Phase 1: Core Platform Launch",
      timing: "Current",
      features: [
        "Social networking features",
        "Profile management",
        "Basic matchmaking",
        "Achievement system",
        "NFT badges",
        "Wagering system",
      ],
      status: "active",
    },
    {
      title: "Phase 2: Tokenomics & DAO Governance",
      timing: "Q1 2025",
      features: [
        "GAMER token launch",
        "Governance system implementation",
        "Staking rewards",
        "Platform benefits integration",
        "DAO proposal system",
      ],
      status: "upcoming",
    },
    {
      title: "Phase 3: Streaming Integration & Rewards",
      timing: "Q2 2025",
      features: [
        "Streaming platform integration",
        "Random drop system",
        "Viewer rewards",
        "Streamer incentives",
        "Content creator tools",
      ],
      status: "upcoming",
    },
    {
      title: "Phase 4: ZK Integration",
      timing: "Q3 2025",
      features: [
        "ZK proof system for game data",
        "Data integrity verification",
        "Secure result validation",
        "Cross-platform verification",
        "Anti-cheat measures",
      ],
      status: "planned",
    },
    {
      title: "Phase 5: Enhanced Features",
      timing: "Q4 2025",
      features: [
        "Cross-platform integration",
        "Tournament system",
        "AI-powered matchmaking",
        "Content moderation",
        "Performance analytics",
      ],
      status: "planned",
    },
    {
      title: "Phase 6: Ecosystem Expansion",
      timing: "Q4 2025",
      features: [
        "Developer SDK",
        "Partner integration system",
        "Marketplace expansion",
        "API endpoints for game studios",
        "Revenue sharing implementation",
      ],
      status: "planned",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Technical Roadmap</h1>
        <p className="text-lg opacity-80">Our journey to revolutionize the gaming social platform landscape</p>
      </div>

      {/* Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {phases.map((phase, index) => (
          <PhaseCard key={index} {...phase} />
        ))}
      </div>

      {/* Technical Considerations Section */}
      <TechnicalConsiderations />
    </div>
  );
};

export default Roadmap;
