import React from 'react';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import SideBar from './SideBar';
//import SchoolTable from './SchoolTable';
import TabMap from './TabMap';
import TabTable from './TabTable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`a11y-tabpanel-${index}`}
      aria-labelledby={`a11y-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div p={3}>
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function DemoTabs(props) {
  const { labelId, onChange, selectionFollowsFocus, value } = props;

  return (
    <AppBar position="static">
      <Tabs
        aria-labelledby={labelId}
        onChange={onChange}
        selectionFollowsFocus={selectionFollowsFocus}
        value={value}
      >
        <SideBar/>
        <Tab label="Rainfall Maps" aria-controls="a11y-tabpanel-0" id="a11y-tab-0" />
        <Tab label="Tabular Data" aria-controls="a11y-tabpanel-1" id="a11y-tab-1" />
        <Tab label="About" aria-controls="a11y-tabpanel-2" id="a11y-tab-2" />
      </Tabs>
    </AppBar>
  );
}

DemoTabs.propTypes = {
  labelId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectionFollowsFocus: PropTypes.bool,
  value: PropTypes.number.isRequired,
};

// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,
//   },
// });

export default function AccessibleTabs(props) {
  //const classes = useStyles();
  const classes = {root: 'testing'};

  const [value, setValue] = React.useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <DemoTabs labelId="demo-a11y-tabs-manual-label" onChange={handleChange} value={value} />
      <TabPanel value={value} index={1}>
        <TabMap
        // rainData={props.rainData}
          sites={props.sites}
          monthlyData={props.monthlyData}
          isLoading={props.isLoading}
          recalculate={props.recalculate}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabTable
          // rainData={props.rainData}
          // sites={props.sites}
          tableData={props.tableData}
          // monthlyData={props.monthlyData}
          dayColumns={props.dayColumns}
          isLoading={props.isLoading}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Three
      </TabPanel>
    </div>
  );
}