"use client";
// import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import logins from "../../../public/assets/logins.jpg";
// import { toast } from "react-toastify";
// Correct import
import Image from "next/image";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";

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
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string>("");

  // useEffect(() => {
  //   // Check if user data exists in localStorage
  //   const storedUserData = localStorage.getItem("user");
  //   if (storedUserData) {
  //     // Automatically log in user if data exists
  //     const userData = JSON.parse(storedUserData);
  //     dispatch(loginSuccess(userData));
  //     if (userData.role === "admin") {
  //       navigate("/admin");
  //     } else if (userData.role === "user") {
  //       navigate("/userDashboard");
  //     } else if (userData.role === "creator") {
  //       navigate("/equbCreatorDashboard");
  //     } else {
  //       navigate("/login");
  //     }
  //   }
  // }, [dispatch, navigate]);

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
    onSubmit: (values, actions) => {
      console.log(values, actions);
    },

    // onSubmit: async (values, actions) => {
    //   try {
    //     const response = await axios.post(
    //       "http://localhost:5000/api/v1/users/login",
    //       {
    //         email: values.email,
    //         password: values.password,
    //       }
    //     );
    //     const userData = response.data;
    //     dispatch(loginSuccess(userData));
    //     toast.success(response.data.message);

    //     if (userData && userData.role) {
    //       // Handle role-based navigation
    //       if (location.state && location.state.from === "/group") {
    //         navigate(`/group`);
    //       } else {
    //         navigate(
    //           userData.role === "admin"
    //             ? "/admin"
    //             : userData.role === "user"
    //             ? "/userDashboard"
    //             : userData.role === "creator"
    //             ? "/equbCreatorDashboard"
    //             : "/"
    //         );
    //       }
    //     } else {
    //       // Handle error: userData or role property is missing
    //       toast.error("Invalid user data received from the server");
    //     }

    //     if (values.rememberMe) {
    //       localStorage.setItem("user", JSON.stringify(userData));
    //     }
    //     localStorage.setItem("user", JSON.stringify(userData));
    //   } catch (error) {
    //     if (axios.isAxiosError(error)) {
    //       // Type guard for AxiosError
    //       console.error("Axios error:", error);
    //       if (error.response?.status === 401) {
    //         // Handle unauthorized error
    //         console.log(error.response);
    //         setError(error.response.data.error);
    //       } else if (error.response?.status === 500) {
    //         toast.error(error.response.data.error);
    //       } else {
    //         // Handle other Axios errors
    //         toast.error("something gone un wanted");
    //       }
    //     } else {
    //       console.error("Unexpected error:", error);
    //       // Handle non-Axios errors (e.g., network errors)
    //     }
    //   }
    //   // Reset form and set submitting state
    //   actions.setSubmitting(false);
    // },
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
          <div className="text-red-500 text-center font-semibold text-xl">
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
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
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
                className="text-[#008B8B] text-sm md:text-base"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-[#008B8B] hover:bg-[#7da7a7] text-white font-bold py-2 px-4 rounded my-10"
              disabled={isSubmitting}
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-center mb-2">or</p>
        <div className=" text-center py-4">
          <p>
            Don&apos;t have an account?{" "}
            <Link href={"/auth"} className="text-[#008B8B] font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
