import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

/**
 * @example
 * const externalContracts = {
 *   1: {
 *     DAI: {
 *       address: "0x...",
 *       abi: [...],
 *     },
 *   },
 * } as const;
 */
const externalContracts = {
  421614: {
    gamersdao: {
      address: "0x284A4234FBed1714e5406880996BbC5820b63A6C",
      abi: [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_matchId",
              type: "uint256",
            },
          ],
          name: "cancelMatch",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_betAmount",
              type: "uint256",
            },
          ],
          name: "createMatch",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_riotId",
              type: "string",
            },
          ],
          name: "createUserProfile",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_matchId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "_winner",
              type: "address",
            },
          ],
          name: "declareWinner",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_matchId",
              type: "uint256",
            },
          ],
          name: "joinMatch",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_platformWallet",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "matchId",
              type: "uint256",
            },
          ],
          name: "MatchCancelled",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "matchId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "winner",
              type: "address",
            },
          ],
          name: "MatchCompleted",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "matchId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "creator",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "betAmount",
              type: "uint256",
            },
          ],
          name: "MatchCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "matchId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "challenger",
              type: "address",
            },
          ],
          name: "MatchJoined",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "matchId",
              type: "uint256",
            },
          ],
          name: "MatchStarted",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "matchId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "player",
              type: "address",
            },
          ],
          name: "PlayerReady",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_matchId",
              type: "uint256",
            },
          ],
          name: "readyUp",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "riotId",
              type: "string",
            },
          ],
          name: "UserProfileCreated",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_matchId",
              type: "uint256",
            },
          ],
          name: "getMatch",
          outputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "challenger",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "betAmount",
                  type: "uint256",
                },
                {
                  internalType: "enum MatchUpContract.MatchStatus",
                  name: "status",
                  type: "uint8",
                },
                {
                  internalType: "bool",
                  name: "creatorReady",
                  type: "bool",
                },
                {
                  internalType: "bool",
                  name: "challengerReady",
                  type: "bool",
                },
              ],
              internalType: "struct MatchUpContract.Match",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_user",
              type: "address",
            },
          ],
          name: "getUserProfile",
          outputs: [
            {
              components: [
                {
                  internalType: "string",
                  name: "riotId",
                  type: "string",
                },
              ],
              internalType: "struct MatchUpContract.UserProfile",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "matchCount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "matches",
          outputs: [
            {
              internalType: "address",
              name: "creator",
              type: "address",
            },
            {
              internalType: "address",
              name: "challenger",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "betAmount",
              type: "uint256",
            },
            {
              internalType: "enum MatchUpContract.MatchStatus",
              name: "status",
              type: "uint8",
            },
            {
              internalType: "bool",
              name: "creatorReady",
              type: "bool",
            },
            {
              internalType: "bool",
              name: "challengerReady",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "PLATFORM_FEE",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "platformWallet",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "userProfiles",
          outputs: [
            {
              internalType: "string",
              name: "riotId",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
