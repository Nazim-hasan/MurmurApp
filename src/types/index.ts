export type TMurmur = {
  id: string;
  text: string;
  like_count: number;
  author_id: string;
  users?: {
    name: string;
    avatar_url?: string;
  };
};
