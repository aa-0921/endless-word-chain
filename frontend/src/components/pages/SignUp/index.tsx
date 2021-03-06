import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import {
  createStyles,
  TextInput,
  Card,
  Title,
  Space,
  Button,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'

// import { AuthContext } from 'App'
import { AuthContext } from 'App'
import { signUp } from 'lib/api/auth'
import { SignUpParams } from 'interfaces/index'

const useStyles = createStyles((theme) => ({
  container: {
    marginTop: theme.spacing.lg,
  },
  submitBtn: {
    marginTop: theme.spacing.sm,
    flexGrow: 1,
    textTransform: 'none',
  },
  header: {
    textAlign: 'center',
  },
  card: {
    padding: theme.spacing.sm,
    // maxWidth: 500,
    width: 270,
  },
}))

// サインアップ用ページ
const SignUp: React.FC = () => {
  const { classes } = useStyles()
  const histroy = useNavigate()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignUpParams = {
      name,
      email,
      password,
      passwordConfirmation,
    }

    try {
      const res = await signUp(params)
      console.log(res)

      if (res.status === 200) {
        // アカウント作成と同時にログインさせてしまう
        // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers.client)
        Cookies.set('_uid', res.headers.uid)

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        // ルートページに移動
        histroy('/')

        console.log('Signed in successfully!')
      } else {
        handleShowNotification()
      }
    } catch (err) {
      console.log(err)
      handleShowNotification()
    }
  }

  const handleShowNotification = () => {
    showNotification({
      // id: 'hello-there',
      // disallowClose: true,
      // onClose: () => console.log('unmounted'),
      // onOpen: () => console.log('mounted'),
      autoClose: 5000,
      // autoClose: 1000,
      // title: "You've been compromised",
      message: 'Invalid emai or password',
      color: 'red',
      // icon: <Cross1Icon />,
      // className: 'my-notification-class',
      // style: { backgroundColor: 'red' },
      // sx: { backgroundColor: 'red' },
      loading: false,
    })
  }

  return (
    <form noValidate autoComplete="off">
      <Card className={classes.card}>
        <Card.Section>
          <Title order={2} align="center">
            Sign Up
          </Title>
        </Card.Section>
        <Space h="md" />
        <Card.Section>
          <TextInput
            placeholder="Your name"
            required
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextInput
            placeholder="Your email"
            required
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextInput
            placeholder="Enter password"
            required
            label="Password"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextInput
            placeholder="Enter password"
            required
            label="Password Confirmation"
            type="password"
            value={passwordConfirmation}
            autoComplete="current-password"
            onChange={(event) => setPasswordConfirmation(event.target.value)}
          />
          <Button
            type="submit"
            variant="filled"
            size="md"
            fullWidth
            color="default"
            disabled={!!(!name || !email || !password || !passwordConfirmation)}
            className={classes.submitBtn}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Card.Section>
      </Card>
    </form>
  )
}

export default SignUp
