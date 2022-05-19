import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff4200",
    },
    secondary: {
      main: "#053dc8",
    },
    neutral: {
      main: "#3D4451",
    },
    accent: {
      main: "#2155d7",
    },
    "base-100": {
      main: "#FFFFFF",
    },
    info: {
      main: "#e0f2fe",
    },
    success: {
      main: "#dcfce7",
    },
    warning: {
      main: "#fef9c3",
    },
    error: {
      main: "#fee2e2",
    },
    "v-yellow-dark": {
      main: "#ffa801",
    },
    "v-yellow": {
      main: "#ffc700",
    },
    "v-gray": {
      main: "#eff3ff",
    },
    "g-one": {
      main: "#053DC8",
    },
    "g-two": {
      main: "#4E81FF",
    },
    "placeholder-color": {
      main: "#EFF3FF",
    },
    "vwanu-color-3": {
      main: "#797979",
    },
  },
});

theme.props = {
  MuiGrid: {},
  MuiButton: {
    disableElevation: true,
  },
  MuiInputLabel: {
    shrink: true,
  },
  MuiInput: {
    disableUnderline: true,
  },
  MuiTooltip: {
    arrow: false,
  },
};

theme.overrides = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 425,
      md: 768,
      lg: 1024,
      xl: 1100,
      xxl: 1440,
    },
  },
  MuiPaper: {
    root: {
      marginTop: 0,
    },
  },
  MuiButton: {
    root: {
      borderRadius: 0,
      textTransform: "none",
    },
    containedPrimary: {
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.dark,
      },
    },
    containedSecondary: {
      fontWeight: 700,
    },
  },
  MuiInputLabel: {
    root: {
      textTransform: "uppercase",
      fontSize: "1.5rem",
    },
  },
  MuiInput: {
    root: {
      top: theme.spacing(2),
      border: `1px solid #053dc8}`,
      outline: `1px solid transparent`,
      padding: theme.spacing(1),
      "&$focused": {
        border: `1px solid ${theme.palette.primary.main}`,
        outline: `1px solid ${theme.palette.primary.main}`,
      },
    },
  },
  MuiTooltip: {
    tooltip: {
      backgroundColor: "#fff",
      border: `2px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
    },
    arrow: {
      color: theme.palette.primary.main,
    },
  },
};

export default theme;
