import { HeartIcon } from "../icons/heart";
import { commentEnducement } from "../../utils";
interface commentsHeader {
	totalCommentsCount: number;
	totalLikesCount: number;
}

export const CommentsHeaderWidget = (props: commentsHeader) => {
	return (
		<div className='d-flex justify-content-between align-items-center'>
			<div>
				{props.totalCommentsCount} {commentEnducement(props.totalCommentsCount)}
			</div>
			<div className='d-flex align-items-center gap-2'>
				<HeartIcon type='grey-unfilled' width={20} height={20} />
				{props.totalLikesCount}
			</div>
		</div>
	);
};
