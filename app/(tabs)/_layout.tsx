import { useState } from 'react';
import { View, Dimensions, StyleSheet, StatusBar } from 'react-native';
import {
  TabView,
  TabBar,
  Route,
  SceneRendererProps,
  NavigationState
} from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';

import * as colors42 from '@/style/Colors';
import HomeScreen from './index';
import CalendarScreen from './calendar';

const initialLayout = { width: Dimensions.get('window').width };
const windowHeight = Dimensions.get('window').height;

type RouteProps = Route & { icon: string };
type State = NavigationState<RouteProps>;

const TabLayout = () => {
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'calendar', title: 'Calendar', icon: 'calendar' }
  ];

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case 'home':
        return <HomeScreen />;
      case 'calendar':
        return <CalendarScreen />;
      default:
        return null;
    }
  };

  const renderIcon = ({
    route,
    focused
  }: {
    route: RouteProps;
    focused: boolean;
  }) => (
    <Ionicons
      name={focused ? (route.icon as any) : (`${route.icon}-outline` as any)}
      size={21}
      color={focused ? colors42.C42_ORANGE_DARK : colors42.C42_TEXT}
    />
  );

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: State }
  ) => (
    <TabBar
      {...props}
      renderIcon={renderIcon}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      labelStyle={styles.label}
      pressColor="transparent"
    />
  );

  return (
    <View style={styles.container}>
      {/*<View style={[styles.header]}></View>*/}
      <StatusBar
        animated={true}
        backgroundColor={colors42.C42_GREEN_DARK}
        barStyle={'dark-content'}
        showHideTransition={'slide'}
        hidden={false}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={windowHeight ? renderScene : () => null}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        tabBarPosition="bottom"
        style={{ marginTop: 21 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: colors42.C42_GREEN_DARK,
    zIndex: 1
  },
  container: {
    flex: 1
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  tabBar: {
    backgroundColor: colors42.C42_GREEN_DARK,
    paddingTop: 5
  },
  indicator: {
    backgroundColor: colors42.C42_ORANGE_DARK
  },
  label: {
    fontSize: 10,
    color: colors42.C42_TEXT,
    fontWeight: 'bold'
  }
});

export default TabLayout;
