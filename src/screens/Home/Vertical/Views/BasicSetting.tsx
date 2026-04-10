import { ScrollView } from 'react-native'
import { useTheme } from '@/store/theme/hook'
import { createStyle } from '@/utils/tools'
import SettingItem from './components/SettingItem'
import { useSettingValue } from '@/store/setting/hook'
import { updateSetting } from '@/core/common'

const BasicSetting = () => {
  const theme = useTheme()

  const showDesktopLyric = useSettingValue('setting.showDesktopLyric')
  const showUpdate = useSettingValue('setting.showUpdate')
  const showAbout = useSettingValue('setting.showAbout')

  return (
    <ScrollView style={{ ...styles.container, backgroundColor: theme['c-content-background'] }}>
      <SettingItem
        label="显示桌面歌词选项"
        type="switch"
        value={showDesktopLyric}
        onChange={(value) => updateSetting({ 'setting.showDesktopLyric': value })}
      />
      <SettingItem
        label="显示软件更新选项"
        type="switch"
        value={showUpdate}
        onChange={(value) => updateSetting({ 'setting.showUpdate': value })}
      />
      <SettingItem
        label="显示关于 JLHmusic 选项"
        type="switch"
        value={showAbout}
        onChange={(value) => updateSetting({ 'setting.showAbout': value })}
      />
    </ScrollView>
  )
}

const styles = createStyle({
  container: {
    flex: 1,
  },
})

export default BasicSetting