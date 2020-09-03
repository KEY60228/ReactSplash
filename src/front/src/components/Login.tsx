import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import { asyncRegister, asyncLogin } from '../stores/auth'

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
  },
}))

const Login = () => {
  const classes = useStyles()

  const history = useHistory()

  const [data, setData] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const dispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setData(newValue)
  }

  const login = async() => {
    const user = {
      email: email,
      password: password
    }

    await dispatch(asyncLogin(user))
    history.push('/')
  }

  const register = async () => {
    const user = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    }

    await dispatch(asyncRegister(user))
    history.push('/')
  }

  useEffect(() => {
    window.axios.get('https://localhost:1443/api/token', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }).then((response: any) => {
      console.log(response)
    })
  }, [])

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
          Login Form <br/>
          <label>Email</label>
          <input
            type="text"
            className="form__item"
            id="login-email"
            onChange={ev => setEmail(ev.currentTarget.value)}
          ></input>{' '}
          <br />
          <label>Password</label>
          <input
            type="password"
            className="form__item"
            id="login-password"
            onChange={ev => setPassword(ev.currentTarget.value)}
          ></input>{' '}
          <br />
          <button className="button button--inverse" onClick={login}>
            login
          </button>
        </TabPanel>
        <TabPanel value={data} index={1}>
          Register Form <br/>
          <label>Name</label>
          <input
            type="text"
            className="form__item"
            id="username"
            onChange={ev => setName(ev.currentTarget.value)}
          ></input>{' '}
          <br />
          <label>Email</label>
          <input
            type="text"
            className="form__item"
            id="email"
            onChange={ev => setEmail(ev.currentTarget.value)}
          ></input>{' '}
          <br />
          <label>Password</label>
          <input
            type="password"
            className="form__item"
            id="password"
            onChange={ev => setPassword(ev.currentTarget.value)}
          ></input>{' '}
          <br />
          <label>Password (Confirm)</label>
          <input
            type="password"
            className="form__item"
            id="password-confirmation"
            onChange={ev => setPasswordConfirmation(ev.currentTarget.value)}
          ></input>{' '}
          <br />
          <button className="button button--inverse" onClick={register}>
            Register
          </button>
        </TabPanel>
      </Box>
    </>
  )
}

export default Login
