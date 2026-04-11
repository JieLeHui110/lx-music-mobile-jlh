import { useRef, useImperativeHandle, forwardRef, useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, Modal as RNModal } from 'react-native'
import { useTheme } from '@/store/theme/hook'
import { createStyle } from '@/utils/tools'
import listState from '@/store/list/state'
import playerState from '@/store/player/state'
import { getListMusicSync } from '@/utils/listManage'

export interface PlaylistModalProps {
  onSelect?: (musicInfo: LX.Music.MusicInfo) => void
}
export interface PlaylistModalType {
  show: () => void
  hide: () => void
}

const PlaylistModal = forwardRef<PlaylistModalType, PlaylistModalProps>(({ onSelect }, ref) => {
  const theme = useTheme()
  const [visible, setVisible] = useState(false)
  const [musicList, setMusicList] = useState<LX.Music.MusicInfo[]>([])

  useImperativeHandle(ref, () => ({
    show() {
      const listId = playerState.playMusicInfo.listId || listState.activeListId
      let list: LX.Music.MusicInfo[] = []
      if (listId) {
        list = getListMusicSync(listId)
      }
      if (!list.length && playerState.playMusicInfo.isTempPlay) {
        list = playerState.tempPlayList.map(item => item.musicInfo)
      }
      setMusicList(list)
      setVisible(true)
    },
    hide() {
      setVisible(false)
    },
  }))

  const handleSelect = (musicInfo: LX.Music.MusicInfo) => {
    onSelect?.(musicInfo)
    setVisible(false)
  }

  const renderItem = ({ item, index }: { item: LX.Music.MusicInfo; index: number }) => {
    const isPlaying = playerState.musicInfo.id === item.id
    return (
      <TouchableOpacity
        style={[styles.item, { backgroundColor: isPlaying ? theme['c-primary-light-100-alpha-200'] : 'transparent' }]}
        onPress={() => handleSelect(item)}
      >
        <Text style={[styles.title, { color: theme['c-font'] }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.singer, { color: theme['c-font-alpha-700'] }]} numberOfLines={1}>
          {item.singer}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: theme['c-content-background'] }]}>
          <Text style={[styles.header, { color: theme['c-font'] }]}>当前播放列表</Text>
          <FlatList
            data={musicList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
          <TouchableOpacity style={[styles.closeBtn, { backgroundColor: theme['c-primary'] }]} onPress={() => setVisible(false)}>
            <Text style={[styles.closeText, { color: theme['c-primary-font'] }]}>关闭</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RNModal>
  )
})

const styles = createStyle({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    maxHeight: '70%',
    borderRadius: 10,
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 16,
  },
  singer: {
    fontSize: 14,
  },
  closeBtn: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
  },
})

export default PlaylistModal