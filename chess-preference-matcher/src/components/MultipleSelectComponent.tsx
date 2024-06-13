'use client'
// Adapted from: https://stackoverflow.com/questions/69384972/material-ui-select-multiple-selection-in-array 

import { AppBar, Box, Toolbar, Container, Button, Avatar, Menu, MenuItem, Link } from "@mui/material";
import { useState, useContext } from "react"
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

export default function MultipleSelectComponent(props: { optionList: string[], settingsAttr: string }) {
  const classes = useStyles()
  const { userSettings, setUserSettings } = useContext(UserSettingsContext)
  const { optionList, settingsAttr } = props
  const selectedList = get(userSettings, settingsAttr)

  const setUserSettingsAttr = (newSelectedList) => {
    setUserSettings(update(userSettings, props.settingsAttr, newSelectedList))
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">
          Openings 
        </InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={optionList}
          name="first"
          onChange={event => setUserSettingsAttr(event.target.value)}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selectedList) => selectedList.join(", ")}
        >
          {props.optionList?.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedList?.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}