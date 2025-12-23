export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  interests: string[];
  followerCount: number;
  followingCount: number;
}

export interface Save {
  id: string;
  articleTitle: string;
  source: string;
  url: string;
  annotation?: string;
  tags: string[];
  savedBy: User;
  savedAt: Date;
  likeCount: number;
  isLiked: boolean;
  isSavedToLibrary: boolean;
  isPublic: boolean;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  saveCount: number;
}
