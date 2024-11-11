import { initializeKakaoSDK } from "@react-native-kakao/core";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import NavBar from "./components/NavBar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Luck from "./screens/Mypage/Luck";
import SleepLab from "./screens/Mypage/SleepLab";
import Info from "./screens/Mypage/Info";
import { StackParamList } from "./types/navigation";
import Tip from "./screens/Main/Tip";
import { Provider } from "react-redux";
import store from "./store/store";
import { useFonts } from "expo-font";
import { FONTS, FONT_IMPORTS } from "./constants/fonts";

const Stack = createNativeStackNavigator<StackParamList>(); // 타입을 명시합니다.

export default function App() {
  const [fontsLoaded] = useFonts(FONT_IMPORTS);

  if (!fontsLoaded) {
    return null; // 폰트가 로드될 때까지 빈 화면을 표시
  }

  const loginInfo = null;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          backgroundColor="#001234"
          barStyle="light-content"
          animated={true}
        />
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Main" component={NavBar} />
          {/* <Stack.Screen name="History" component={Exampage} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="Alarm" component={Exampage} options={{ headerShown: false }} /> */}
          <Stack.Screen name="Luck" component={Luck} />
          <Stack.Screen name="SleepLab" component={SleepLab} />
          <Stack.Screen name="Info" component={Info} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
