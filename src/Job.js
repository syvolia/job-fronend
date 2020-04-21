import React from 'react'
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { createMuiTheme, responsiveFontSizes,ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
let theme = createMuiTheme({
    typography: {
      subtitle1: {
        fontSize: 12,
      },
      h4: {
        fontSize: 15,
      },
      body1: {
        fontWeight: 500,
      },
      button: {
        fontStyle: 'italic',
      },
    },
  });
  theme = responsiveFontSizes(theme);

// todo factor these into constants file
const ONE_DAY_MS = 24*3600*1000;

// returns a date like Fri Jun 14
function getMDY(ts) {
    return ts.toDateString().split(' ').slice(0,3).join(' ')
}

// makeDate takes a TS and returns a date like Fri Jun 14
// if it's today or yesterday, it returns that instead
function makeDate(timestamp) {
    const date = new Date(timestamp);
    const dateStr =  getMDY(date);
    const todayStr = getMDY(new Date());
    const yesterdayStr = getMDY(new Date(Date.now() - ONE_DAY_MS));
    if (dateStr === todayStr) {
        return 'today';
    } else if (dateStr === yesterdayStr) {
        return 'yesterday';
    } else {
        return dateStr;
    }
}
function truncateString(str, num) {
    return str.length > num ? str.slice(0, num) + "..." : str;
  }

export default function Job({job, onClick}) {
    
    return (
        <Paper onClick={onClick} className='job'>
            <div className="flex-align-mid">
            <div className="wrapper"> 
            <img className={'home-logo'} src={job.company_logo} />
            </div>
                <div className="job-title-location">
                <ThemeProvider theme={theme}>
                    <Typography variant='h4'><Box fontWeight="fontWeightBold" m={1}>
                    {truncateString(job.title,35)}
      </Box></Typography>
                    <Typography  variant='subtitle1'>{job.company}</Typography>
                   </ThemeProvider>
                </div>
            </div>
            <div className="flex-align-mid">
            <div className="job-title-location">
            <Typography variant='h4'><Box fontWeight="fontWeightBold" m={1}>{job.location}</Box></Typography>
                <Typography variant='subtitle1'>Location</Typography>
            </div>
              
            </div>
            <div className="flex-align-mid">
                <Typography>{makeDate(job.created_at)}</Typography>
            </div>
        </Paper>
    )
}