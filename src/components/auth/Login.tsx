"use client";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import logins from "../../../public/assets/logins.jpg";
import { toast } from "react-toastify";
import Image from "next/image";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginSuccess } from "@/redux/features/userSlice";
import { AppDispatch } from "@/redux/store";
import { Button } from "../ui/button";
import cookies from "js-cookie";
import { backend_url } from "../constant";
// Define password rules regex
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

// Define the basic validation schema using Yup
const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("please enter your email address"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, "Please create a stronger password")
    .required("please enter a password"),
});

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      // Automatically log in user if data exists
      const userData = JSON.parse(storedUserData);
      if (userData) {
        cookies.set(
          "data",
          JSON.stringify({ isLogin: true, role: userData.role }),
          {
            expires: 1,
          } // Expires in 1 day
          // Secure option if transmitting over HTTPS
        );
        dispatch(loginSuccess(userData));
        toast.success("successfully logged in");
      }
      if (userData.role === "admin") {
        navigate.push("/admin");
      } else if (userData.role === "mentor") {
        navigate.push("/mentordashboard");
      } else if (userData.role === "mentee") {
        navigate.push("/menteedashboard");
      } else {
        navigate.push("/");
      }
    }
  }, [dispatch, navigate]);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false, // Add rememberMe field for checkbox
    },
    validationSchema: basicSchema,
    onSubmit: async (values, actions) => {
      try {
        //Todo change backend endpoint for login
        const response = await axios.post(`${backend_url}/api/v1/users/login`, {
          email: values.email,
          password: values.password,
        });
        const userData = response.data;

        if (response.status === 200) {
          console.log(userData);
          dispatch(loginSuccess(userData));
          cookies.set(
            "data",
            JSON.stringify({ isLogin: true, role: userData.role }),
            {
              expires: 1,
            }
          );
        }

        if (userData && userData.role) {
          // Handle role-based navigation
          if (userData.isVerified) {
            toast.success(response.data.message);
            switch (userData.role) {
              case "admin":
                navigate.push("/admin");
                break;
              case "mentor":
                navigate.push("/mentordashboard");
                break;
              case "mentee":
                navigate.push("/menteedashboard");
                break;
              default:
                navigate.push("/");
                break;
            }
          } else {
            toast.warning("Please verify your account");
            navigate.push("/auth/verify-email");
          }
        } else {
          // Handle error: userData or role property is missing
          toast.error("Invalid user data received from the server");
        }

        if (values.rememberMe) {
          localStorage.setItem("user", JSON.stringify(userData));
        }
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Type guard for AxiosError
          console.error("Axios error:", error);
          if (error.response?.status === 401) {
            // Handle unauthorized error
            console.log(error.response);
            setError(error.response.data.error);
          } else if (error.response?.status === 500) {
            toast.error(error.response.data.error);
          } else {
            // Handle other Axios errors
            toast.error("something gone un wanted");
          }
        } else {
          console.error("Unexpected error:", error);
          // Handle non-Axios errors (e.g., network errors)
        }
      }
      // Reset form and set submitting state
      actions.setSubmitting(false);
    },
  });

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="md:container md:mx-auto grid grid-cols-1 md:grid-cols-2 items-center content-start  md:content-center mt-1 mb-20 md:mt-5">
      <div className="hidden md:block order-1 md:order-1">
        <Image
          src={logins}
          alt="feedback"
          className="object-cover items-center rounded-md "
        />
      </div>
      <div className="order-2 md:order-2 w-full bg-gray-50 dark:bg-gray-900 dark:text-white overflow-hidden">
        {error && (
          <div className="text-2xl font-semibold pt-5 mb-6 text-center text-red-500 mt-6">
            {error}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="md:max-w-xl w-full md:mx-auto mx-0  bg-white text-[#1F284F]  shadow-sm rounded px-0 md:px-8 md:pt-5 pb-2 md:my-2 space-y-4"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-cc">
            Welcome Back!
          </h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm italic">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <div className="flex">
              <input
                type={showPassword ? "text" : "password"} // Use state variable to toggle password visibility
                placeholder="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
              <span
                className="flex justify-around items-center cursor-pointer" // Add cursor pointer
                onClick={handleToggle}
              >
                {showPassword ? (
                  <EyeIcon className="absolute mr-10" size={25} />
                ) : (
                  <EyeOffIcon className="absolute mr-10" size={25} />
                )}
              </span>
            </div>
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm italic">{errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between pt-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={values.rememberMe}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-gray-700">
                Remember Me
              </label>
            </div>
            <div className="flex items-center">
              <Link
                href="/forgotpassword"
                className="text-cc text-sm md:text-base"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full text-white font-bold py-2 px-4 rounded my-10"
              disabled={isSubmitting}
            >
              Login
            </Button>
          </div>
        </form>

        <p className="text-center mb-2">or</p>
        <div className=" text-center text-[16px] sm:text-lg py-4">
          <p>
            Don&apos;t have an account?{" "}
            <Link href={"/auth"} className="text-cc font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
