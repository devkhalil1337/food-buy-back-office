export enum FormatType {
    currency = 'currency',
    currencyFixed = 'currencyFixed',
    currencyWhole = 'currencyWhole',
    percentage = 'percentage',
    percentage100 = 'percentage100',
    percentageWhole = 'percentageWhole',
    number = 'number',
    trimmedNumber = 'trimmedNumber',
    decimal = 'decimal',
    shortHandNumber = 'shortHandNumber',
    shortHandCurrency = 'shortHandCurrency',
    trimmedCurrency = 'trimmedCurrency',
    string = 'string'
  }

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

  export const AppRegex = {
    isFlywheelEmail: '@flywheeldigital.com',
    wordFirstLetter: /(^[a-z]|[ .,\(\)\[\]]+[a-z])/g,
    EmailRegex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-z]{2,4}$/gi,
    IsSigned: /^[-+](?:\S+)?$/,
    IsNumber: /^(?:\d{1,18})?$/,
    IsNegativeNumber: /^[-+](?:\d{1,11})$/,
    IsDecimal: /^(?:\d{1,18})?(?:\.\d+)?$/,
    isNegativeDecimal: /^[-+](?:\d{1,11})(?:\.\d+)?$/,
    Image: /https?:[^\s]+?\.(gif|jpg|jpeg|tiff|png)(\.[^\s]+?\.(gif|jpg|jpeg|tiff|png))?/gi,
    KeywordQuery: /[A-Z]/,
    KeywordCampaign: /[-&+\[\]'"\s\n\t\ra-zA-Z0-9®ÁÉÍÑÓÚÜáéíñóúüÄÖŒßäöÀÂÆÇÈÊËÎÏÔÙÛŸàâæçèéêëîïôùûÿœ\u{3000}-\u{309F}\u{30A0}-\u{30FF}\u{4E00}-\u{9FFF}\u{FF00}-\u{FFEF}]+/mu,
    KeywordCampaignPartSpacing: /\s*-\s*/g,
    KeywordCampaignExcessSpacing: /^\s+|\s+$|\s+(?=\s)/g,
    routeParams: /:[^\/\s]+/gi,
    selectizeSplitOn: /[, ]/,
    regexEscapeChar: /[\[\]\{\}\(\)\*\+\?\.\\\^\$\|]/g,
    isURL: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
    isPositiveTwoDecimal:/^\d+(\.\d{1,2})?$/g
  };

  export const AppDefaults = {
    // minDate: moment('2015-01-01'),
    fractionDigits: 2,
    shortHandDigits: 3,
    chartAutoRotationLimit: 7,
    shortHandUnits: ['K', 'MM', 'B', 'T', 'Q'],
    csqSearch: '/s/ref=nb_sb_ss_sc_7_6?url=search-alias%3Daps&field-keywords=',
    csqSearchWmt: '/search/?query='
  };

  export enum GridColumnType {
    number = 'number',
    numberColored = 'number-colored',
    decimal = 'decimal',
    decimalShort = 'decimal-short',
    currency = 'currency',
    currencyWhole = 'currency-whole',
    currencyShort = 'currency-short',
    currencyLocalized = 'currency-local',
    currencyBU = 'currency-bu',
    percentageWhole = 'percentageWhole',
    percentage100 = 'percentage100',
    percentage = 'percentage',
    date = 'date',
    dateTime = 'dateTime',
    dateTime24 = 'dateTime24',
    dateTimeAlpha = 'dateTimeAlpha',
    text = 'text',
    boolean = 'boolean',
    set = 'set'
  }

  export const ToasterDefaults = {
    toasterTimeout: 3600,
    exportToasterTimeout: 3000,
    theme: 'metroui',
    layout: 'topRight',
    closeWith: ['click'],
    exportCloseWith: ['click', 'button'],
    maxVisible: 1,
    modalQueue: 'modal-queue'
  };