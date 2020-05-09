import React, { useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";

export type CustomToggleProps = {
	children: React.ReactNode,
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
};

export type CustomMenuProps = {
	children: React.ReactNode,
	style: React.CSSProperties,
	className: string
}

export const CustomToggle:any = React.forwardRef(
    (props: CustomToggleProps, ref?: React.Ref<HTMLButtonElement>) => {

        return (
			<button
				ref={ref}
				onClick={(e) => {
					e.preventDefault();
					props.onClick(e);
				}}
		  	>
				{props.children}
		  	</button>
        );
    },
);

export const CustomMenu:any = React.forwardRef(
    (props: CustomMenuProps, ref?: React.Ref<HTMLDivElement>) => {
		
	const [value, setValue] = useState('');

	return (
		<div
			ref={ref}
			style={props.style}
			className={props.className}
		>
		<Dropdown.Header style={{textAlign: "center"}}>Add new component</Dropdown.Header>
		<FormControl
			autoFocus
			className="mx-3 my-2 w-auto"
			placeholder="Select a layer..."
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
			value={value}
		/>
			<ul className="list-unstyled">
			{React.Children.toArray(props.children).filter(
				(child: any) =>
					!value || child.props.children.toLowerCase().startsWith(value),
			)}
			</ul>
		</div>
		);
    },
);