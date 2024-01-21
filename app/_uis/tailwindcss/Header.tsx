import Link from 'next/link'
import fb, { useLogin } from 'firebase-util'
import { getAuth, signOut } from 'firebase/auth'
import { AuthInfo } from '@/_features/config'

type thisType = {
  sideBarDisplay: boolean
  setSideBarDisplay: (display: boolean) => void
}
const Header = ({ sideBarDisplay, setSideBarDisplay }: thisType) => {
  fb.init(AuthInfo)
  const { loginStatus } = useLogin()
  const toggleSideBar = () => {
    setSideBarDisplay(!sideBarDisplay)
  }

  const userIcon = (
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )

  const authButton = loginStatus ? (
    <button
      className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 md:my-6 md:ps-6 dark:text-gray-400 dark:hover:text-blue-500"
      onClick={() => {
        const auth = getAuth()
        signOut(auth)
          .then(() => {})
          .catch((error) => {})
      }}
    >
      {userIcon}
      ログアウト
    </button>
  ) : (
    <Link
      className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 md:my-6 md:ps-6 dark:text-gray-400 dark:hover:text-blue-500"
      href="/login"
    >
      {userIcon}
      ログイン
    </Link>
  )

  return (
    <header className="">
      <nav className="flex justify-between my-6 relative bg-white border border-gray-200 rounded-[36px] mx-2 py-3 px-6 md:flex md:items-center md:justify-between md:py-0 md:px-6 dark:bg-gray-800 dark:border-gray-700">
        <span className="flex-none text-xl font-semibold dark:text-white flex items-center" aria-label="Brand">
          Firestor Editor
        </span>
        <div className="flex gap-4">
          {authButton}
          <div className="flex items-center border-l border-gray-200 md:hidden pl-4">
            <button
              type="button"
              className="hs-collapse-toggle flex gap-x-2 justify-center items-center font-semibold text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-collapse="#navbar-collapse-with-animation"
              aria-controls="navbar-collapse-with-animation"
              aria-label="Toggle navigation"
              onClick={toggleSideBar}
            >
              {sideBarDisplay ? (
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
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4"
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
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
              )}
              設定
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
