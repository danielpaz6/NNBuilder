import * as React from 'react';

const Defs: React.FunctionComponent<{}> = (props) => {
	return (
		<defs>	
		<marker orient='auto' id="arrow" refX="0" refY="7"
			markerWidth="80" markerHeight="80">
			<polygon
					points="2,7 0,0 11,7 0,14"
					stroke="red"
					fill="red" 
				/>
		</marker>

		<marker orient='auto' id="bigArrow" refX="2.5" refY="2.2"
			markerWidth="80" markerHeight="80">
			<polygon
					points="2,7 0,0 11,7 0,14"
					stroke="#7788b0"
					fill="#7788b0"
					transform="scale(0.3)"
				/>
		</marker>

		<marker orient='auto' id="bigArrowActive" refX="2.5" refY="2.2"
			markerWidth="80" markerHeight="80">
			<polygon
					points="2,7 0,0 11,7 0,14"
					stroke="red"
					fill="red"
					transform="scale(0.3)"
				/>
		</marker>

		<marker orient='auto' id="smallArrow" refX="1" refY="4"
			markerWidth="20" markerHeight="20">
			<polygon
					points="2,7 0,0 11,7 0,14"
					stroke="#909da6"
					fill="#909da6"
					transform="scale(0.5)"
				/>
		</marker>
	</defs>	
	);
};

export default Defs;
