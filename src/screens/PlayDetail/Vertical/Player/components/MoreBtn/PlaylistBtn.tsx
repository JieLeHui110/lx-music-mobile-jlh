import { useRef } from 'react'
import PlaylistModal, { type PlaylistModalType } from '@/components/PlaylistModal'
import Btn from './Btn'

export default () => {
  const playlistModalRef = useRef<PlaylistModalType>(null)

  const handleShowPlaylistModal = () => {
    playlistModalRef.current?.show()
  }

  return (
    <>
      <Btn icon="menu" onPress={handleShowPlaylistModal} />
      <PlaylistModal ref={playlistModalRef} />
    </>
  )
}