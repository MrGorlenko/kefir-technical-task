import { CommentAndAuthor } from "src/interface";
import { formatTimeAgo, isCommentLiked } from "src/utils";
import { HeartIcon } from "../icons/heart";

interface comment {
	comment: CommentAndAuthor;
	likedCommentIds: number[];
	setLikeHandler(comment: CommentAndAuthor): void;
}

export const CommentWidget = (props: comment) => {
	return (
		<div className='d-flex mb-5 position-relative'>
			<div>
				<img
					src={props.comment.author.avatar}
					alt={props.comment.author.name}
					className='rounded-circle object-fit-cover comment-avatar'
				/>
			</div>
			<div className='ps-4'>
				<p className='text-start mb-0'>{props.comment.author.name}</p>
				<p className='text-start mb-0 text-secondary'>
					{formatTimeAgo(props.comment.comment.created)}
				</p>
				<p className='text-start mb-0 mt-2'>{props.comment.comment.text}</p>
			</div>

			<div
				className='position-absolute d-flex align-items-center gap-2 like-wrapper'
				style={{ right: "5px", top: "5px" }}
				onClick={() => props.setLikeHandler(props.comment)}
			>
				<HeartIcon
					type={
						isCommentLiked(props.likedCommentIds, props.comment)
							? "red-filled"
							: "red-unfilled"
					}
					width={20}
					height={20}
				/>
				{props.comment.comment.likes}
			</div>
		</div>
	);
};
