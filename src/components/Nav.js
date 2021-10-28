import React, { useState,useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import {
	Drawer,
	AppBar,
	Toolbar,
	List,
	Typography,
	Divider,
	IconButton,
	Hidden,
} from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import {styles} from './styles'
import Main from "./Main";
import Authenticated from './Authenticated'
import {BrowserRouter as Router, Route} from 'react-router-dom'

const Nav = ({classes}) => {

    const [open, setOpen] = useState(false)

	const resize = () => {
		setOpen(window.innerWidth >= 760);
	};

    useEffect(() => {
		window.addEventListener("resize", resize());
		resize();
	},[])



	const handleDrawerToggle = () => {
		setOpen(!open)
	};

    const { isAuthenticated, logout, loginWithPopup } = useAuth0();

    const drawer = (
					<div>
						<div className={classes.toolbar} />
						<Divider />
						{isAuthenticated ? (
							<ListItem button>
								<ListItemIcon>
									<PersonIcon style={{ color: "#7868e6" }} />
								</ListItemIcon>
								<ListItemText primary="Account" />
							</ListItem>
						) : (
							<ListItem button onClick={loginWithPopup}>
								<ListItemIcon>
									<VpnKeyIcon style={{ color: "#7868e6" }} />
								</ListItemIcon>
								<ListItemText primary="Login Required" />
							</ListItem>
						)}
						<Divider />
						{isAuthenticated ? (
							<ListItem
								button
								onClick={() => logout({ returnTo: window.location.origin })}
							>
								<ListItemIcon>
									<ExitToAppIcon style={{ color: "#7868e6" }} />
								</ListItemIcon>
								<ListItemText primary="Log Out" />
							</ListItem>
						) : (
							<List />
						)}
					</div>
				);

    

    return (
					<div className={classes.root}>
						<AppBar
							position="absolute"
							className={classNames(classes.appBar, open && classes.appBarShift)}
						>
							<Toolbar>
								<IconButton
									color="inherit"
									aria-label="open drawer"
									onClick={handleDrawerToggle}
									className={classNames(classes.menuButton)}
								>
									<MenuIcon />
								</IconButton>
								<Typography variant="h6" color="inherit" noWrap>
									TradeZy
								</Typography>
							</Toolbar>
						</AppBar>
						<Hidden mdUp>
							<Drawer
								variant="temporary"
								anchor="left"
								open={open}
								onClose={handleDrawerToggle}
								classes={{
									paper: classes.drawerPaper,
								}}
								style={{
									height: "100vh",
									borderRight: "1px solid rgb(241 241 241)",
								}}
								ModalProps={{
									keepMounted: true, // Better open performance on mobile.
								}}
							>
								{drawer}
							</Drawer>
						</Hidden>
						<Hidden smDown implementation="css">
							<Drawer
								variant="permanent"
								style={{
									height: "100vh",
									borderRight: "1px solid rgb(241 241 241)",
								}}
								classes={{
									paper: classNames(
										classes.drawerPaper,
										!open && classes.drawerPaperClose
									),
								}}
								open={open}
							>
								{drawer}
							</Drawer>
						</Hidden>
						<Router>
							<Route path="/" exact>
								<Main classes={classes} />
							</Route>
							<Route path="/dashboard" exact>
								<Authenticated classes={classes} />
							</Route>
						</Router>
					</div>
				);
}

export default withStyles(styles, { withTheme: true })(Nav);
