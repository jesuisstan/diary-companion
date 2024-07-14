import { StyleSheet, Image } from 'react-native';
import { Header } from '@rneui/themed';

import { useUser } from '@/contexts/UserContext';
import LogoutButton from '@/components/ui/LogoutButton';
import { ThemedText } from '@/components/ui/ThemedText';
import { C42_GREEN } from '@/style/Colors';

const DiaryHeader = () => {
  const { user } = useUser();

  return (
    <Header
      containerStyle={styles.header}
      backgroundColor={C42_GREEN}
      leftComponent={
        <Image
          source={{ uri: user?.photoURL! }}
          style={{ width: 50, height: 50, borderRadius: 21 }}
        />
      }
      centerComponent={
        <ThemedText type="subtitle">{user?.displayName}</ThemedText>
      }
      rightComponent={<LogoutButton />}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default DiaryHeader;
