'use client'
import { useEffect, useState } from 'react'
import Button from './Button'
import Modal from './Modal'

// dbTypeはデータベースの情報を表す型です。
// dbはデータベースの名前、colsはコレクションの名前の配列、authは認証情報を表すオブジェクトです。
type authType = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}
export type dbType = {
  db: string
  cols: string[]
  auth?: authType
}

// SideBarはサイドバーを表示する関数コンポーネントです。
// displayはサイドバーの表示状態を表すブール値です。
export default function SideBar({ setDb }: { setDb: any }) {
  const searchLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const localDbs = localStorage.getItem('dbs')
      if (localDbs !== null) {
        return JSON.parse(localDbs)
      }
    }
    return []
  }

  // データベースの情報を管理
  const [dbs, setDbs] = useState<dbType[]>(searchLocalStorage())

  // modalDisplayはモーダルの表示状態を管理するためのステートです。
  // setModalDisplayはmodalDisplayを更新するための関数です。
  const [modalDisplay, setModalDisplay] = useState<boolean>(false)
  const [activeConfigDb, setActiveConfigDb] = useState('')

  // useEffectはdbsが更新されたときに実行されます。
  // dbsの情報をCookieに保存します。
  useEffect(() => {
    console.debug('dbsが更新されました:')
    console.debug(dbs)
    if (typeof window !== 'undefined') {
      localStorage.setItem('dbs', JSON.stringify(dbs))
    }
  }, [dbs])

  useEffect(() => {
    console.debug('activeConfigDbが更新されました:')
    console.debug(activeConfigDb)
    setDb(dbs.find((el: any) => el.db === activeConfigDb))
  }, [activeConfigDb])

  const registerAuth = (auth: authType) => {
    const db = dbs.find((el: any) => el.db === activeConfigDb)
    if (db) {
      db['auth'] = auth
      setDbs(dbs.map((el: any) => (el.db === db.db ? db : el)))
      setDb(dbs.find((el: any) => el.db === activeConfigDb))
    }
  }

  // addDbは新しいデータベースを追加する関数です。
  // プロンプトでプロジェクト名を入力し、新しいデータベースをdbsに追加します。
  const addDb = () => {
    const newDb = prompt('プロジェクト名を入力してください')
    if (newDb) {
      setDbs([...dbs, { db: newDb, cols: [] }])
    }
  }

  // addColは新しいコレクションを追加する関数です。
  // プロンプトでコレクション名を入力し、新しいコレクションを指定したデータベースに追加します。
  const addCol = (dbName: string) => {
    const newCol = prompt('コレクション名を入力してください')
    if (newCol) {
      setDbs(dbs.map((db: any) => (db.db === dbName ? { ...db, cols: [...db.cols, newCol] } : db)))
    }
  }

  // Plusはプラスボタンを表示するコンポーネントです。
  // ボタンをクリックすると、新しいコレクションを追加します。
  const Plus = ({ db }: any) => {
    return (
      <button tabIndex={0} className={'text-blue-800 ml-1 rounded-lg hover:bg-gray-100'} onClick={() => addCol(db.db)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    )
  }

  // Minusはマイナスボタンを表示するコンポーネントです。
  // ボタンをクリックすると、指定したデータベースを削除します。
  const Minus = ({ db, collection }: any) => {
    const MinusButton = (callback: Function) => (
      <button onClick={callback as any} className={'text-red-800 text-sm font-medium rounded-lg hover:bg-gray-100'}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12" />
        </svg>
      </button>
    )
    if (collection === undefined) {
      const callback = () => {
        // DBを削除する
        setDbs(dbs.filter((d: any) => d.db !== db.db))
      }
      return MinusButton(callback)
    } else {
      const callback = () => {
        // コレクションを削除する
        setDbs(dbs.map((db: any) => ({ ...db, cols: db.cols.filter((col: any) => col !== collection) })))
      }
      return MinusButton(callback)
    }
  }

  // Configは設定ボタンを表示するコンポーネントです。
  // ボタンをクリックすると、モーダルを表示します。
  const Config = ({ db }: { db: dbType }) => {
    return (
      <button
        onClick={() => {
          setModalDisplay(true)
        }}
        className="text-blue-800 text-sm font-medium rounded-lg hover:bg-blue-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    )
  }

  // サイドバーのレンダリング部分です。
  // モーダルとデータベースのリストを表示します。
  return (
    <div className="md:block">
      <Modal
        display={modalDisplay}
        setDisplay={setModalDisplay}
        callback={registerAuth}
        initialAuthData={dbs.find((el: any) => el.db === activeConfigDb)?.auth}
      />
      <div className="flex flex-col justify-between bg-white">
        <div className="">
          <Button onClick={addDb} msg="ADD" />
          <ul className="mt-6 space-y-1">
            {dbs.map((db: any) => (
              <li key={db.db} onClick={() => setActiveConfigDb(db.db)}>
                {db.cols.length === 0 ? (
                  <div className="flex justify-between px-4 py-2">
                    <div className="flex flex-grow">
                      <span className="flex items-center justify-center break-all rounded-lg hover:bg-gray-100 px-4 text-sm font-medium text-gray-700">
                        {db.db}
                      </span>
                    </div>
                    <div className="p-2 pr-0 basis-20 grow-0 flex items-center justify-center">
                      <Config db={db} />
                      <Plus db={db} />
                      <Minus db={db} />
                    </div>
                  </div>
                ) : (
                  <details
                    className="group [&_summary::-webkit-details-marker]:hidden"
                    onClick={() => setActiveConfigDb(db.db)}
                  >
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-100 text-gray-700">
                      <div className="break-all flex basis-1 flex-grow">
                        <span className="flex items-center justify-center shrink-0 transition duration-300 group-open:-rotate-180">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span className="text-sm font-medium">{db.db}</span>
                      </div>
                      <div className="p-2 pr-0 basis-20 grow-0 flex items-center justify-center">
                        <Config db={db} />
                        <Plus db={db} />
                        <Minus db={db} />
                      </div>
                    </summary>
                    <ul className="mt-2 space-y-1 px-4 pb-2">
                      {db.cols.map((col: any) => (
                        <li key={col} className="flex justify-between">
                          <span className="before:content-['-_'] break-all block rounded-lg px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 hover:text-gray-700">
                            {col}
                          </span>
                          <Minus db={db} collection={col} />
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
                <hr />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
