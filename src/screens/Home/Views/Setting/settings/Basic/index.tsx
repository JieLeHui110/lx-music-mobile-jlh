import { memo } from 'react'
import { Switch, View } from 'react-native'

import { useTheme } from '@/store/theme/hook'
import { useSettingValue } from '@/store/setting/hook'
import { updateSetting } from '@/core/common'
import Text from '@/components/common/Text'
import Theme from '../Theme'
import Section from '../../components/Section'
import Source from './Source'
import SourceName from './SourceName'
import Language from './Language'
import FontSize from './FontSize'
import ShareType from './ShareType'
import IsStartupAutoPlay from './IsStartupAutoPlay'
import IsStartupPushPlayDetailScreen from './IsStartupPushPlayDetailScreen'
import IsAutoHidePlayBar from './IsAutoHidePlayBar'
import IsHomePageScroll from './IsHomePageScroll'
import IsAllowProgressBarSeek from './IsAllowProgressBarSeek'
import IsUseSystemFileSelector from './IsUseSystemFileSelector'
import IsAlwaysKeepStatusbarHeight from './IsAlwaysKeepStatusbarHeight'
import IsShowBackBtn from './IsShowBackBtn'
import IsShowExitBtn from './IsShowExitBtn'
import DrawerLayoutPosition from './DrawerLayoutPosition'
import { useI18n } from '@/lang/i18n'

const SettingToggle = ({ label, value, onChange }: { label: string, value: boolean, onChange: (value: boolean) => void }) => {
  const theme = useTheme()

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 15,
      paddingHorizontal: 5,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    }}>
      <Text style={{ fontSize: 16, color: theme['c-font'] }}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: theme['c-primary-alpha-200'], true: theme['c-primary'] }}
        thumbColor={value ? theme['c-primary-font'] : theme['c-font']}
      />
    </View>
  )
}

export default memo(() => {
  const t = useI18n()
  const showDesktopLyric = useSettingValue('setting.showDesktopLyric')
  const showUpdate = useSettingValue('setting.showUpdate')
  const showAbout = useSettingValue('setting.showAbout')

  return (
    <Section title={t('setting_basic')}>
      <IsStartupAutoPlay />
      <IsStartupPushPlayDetailScreen />
      <IsShowBackBtn />
      <IsShowExitBtn />
      <SettingToggle
        label="显示桌面歌词选项"
        value={showDesktopLyric}
        onChange={(value) => updateSetting({ 'setting.showDesktopLyric': value })}
      />
      <SettingToggle
        label="显示软件更新选项"
        value={showUpdate}
        onChange={(value) => updateSetting({ 'setting.showUpdate': value })}
      />
      <SettingToggle
        label="显示关于 JLHmusic 选项"
        value={showAbout}
        onChange={(value) => updateSetting({ 'setting.showAbout': value })}
      />
      <IsAutoHidePlayBar />
      <IsHomePageScroll />
      <IsAllowProgressBarSeek />
      <IsUseSystemFileSelector />
      <IsAlwaysKeepStatusbarHeight />
      <Theme />
      <DrawerLayoutPosition />
      <Language />
      <FontSize />
      <ShareType />
      <Source />
      <SourceName />
    </Section>
  )
})
