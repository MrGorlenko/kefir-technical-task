import HeartBlackUnfilled from "../../assets/heart-black-unfilled.svg";
import HeartRedUnfilled from "../../assets/heart-red-unfilled.svg";
import HeartRedFilled from "../../assets/heart-red-filled.svg";
import HeartGreyUnfilled from "../../assets/heart-grey-unfilled.svg";

interface heart {
	type: "red-filled" | "red-unfilled" | "black-unfilled" | "grey-unfilled";
	width: number;
	height: number;
	onClick?(): void;
}

export const HeartIcon = (props: heart) => {
	const pathHash = {
		"black-unfilled": HeartBlackUnfilled,
		"red-unfilled": HeartRedUnfilled,
		"red-filled": HeartRedFilled,
		"grey-unfilled": HeartGreyUnfilled,
	};

	return (
		<img
			src={pathHash[props.type]}
			alt={"heart-" + props.type}
			width={props.width + "px"}
			height={props.height + "px"}
		/>
	);
};
