export interface Author {
    id: number;
    name: string;
    avatar: string;
}

export interface Comment {
    id: number;
    created: string;
    text: string;
    author: number;
    parent: number | null;
    likes: number;
}

export interface CommentAndAuthor {
    comment: Comment;
    author: Author;
}
