import { Author, Comment, CommentAndAuthor } from "src/interface";
import axios from "axios";

export const fetchAuthors = async () => {
	try {
		const res = await axios.get("/api/authors");
		return res.data as Author[];
	} catch (error) {
		throw new Error("error");
	}
};

export const fetchComments = async (page: number) => {
	try {
		const res = await axios.get("/api/comments", { params: { page } });
		return res.data.data as Comment[];
	} catch (error) {
		throw new Error("error");
	}
};

export const doesCommentHaveChild = (comments: Comment[], parendId: number) =>
	comments.some((comment) => comment.parent === parendId);

export const getChildrenById = (
	comments: CommentAndAuthor[],
	parendId: number
): CommentAndAuthor[] =>
	comments.filter((comment) => comment.comment.parent === parendId) || [];

export const generateCommentWithAuthors = (
	authors: Author[],
	comments: Comment[]
): CommentAndAuthor[] => {
	const commentsWithAuthors = comments.map((comment) => {
		const author = authors.find((auth) => auth.id === comment.author) || {
			id: 0,
			name: "John Doe",
			avatar: "",
		};

		return {
			comment,
			author,
		};
	});
	return commentsWithAuthors;
};

export const calculateTotalComments = (comments: Comment[]) => comments.length;

export const calculateTotalLikes = (
	comments: Comment[] | CommentAndAuthor[] | any[]
): number => {
	if (comments.length === 0) return 0;

	if (Object.keys(comments[0]).includes("likes")) {
		return comments.map((comment) => comment.likes).reduce((a, b) => a + b, 0);
	} else {
		return comments
			.map((comment) => comment.comment.likes)
			.reduce((a, b) => a + b, 0);
	}
};

export const isCommentLiked = (
	likedCommentsIds: number[],
	commentsWithAuthors: CommentAndAuthor
) => likedCommentsIds.some((id) => id === commentsWithAuthors.comment.id);

export const formatTimeAgo = (dateString: string): string => {
	const inputDate: Date = new Date(dateString);
	const now: Date = new Date();
	const diff: number = now.getTime() - inputDate.getTime();

	const diffDays: number = Math.floor(diff / (1000 * 60 * 60 * 24));
	const diffHours: number = Math.floor((diff / (1000 * 60 * 60)) % 24);
	const diffMinutes: number = Math.floor((diff / (1000 * 60)) % 60);

	if (diffDays >= 1) {
		return inputDate.toLocaleString("ru-RU", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	} else if (diffHours >= 1) {
		return `${diffHours} ${hoursEnducement(diffHours)} назад`;
	} else if (diffMinutes >= 1) {
		return `${diffMinutes} ${minutesEnducement(diffMinutes)} назад`;
	} else {
		return `1 минуту назад`;
	}
};

const enducement = (number: number, words: string[]): string => {
	const hash = {
		"0;5-20": words[0],
		"1": words[1],
		"2-4": words[2],
	};
	const numberToString = number.toString();
	const lastCharOfNumber = parseInt(numberToString[numberToString.length - 1]);
	if (
		lastCharOfNumber === 0 ||
		(lastCharOfNumber >= 5 && lastCharOfNumber <= 9) ||
		(number >= 10 && number <= 20)
	) {
		return hash["0;5-20"];
	}
	if (lastCharOfNumber === 1) return hash["1"];
	if (lastCharOfNumber >= 2 && lastCharOfNumber <= 4) return hash["2-4"];
	return hash["1"];
};

export const commentEnducement = (commentNumber: number) => {
	return enducement(commentNumber, [
		"комментариев",
		"комментарий",
		"комментария",
	]);
};

export const hoursEnducement = (hoursNumber: number) => {
	return enducement(hoursNumber, ["часов", "час", "часа"]);
};

export const minutesEnducement = (minutesNumber: number) => {
	return enducement(minutesNumber, ["минут", "минута", "минуты"]);
};
