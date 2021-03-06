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
import { useSelector } from 'react-redux'

import { asyncRegister, asyncLogin, setLoginErrorMessages, setRegisterErrorMessages } from '../stores/auth'

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
  const dispatch = useDispatch()

  interface State {
    auth: any
  }
  const apiStatus = useSelector((state: State) => state.auth.apiStatus)
  const loginErrors = useSelector((state: State) => state.auth.loginErrorMessages)
  const registerErrors = useSelector((state: State) => state.auth.registerErrorMessages)

  const [data, setData] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setData(newValue)
  }

  const login = async() => {
    const user = {
      email: email,
      password: password
    }

    await new Promise(() => dispatch(asyncLogin(user)))

    if (apiStatus) {
      history.push('/')
    }
  }

  const register = async () => {
    const user = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    }

    await new Promise(() => dispatch(asyncRegister(user)))

    if (apiStatus) {
      history.push('/')
    }
  }

  useEffect(() => {
    window.axios.get('https://localhost:1443/api/token', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }).then((response: any) => {
      // console.log(response)
    })

    dispatch(setLoginErrorMessages(null))
    dispatch(setRegisterErrorMessages(null))
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
          { loginErrors && 
            <div className="errors">
              { loginErrors.email && 
                <ul>
                  { loginErrors.email.map((msg: string, index: any) => {
                    return (<li key={index}>{ msg }</li>)
                  })}
                </ul>
              }
              { loginErrors.password && 
                <ul>
                  { loginErrors.password.map((msg: string, index: any) => {
                    return (<li key={index}>{ msg }</li>)
                  })}
                </ul>
              }
            </div>
          }
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
          { registerErrors && 
            <div className="errors">
              { registerErrors.name && 
                <ul>
                  { registerErrors.name.map((msg: string, index: any) => {
                    return (<li key={index}>{ msg }</li>)
                  })}
                </ul>
              }
              { registerErrors.email && 
                <ul>
                  { registerErrors.email.map((msg: string, index: any) => {
                    return (<li key={index}>{ msg }</li>)
                  })}
                </ul>
              }
              { registerErrors.password && 
                <ul>
                  { registerErrors.password.map((msg: string, index:any) => {
                    return (<li key={index}>{ msg }</li>)
                  })}
                </ul>
              }
            </div>
          }
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
