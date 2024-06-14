'use client'

import MultipleSelectComponent from './MultipleSelectComponent'

export default function OpeningsComponent() {
  const openings = require('../data/openings.json')
  return <MultipleSelectComponent options={openings} settingsAttr={'openings'} dropDownTitle={'Openings'} />
}
