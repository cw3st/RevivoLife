"use client";

import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/Firebase/config";
import { BiHide, BiShow } from "react-icons/bi";
import Image from "next/image";
import Line from "@/app/SignIn-Auth/Assets/Line3.jpg";
import googleLogo from "@/app/SignIn-Auth/Assets/Group 3.jpg";
import yahooLogo from "@/app/SignIn-Auth/Assets/Group 7.jpg";
import { useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function FormRes() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await signInWithEmailAndPassword(
          formData.email,
          formData.password
        );
        console.log({ res });
        if (res?.user) {
          setFormData({
            email: "",
            password: "",
          });
          setErrors({});
          router.push("/");
        } else {
          setErrors((prev) => ({
            ...prev,
            general: "Invalid email or password.",
          }));
        }
      } catch (error: any) {
        console.error("Firebase SignUp Error:", error.message);
        if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          setErrors((prev) => ({
            ...prev,
            general: "Invalid email or password.",
          }));
        } else if (error.code === "auth/too-many-requests") {
          setErrors((prev) => ({
            ...prev,
            general:
              "Too many unsuccessful login attempts. Please try again later.",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            general: "An unexpected error occurred. Please try again.",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <main className=" bg-[#f1fde8b9] mx-5 py-10 px-5 rounded-2xl shadow-2xl shadow-black">
      <h1 className="text-[#0c4125] text-2xl font-semibold mb-5">Sign In</h1>
      <form onSubmit={handleSignIn}>
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
        <div className="relative mb-5">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="caret-[#0c4125] focus:placeholder-transparent transition-colors duration-300 w-full p-2 mb-5 bg-white rounded-lg border border-[#55d385f3] placeholder:text-[#55d385] focus:outline-none text-[#0c4125] pr-10"
          />
          <button
            type="button"
            className="!rounded-button absolute top-1/2 right-3 -translate-y-1/2 pb-5"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
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
        <button
          type="submit"
          className="w-full text-lg py-3 rounded-lg items-center justify-center bg-gradient-to-r from-[#0c4125] to-[#1d7841] flex shadow-2xl shadow-black"
        >
          Sign In
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
            alt="Yahoo logo"
            width={50}
            height={50}
            className="rounded-full"
            onClick={handleYahooSignIn}
          />
        </div>
      </form>
      <p className="mt-5 text-center text-xs sm:text-sm text-[#55d385]">
        Don't have an account?{" "}
        <a href="/SignUp-Auth" className="font-medium text-[#0c4125]">
          Sign Up
        </a>
      </p>
    </main>
  );
}
