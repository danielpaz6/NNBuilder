import * as React from 'react';
import './detailsbar.scss';

interface IDetailsBarProps {
}

const DetailsBar: React.FunctionComponent<IDetailsBarProps> = (props) => {
  return <aside className="component-info">
	  <h4 style={{textAlign: "center", textDecoration: "underline"}}>Details</h4>
  </aside>;
};

export default DetailsBar;
