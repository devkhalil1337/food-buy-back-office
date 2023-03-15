import * as moment from "moment";

export const DateFormats = {
    default: 'YYYY-MM-DD',
    dateSlash: 'MM/DD/YYYY',
    dateAlphaMonth: 'MMM D, YYYY',
    dateTimeAlphaMonth: 'MMM D, YYYY hh:mm a',
    dateTimeSlash24hr: 'MM/DD/YYYY HH:mm',
    dateTimeSlash24hrSs: 'MM/DD/YYYY HH:mm:ss',
    dateYearMonth: 'YYYY-MM',
    dateYearMonthText: 'MMM-YYYY',
    dateTime12hrInverted: 'hh:mm a  -  D MMM, YYYY',
    dateTime12hr: 'YYYY-MM-DD hh:mm a',
    dateTime24hrSlash: 'YYYY-MM-DD HH:mm:ss',
    dateTime24hr: 'YYYY-MM-DD HH:mm:ss',
    defaultChart: 'DD-MM-YYYY',
    dateYearMonthNoDash: 'MMM, YYYY',
  
  };

  export const AppDefaults = {
    minDate: moment('2015-01-01'),
    fractionDigits: 2,
    shortHandDigits: 3,
    chartAutoRotationLimit: 7,
    shortHandUnits: ['K', 'MM', 'B', 'T', 'Q'],
    csqSearch: '/s/ref=nb_sb_ss_sc_7_6?url=search-alias%3Daps&field-keywords=',
    csqSearchWmt: '/search/?query='
  };