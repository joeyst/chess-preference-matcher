'use client'

import { AppBar, Box, Toolbar, Container, Button, Avatar, Menu, MenuItem, Link } from "@mui/material";
import { useState } from "react"
import { UserSettingsContext } = require('../context/UserSettings')

function OpeningsComponent() {
  const { openings, setOpenings } = useContext(UserSettingsContext)
}
