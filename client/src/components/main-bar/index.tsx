import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
import { Link } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useAuthToken } from "../../hooks/useAuthToken";
import { useUserType } from "../../hooks/useUserType";

const pages = [
    { key: 'Create movie', url: "/movie/new" },
    { key: 'Create person', url: "/person/new" },
];
const settings = [
    { key: "Profile", url: "/profile" },
    { key: "Logout", url: "" },
];

const logoIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 273.42 35.52">
    <defs>
        <linearGradient id="linear-gradient" y1="17.76" x2="273.42" y2="17.76" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#90cea1"/>
            <stop offset="0.56" stopColor="#3cbec9"/>
            <stop offset="1" stopColor="#00b3e5"/>
        </linearGradient>
    </defs>
    <title>Asset 3</title>
    <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
            <path className="cls-1"
                  d="M191.85,35.37h63.9A17.67,17.67,0,0,0,273.42,17.7h0A17.67,17.67,0,0,0,255.75,0h-63.9A17.67,17.67,0,0,0,174.18,17.7h0A17.67,17.67,0,0,0,191.85,35.37ZM10.1,35.42h7.8V6.92H28V0H0v6.9H10.1Zm28.1,0H46V8.25h.1L55.05,35.4h6L70.3,8.25h.1V35.4h7.8V0H66.45l-8.2,23.1h-.1L50,0H38.2ZM89.14.12h11.7a33.56,33.56,0,0,1,8.08,1,18.52,18.52,0,0,1,6.67,3.08,15.09,15.09,0,0,1,4.53,5.52,18.5,18.5,0,0,1,1.67,8.25,16.91,16.91,0,0,1-1.62,7.58,16.3,16.3,0,0,1-4.38,5.5,19.24,19.24,0,0,1-6.35,3.37,24.53,24.53,0,0,1-7.55,1.15H89.14Zm7.8,28.2h4a21.66,21.66,0,0,0,5-.55A10.58,10.58,0,0,0,110,26a8.73,8.73,0,0,0,2.68-3.35,11.9,11.9,0,0,0,1-5.08,9.87,9.87,0,0,0-1-4.52,9.17,9.17,0,0,0-2.63-3.18A11.61,11.61,0,0,0,106.22,8a17.06,17.06,0,0,0-4.68-.63h-4.6ZM133.09.12h13.2a32.87,32.87,0,0,1,4.63.33,12.66,12.66,0,0,1,4.17,1.3,7.94,7.94,0,0,1,3,2.72,8.34,8.34,0,0,1,1.15,4.65,7.48,7.48,0,0,1-1.67,5,9.13,9.13,0,0,1-4.43,2.82V17a10.28,10.28,0,0,1,3.18,1,8.51,8.51,0,0,1,2.45,1.85,7.79,7.79,0,0,1,1.57,2.62,9.16,9.16,0,0,1,.55,3.2,8.52,8.52,0,0,1-1.2,4.68,9.32,9.32,0,0,1-3.1,3A13.38,13.38,0,0,1,152.32,35a22.5,22.5,0,0,1-4.73.5h-14.5Zm7.8,14.15h5.65a7.65,7.65,0,0,0,1.78-.2,4.78,4.78,0,0,0,1.57-.65,3.43,3.43,0,0,0,1.13-1.2,3.63,3.63,0,0,0,.42-1.8A3.3,3.3,0,0,0,151,8.6a3.42,3.42,0,0,0-1.23-1.13A6.07,6.07,0,0,0,148,6.9a9.9,9.9,0,0,0-1.85-.18h-5.3Zm0,14.65h7a8.27,8.27,0,0,0,1.83-.2,4.67,4.67,0,0,0,1.67-.7,3.93,3.93,0,0,0,1.23-1.3,3.8,3.8,0,0,0,.47-1.95,3.16,3.16,0,0,0-.62-2,4,4,0,0,0-1.58-1.18,8.23,8.23,0,0,0-2-.55,15.12,15.12,0,0,0-2.05-.15h-5.9Z"/>
        </g>
    </g>
</svg>;

export const MainBar = () => {
    const [authToken, removeAuthToken] = useAuthToken();
    const [userType, removeUserType] = useUserType();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (menuKey: string) => {
        switch (menuKey) {
            case "Logout":
                removeAuthToken();
                removeUserType();
                break;
        }
        setAnchorElUser(null);
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (<AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Box sx={{
                    display: { xs: 'none', md: 'flex' },
                    width: 100,
                    marginX: 2
                }}>
                    {logoIcon}
                </Box>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        fontSize: 18,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    TOP 100 MOVIES
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    {userType === "admin" && <>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.key} onClick={handleCloseNavMenu}>
                                    {page.url && <Link
                                        color="inherit"
                                        underline="none"
                                        href={page.url}>
                                        {page.key}
                                    </Link>}
                                    {!page.url && <Typography textAlign="center">{page.key}</Typography>}
                                </MenuItem>
                            ))}
                        </Menu>
                    </>}
                </Box>
                <Box sx={{
                    display: { xs: 'flex', md: 'none' },
                    width: 100,
                    marginX: 2
                }}>
                    {logoIcon}
                </Box>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        fontSize: 18,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    TOP 100 MOVIES
                </Typography>
                <Box key="full-app" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {userType === "admin" && pages.map((page) => (<Link
                            key={page.key}
                            color="inherit"
                            underline="none"
                            mx="10px"
                            href={page.url}>
                            {page.key}
                        </Link>))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    {(!authToken || authToken === "undefined") && (<>
                        <Button
                            variant="text"
                            color="inherit"
                            href={"/login"}
                        >
                            Login
                        </Button>
                        <Button
                            variant="text"
                            color="inherit"
                            href={"/register"}
                        >
                            Register
                        </Button>
                    </>)}
                    {authToken && authToken !== "undefined" && (<>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Avatar icon" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting.key}
                                    onClick={() => handleCloseUserMenu(setting.key)}
                                >
                                    {setting.url && <Link
                                        color="inherit"
                                        underline="none"
                                        href={setting.url}>
                                        {setting.key}
                                    </Link>}
                                    {!setting.url && <Typography textAlign="center">{setting.key}</Typography>}
                                </MenuItem>
                            ))}
                        </Menu>
                    </>)}
                </Box>
            </Toolbar>
        </Container>
    </AppBar>);
}