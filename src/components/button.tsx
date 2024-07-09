interface button {
    children: JSX.Element | string;
    onClick?(): void;
}

export const Button = (props: button) => {
    return (
        <button
            className="button-component text-light border-0 pt-1 pb-1"
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};
