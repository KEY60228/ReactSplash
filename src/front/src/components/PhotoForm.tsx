import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { CREATED, UNPROCESSABLE_ENTITY } from '../util'
import { setCode } from '../stores/error'
import { setContent } from '../stores/message'
import Loader from './Loader'

const PhotoForm = ({
  setShowForm
}: {
  setShowForm: any
}) => {
  const [preview, setPreview]: [any, any] = useState(null)
  const [photo, setPhoto]: [any, any] = useState(null)
  const [errors, setErrors]: [any, any] = useState(null)
  const [loading, setLoading]: [boolean, any] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch();

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
    setLoading(true)

    const formData = new FormData()
    formData.append('photo', photo)

    const response = await window.axios.post('https://localhost:1443/api/photos', formData)

    setLoading(false)

    if (response.status === UNPROCESSABLE_ENTITY) {
      setErrors(response.data.errors)
      return false
    }

    setPreview('')
    setPhoto(null)
    setShowForm(false)

    if (response.status !== CREATED) {
      dispatch(setCode(response.status))
      return false
    }

    dispatch(setContent('写真が投稿されました！'))
    setTimeout(() => dispatch(setContent('')), 6000)

    history.push(`/photos/${response.data.id}`)
  }

  return (
    <>
      <div className="photo-form">
        <h2 className="title">Submit a Photo</h2>
        { loading &&
          <Loader>Sending your photo...</Loader>
        }
        { !loading &&
          <form className="form">
            { errors &&
              <div className="erros">
                { errors.photo &&
                <ul>
                  { errors.photo.map((msg: string, index: any) => {
                    return(<li key={index}>{ msg }</li>)
                  })}
                </ul>
                }
              </div>
            }
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
        }
      </div>
    </>
  )
}

export default PhotoForm