import React from 'react';
import { FullPage, Slide } from 'react-full-page';
const Devpage = ({ }) => {
	
	return (
		<FullPage controls controlsProps={{ className: "slide-navigation" }}>
			<Slide>
			<h1>Inner slide content</h1>
			</Slide>
			<Slide>
			<h1>Another slide content</h1>
			</Slide>
      </FullPage>
	);
};

export default Devpage;