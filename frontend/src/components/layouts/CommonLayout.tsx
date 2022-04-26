import React from "react"

import { Container, Grid } from '@mantine/core';
// import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import HeaderWrapper from "components/layouts/HeaderWrapper"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "3rem"
  }
}))

interface CommonLayoutProps {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
  const classes = useStyles()

  return (
    <>
      <header>
        <HeaderWrapper />
      </header>
      <main>
        {/* <Container maxWidth="lg" className={classes.container}> */}
        <Container size="lg" className={classes.container}>
          {/* <Grid container justifyContent="center"> */}
          <Grid justify="center">
            <Grid>
              {children}
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default CommonLayout
