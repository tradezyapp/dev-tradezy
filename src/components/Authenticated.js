import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Radio } from "@material-ui/core";
import axios from 'axios'




const Authenticated = ({classes}) => {

	const [brokerageAccounts, setBrokerageAccounts] = useState(null);
    const [confirm, setConfirm] = useState(false);
	const [brokerageId, setBrokerageId] = useState(null)
    const [checked, setChecked] = useState(false);

	useEffect(async () => {

		const uuid = localStorage.getItem('uuidLogin')
		
		const { data } = await axios.get(`/td/authenticate/user/${uuid}`);

		const { brokerageAccounts } = data;

		setBrokerageAccounts(brokerageAccounts);
	},[])

		const confirmAccount = async () => {
			const uuid = localStorage.getItem("uuidLogin");

			const body = {
				UserId: uuid,
				BrokerageAccountId: brokerageId,
				Brokerage: "String",
				AccountType: "String",
			};


			const options = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const { data } = await axios.post("/account/register", body, options);

			console.log(data);
		};

		const accountSelect = (e) => {
			setChecked(true)
			setBrokerageId(e.target.value)
		}

function createData(name, AccountId, AccountType, Balance, Status) {
	return { name, AccountId, AccountType, Balance, Status };
}

let rows = [
	createData("", 12451345, "Cash", 7345,"Subscribed"),
	createData("", 13255412, "Margin", 9832,"Subscribed"),
];

const GreenRadio = withStyles({
	root: {
		color: "#7968e6ad",
		"&$checked": {
			color: "#7968e6",
		},
		"&$disabled": {
			color: "#7968e675",
		},
	},
	checked: {},
})((props) => <Radio color="default" {...props} />);
    return (
					<div className={classes.content}>
						<div>
							<h1>Account</h1>
							<h4>
								Status: <span style={{ fontWeight: "200" }}>Authenticated</span>
							</h4>
						</div>

						{!brokerageAccounts && (
							<>
								<div>
									<Paper className="container">
										<Table aria-label="simple table">
											<TableHead>
												<TableRow>
													<TableCell></TableCell>
													<TableCell className={classes.tabular} align="left">
														Account Id
													</TableCell>
													<TableCell className={classes.tabular} align="left">
														Account Type
													</TableCell>
													<TableCell className={classes.tabular} align="left">
														Balance
													</TableCell>
													<TableCell className={classes.tabular} align="left">
														Status
													</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{rows.map((row, index) => (
													<TableRow key={row.AccountId}>
														<TableCell component="th" scope="row">
															<GreenRadio
																className={classes.radioBut}
																disabled={index >= 1}
																checked={index < 1 && checked}
																value={1}
																onClick={(e) => accountSelect(e)}
															/>
														</TableCell>
														<TableCell align="left">{row.AccountId}</TableCell>
														<TableCell align="left">{row.AccountType}</TableCell>
														<TableCell align="left">{row.Balance}</TableCell>
														<TableCell align="left">
															{confirm && checked && index < 1 ? row.Status : ""}
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</Paper>
								</div>

								<div className="note">
									<span style={{ fontWeight: "600", fontStyle: "normal" }}>Note:</span>{" "}
									Only the 123456 account can be selected, as it is the primary account.
									If you would like to select any other account, please re-authenticate
									using credentials of the primary account.
								</div>
							</>
						)}

						<div className="authenticatedButtonContaier">
							<div className="authenticateRightShift">
								<button
									className="buttons"
									disabled={!checked}
									onClick={() => {
										confirmAccount();
										setConfirm(true);
									}}
								>
									Confirm Account
								</button>
							</div>
							<div className="authenticateRightShift">
								<button className="buttons">Unauthenticate TD Ameritrade</button>
							</div>
						</div>
					</div>
				);
}

export default Authenticated
