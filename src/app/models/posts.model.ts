export interface Posts {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface newPosts {
  title: string;
  body: string;
}

export interface ExtendedPosts extends Posts {
  isNew?: boolean;
}
