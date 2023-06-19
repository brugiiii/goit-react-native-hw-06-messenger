import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { sendEmailValidationRequest } from "~/services/api";

import { AntDesign } from "@expo/vector-icons";
import backgroundImage from "~/assets/images/backgroundPhoto.jpeg";

export const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const navigation = useNavigation();

  const handleFocus = (e) => {
    setIsInputFocused(true);
  };

  const handleBlur = (e) => {
    setIsInputFocused(false);
  };

  const onSubmit = async () => {
    const isValid = await sendEmailValidationRequest(email);

    if (isValid) {
      setLogin("");
      setEmail("");
      setPassword("");
      navigation.navigate("Home");
    } else {
      console.log("EMAIL WAS INVALID.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={backgroundImage}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.registrationContainer,
                paddingBottom: isInputFocused ? 32 : 78,
              }}
            >
              <View style={styles.avatarContainer}>
                <Image style={styles.avatar} />
                <TouchableOpacity style={styles.addAvatarButton}>
                  <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <View style={{ marginBottom: 16 }}>
                <View>
                  <TextInput
                    placeholder="Логін"
                    style={{
                      ...styles.input,
                      marginBottom: 16,
                      borderColor: isInputFocused ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: isInputFocused ? "#FFFFFF" : "#F6F6F6",
                    }}
                    autoCapitalize="none"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={login}
                    onChangeText={setLogin}
                  />
                </View>
                <View>
                  <TextInput
                    placeholder="Адреса електронної пошти"
                    style={{
                      ...styles.input,
                      marginBottom: 16,
                      borderColor: isInputFocused ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: isInputFocused ? "#FFFFFF" : "#F6F6F6",
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
                <View style={{ marginBottom: 43, position: "relative" }}>
                  <TextInput
                    placeholder="Пароль"
                    style={{
                      ...styles.input,
                      borderColor: isInputFocused ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: isInputFocused ? "#FFFFFF" : "#F6F6F6",
                    }}
                    secureTextEntry={showPassword}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    style={styles.showPasswordButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={styles.showPasswordButtonText}>
                      {showPassword ? "Показати" : "Приховати"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.registerButtonContainer}
                  onPress={onSubmit}
                >
                  <Text style={styles.registerButtonText}>Зареєстуватися</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.logInButtonContainer}
                onPress={() => {
                  navigation.navigate("LoginScreen");
                }}
              >
                <Text style={styles.logInButtonText}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  registrationContainer: {
    position: "relative",

    paddingTop: 92,
    paddingHorizontal: 16,

    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarContainer: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],

    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatar: {},
  addAvatarButton: {
    position: "absolute",
    right: -12,
    bottom: 14,
  },
  title: {
    marginBottom: 32,

    fontFamily: "Roboto-Medium",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,

    color: "#212121",
  },

  input: {
    paddingLeft: 16,

    height: 50,

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,

    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  showPasswordButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  showPasswordButtonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,

    color: "#1B4371",
  },
  registerButtonContainer: {
    display: "flex",
    justifyContent: "center",

    height: 51,
    paddingLeft: 32,
    paddingRight: 32,

    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  registerButtonText: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,

    color: "#fff",
  },
  logInButtonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",

    color: "#1B4371",
  },
});
