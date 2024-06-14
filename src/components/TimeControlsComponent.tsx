'use client'

import MultipleSelectComponent from './MultipleSelectComponent'

export default function TimeControlsComponent() {
  const timeControls = require('../data/timeControls.json')
  return <MultipleSelectComponent options={timeControls} settingsAttr={'timeControls'} dropDownTitle={'Time Controls'} />
}
