import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import register from "../../../public/assets/register.webp";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Define password rules regex
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

// Define the basic validation schema using Yup
const basicSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .required("Full name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email address is required"),
  phone: yup
    .string()
    .matches(
      /^(09|\+2519)\d{8}$/,
      "Please enter a valid Ethiopian phone number"
    )
    .required("Phone number is required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, "Please create a stronger password")
    .required("password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("confirmPassword is required"),
  agreeTerms: yup
    .boolean()
    .oneOf([true], "Please accept the terms and conditions !")
    .required("Please accept the terms and conditions !"),
});

const Register = () => {
  const navigate = useRouter();
  // useFormik hook for form handling
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
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    validationSchema: basicSchema,

    //we have to handle the requests
    onSubmit: async (values, actions) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/users/signUp",
          {
            name: values.name,
            email: values.email, // Pass values.email
            password: values.password, // Pass values.password
            phone: values.phone, // Pass values.email
            agreeTerms: values.agreeTerms,
          }
        );
        toast.success(response.data.message);

        navigate.push("/login");
      } catch (error) {
        const axiosError = error as AxiosError<{ error: string }>;
        if (axiosError.response?.status === 400) {
          toast.error(axiosError.response.data.error);
        }
        if (!(axiosError.response?.status === 400)) {
          setTimeout(() => {
            actions.resetForm();
            actions.setSubmitting(false);
          }, 1000);
        }
      }
    },
  });

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center content-center mt-1 mb-20 md:mt-3">
      <div className="hidden md:block order-1 md:order-1">
        <Image
          src={register}
          alt="feedback"
          className="object-cover items-center rounded-md "
        />
      </div>
      <div className="order-2 md:order-2 w-full bg-gray-50 dark:bg-gray-900 dark:text-white overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white shadow-sm rounded text-[#1F284F]  px-8 md:my-10 pb-2  space-y-5"
        >
          <h2 className="text-2xl font-semibold pt-5 mb-6 text-center text-[#1F284F] ">
            Create Account
          </h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 border ${
                errors.name && touched.name
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg shadow-sm`}
            />
            {errors.name && touched.name && (
              <p className="text-red-500 text-sm italic">{errors.name}</p>
            )}
          </div>

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
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              id="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
            {errors.phone && touched.phone && (
              <p className="text-red-500 text-sm italic">{errors.phone}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm italic">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-red-500 text-sm italic">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={values.agreeTerms}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mr-2  ${
                errors.agreeTerms && touched.agreeTerms ? "border-red-500" : ""
              }`}
            />
            <label
              htmlFor="agreeTerms"
              className="text-gray-700 text-sm font-semibold"
            >
              Yes, I understand and agree to the Equb Terms of Service,
              including the{" "}
              <span className="text-blue-800 cursor-pointer">
                <Link href={"#"}>User Agreement</Link>
              </span>
              and{" "}
              <span className="text-blue-800 cursor-pointer">
                <Link href={"#"}>Privacy Policy</Link>
              </span>
              .
            </label>
          </div>
          {errors.agreeTerms && touched.agreeTerms && (
            <p className="text-red-500 text-sm italic">{errors.agreeTerms}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#008B8B] hover:bg-[#7da7a7] text-white font-bold py-2 px-4 rounded"
            disabled={isSubmitting}
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mb-2">or</p>
        <div className=" text-center py-4">
          <p>
            Already have an account?{" "}
            <Link href={"/login"} className="text-[#008B8B] font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
