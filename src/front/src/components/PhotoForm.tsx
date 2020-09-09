import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom'

const PhotoForm = ({
  setShowForm
}: {
  setShowForm: any
}) => {
  const [preview, setPreview]: [any, any] = useState(null);
  const [photo, setPhoto]: [any, any] = useState(null);
  const history = useHistory();

  const onFileChange = (ev: any) => {
    // 何も選択されていない場合
    if (ev.target.files.length === 0) {
      setPreview('')
      setPhoto(null)
      return false
    }
    
    // ファイルが画像でない場合
    if (! ev.target.files[0].type.match('image.*')) {
      setPreview('')
      setPhoto(null)
      return false
    }

    // FileReaderクラスのインスタンスを取得
    const reader = new FileReader()
    console.log(preview)
    console.log(reader)

    // ファイルを読み込み終わったタイミングで実行する処理
    reader.onload = e => {
      // previewに読み込み結果(データURL)を代入する
      setPreview(e.target?.result)
    }

    // ファイルを読み込む
    // 読み込まれたファイルはデータURL形式で受け取る
    reader.readAsDataURL(ev.target.files[0])

    setPhoto(ev.target.files[0])
  }

  const submit = async(ev: any) => {
    ev.preventDefault()
    const formData = new FormData()
    formData.append('photo', photo)

    const response = await window.axios.post('/api/photos', formData)

    setPreview('')
    setPhoto(null)
    setShowForm(false)
    history.push(`/photos/${response.data.id}`)
  }

  return (
    <>
      <div className="photo-form">
        <h2 className="title">Submit a Photo</h2>
        <form className="form">
          <input className="form__item" type="file" onChange={onFileChange} />
          { preview &&
            <output className="form__putput">
              <img src={preview} alt="" />
            </output>
          }
          <div className="form__button">
            <button type="submit" className="button button--inverse" onClick={submit}>submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default PhotoForm