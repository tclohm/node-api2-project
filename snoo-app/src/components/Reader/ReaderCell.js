import React from "react";
import { Link } from "react-router-dom";
import { Table, Media } from "reactstrap";

export const ReaderCell = (props) => {

	const { id, title, contents } = props;

	const linkTo = `reader/${id}`

	return (
		<tr>
			<Link to={linkTo}>
				<Media key={id}>
					<Media body>
						<Media heading>
							{title}
						</Media>
						{contents}
					</Media>
				</Media>
			</Link>
		</tr>
	);
};