import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, StatusBar } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import CustomBox from "react-native-customized-box";
import axios from 'axios';

const LoginSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email address"),
  password: yup.string().required("Password is required"),
});

export default function Login({ navigation }) {


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>Sign In</Text>
      <Image
        style={styles.loginImage}
        source={{
          uri: "https://raw.githubusercontent.com/hirishu10/my-assets/main/login.png",
        }}
      />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => {
          axios.post('http://192.168.43.194:3000/login', {
            useremail: values.email,
            password: values.password,
          })
          .then(response => {
            if (response.data.success) {
              navigation.navigate('Home');
            } else {
              console.log("Login failed");
            }
          })
          .catch(error => {
            console.error(error);
          });

          actions.resetForm();
        }}
      >
        {(props) => (
          <View>
            <CustomBox
              placeholder={"Email"}
              boxColor={"silver"}
              focusColor={"#e65c40"}
              keyboardType="email-address"
              boxStyle={{ borderRadius: 40, borderWidth: 2 }}
              inputStyle={{
                fontWeight: "bold",
                color: "#30302e",
                paddingLeft: 20,
                borderRadius: 40,
              }}
              labelConfig={{
                text: "Email",
                style: {
                  color: "#0e0e21",
                  fontWeight: "bold",
                },
              }}
              onChangeText={props.handleChange("email")}
              value={props.values.email}
              onBlur={props.handleBlur("email")}
              requiredConfig={{
                text: props.touched.email && props.errors.email,
              }}
            />

            <CustomBox
              placeholder={"Password"}
              toggle={true}
              boxColor={"silver"}
              focusColor={"#e65c40"}
              boxStyle={{ borderRadius: 40, borderWidth: 2 }}
              inputStyle={{
                fontWeight: "bold",
                color: "#30302e",
                paddingLeft: 20,
                borderRadius: 40,
              }}
              labelConfig={{
                text: "Password",
                style: {
                  color: "#0e0e21",
                  fontWeight: "bold",
                },
              }}
              onChangeText={props.handleChange("password")}
              value={props.values.password}
              onBlur={props.handleBlur("password")}
              requiredConfig={{
                text: props.touched.password && props.errors.password,
              }}
            />

            <TouchableOpacity style={styles.loginBtn} onPress={props.handleSubmit}>
              <Text style={styles.loginBtnText}>LogIn</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <View style={styles.createAccount}>
        <Text style={styles.createAccountText}>Don't have an Account? </Text>
        <TouchableOpacity style={styles.registerBtn} onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerBtnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginImage: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
  header: {
    fontSize: 25,
  },
  loginBtn: {
    marginTop: 10,
    backgroundColor: "#e65c40",
    width: 300,
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loginBtnText: {
    color: "white",
    fontSize: 22,
  },
  createAccount: {
    marginTop: 10,
    width: 280,
    height: 20,
    flexDirection: "row",
  },
  createAccountText: {
    color: "grey",
  },
  registerBtnText: {
    color: "#e65c40",
    textDecorationLine: "underline",
  },
});
