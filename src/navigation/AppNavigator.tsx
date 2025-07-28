import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useAppTheme } from "../ui/providers/ThemeProvider";
import { SavedPostsScreen } from "../features/posts/pages/SavedPostScreen";
import { PostListScreen } from "../features/posts/pages/PostListScreen";
import SettingsScreen from "@src/features/settings/pages/SettingsScreen";
import { Icon } from "@src/ui/atoms";

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  const { colors, theme } = useAppTheme();

  const navTheme = theme === "dark" ? DarkTheme : DefaultTheme;
  navTheme.colors.background = colors.background;

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ size, focused }) => {
            let iconName: keyof typeof import("../ui/atoms/Icon").iconMap;

            if (route.name === "Home") iconName = "home";
            else if (route.name === "Saved") iconName = "bookmark";
            else iconName = "settings";

            return (
              <Icon
                name={iconName}
                size={size}
                color={focused ? colors.primary : colors.surface}
              />
            );
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.secondary,
          tabBarStyle: { backgroundColor: colors.surface },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={PostListScreen} />
        <Tab.Screen name="Saved" component={SavedPostsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
