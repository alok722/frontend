import React from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import {
  getAboutRoute,
  getCreateRequestRoute,
  getHomeRoute,
} from "../RouterOutlet/routerUtils";
import { useAuth } from "src/components/common/AuthProvider/View";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useBreakpoint from "src/hooks/useBreakpoint";
import useRoutes from "src/hooks/useRoutes";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import InfoIcon from "@material-ui/icons/Info";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  btnStyle: {
    margin: theme.spacing(1),
    fontWeight: 600,
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(3),
  },
}));

interface NavbarProps {
  showBack?: boolean;
  title?: string;
}

function Navbar(props: NavbarProps) {
  const { showBack, title } = props;
  const { logout, user } = useAuth();
  const classes = useStyles();
  const history = useHistory();
  const [profileBtn, setProfileBtn] = React.useState(null);
  const isUpSm = useBreakpoint("sm");
  const { isHome } = useRoutes();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isLogged = !!(user && user.email);

  const handleProfileClick = (event) => {
    setProfileBtn(event.currentTarget);
  };
  const handleProfileClose = () => {
    setProfileBtn(null);
  };
  const handleLogOut = () => {
    logout();
    history.push(getHomeRoute());
  };
  const handleRedirectHome = () => {
    history.push(getHomeRoute());
  };

  const renderActions = () => {
    return isHome ? (
      <>
        {isUpSm ? (
          <Button
            variant="contained"
            className={classes.btnStyle}
            size="small"
            color="secondary"
            onClick={() => history.push(getCreateRequestRoute())}
          >
            Create Request
          </Button>
        ) : (
          <Fab color="secondary" className={classes.fab}>
            <AddIcon onClick={() => history.push(getCreateRequestRoute())} />
          </Fab>
        )}
        {isUpSm ? (
          <Button
            variant="contained"
            size="small"
            onClick={() => history.push(getAboutRoute())}
          >
            Info
          </Button>
        ) : (
          <InfoIcon onClick={() => history.push(getAboutRoute())} />
        )}
      </>
    ) : null;
  };

  const renderMenu = () => {
    return (
      <>
        {isLogged ? (
          <IconButton color="inherit" onClick={handleProfileClick}>
            <Badge color="secondary">
              <AccountCircleIcon />
            </Badge>
          </IconButton>
        ) : (
          <></>
        )}
        <Menu
          id="simple-menu"
          anchorEl={profileBtn}
          keepMounted
          open={Boolean(profileBtn)}
          onClose={handleProfileClose}
        >
          <MenuItem>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdOIDnLsN0YSgsZTPsk09X95yde_1lE-9qS9YR5g4Y5sStCwA/viewform?usp=sf_link"
              target="blank"
            >
              Send Feedback
            </a>
          </MenuItem>
          <MenuItem disabled>{user?.displayName}</MenuItem>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </>
    );
  };

  const renderTitle = () => {
    return (
      <Typography
        component="h1"
        variant={isUpSm ? "h6" : "subtitle1"}
        color="inherit"
        noWrap
        className={classes.title}
        // onClick={handleRedirectHome}
      >
        {title || "Care for the Living"}
      </Typography>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar className={classes.toolbar}>
          {showBack ? (
            <ArrowBackIosIcon
              className={classes.btnStyle}
              onClick={handleRedirectHome}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <div />
          )}
          {renderTitle()}
          {renderActions()}
          {renderMenu()}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
