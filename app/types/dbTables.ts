export type article = {
    id?: string;
    created_at?: string;
    edited_at?: string;
    title: string;
    sub_title: string;
    tags: string[];
    user_id: string;
    content: string;
    image: string;
};

export type draft_article = {
    id?: string;
    created_at?: string;
    edited_at?: string;
    title: string;
    sub_title: string;
    tags: string[];
    user_id: string;
    content: string;
    image: string;
    status: "draft" | "pending" | "approved";
};

export type profile = {
    id?: string;
    created_at?: string;
    edited_at?: string;
    username: string;
    full_name: string;
    bio: string;
    avatar_url: string;
};

export type follow = {
    id?: string;
    created_at?: string;
    following_user_id: string;
    followed_user_id: string;
};

export type interaction = {
    id?: string;
    created_at?: string;
    user_id: string;
    article_id: string;
    type: string;
};

export type comment = {
    id?: string;
    created_at?: string;
    edited_at?: string;
    article_id: string;
    user_id: string;
    content: string;
};

export type user_role = {
    id?: string;
    user_id: string;
    role: string;
};

export type role_permission = {
    id?: string;
    role: string;
    permission: string;
};

export type buckets = "avatars" | "article_images";
