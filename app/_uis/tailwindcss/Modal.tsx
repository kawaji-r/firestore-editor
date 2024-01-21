import { useEffect, useState } from 'react'

type authType = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}
type thisType = { display: boolean; setDisplay: any; callback: Function; initialAuthData: authType | undefined }
export default function Modal({ display, setDisplay, callback, initialAuthData }: thisType) {
  const getInitialAuth = () => {
    return (
      initialAuthData || {
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: ''
      }
    )
  }

  const [forms, setForms] = useState(getInitialAuth())

  useEffect(() => {
    console.debug("initialAuthData's useEffect:")
    console.debug(initialAuthData)
    setForms(getInitialAuth())
  }, [initialAuthData])

  const closeModal = () => {
    setForms(getInitialAuth())
    setDisplay(false)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForms({ ...forms, [e.target.name]: e.target.value } as authType)
  }

  const saveChanges = () => {
    callback(forms)
    setDisplay(false)
  }

  return (
    <>
      {display && (
        <>
          <div className="w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto">
            <div className="mt-7 opacity-100 duration-500 ease-out transition-all sm:max-w-2xl sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
              <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                  <h3 className="font-bold text-gray-800 dark:text-white">認証情報入力</h3>
                  <button
                    type="button"
                    className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    onClick={closeModal}
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="flex-shrink-0 w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-4 overflow-y-auto">
                  {Object.keys(forms).map((el) => (
                    <div key={el} className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={el}>
                          {el}
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id={el}
                          type="text"
                          name={el}
                          onChange={onChange}
                          value={forms[el as keyof authType]}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    onClick={saveChanges}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="z-[59] transition duration fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"></div>
        </>
      )}
    </>
  )
}
