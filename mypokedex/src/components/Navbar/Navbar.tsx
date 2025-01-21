import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useSearch } from "../SearchContext";

const pages = [
  { name: "Liste", link: "/" },
  { name: "Genre", link: "/gender" },
  { name: "A propos", link: "/about" },
];

function Navbar() {
  const { setSearch } = useSearch();

  const [anchorElNav, setAnchorElNav] = React.useState<HTMLElement | null>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="navbar-container">
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#C62828" }}
        elevation={0}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Mettre un logo ici */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#1B1B1B",
                textDecoration: "none",
              }}
            >
              POKEDEX
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      <Button
                        href={page.link}
                        key={page.name}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 1, color: "black", display: "block" }}
                      >
                        {page.name}
                      </Button>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* Mettre un logo ici */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              POKEDEX
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  href={page.link}
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "#1B1B1B", display: "block" }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
            <input
              onChange={handleSearch}
              type="search"
              id="pokemon-search"
              placeholder="Recherche"
              className="p-1 rounded-sm text-black max-sm:w-1/2"
            />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default Navbar;
