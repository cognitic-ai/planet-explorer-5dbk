import { ThemeProvider } from "@/components/theme-provider";
import AC from "@bacons/apple-colors";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Tabs as WebTabs } from "expo-router/tabs";
import { Platform, useWindowDimensions } from "react-native";
import { SymbolView } from "expo-symbols";

const AppleStackPreset: NativeStackNavigationOptions =
  process.env.EXPO_OS !== "ios"
    ? {}
    : isLiquidGlassAvailable()
    ? {
        headerTransparent: true,
        headerShadowVisible: false,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: {
          backgroundColor: "transparent",
        },
        headerTitleStyle: {
          color: AC.label as any,
        },
        headerBlurEffect: "none",
        headerBackButtonDisplayMode: "minimal",
      }
    : {
        headerTransparent: true,
        headerShadowVisible: true,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: {
          backgroundColor: "transparent",
        },
        headerBlurEffect: "systemChromeMaterial",
        headerBackButtonDisplayMode: "default",
      };

export const unstable_settings = {
  "(index)": { anchor: "index" },
  "(quiz)": { anchor: "quiz" },
};

export default function Layout() {
  return (
    <ThemeProvider>
      <TabsLayout />
    </ThemeProvider>
  );
}

function TabsLayout() {
  if (process.env.EXPO_OS === "web") {
    return <WebTabsLayout />;
  } else {
    return <NativeTabsLayout />;
  }
}

function WebTabsLayout() {
  const { width } = useWindowDimensions();
  const isMd = width >= 768;
  const isLg = width >= 1024;

  return (
    <WebTabs
      screenOptions={{
        headerShown: false,
        ...(isMd
          ? {
              tabBarPosition: "left",
              tabBarVariant: "material",
              tabBarLabelPosition: isLg ? undefined : "below-icon",
            }
          : {
              tabBarPosition: "bottom",
            }),
      }}
    >
      <WebTabs.Screen
        name="(index)"
        options={{
          title: "Explore",
        }}
      />
      <WebTabs.Screen
        name="(quiz)"
        options={{
          title: "Quiz",
        }}
      />
      <WebTabs.Screen
        name="planet"
        options={{
          href: null,
        }}
      />
    </WebTabs>
  );
}

function NativeTabsLayout() {
  return (
    <NativeTabs screenOptions={AppleStackPreset}>
      <NativeTabs.Trigger name="(index)">
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "globe", selected: "globe" } },
            default: {
              src: (
                <SymbolView
                  name="globe"
                  size={24}
                  tintColor={AC.label as any}
                />
              ),
            },
          })}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(quiz)">
        <NativeTabs.Trigger.Label>Quiz</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "questionmark.circle", selected: "questionmark.circle.fill" } },
            default: {
              src: (
                <SymbolView
                  name="questionmark.circle"
                  size={24}
                  tintColor={AC.label as any}
                />
              ),
            },
          })}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
