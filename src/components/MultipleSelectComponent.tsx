'use client'
// Adapted from: https://stackoverflow.com/questions/69384972/material-ui-select-multiple-selection-in-array 

import { AppBar, Box, Toolbar, Container, Button, Avatar, Menu, MenuItem, Link } from "@mui/material";
import { useState, useContext, useEffect } from "react"
import { update, get } from "lodash"
const { UserSettingsContext } = require('../context/UserSettingsContext')

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Input, OutlinedInput } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function MultipleSelectComponent(props: { options: string[], settingsAttr: string, dropDownTitle: string }) {
  const classes = useStyles()
  const { options, settingsAttr, dropDownTitle } = props 

  const { user, settings, setSettingsByAttribute, saveSettingsToDb } = useContext(UserSettingsContext)
  const [selected, setSelected] = useState([])

  useEffect(() => setSelected(get(settings, settingsAttr)), [settings])

  function handleClose(_) {
    console.log(`handleClose. selected: ${selected}`)
    setSettingsByAttribute(settingsAttr, [...selected])
    if (user) {
      saveSettingsToDb()
    }
  }

  if (!Array.isArray(selected)) {
    return <div></div>
  } else {
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">
             {dropDownTitle}
          </InputLabel>
          <Select
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple
            value={selected}
            name="first"
            onChange={event => setSelected(event.target.value)}
            onClose={handleClose}
            input={<OutlinedInput label="Tag" />}
            renderValue={selected => selected.join(", ")}
          >
            {options.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={selected.includes(name)} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}