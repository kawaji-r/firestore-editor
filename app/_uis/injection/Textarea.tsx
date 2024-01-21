type thisType = {
  docs: { path: string; data: unknown }[] | null
  setDocs: React.Dispatch<React.SetStateAction<{ path: string; data: unknown }[] | null>>
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
}
export default function Textarea(props: thisType) {
  const { docs, setDocs, error, setError } = props
  // テキストエリアが更新された時
  const changeArea = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateArea(event.target.value)
  }

  /**
   * テキストエリアを更新する
   * @param str テキストエリア
   */
  const updateArea = (str: string) => {
    try {
      const content = JSON.parse(str)
      setDocs(content)
    } catch (e) {
      if (!error) {
        setError('JSON is Invalid')
        setTimeout(() => {
          setError('')
        }, 3000)
      }
    }
  }

  return (
    <textarea
      className="w-full flex-grow border mb-5"
      onChange={changeArea}
      value={docs ? JSON.stringify(docs, null, 4) : ''}
    ></textarea>
  )
}
