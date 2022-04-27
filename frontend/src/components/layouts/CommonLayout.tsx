import React from 'react'
import { Container, Grid, createStyles } from '@mantine/core'
import HeaderWrapper from 'components/layouts/HeaderWrapper'

const useStyles = createStyles(() => ({
  container: {
    marginTop: '3rem',
  },
}))

interface CommonLayoutProps {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
  const { classes } = useStyles()

  return (
    <>
      <header>
        <HeaderWrapper />
      </header>
      <main>
        <Container size="lg" className={classes.container}>
          <Grid justify="center">
            <Grid>{children}</Grid>
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default CommonLayout
