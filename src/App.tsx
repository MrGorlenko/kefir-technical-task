import React, { useEffect, useState, useCallback } from "react";
import useMockAdapter from "./api/useMockAdapter";
import { CommentAndAuthor, Comment } from "./interface";
import {
	fetchAuthors,
	fetchComments,
	generateCommentWithAuthors,
	doesCommentHaveChild,
	getChildrenById,
	calculateTotalComments,
	calculateTotalLikes,
} from "./utils";
import { CommentsHeaderWidget } from "./components/widgets/comments-header";
import { LoadingWidget } from "./components/widgets/loading";
import { Button } from "./components/button";
import { CommentWidget } from "./components/widgets/comment";
import "./App.css";

function App() {
	useMockAdapter();

	const [commentsWithAuthors, setCommentsWithAuthors] = useState<
		CommentAndAuthor[]
	>([]);
	const [totalCommentsCount, setTotalCommentsCount] = useState<number>(0);
	const [totalLikesCount, setTotalLikesCount] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [likedCommentIds, setLikedCommentIds] = useState<number[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [loadingButton, setLoadingButton] = useState<boolean>(false);

	const fetchCommentsHandler = useCallback(
		async (page: number): Promise<Comment[]> => {
			try {
				const comments = await fetchComments(page);
				return comments;
			} catch (error) {
				return new Promise((resolve) =>
					setTimeout(() => resolve(fetchCommentsHandler(page)))
				);
			}
		},
		[]
	);

	const initDataHandler = useCallback(async () => {
		try {
			const authors = await fetchAuthors();
			const comments1 = await fetchCommentsHandler(1);
			const comments = [...comments1];

			setTotalCommentsCount(calculateTotalComments(comments));
			setTotalLikesCount(calculateTotalLikes(comments));
			const data = await generateCommentWithAuthors(authors, comments);
			setCommentsWithAuthors(data);
			setLoading(false);
			setCurrentPage(1);
		} catch (error) {
			console.error("Error initializing data:", error);
		}
	}, [fetchCommentsHandler]);

	const setLikeHandler = (commentWithAuthor: CommentAndAuthor) => {
		const isCommentLiked = likedCommentIds.includes(
			commentWithAuthor.comment.id
		);
		if (isCommentLiked) {
			const newLikedCommentsIds = [...likedCommentIds].filter(
				(id) => id !== commentWithAuthor.comment.id
			);
			const newCommentsWithAuthor = commentsWithAuthors.map((comment) => {
				if (comment.comment.id === commentWithAuthor.comment.id)
					return {
						...comment,
						comment: {
							...comment.comment,
							likes: comment.comment.likes - 1,
						},
					};
				return comment;
			});
			setTotalLikesCount(totalLikesCount - 1);
			setCommentsWithAuthors(newCommentsWithAuthor);
			setLikedCommentIds(newLikedCommentsIds);
			return;
		}
		const newLikedCommentsIds = [
			...likedCommentIds,
			commentWithAuthor.comment.id,
		];
		const newCommentsWithAuthor = commentsWithAuthors.map((comment) => {
			if (comment.comment.id === commentWithAuthor.comment.id)
				return {
					...comment,
					comment: {
						...comment.comment,
						likes: comment.comment.likes + 1,
					},
				};
			return comment;
		});
		setTotalLikesCount(totalLikesCount + 1);
		setCommentsWithAuthors(newCommentsWithAuthor);
		setLikedCommentIds(newLikedCommentsIds);
		return;
	};

	const loadMoreCommentsHandler = async () => {
		if (currentPage >= 3 || loadingButton === true) return;
		try {
			setLoadingButton(true);
			const authors = await fetchAuthors();
			const commentPrev = [...commentsWithAuthors];

			const page = currentPage + 1;
			const nextComments = await fetchCommentsHandler(page);
			const data = await generateCommentWithAuthors(authors, nextComments);
			const newComments = [...commentPrev, ...data];

			setTotalCommentsCount(newComments.length);
			setTotalLikesCount(calculateTotalLikes(newComments));

			setCommentsWithAuthors(newComments);
			setLoadingButton(false);
			setCurrentPage(page);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		initDataHandler();
	}, [initDataHandler]);

	return (
		<div className='App pb-4'>
			{loading ? (
				<LoadingWidget />
			) : (
				<div className='app-container text-light pt-3'>
					<CommentsHeaderWidget
						totalCommentsCount={totalCommentsCount}
						totalLikesCount={totalLikesCount}
					/>
					<hr className='border-1 opacity-25 mb-5'></hr>

					{commentsWithAuthors.map((comment) => {
						if (!comment.comment.parent)
							return (
								<div key={comment.comment.id} className=''>
									<CommentWidget
										comment={comment}
										likedCommentIds={likedCommentIds}
										setLikeHandler={(comment) => setLikeHandler(comment)}
									/>

									{doesCommentHaveChild(
										commentsWithAuthors.map(
											(commentWithAuthor) => commentWithAuthor.comment
										),
										comment.comment.id
									) ? (
										<>
											{getChildrenById(
												commentsWithAuthors,
												comment.comment.id
											).map((childComment) => (
												<div
													key={childComment.comment.id}
													className='child-comment-wrapper'
												>
													<CommentWidget
														comment={childComment}
														likedCommentIds={likedCommentIds}
														setLikeHandler={() => setLikeHandler(childComment)}
													/>
												</div>
											))}
										</>
									) : (
										<></>
									)}
								</div>
							);
						return <React.Fragment key={comment.comment.id}></React.Fragment>;
					})}

					{currentPage < 3 ? (
						<div className='flex justify-center'>
							<Button onClick={loadMoreCommentsHandler}>
								{loadingButton ? "Загрузка..." : "Загрузить еще"}
							</Button>
						</div>
					) : (
						<></>
					)}
				</div>
			)}
		</div>
	);
}

export default App;
