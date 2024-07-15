import { StyleSheet, Image } from 'react-native';
import { Header } from '@rneui/themed';

import { useUser } from '@/contexts/UserContext';
import ButtonLogOut from '@/components/ui/ButtonLogOut';
import { ThemedText } from '@/components/ui/ThemedText';
import { C42_GREEN } from '@/style/Colors';

const DiaryHeader = () => {
  const { user } = useUser();

  return (
    <Header
      containerStyle={styles.header}
      backgroundColor={C42_GREEN}
      leftComponent={
        <Image source={{ uri: user?.photoURL! }} style={styles.image} />
      }
      centerComponent={
        <ThemedText type="subtitle" style={styles.centerComponent}>
          {user?.displayName}
        </ThemedText>
      }
      rightComponent={<ButtonLogOut />}
      placement="center"
    />
  );
};

const styles = StyleSheet.create({
  header: {
    //height: 100,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  centerComponent: {
    textAlign: 'center'
  }
});

export default DiaryHeader;
