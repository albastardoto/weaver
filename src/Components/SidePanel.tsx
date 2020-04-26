import {
  AppBar,
  Box,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import React, { FC } from "react";
import { Suggestion } from "../store/room/suggestions/types";
import ChatBox from "./ChatBox/ChatBox";
import SuggestionsList from "./Suggestions/SuggestionsList";

export interface SidePanelProps {
  suggestions: Suggestion[];
}

const SidePanel: FC<SidePanelProps> = (props) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const classes = makeStyles({
    appbar: {
      background: "#2E3B55",
      height: "52px",
    },
    sidebar: {
      maxWidth: "95vw",
      margin: "0 auto",
      alignSelf: "stretch",
      display: "flex",
      flexDirection: "column",
    },
    tab: {
      flex: "1 1 auto",
    },
  })();
  return (
    <Grid item xs={12} md={3} lg={3} className={classes.sidebar + " SidePanel"}>
      <AppBar position="static" className={classes.appbar}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          variant="fullWidth"
          centered
        >
          <Tab
            icon={<VideoLibraryIcon />}
            aria-label="playlist"
            {...a11yProps(0)}
          />
          <Tab icon={<ChatIcon />} aria-label="chat" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <SuggestionsList suggestions={props.suggestions} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChatBox />
      </TabPanel>
    </Grid>
  );
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box height="100%" p={0}>
          {children}
        </Box>
      )}
    </Typography>
  );
}
export default SidePanel;
