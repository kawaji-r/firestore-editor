'use client'
import { useEffect, useState } from 'react'
import Header from '@/_uis/tailwindcss/Header'
import ErrorMessage from '@/_uis/tailwindcss/ErrorMessage'
import SuccessMessage from '@/_uis/tailwindcss/SuccessMessage'
import Textarea from '@/_uis/injection/Textarea'
import RegisterButton from './_uis/injection/RegisterButton'
import SideBar, { dbType } from '@/_uis/tailwindcss/SideBar'
import Hamburger from '@/_uis/tailwindcss/Hamburger'
import fb from 'firebase-util'

export default function Home() {
  const [docs, setDocs] = useState<{ path: string; data: unknown }[] | null>(null)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [sideBarDisplay, setSideBarDisplay] = useState<boolean>(false) // SPで表示非表示を制御
  // データベースの情報を管理
  const [db, setDb] = useState<dbType>()

  useEffect(() => {
    updateDocs()
  }, [db])

  /**
   * dbのデータベースを検索し、docsを更新する
   */
  const updateDocs = async () => {
    if (db !== undefined) {
      // アプリ削除
      await fb.deleteApps()
      // アプリ初期化
      fb.init(db.auth)
      // ドキュメント取得
      const fetch: { path: string; data: unknown }[] = []
      for (const idx in db.cols) {
        const allDocs = await fb.firestore.readAllDocument(`${db.cols[idx]}`)
        for (const doc of allDocs) {
          fetch.push({ path: `${db.cols[idx]}/${doc.id}`, data: doc.data })
        }
      }
      setDocs(fetch)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* <Header sideBarDisplay={sideBarDisplay} setSideBarDisplay={setSideBarDisplay} /> */}
      <div className="flex-grow flex flex-col md:flex-row">
        <div className={`${!sideBarDisplay && 'hidden'} md:block p-5 border-e w-full md:w-96`}>
          <SideBar setDb={setDb} />
        </div>
        <div className={`${sideBarDisplay && 'hidden'} p-5 pt-0 md:pt-5 w-full flex flex-col flex-grow`}>
          <Textarea docs={docs} setDocs={setDocs} error={error} setError={setError} />
          <RegisterButton docs={docs} success={success} setSuccess={setSuccess} error={error} setError={setError} />
          {error && <ErrorMessage msg={error} />}
          {success && <SuccessMessage msg={success} />}
        </div>
      </div>
    </div>
  )
}
