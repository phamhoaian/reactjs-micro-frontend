import React, { useState } from 'react'
import MovieService from 'services/MovieService'
import { validateYouTubeUrl } from 'utils/function'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './ShareMovie.scss'

const ShareMovie = () => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const onShareMovie = async () => {
    try {
      if (validateYouTubeUrl(url)) {
        setLoading(true)
        const result = await MovieService.postMovie(url)
        if (result && result.movie) {
          setUrl('')
          toast.success('Share video successfully')
        } else {
          toast.error('Error occurred! Please try again')
        }
        setLoading(false)
      } else {
        toast.error('Invalid Youtube URL')
      }
    } catch (error) {
      toast.error('Error occurred! Please try again')
      setLoading(false)
    }
  }
  return (
    <div className="Share-Movie">
      <div className="Share-Movie-box">
        <h3 className="Share-Movie-title">Share a Youtube movie</h3>
        <div className='Share-Movie-form-row'>
          <div className='Share-Movie-form-label'>
            <label>Youtube URL:</label>
          </div>
          <div className="Share-Movie-form-input">
            <input
              type="text"
              className="Share-Movie-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>
        <div className='Share-Movie-form-row'>
          <div className='Share-Movie-form-label' />
          <button className="Share-Movie-button" onClick={onShareMovie} disabled={loading}>Share</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ShareMovie