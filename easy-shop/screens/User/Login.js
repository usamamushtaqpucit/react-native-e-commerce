import { useEffect } from "react";
import { useSelector } from "react-redux";
import AuthForm from "../../components/Auth/AuthForm";

const Login = ({ navigation }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (currentUser?.isAuthenticated === true) {
      navigation.navigate("User Profile");
    }
  }, [currentUser?.isAuthenticated]);
  return <AuthForm />;
};

export default Login;
