
const primary = {
    veryLightGrey: "#f6f6f6",
    lightgrey : '#777777',
    tintColor : '#2f95dc',
    red : '#a74230',
    white : '#ffffff',
    cyan: '#49b675',
    softGrey: "#d6d6d6",
    lightSoftGrey: "#e0e0e0",
    lightGreen: "#8bed45",      // was "#bbed45",
    inspektBlue: "#0097D3",    // rbg 0, 151, 211  // was "#2e86c1",       
  
  
  }
  
  export default {
    ...primary,
    secondary : '#EC5A1C',
    greyWebTitle : '#777777',
    tabIconDefault: '#ccc',
    tabIconSelected: primary.tintColor,
    tabBar: '#fefefe',
    errorBackground: '#ed1a0a',
    errorText: '#fff',
    warningBackground: '#EAEB5E',
    warningText: '#666804',  
    positiveText: '#57c81e',
    noticeBackground: primary.tintColor,
    noticeText: '#fff',
    anthracite : '#333d40',
    quetzalGreen: '#006E6D',
    desktopFolders: '#767676',
    selectedBlue: '#4b8cce',
    inspektYellow: "#FFB347",    
    lightSilver: "#ededed",
    lightOrange: "#edd818",
    darkOrange: "#f78b31",
    lightYellow: "#d1eb2a",     // was "#e4eb2a"
    requiredFields: "#ff9e4a",  // orange : 255, 158, 74 (#ff9e4a)
  
    /* StatusSnackBar colors */
    successGreen: primary.inspektBlue, // "#4bb543",      // background
    warningOrange: "#f29d13",     // background
    snackBarText: "#fff",          // all status text
  
    /* login inputs */
    loginInputsPlaceholder: '#717171',
  
    /* expertises list */
    expertiseCardBackground: primary.lightSoftGrey,
    activeExpertiseCard: primary.inspektBlue,
    emptyExpertisesListBackground: primary.lightSoftGrey
  
    
  };
  