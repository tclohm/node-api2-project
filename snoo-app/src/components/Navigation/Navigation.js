import React, { useState } from "react";
import { Route, NavLink as RouteLink } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap';

import { Home } from "../Home";
import { Reader, ReaderDetail } from "../Reader";


export const Navigation = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color="clear" light expand="sm">
				<Container fluid={true}>
					<NavbarBrand>
						<RouteLink className="text-dark" to="/">
							<i className="fab fa-reddit fa-2x"></i>
						</RouteLink>
					</NavbarBrand>
					<NavbarToggler className="text-light" onClick={toggle} />
					<Collapse isOpen={isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<RouteLink className="text-dark" to="/reader">
									<i className="fas fa-comments fa-2x"></i>
								</RouteLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
			<Route exact path="/" component={Home} />
			<Route exact path="/reader" component={Reader} />
			<Route path="/reader/:id" {...props} render={props => {return <ReaderDetail {...props} /> }} />
		</div>
	);
}