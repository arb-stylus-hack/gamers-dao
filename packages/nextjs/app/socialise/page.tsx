"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: number;
  likes: number;
  hasLiked: boolean;
  attachments?: {
    type: "achievement" | "match" | "image";
    data: any;
  }[];
  comments: {
    id: string;
    author: string;
    content: string;
    timestamp: number;
  }[];
}

const Socialise = () => {
  const { address } = useAccount();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // TODO: Replace with actual contract calls
      const mockPosts: Post[] = [
        {
          id: "1",
          author: "0x4b7866e717f27Fa1C38313D25F647aE0598571BD",
          content: "Just won my first GamersDAO tournament! 🏆",
          timestamp: Date.now() - 3600000,
          likes: 24,
          hasLiked: false,
          attachments: [
            {
              type: "achievement",
              data: {
                name: "Tournament Victor",
                imageUrl: "🏆",
                rarity: "Legendary",
              },
            },
          ],
          comments: [],
        },
        {
          id: "2",
          author: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
          content: "Looking for CS:GO teammates for upcoming tournament. Must be Gold Nova or higher!",
          timestamp: Date.now() - 7200000,
          likes: 12,
          hasLiked: true,
          comments: [
            {
              id: "c1",
              author: "0x977f3c99Af1b1147c63F649303e704A1C9E93920",
              content: "I'm interested! DMing you.",
              timestamp: Date.now() - 3600000,
            },
          ],
        },
      ];
      setPosts(mockPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      notification.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!address) {
      notification.error("Please connect your wallet first");
      return;
    }

    if (!newPost.trim()) {
      notification.error("Post content cannot be empty");
      return;
    }

    try {
      // TODO: Replace with actual contract interaction
      const post: Post = {
        id: Math.random().toString(),
        author: address,
        content: newPost,
        timestamp: Date.now(),
        likes: 0,
        hasLiked: false,
        comments: [],
      };

      setPosts(prev => [post, ...prev]);
      setNewPost("");
      notification.success("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      notification.error("Failed to create post");
    }
  };

  const handleLike = async (postId: string) => {
    if (!address) {
      notification.error("Please connect your wallet first");
      return;
    }

    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
              hasLiked: !post.hasLiked,
            }
          : post,
      ),
    );
  };

  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="mb-4 text-lg">Please connect your wallet to view the social feed</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      {/* Create Post */}
      <div className="bg-base-200 rounded-xl p-4 mb-8">
        <textarea
          className="textarea textarea-bordered w-full mb-4"
          placeholder="What's on your mind?"
          value={newPost}
          onChange={e => setNewPost(e.target.value)}
          rows={3}
        />
        <div className="flex justify-end">
          <button className="btn btn-primary" onClick={handleCreatePost}>
            Post
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-base-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Address address={post.author} />
                <div className="flex-grow">
                  <p className="mb-2">{post.content}</p>
                  {post.attachments?.map((attachment, index) => (
                    <div key={index} className="bg-base-300 rounded-lg p-3 mb-2">
                      {attachment.type === "achievement" && (
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{attachment.data.imageUrl}</span>
                          <div>
                            <p className="font-semibold">{attachment.data.name}</p>
                            <span className="badge badge-sm">{attachment.data.rarity}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      className={`btn btn-sm ${post.hasLiked ? "btn-primary" : "btn-ghost"}`}
                      onClick={() => handleLike(post.id)}
                    >
                      {post.hasLiked ? "❤️" : "🤍"} {post.likes}
                    </button>
                    <span className="text-sm opacity-60">
                      {new Date(post.timestamp).toLocaleTimeString(undefined, {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Socialise;
