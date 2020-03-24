export const xmlHttpRequestUploadFile = (url, body, config) => {
    const {
      onProgress = () => {},
      onSuccess = () => {},
      onError = () => {}
    } = config

    const xhr = new XMLHttpRequest()

    xhr.upload.onprogress = ({ loaded, total }) => {
      onProgress(Math.round((loaded / total) * 100))
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          onSuccess()
        } else {
          onError('upload error')
        }
      }
    }

    xhr.open('PUT', url)
    xhr.setRequestHeader('Content-Type', body.type)
    xhr.setRequestHeader('X-Amz-ACL', 'public-read')
    xhr.send(body)
  }
