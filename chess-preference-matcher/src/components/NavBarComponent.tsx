'use client'

import { AppBar, Box, Toolbar, Container, Button, Avatar, Menu, MenuItem, Link } from "@mui/material"
import { UserSettingsContext } from "../context/UserSettingsContext"
import { signIn, signOut } from "../app/firebase"
import { useState, useContext } from "react" 

function LoginButton() {
  const { user } = useContext(UserSettingsContext)
  const [anchorEl, setAnchorEl] = useState(null)

  function logOutAndCloseMenu() {
    setAnchorEl(null)
    signOut()
  }

  if (user) {
    return (
      <>
        <Button color="inherit" onClick={(event) => setAnchorEl(event.currentTarget)}>
          <Avatar alt={user.displayName} src={user.photoURL} />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={_ => setAnchorEl(null)}
        >
          <MenuItem component={Link} href="/profile">Profile</MenuItem>
          <MenuItem linkButton={true} onClick={logOutAndCloseMenu}>Logout</MenuItem>
        </Menu>
      </>
    )
  } else {
    return <Button color="inherit" onClick={signIn}><Avatar /></Button>
  }
}

export default function NavBarComponent(){
  const sections = {"Chess Preference Matcher": "/"}
  
  return (
    <header>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
              {Object.keys(sections).map((section, i) => (
              <Link key={i} href={sections[section]}>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  {section}
                </Button>
              </Link>
              ))}
            </Box>

           <LoginButton />
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  )
}
