import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const a11yProps = (index: any) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  }
}))

const Login = () => {
  const classes = useStyles();
  const [data, setData] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setData(newValue)
  }

  const login = () => {
    console.log({email}, {password})
  }

  return (
    <>
      <Box width="50%">
        <Paper className="classes.root">
          <Tabs 
            value={data}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            aria-label="simple tabs example"
          >
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Register" {...a11yProps(1)} />
          </Tabs>
        </Paper>
        <TabPanel value={data} index={0}>
          <label>Email</label>
          <input type="text" className="form__item" id="login-email" onChange={(ev) => setEmail(ev.currentTarget.value)}></input> <br/>
          <label>Password</label>
          <input type="password" className="form__item" id="login-password" onChange={(ev) => setPassword(ev.currentTarget.value)}></input> <br/>
          <button className="button button--inverse" onClick={login}>login</button>
        </TabPanel>
        <TabPanel value={data} index={1}>
          Register Form
        </TabPanel>
      </Box>
    </>
  )
}

export default Login