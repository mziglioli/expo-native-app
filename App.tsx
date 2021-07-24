import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import {
  Provider as PaperProvider,
} from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SideBar, Page, TabBottom, buildItems, tabScenes, tabRoutes } from '@mziglioli/react-native-components';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();
const SideBarItems = buildItems();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <PaperProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <Drawer.Navigator
                  initialRouteName="Home"
                  drawerContent={(props) => (
                      <SideBar
                          title="Some title"
                          navigation={props.navigation}
                          items={SideBarItems}
                      />
                  )}
              >
                <Drawer.Screen
                    name="Home"
                    component={(props) => (
                        <View
                            style={{
                              flex: 1,
                              flexDirection: 'column',
                              backgroundColor: '#fff',
                            }}
                        >
                          <Page page={'Home'} title={'Home'} navigation={props.navigation} />
                          <TabBottom tabRoutes={tabRoutes} scenes={tabScenes} />
                        </View>
                    )}
                />
                <Drawer.Screen name="second">
                  {(props) => (
                      <Page
                          page={'second'}
                          title="second page"
                          navigation={props.navigation}
                      >
                        <View>
                          <Button
                              onPress={() => {
                                props.navigation.navigate('first');
                              }}
                              title={'second page'}
                          />
                        </View>
                      </Page>
                  )}
                </Drawer.Screen>
              </Drawer.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>

    );
  }
}
