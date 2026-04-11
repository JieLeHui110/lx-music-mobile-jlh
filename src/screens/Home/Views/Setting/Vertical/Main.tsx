import { memo, useMemo } from 'react'
import { FlatList, type FlatListProps } from 'react-native'

import Basic from '../settings/Basic'
import Player from '../settings/Player'
import LyricDesktop from '../settings/LyricDesktop'
import Search from '../settings/Search'
import List from '../settings/List'
import Sync from '../settings/Sync'
import Backup from '../settings/Backup'
import Other from '../settings/Other'
import Version from '../settings/Version'
import About from '../settings/About'
import { createStyle } from '@/utils/tools'
import { SETTING_SCREENS, type SettingScreenIds } from '../Main'
import { useSettingValue } from '@/store/setting/hook'

type FlatListType = FlatListProps<SettingScreenIds>


const styles = createStyle({
  content: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flex: 0,
  },
})

const ListItem = memo(({
  id,
}: { id: SettingScreenIds }) => {
  switch (id) {
    case 'player': return <Player />
    case 'lyric_desktop': return <LyricDesktop />
    case 'search': return <Search />
    case 'list': return <List />
    case 'sync': return <Sync />
    case 'backup': return <Backup />
    case 'other': return <Other />
    case 'version': return <Version />
    case 'about': return <About />
    case 'basic': return <Basic />
  }
}, () => true)

export default () => {
  const showDesktopLyricOption = useSettingValue('showDesktopLyricOption')
  const showUpdateOption = useSettingValue('showUpdateOption')
  const showAboutOption = useSettingValue('showAboutOption')

  const screens = useMemo(() => {
    const filtered = [...SETTING_SCREENS]
    if (!showDesktopLyricOption) {
      const idx = filtered.indexOf('lyric_desktop')
      if (idx > -1) filtered.splice(idx, 1)
    }
    if (!showUpdateOption) {
      const idx = filtered.indexOf('version')
      if (idx > -1) filtered.splice(idx, 1)
    }
    if (!showAboutOption) {
      const idx = filtered.indexOf('about')
      if (idx > -1) filtered.splice(idx, 1)
    }
    return filtered
  }, [showDesktopLyricOption, showUpdateOption, showAboutOption])

  const renderItem: FlatListType['renderItem'] = ({ item }) => <ListItem id={item} />
  const getkey: FlatListType['keyExtractor'] = item => item

  return (
    <FlatList
      data={screens}
      keyboardShouldPersistTaps={'always'}
      renderItem={renderItem}
      keyExtractor={getkey}
      contentContainerStyle={styles.content}
      maxToRenderPerBatch={2}
      // updateCellsBatchingPeriod={80}
      windowSize={2}
      // removeClippedSubviews={true}
      initialNumToRender={1}
    />
  )
}
