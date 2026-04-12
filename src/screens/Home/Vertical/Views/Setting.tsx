import { ScrollView } from 'react-native'
import { useTheme } from '@/store/theme/hook'
import { createStyle } from '@/utils/tools'
import SettingItem from './components/SettingItem'
import { useSettingValue } from '@/store/setting/hook'
import { updateSetting } from '@/core/common'

const Setting = () => {
  const theme = useTheme()

  return (
    <ScrollView style={{ ...styles.container, backgroundColor: theme['c-content-background'] }}>
    </ScrollView>
  )
}

const styles = createStyle({
  container: {
    flex: 1,
  },
})

export default Setting