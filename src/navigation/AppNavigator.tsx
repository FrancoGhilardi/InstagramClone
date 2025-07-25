import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useAppTheme } from "../ui/providers/ThemeProvider";
import { SavedPostsScreen } from "../features/posts/pages/SavedPostScreen";
import { Icon } from "../ui/atoms/Icon/Icon";
import { PostListScreen } from "../features/posts/pages/PostListScreen";

const Tab = createBottomTabNavigator();

export const AppNavigator: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: "heart" | "bookmark" =
              route.name === "Home" ? "heart" : "bookmark";
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
      </Tab.Navigator>
    </NavigationContainer>
  );
};
