"use client";

import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/Firebase/config";
import { BiHide, BiShow } from "react-icons/bi";
import Image from "next/image";
import Line from "@/app/SignUp-Auth/Assets/Line3.jpg";
import googleLogo from "@/app/SignUp-Auth/Assets/Group 3.jpg";
import yahooLogo from "@/app/SignUp-Auth/Assets/Group 7.jpg";
import { useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function Form() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.agreeToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await createUserWithEmailAndPassword(
          formData.email,
          formData.password
        );
        console.log({ res });
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        });
        setErrors({});
      } catch (error: any) {
        console.error("Firebase SignUp Error:", error.message);
        if (error.code === "auth/email-already-in-use") {
          setErrors((prev) => ({
            ...prev,
            email: "This email is already in use.",
          }));
        } else if (error.code === "auth/weak-password") {
          setErrors((prev) => ({ ...prev, password: "Password is too weak." }));
        } else {
          setErrors((prev) => ({
            ...prev,
            general: "Failed to create user. Please try again.",
          }));
        }
      }
    }
  };

  // --- Google Sign-in Handler ---
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info.
      const user = result.user;
      console.log("Google Sign-in successful:", user);
      // You can redirect the user or update UI here
      router.push("/");
    } catch (error: any) {
      // Handle Errors here.
      console.error("Google Sign-in Error:", error.code, error.message);
      if (error.code === "auth/popup-closed-by-user") {
        setErrors((prev) => ({
          ...prev,
          general: "Google sign-in cancelled.",
        }));
      } else if (error.code === "auth/cancelled-popup-request") {
        setErrors((prev) => ({
          ...prev,
          general: "Popup already opened. Please try again.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          general: `Google sign-in failed: ${error.message}`,
        }));
      }
    }
  };

  // --- Yahoo Sign-in Handler ---
  const handleYahooSignIn = async () => {
    // For Yahoo, you use OAuthProvider and set the providerId
    const provider = new OAuthProvider("yahoo.com");
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info.
      const user = result.user;
      console.log("Yahoo Sign-in successful:", user);
      // You can redirect the user or update UI here
      router.push("/");
    } catch (error: any) {
      // Handle Errors here.
      console.error("Yahoo Sign-in Error:", error.code, error.message);
      if (error.code === "auth/popup-closed-by-user") {
        setErrors((prev) => ({ ...prev, general: "Yahoo sign-in cancelled." }));
      } else if (error.code === "auth/cancelled-popup-request") {
        setErrors((prev) => ({
          ...prev,
          general: "Popup already opened. Please try again.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          general: `Yahoo sign-in failed: ${error.message}`,
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <main className=" bg-[#f1fde8b9] mx-5 py-10 px-5 rounded-2xl shadow-2xl shadow-black">
      <h1 className="text-[#0c4125] text-2xl font-semibold mb-5">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="caret-[#0c4125] focus:placeholder-transparent transition-colors duration-300 w-full mb-3.5 p-2 bg-white rounded-lg border border-[#55d385f3] placeholder:text-[#55d385] focus:outline-none text-[#0c4125]"
          />
        </div>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="caret-[#0c4125] focus:placeholder-transparent transition-colors duration-300 w-full p-2 mb-5 bg-white rounded-lg border border-[#55d385f3] placeholder:text-[#55d385] focus:outline-none text-[#0c4125]"
          />
          <button
            type="button"
            className="!rounded-button absolute right-3 top-1/2 -translate-y-1/2 pb-5"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <BiHide className="text-[#55d385] w-5 h-5" />
            ) : (
              <BiShow className="text-[#55d385] w-5 h-5" />
            )}
          </button>
        </div>
        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className="caret-[#0c4125] focus:placeholder-transparent transition-colors duration-300 w-full p-2 mb-5 bg-white rounded-lg border border-[#07da58f3] placeholder:text-[#55d385] focus:outline-none text-[#0c4125]"
          />
          <button
            type="button"
            className="!rounded-button absolute right-3 top-1/2 -translate-y-1/2 pb-5"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <BiHide className="text-[#55d385] w-5 h-5" />
            ) : (
              <BiShow className="text-[#55d385] w-5 h-5" />
            )}
          </button>
        </div>
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        {errors.password && (
          <p className=" text-sm text-red-600">{errors.password}</p>
        )}
        {errors.confirmPassword && (
          <p className=" text-sm text-red-600">{errors.confirmPassword}</p>
        )}
        <button
          onClick={handleSignUp}
          type="submit"
          className="w-full text-lg py-3 rounded-lg items-center justify-center bg-gradient-to-r from-[#0c4125] to-[#1d7841] flex shadow-2xl shadow-black"
        >
          Sign Up
        </button>
        <div className="justify-between flex mt-5">
          <Image src={Line} alt="Line" width={0} className="mt-3 mb-2.5" />
          <span className="text-[#55d385]">Or continue with</span>
          <Image src={Line} alt="Line" width={80} className="mt-3 mb-2.5" />
        </div>
        <div className="flex justify-between mt-5 mx-25">
          <Image
            src={googleLogo}
            alt="Google logo"
            width={50}
            height={50}
            className="rounded-full"
            onClick={handleGoogleSignIn}
          />
          <Image
            src={yahooLogo}
            alt="Outlook logo"
            width={50}
            height={50}
            className="rounded-full"
            onClick={handleYahooSignIn}
          />
        </div>
        <div className="flex items-start sm:items-center mt-5">
          <input
            id="agreeToTerms"
            name="agreeToTerms"
            type="checkbox"
            className="mt-1 accent-[#1d7841] sm:mt-0 h-3 w-3 sm:h-4 sm:w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
          />
          <label
            htmlFor="agreeToTerms"
            className="ml-2 block text-xs sm:text-sm text-[#55d385]"
          >
            I agree to the{" "}
            <a
              href="#"
              className="font-medium text-[#0c4125] hover:text-blue-500"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="font-medium text-[#0c4125] hover:text-blue-500"
            >
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.terms && (
          <p className="mt-1 text-sm text-red-600">{errors.terms}</p>
        )}
      </form>
      <p className="mt-5 text-center text-xs sm:text-sm text-[#55d385]">
        Already have an account?{" "}
        <a href="/SignIn-Auth" className="font-medium text-[#0c4125]">
          Sign in
        </a>
      </p>
    </main>
  );
}
