import React, { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

// import { makeStyles, Theme } from "@material-ui/core/styles"

// import AppBar from "@material-ui/core/AppBar"
// import Toolbar from "@material-ui/core/Toolbar"
// import Typography from "@material-ui/core/Typography"
// import Button from "@material-ui/core/Button"
// import IconButton from "@material-ui/core/IconButton"
// import MenuIcon from "@material-ui/icons/Menu"
import { createStyles, Header, Container, Anchor, Group, Burger, Button } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
// import { MantineLogo } from '../../shared/MantineLogo';

import { signOut } from "lib/api/auth"

import { AuthContext } from "App"


// const useStyles = makeStyles((theme: Theme) => ({
//   iconButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     textDecoration: "none",
//     color: "inherit"
//   },
//   linkBtn: {
//     textTransform: "none"
//   }
// }))

const HEADER_HEIGHT = 84;

const useStyles = createStyles((theme) => ({
  iconButton: {
    marginRight: theme.spacing.sm,
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit"
  },
  linkBtn: {
    textTransform: "none"
  },

  header: {
    backgroundColor: theme.colors[theme.primaryColor][6],
    borderBottom: 0,
  },

  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  links: {
    paddingTop: theme.spacing.lg,
    height: HEADER_HEIGHT,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  mainLinks: {
    marginRight: -theme.spacing.sm,
  },

  mainLink: {
    textTransform: 'uppercase',
    fontSize: 13,
    color: theme.white,
    padding: `7px ${theme.spacing.sm}px`,
    fontWeight: 700,
    borderBottom: '2px solid transparent',
    transition: 'border-color 100ms ease, opacity 100ms ease',
    opacity: 0.9,
    borderTopRightRadius: theme.radius.sm,
    borderTopLeftRadius: theme.radius.sm,

    '&:hover': {
      opacity: 1,
      textDecoration: 'none',
    },
  },

  secondaryLink: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: theme.fontSizes.xs,
    textTransform: 'uppercase',
    transition: 'color 100ms ease',

    '&:hover': {
      color: theme.white,
      textDecoration: 'none',
    },
  },

  mainLinkActive: {
    color: theme.white,
    opacity: 1,
    borderBottomColor:
      theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][5],
    backgroundColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 6 : 5],
  },
}));

// const Header: React.FC = () => {

// interface LinkProps {
//   label: string;
//   link: string;
// }

// interface Props {
//   mainLinks: LinkProps[];
// }


// export function DoubleHeaderColored ({ mainLinks, userLinks }: DoubleHeaderProps) {
// export function HeaderWrapper ({ mainLinks }: Props) {
const HeaderWrapper = () => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext)
  // const classes = useStyles()
  const { classes, cx } = useStyles();
    const histroy = useNavigate()

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除/components/layouts/Header.tsx:48
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        histroy("/signin")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        return (
          <Button
            color="inherit"
            // className={classes.linkBtn}
            className={classes.secondaryLink}
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        )
      } else {
        return (
          <>
            <Button
              component={Link}
              to="/signin"
              color="inherit"
              // className={classes.linkBtn}
              className={classes.secondaryLink}
            >
              Sign in
            </Button>
            <Button
              component={Link}
              to="/signup"
              color="inherit"
              // className={classes.linkBtn}
              className={classes.secondaryLink}
            >
              Sign Up
            </Button>
          </>
        )
      }
    } else {
      return <></>
    }
  }

  // ーーーーーーーーー
  const [opened, toggleOpened] = useBooleanToggle(false);
  // const { classes, cx } = useStyles();
  const [active, setActive] = useState(0);

  const mainLinks =
  [
    {
      "link": "#",
      "label": "Book a demo"
    },
    {
      "link": "#",
      "label": "Documentation"
    },
    {
      "link": "#",
      "label": "Community"
    },
    {
      "link": "#",
      "label": "Academy"
    },
    {
      "link": "#",
      "label": "Forums"
    }
  ];

  const mainItems = mainLinks.map((item, index) => (
    <Anchor<'a'>
      href={item.link}
      key={item.label}
      className={cx(classes.mainLink, { [classes.mainLinkActive]: index === active })}
      onClick={(event) => {
        event.preventDefault();
        setActive(index);
      }}
    >
      {item.label}
    </Anchor>
  ));

  // const secondaryItems = userLinks.map((item) => (
  //   <Anchor<'a'>
  //     href={item.link}
  //     key={item.label}
  //     onClick={(event) => event.preventDefault()}
  //     className={classes.secondaryLink}
  //   >
  //     {item.label}
  //   </Anchor>
  // ));

  return (
    // <>
    // {/* <AppBar position="static">
    //   <Toolbar>
    //     <IconButton
    //       edge="start"
    //       className={classes.iconButton}
    //       color="inherit"
    //     >
    //       <MenuIcon />
    //     </IconButton>
    //     <Typography
    //       component={Link}
    //       to="/"
    //       variant="h6"
    //       className={classes.title}
    //     >
    //       Sample
    //     </Typography>
    //     <AuthButtons />
    //   </Toolbar>
    // </AppBar> */}
    // {/* </> */ }

    <Header height={HEADER_HEIGHT} mb={120} className={classes.header}>
      <Container className={classes.inner}>
        {/* <MantineLogo width={130} variant="white" /> */}

        <div className={classes.links}>
          {/* <Group position="right">{secondaryItems}</Group> */}
          {/* <Group spacing={0} position="right" className={classes.mainLinks}> */}

          <Group spacing={0} position="right" className={classes.mainLinks}>
            { mainItems }
          </Group>
        </div>
        <Group position="right" >
            <AuthButtons />
        </Group>
        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="sm"
          color="#fff"
        />
      </Container>
    </Header>
  )
}

export default HeaderWrapper
