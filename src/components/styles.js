const drawerWidth = 240;
export const styles = (theme) => ({
	root: {
		flexGrow: 1,
		height: "auto",
		zIndex: 1,
		overflow: "auto",
		position: "relative",
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		backgroundColor: "#7868e6",
	},
	appBarShift: {
		marginLeft: 0,
		width: "100%",
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		[theme.breakpoints.up("md")]: {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
		},
	},
	menuButton: {
		marginLeft: 0,
		marginRight: 36,
	},
	drawerPaper: {
		width: drawerWidth,
    color: '#5a5673',
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		[theme.breakpoints.up("md")]: {
			position: "relative",
		},
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: 70,
		[theme.breakpoints.up("sm")]: {
			width: 70,
		},
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		backgroundColor: "#fff",
		padding: theme.spacing(2),
		marginTop: "50px",
	},
	radioBut: {
		color: "#7868e6",
		"&$checked": {
			color: "#7868e675",
		},
	},
	tabular: {
    color: '#5a5673',
	fontWeight:'700'
}
});
