"use client";

import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import Image from "next/image";
import Line from "@/app/SignIn-Auth/Assets/Line3.jpg";
import appleLogo from "@/app/SignIn-Auth/Assets/Group 2.jpg";
import googleLogo from "@/app/SignIn-Auth/Assets/Group 3.jpg";
import outlookLogo from "@/app/SignIn-Auth/Assets/Group 6.jpg";

export default function Form() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      <h1 className="text-[#0c4125] text-2xl font-semibold mb-5">Sign In</h1>
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
        <div className="relative mb-5">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="caret-[#0c4125] focus:placeholder-transparent transition-colors duration-300 w-full p-2 mb-5 bg-white rounded-lg border border-[#55d385f3] placeholder:text-[#55d385] focus:outline-none text-[#0c4125] pr-10 "
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
        <div className="flex justify-between mt-5">
          <Image
            src={appleLogo}
            alt="Apple logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <Image
            src={googleLogo}
            alt="Google logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <Image
            src={outlookLogo}
            alt="Outlook logo"
            width={50}
            height={50}
            className="rounded-full"
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
