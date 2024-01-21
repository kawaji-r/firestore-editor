import Button from '@/_uis/placeholder/Button'
import { firestoreField } from 'firebase-util/dist/types'
import fb from 'firebase-util'

type thisType = {
  docs: any
  success: any
  setSuccess: any
  error: any
  setError: any
}
export default function RegisterButton(props: thisType) {
  const { docs, success, setSuccess, error, setError } = props
  /**
   * 登録ボタン押下
   */
  const registerClick = async () => {
    if (docs === null) return
    try {
      for (const doc of docs) {
        console.log(doc.path)
        await fb.firestore.updateField(doc.path, doc.data as firestoreField, true)
      }
      if (!success) {
        setSuccess('登録しました')
        setTimeout(() => {
          setSuccess('')
        }, 3000)
      }
    } catch (e) {
      if (!error) {
        console.error(e)
        setError('登録に失敗しました')
        setTimeout(() => {
          setError('')
        }, 3000)
      }
    }
  }
  return <Button msg="登録" onClick={registerClick} />
}
