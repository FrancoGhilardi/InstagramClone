import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useAppTheme } from "../ui/providers/ThemeProvider";
import { SavedPostsScreen } from "../features/posts/pages/SavedPostScreen";
import { Icon } from "../ui/atoms/Icon/Icon";
import { PostListScreen } from "../features/posts/pages/PostListScreen";
import { SettingsScreen } from "../features/settings/pages/SettingsScreen";

const Tab = createBottomTabNavigator();

export const AppNavigator: React.FC = () => {
  const { colors, theme } = useAppTheme();

  const navTheme = theme === "dark" ? DarkTheme : DefaultTheme;
  navTheme.colors.background = colors.background;

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof import("../ui/atoms/Icon/Icon").iconMap;

            if (route.name === "Home") iconName = "heart";
            else if (route.name === "Saved") iconName = "bookmark";
            else iconName = "share";

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.accent,
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
