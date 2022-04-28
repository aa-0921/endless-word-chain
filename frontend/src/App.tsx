import React, { useState, useEffect, createContext, useCallback } from 'react'
import {
  Outlet,
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import CommonLayout from 'components/layouts/CommonLayout'
import Home from 'components/pages/Home'
import SignUp from 'components/pages/SignUp'
import SignIn from 'components/pages/SignIn'

import { getCurrentUser } from 'lib/api/auth'
import { User } from 'interfaces/index'

// グローバルで扱う変数・関数をcreateContextを使って下層コンポーネントでも使用できるようにしている
export const AuthContext = createContext(
  {} as {
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    isSignedIn: boolean
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
    currentUser: User | undefined
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
  }
)
//       render json: { is_login: true, data: current_api_v1_user }
// else
//   render json: { is_login: false, message: "ユーザーが存在しません" }

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async (): Promise<void> => {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)

        console.log(res?.data.data)
      } else {
        console.log('No current user')
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  // const Private = ({ children }: { children: React.ReactElement }) => {
  // const Private = () => {
  const Private = useCallback(() => {
    if (!loading) {
      if (isSignedIn) {
        // return children
        // 親コンポーネント内で<Outlet />コンポーネントとして呼び出すことで実際にはchildrenが呼び出される
        return <Outlet />
      }
      return <Navigate to="/signin" />
    }
    return <></>
  }, [loading, isSignedIn])

  // const loading = useMemo(() => (loading), [])

  return (
    <Router>
      <AuthContext.Provider
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
        value={{
          loading,
          setLoading,
          isSignedIn,
          setIsSignedIn,
          currentUser,
          setCurrentUser,
        }}
      >
        <CommonLayout>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            {/* もしサインインできていたら、OutletでchildrenのHomeコンポーネントを表示する */}
            <Route path="/" element={<Private />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </CommonLayout>
      </AuthContext.Provider>
    </Router>
  )
}

export default App
