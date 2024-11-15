import { initializeKakaoSDK } from "@react-native-kakao/core";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import NavBar from "./components/NavBar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainSleep from "./screens/Main/MainSleep";
import Sleeping from "./screens/Main/Sleeping";
import Luck from "./screens/Mypage/Luck";
import SleepLab from "./screens/Mypage/SleepLab";
import Info from "./screens/Mypage/Info";
import MonthlyChart from "./screens/Chart/MonthlyChart";
import DailyChart from "./screens/Chart/DailyChart";
import { StackParamList } from "./types/navigation";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import { useFonts } from "expo-font";
import { FONTS, FONT_IMPORTS } from "./constants/fonts";
import useAxios from "./hooks/useAxios";
import { USER } from "./constants/apis";
import { setUserInfo } from "./store/userSlice";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts(FONT_IMPORTS);

  useEffect(() => {
    initializeKakaoSDK("c9f9a5b0717e5e19f774465dcb85522b");
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          backgroundColor="#001234"
          barStyle="light-content"
          animated={true}
        />
        <Stack.Navigator
          initialRouteName="NavBar"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Nav" component={NavBar} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MainSleep" component={MainSleep} />
          <Stack.Screen name="Sleeping" component={Sleeping} />
          <Stack.Screen name="Luck" component={Luck} />
          <Stack.Screen name="SleepLab" component={SleepLab} />
          <Stack.Screen name="Info" component={Info} />
          <Stack.Screen name="MonthlyChart" component={MonthlyChart} />
          <Stack.Screen name="DailyChart" component={DailyChart} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
