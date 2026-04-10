import { View, Switch } from 'react-native'
import { useTheme } from '@/store/theme/hook'
import { createStyle } from '@/utils/tools'
import Text from '@/components/common/Text'

interface SettingItemProps {
  label: string
  type: 'switch'
  value: boolean
  onChange: (value: boolean) => void
}

const SettingItem = ({ label, type, value, onChange }: SettingItemProps) => {
  const theme = useTheme()

  return (
    <View style={styles.container}>
      <Text style={styles.label} color={theme['c-font']}>{label}</Text>
      {type === 'switch' && (
        <Switch
          value={value}
          onValueChange={onChange}
          trackColor={{ false: theme['c-primary-alpha-200'], true: theme['c-primary'] }}
          thumbColor={value ? theme['c-primary-font'] : theme['c-font']}
        />
      )}
    </View>
  )
}

const styles = createStyle({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  label: {
    fontSize: 16,
  },
})

export default SettingItem