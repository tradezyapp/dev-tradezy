import React, { useEffect, useCallback } from "react";
import { Typography } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { withRouter } from 'react-router-dom'

const Main = withRouter(({ history, classes }) => {		
	const { loginWithPopup, isAuthenticated, user } = useAuth0();

	const login = () => {
		loginWithPopup();
	};

	
	const userRegister = useCallback(async () => {

		const { email, given_name, family_name } = user;

		const body = {
			Email: email,
			AuthZeroId: "test",
			FirstName: given_name ? given_name : "John",
			LastName: family_name ? family_name : "Doe",
			UserType: "String",
		};
        console.log(body)
		const options = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post("/user/register", body, options);

		console.log(data);
		localStorage.setItem("uuidLogin", data);
	}, [user]);

	useEffect(()=>{
		if(isAuthenticated){
			console.log('login sent to api')
			userRegister()
		}	
	},[isAuthenticated, userRegister])

	const authenticateUser = () => {
                     
		history.push('/dashboard')

	}

	return (
		<div className={classes.content}>
			{isAuthenticated ? (
				 (
					<div>
						<h1>Account</h1>
						<h4>
							Status: <span style={{ fontWeight: "200" }}>Unauthenticated</span>
						</h4>
						<button
							className="buttons"
							onClick={() => authenticateUser()}
						>
							Authenticate to TD Ameritrade
						</button>
					</div>
				)
			) : (
				<div style={{ marginTop: "25px" }}>
					<button className="buttons" onClick={() => login()}>
						<Typography variant="button">Login</Typography>{" "}
					</button>
				</div>
			)}
		</div>
	);
}
)
export default Main;
