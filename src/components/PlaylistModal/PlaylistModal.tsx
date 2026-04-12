import { useRef, useImperativeHandle, forwardRef, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Modal as RNModal } from 'react-native'
import { useTheme } from '@/store/theme/hook'
import { createStyle } from '@/utils/tools'
import listState from '@/store/list/state'
import playerState from '@/store/player/state'
import { getListMusicSync, getListMusics } from '@/utils/listManage'

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
  const [listTitle, setListTitle] = useState('当前播放列表')

  useImperativeHandle(ref, () => ({
    show() {
      const listId = playerState.playMusicInfo.listId || playerState.playInfo.playerListId
      const loadList = async () => {
        let list: LX.Music.MusicInfo[] = []
        let title = '当前播放列表'
        let targetListId = listId

        // 检查当前播放的歌曲是否在收藏列表中
        const loveList = listState.lists.love || []
        const isInLove = loveList.some(music => music.id === playerState.musicInfo.id)

        if (isInLove) {
          title = listState.allList.find(item => item.id === 'love')?.name ?? '我的收藏'
          list = getListMusicSync('love')
          if (!list.length) {
            list = await getListMusics('love')
          }
          targetListId = 'love'
        } else if (listId) {
          title = listState.allList.find(item => item.id === listId)?.name ?? title
          list = getListMusicSync(listId)
          if (!list.length) {
            list = await getListMusics(listId)
          }
        }

        if (!list.length && playerState.playMusicInfo.isTempPlay) {
          title = listState.tempList.name
          list = playerState.tempPlayList.map(item => item.musicInfo)
        }

        setListTitle(title)
        setMusicList(list)
      }

      setVisible(true)
      void loadList()
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
          <Text style={[styles.header, { color: theme['c-font'] }]}>{listTitle}</Text>
          {musicList.length ? (
            <FlatList
              data={musicList}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={styles.list}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: theme['c-font-alpha-700'] }]}>当前播放列表暂无歌曲</Text>
            </View>
          )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 120,
  },
  emptyText: {
    fontSize: 16,
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