import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  SideBar,
  PageContainer,
  MenuItem,
} from '@mziglioli/react-native-components';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Account } from './container/Account/Account';
import { User } from './type';

const Drawer = createDrawerNavigator();
export const buildMenuItem = (
  label: string,
  icon: string,
  active: boolean
): MenuItem => {
  return {
    label: `${label}`,
    icon: icon,
    active: active,
    page: `${label}`,
  };
};
const SideBarItems = [
  buildMenuItem('Account', 'account', false),
  buildMenuItem('Help', 'help-circle', false),
  buildMenuItem('Contact', 'card-account-phone', false),
];

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [user, setUser] = useState<User>({
    name: 'Guest',
    email: '',
    initials: 'GT',
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider>
        <SafeAreaProvider>
          <NavigationContainer
            onUnhandledAction={(action) =>
              console.log('onUnhandledAction', action)
            }
          >
            <Drawer.Navigator
              initialRouteName="Account"
              drawerContent={(props) => (
                <SideBar
                  currentPage={'Account'}
                  customer={user}
                  itemPress={(item) => {
                    props.navigation.navigate(item.page);
                  }}
                  items={SideBarItems}
                />
              )}
            >
              <Drawer.Screen
                name="Home"
                component={() => (
                  <PageContainer page="Home" name="Home" backNavigateTo="Home">
                    <View>Home todo</View>
                  </PageContainer>
                )}
              />
              <Drawer.Screen name="Account">
                {(props) => (
                  <PageContainer
                    testId="AccountContainer"
                    page="Account"
                    name="Account"
                    backNavigateTo="Home"
                  >
                    <Account
                      onLoginSuccess={(user) => {
                        setUser(user);
                        props.navigation.navigate('Home');
                      }}
                    />
                  </PageContainer>
                )}
              </Drawer.Screen>
              <Drawer.Screen
                name="Contact"
                component={() => (
                  <PageContainer
                    page="Contact"
                    name="Contact"
                    backNavigateTo="Contact"
                  >
                    <View>Contact todo</View>
                  </PageContainer>
                )}
              />
              <Drawer.Screen name="Help">
                {(props) => (
                  <PageContainer
                    page="Help"
                    name="Help"
                    backNavigateTo="Contact"
                  >
                    <View>
                      <Button
                        onPress={() => {
                          props.navigation.navigate('Contact');
                        }}
                        title={'second page'}
                      />
                    </View>
                  </PageContainer>
                )}
              </Drawer.Screen>
            </Drawer.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
}
