import client from "lib/api/client"
import Cookies from "js-cookie"

import { SignUpParams, SignInParams } from "interfaces/index"

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return client.post("auth", params)
}

// サインイン（ログイン）
export const signIn = (params: SignInParams)  => {
  return client.post("auth/sign_in", params)
}

// サインアウト（ログアウト）
export const signOut = () => {
  return client.delete("auth/sign_out", { headers: {
    // とりあえず以下の形で修正
    // "access-token": Cookies.get("_access_token") || "",
    // "access-token": Cookies.get("_access_token")!,でも可だった (https://stackoverflow.com/questions/54496398/typescript-type-string-undefined-is-not-assignable-to-type-string)
    "access-token": Cookies.get("_access_token")!,
    "client": Cookies.get("_client") || "",
    "uid": Cookies.get("_uid") || ""
  }})
}

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
  return client.get("/auth/sessions", { headers: {
    "access-token": Cookies.get("_access_token") || "",
    "client": Cookies.get("_client") || "",
    "uid": Cookies.get("_uid") || ""
  }})
}
