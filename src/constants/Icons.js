import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import BOOK from '../assets/svg/Black.svg'
import DAIRY from '../assets/svg/Diary.svg'
import ACADEMIC from '../assets/svg/academic.svg'
import ADD from '../assets/svg/add.svg'
import BACK from '../assets/svg/back.svg'
import BELL from '../assets/svg/bell.svg'
import BELL_BLACK from '../assets/svg/bell_black.svg'
import BELL_BLACK_DARK from '../assets/svg/bell_black_dark.svg'
import BELL_DARK from '../assets/svg/bell_dark.svg'
import CHECKS_BLACK from '../assets/svg/check_black.svg'
import CHECKS_BLACK_DARK from '../assets/svg/check_black_dark.svg'
import CHECKS_DARK from '../assets/svg/check_dark.svg'
import CHECKS from '../assets/svg/checks.svg'
import CROSS from '../assets/svg/cross-svgrepo-com.svg'
import DOC from '../assets/svg/doc.svg'
import DOC_BLACK from '../assets/svg/doc_Black.svg'
import DOC_BLACK_DARK from '../assets/svg/doc_black_dark.svg'
import DOC_DARK from '../assets/svg/doc_dark.svg'
import EYE from '../assets/svg/eye.svg'
import GOOGLE from '../assets/svg/google.svg'
import TICK from '../assets/svg/icons8-tick.svg'
import INTEL from '../assets/svg/intel.svg'
import INTEL_BLACK from '../assets/svg/intel_dark.svg'
import OTHERS from '../assets/svg/others.svg'
import PERSONAL from '../assets/svg/personal.svg'
import PIECHART from '../assets/svg/piechart.svg'
import PIECHART_BLACK from '../assets/svg/piechartBlack.svg'
import PLUS2 from '../assets/svg/plus-svgrepo-com.svg'
import SEARCH from '../assets/svg/search.svg'
import SETTING from '../assets/svg/setting.svg'
import SETTING_BLACK from '../assets/svg/setting_black.svg'
import SETTINGS_BLACK_DARK from '../assets/svg/setting_black_dark.svg'
import SETTINGS_DARK from '../assets/svg/setting_dark.svg'
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
  SEARCH: (...params) => <SEARCH {...iconStyle(...params)} />,
  BACK: (...params) => <BACK {...iconStyle(...params)} />,
  BOOK: (...params) => <BOOK {...iconStyle(...params)} />,
  EYE: (...params) => <EYE {...iconStyle(...params)} />,
  PLUS2: (...params) => <PLUS2 {...iconStyle(...params)} />,
  TICK: (...params) => <TICK {...iconStyle(...params)} />,
  GOOGLE: (...params) => <GOOGLE {...iconStyle(...params)} />,
  CROSS: (...params) => <CROSS {...iconStyle(...params)} />,
  DOC_BLACK: (...params) => <DOC_BLACK {...iconStyle(...params)} />,
  CHECKS_BLACK: (...params) => <CHECKS_BLACK {...iconStyle(...params)} />,
  BELL_BLACK: (...params) => <BELL_BLACK {...iconStyle(...params)} />,
  SETTING_BLACK: (...params) => <SETTING_BLACK {...iconStyle(...params)} />,
  INTEL_BLACK: (...params) => <INTEL_BLACK {...iconStyle(...params)} />,
  SETTINGS_DARK: (...params) => <SETTINGS_DARK {...iconStyle(...params)} />,
  SETTINGS_BLACK_DARK: (...params) => <SETTINGS_BLACK_DARK {...iconStyle(...params)} />,
  BELL_BLACK_DARK: (...params) => <BELL_BLACK_DARK {...iconStyle(...params)} />,
  CHECKS_BLACK_DARK: (...params) => <CHECKS_BLACK_DARK {...iconStyle(...params)} />,
  BELL_DARK: (...params) => <BELL_DARK {...iconStyle(...params)} />,
  DOC_DARK: (...params) => <DOC_DARK {...iconStyle(...params)} />,
  CHECKS_DARK: (...params) => <CHECKS_DARK {...iconStyle(...params)} />,
  DOC_BLACK_DARK: (...params) => <DOC_BLACK_DARK {...iconStyle(...params)} />,
  PIECHART_BLACK: (...params) => <PIECHART_BLACK {...iconStyle(...params)} />,

}