import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import ACADEMIC from '../assets/Svg/academic.svg'
import ADD from '../assets/Svg/add.svg'
import BACK from '../assets/Svg/back.svg'
import BELL from '../assets/Svg/bell.svg'
import CHECKS from '../assets/Svg/checks.svg'
import DAIRY from '../assets/Svg/diary.svg'
import DOC from '../assets/Svg/doc.svg'
import INTEL from '../assets/Svg/intel.svg'
import OTHERS from '../assets/Svg/others.svg'
import PERSONAL from '../assets/Svg/personal.svg'
import PIECHART from '../assets/Svg/piechart.svg'
import SEARCH from '../assets/Svg/search.svg'
import SETTING from '../assets/Svg/setting.svg'
import WORK from '../assets/Svg/work.svg'
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
  SEARCH: (...params) => <SEARCH {...iconStyle(...params)} />,
  BACK: (...params) => <BACK {...iconStyle(...params)} />,
}