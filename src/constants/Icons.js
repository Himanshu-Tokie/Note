import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import ACADEMIC from '/Users/himanshusaha/Documents/Note/src/assets/svg/academic.svg'
import ADD from '../assets/svg/add.svg'
import BELL from '../assets/svg/bell.svg'
import CHECKS from '../assets/svg/checks.svg'
import DAIRY from '../assets/svg/Diary.svg'
import DOC from '../assets/svg/doc.svg'
import INTEL from '../assets/svg/intel.svg'
import OTHERS from '../assets/svg/others.svg'
import PERSONAL from '../assets/svg/personal.svg'
import PIECHART from '../assets/svg/piechart.svg'
import SETTING from '../assets/svg/setting.svg'
import WORK from '../assets/svg/work.svg'
const iconStyle = (
  width = 0,
  height = 0,
  color = 'black',
  borderColor = 'none',
) => ({
  width: RFValue(width),
  height: RFValue(height),
  fill: color,
  stroke: borderColor,
})

export const ICONS = {
  BELL: (...params) => <BELL {...iconStyle(...params)} />,
  DAIRY: (...params) => <DAIRY {...iconStyle(...params)} />,
  ACADEMIC: (...params) => <ACADEMIC {...iconStyle(...params)} />,
  OTHERS: (...params) => <OTHERS {...iconStyle(...params)} />,
  PERSONAL: (...params) => <PERSONAL {...iconStyle(...params)} />,
  WORK: (...params) => <WORK {...iconStyle(...params)} />,
  PIECHART: (...params) => <PIECHART {...iconStyle(...params)} />,
  CHECKS: (...params) => <CHECKS {...iconStyle(...params)} />,
  DOC: (...params) => <DOC {...iconStyle(...params)} />,
  SETTING: (...params) => <SETTING {...iconStyle(...params)} />,
  INTEL: (...params) => <INTEL {...iconStyle(...params)} />,
  ADD: (...params) => <ADD {...iconStyle(...params)} />,
}