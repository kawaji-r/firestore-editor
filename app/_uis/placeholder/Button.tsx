export default function Button({ msg, onClick }: { msg: string; onClick: () => Promise<void> }) {
  return (
    <button
      onClick={onClick}
      className="w-full md:w-44 h-13 py-3 px-4 mb-5 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    >
      {msg}
    </button>
  )
}
