'use client'
// Adapted from: https://stackoverflow.com/questions/69384972/material-ui-select-multiple-selection-in-array 

'use client'

import { AppBar, Box, Toolbar, Container, Button, Avatar, Menu, MenuItem, Link } from "@mui/material";
import { useState } from "react"
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

export default function MultipleSelectComponent(props: { optionList: string[], saveToDb: Function }) {
  const classes = useStyles();
  const [selectedOptionList, setSelectedOptionList] = useState([]);

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
          value={selectedOptionList}
          name="first"
          onChange={event => setSelectedOptionList(event.target.value)}
          onClose={_ => saveToDb(selectedOptionList)}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {props.optionList.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedOptionList.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}