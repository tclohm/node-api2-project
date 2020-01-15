import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";

import { ReaderCell } from ".";

export const Reader = (props) => {

	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get("http://www.localhost:4000/api/posts")
			 .then(res => {
			 	setData(res.data);
			 })
			 .catch(err => {
			 	console.log(err);
			 })
	}, [data])

	return (
		<Container>
			<Row>
				<Col>
					<Table size="sm" hover>
						<tbody>
								{data.map(obj => (
									<ReaderCell id={obj.id} title={obj.title} contents={obj.contents} />
								))}
						</tbody>
					</Table>
				</Col>
			</Row>
			<Row>
				<Col xs={{ offset: 5 }}>
					<Pagination>
						<PaginationItem>
							<PaginationLink previous href="#" />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">
								1
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">
								2
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">
								3
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink next href="#" />
						</PaginationItem>
					</Pagination>
				</Col>
			</Row>
		</Container>
	);
};