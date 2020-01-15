import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Table } from "reactstrap";

import "../../App.css";

export const ReaderDetail = (props) => {
	const id = props.match.params.id;
	const [obj, setObj] = useState([]);
	const [comments, setComments] = useState([]);

	useEffect(() => {
		if(obj.length === 0) {
			axios.get(`http://www.localhost:4000/api/posts/${id}`)
				 .then(res => {
				 	setObj(res.data[0]);
				 })
				 .catch(err => {
				 	console.log(err);
				 })
		}
	}, [obj])

	useEffect(() => {
		axios.get(`http://www.localhost:4000/api/posts/${id}/comments`)
			 .then(res => {
			 	setComments(res.data)
			 })
			 .catch(err => {
			 	console.log(err);
			 })
	}, [obj]);


	const getMonthAndYear = (a) => {
		console.log(typeof a)
	}


	return (
		<div>
			<Container>
				<Row>
					<Col xs={{ size: 11, offset: 1}}>
						<h5>{obj.title}</h5>
					</Col>
				</Row>
				<Row>
					<Col>
						<p>{comments.length} comments</p>
					</Col>
				</Row>
				<Table bordered dark>
					<tbody>
				{comments.map(com => (
					<tr>
					{com.text}
					<td>created at {com.created_at}</td>
					</tr>
				))}
					</tbody>
				</Table>
			</Container>
		</div>
	);
};