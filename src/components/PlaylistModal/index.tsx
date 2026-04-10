import { useRef, useImperativeHandle, forwardRef, useState } from 'react'
import Modal from './PlaylistModal'

export interface PlaylistModalProps {
  onSelect?: (musicInfo: LX.Music.MusicInfo) => void
}
export interface PlaylistModalType {
  show: () => void
}

export default forwardRef<PlaylistModalType, PlaylistModalProps>(({ onSelect }, ref) => {
  const playlistModalRef = useRef<any>(null)
  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    show() {
      if (visible) playlistModalRef.current?.show()
      else {
        setVisible(true)
        requestAnimationFrame(() => {
          playlistModalRef.current?.show()
        })
      }
    },
  }))

  return (
    visible
      ? <Modal ref={playlistModalRef} onSelect={onSelect} />
      : null
  )
})