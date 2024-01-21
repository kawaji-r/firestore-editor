type thisType = { onClick: () => void; msg: string }
export default function Button({ onClick, msg }: thisType) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded border border-indigo-600 pl-5 pr-8 py-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
    >
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
      <span className="text-sm font-medium">{msg}</span>
    </button>
  )
}
