"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { CreateProfileModal } from "~~/components/gaming-profile/CreateProfileModal";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex items-center justify-center flex-grow pt-10 pb-20 bg-base-100">
        <div className="px-5 text-center">
          <h1 className="mb-8">
            <span className="block text-4xl font-bold mb-2">Welcome to GamersDAO</span>
            <span className="block text-2xl">Web3&apos;s Premier Gaming Social Platform</span>
          </h1>

          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Connect your gaming accounts, verify your skills, and compete in secure, blockchain-powered matches with
            real rewards.
          </p>

          {connectedAddress ? (
            <div className="flex flex-col items-center gap-4">
              <p className="my-2 font-medium">Connected as:</p>
              <Address address={connectedAddress} />
              <button className="btn btn-primary" onClick={() => setIsProfileModalOpen(true)}>
                Create Gaming Profile
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="my-2 font-medium">Connect your wallet to get started</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Unified Gaming Identity"
              description="Link multiple gaming accounts and build your verified Web3 gaming profile"
              icon="🎮"
            />
            <FeatureCard
              title="Skill-Based Matchmaking"
              description="Find gaming partners based on verified skill levels"
              icon="🎯"
            />
            <FeatureCard
              title="Secure Wagering"
              description="Compete in skill-based matches with secure blockchain escrow"
              icon="💰"
            />
          </div>
        </div>
      </section>

      {/* Profile Creation Modal */}
      <CreateProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
    </div>
  );
};

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="card-title justify-center mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

export default Home;
