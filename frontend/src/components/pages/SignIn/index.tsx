import React, { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

import { createStyles, Text, TextInput, Card, Title, Space, Button, Box } from '@mantine/core';

// import { makeStyles, Theme } from "@material-ui/core/styles"
// import { Typography } from "@material-ui/core"
// import TextField from "@material-ui/core/TextField"
// import Card from "@material-ui/core/Card"
// import CardContent from "@material-ui/core/CardContent"
// import CardHeader from "@material-ui/core/CardHeader"
// import Button from "@material-ui/core/Button"
// import Box from "@material-ui/core/Box"

import { AuthContext } from "App"
import AlertMessage from "components/utils/AlertMessage"
import { signIn } from "lib/api/auth"
import { SignInParams } from "interfaces/index"

const useStyles = createStyles((theme) => ({
  container: {
    marginTop: theme.spacing.lg,
  },
  submitBtn: {
    marginTop: theme.spacing.sm,
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: theme.spacing.sm,
    maxWidth: 400
  },
  box: {
    marginTop: "2rem"
  },
  link: {
    textDecoration: "none"
  }
}))

// サインイン用ページ
const SignIn: React.FC = () => {
  const { classes } = useStyles()
  const history = useNavigate()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignInParams = {
      email: email,
      password: password
    }

    try {
      const res = await signIn(params)
      console.log(res)

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        history("/")

        console.log("Signed in successfully!")
      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <Card.Section>
            <Title order={ 2 } align="center">Sign In</Title>
          </Card.Section>
          <Space h="md" />
          <Card.Section>
            <TextInput
              placeholder="Your email"
              label="Email"
              value={email}
              required
              onChange={event => setEmail(event.target.value)}
            />
            <TextInput
              placeholder="Enter password"
              label="Password"
              type="password"
              value={ password }
              autoComplete="current-password"
              required
              onChange={event => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              variant="filled"
              size="md"
              fullWidth
              color="default"
              disabled={!email || !password ? true : false} // 空欄があった場合はボタンを押せないように
              className={classes.submitBtn}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Box
              className={ classes.box }
              sx={() => ({textAlign: 'center'})}
            >
              <Text size="sm">
                  Don't have an account? &nbsp;
                <Link to="/signup" className={classes.link}>
                  Sign Up now!
                </Link>
              </Text>
          </Box>
          </Card.Section>
        </Card>
      </form>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid emai or password"
      />
    </>
  )
}

export default SignIn
