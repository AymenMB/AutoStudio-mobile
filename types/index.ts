export interface Car {
  id: string;
  user_id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  category?: string;
  image_url: string;
  images?: string[];
  specs: {
    engine: string;
    horsepower: number;
    mods: string[];
  };
  ai_analysis?: any;
  visual_description?: string;
  created_at: string;
  updated_at?: string;
}

export interface Post {
  id: string;
  user_id: string;
  car_id?: string;
  user: {
    username: string;
    avatar_url: string;
  };
  caption: string;
  media_url: string;
  media_type: 'image' | 'video';
  likes_count: number;
  created_at: string;
}

export interface Profile {
  id: string;
  username?: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface Story {
  id: string;
  user_id: string;
  username: string;
  avatar_url: string;
  has_seen: boolean;
}
