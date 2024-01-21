import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import fb from 'firebase-util'
import firestores from '@/_features/firestores'
import Selector from '@/_uis/placeholder/Selector'

type thisType = { setDocs: Dispatch<SetStateAction<{ path: string; data: unknown }[] | null>> }
export default function DBSelector({ setDocs }: thisType) {
  const [db, setDb] = useState<string>('')

  // セレクトボックスが更新された時
  useEffect(() => {
    updateDocs()
  }, [db])

  /**
   * dbのデータベースを検索し、docsを更新する
   */
  const updateDocs = async () => {
    if (db !== '') {
      // アプリ削除
      await fb.deleteApps()
      // アプリ初期化
      fb.init(firestores.auth[db])
      // ドキュメント取得
      const fetch: { path: string; data: unknown }[] = []
      for (const idx in firestores.collections[db]) {
        const allDocs = await fb.firestore.readAllDocument(`${firestores.collections[db][idx]}`)
        for (const doc of allDocs) {
          fetch.push({ path: `${firestores.collections[db][idx]}/${doc.id}`, data: doc.data })
        }
      }
      setDocs(fetch)
    }
  }
  return <Selector map={firestores.collections} setState={setDb} />
}
