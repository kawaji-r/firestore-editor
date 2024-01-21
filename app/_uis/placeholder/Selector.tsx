import { Dispatch, SetStateAction } from 'react'

type thisType = {
  map: { [id: string]: string[] }
  setState: Dispatch<SetStateAction<string>>
}
export default function Selector({ map, setState }: thisType) {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const i = event.target.value
    setState(i)
  }
  return (
    <select className="mb-5" onChange={onChange}>
      <option value="">選択してください</option>
      {Object.keys(map).map((el) => (
        <option key={el} value={el}>
          {el}
        </option>
      ))}
    </select>
  )
}
