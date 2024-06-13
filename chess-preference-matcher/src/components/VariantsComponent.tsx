'use client'

import MultipleSelectComponent from './MultipleSelectComponent'

export default function VariantsComponent() {
  const variants = require('../data/variants.json')
  return <MultipleSelectComponent options={variants} settingsAttr={'variants'} dropDownTitle={'Variants'} />
}
