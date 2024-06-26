"use client";
import icons from "@/constants/icons";
import Image from "next/image";
import { useState } from "react";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  name,
  ...props
}: any) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`space-y-2 ${otherStyles}`}>
      <p className="text-base text-black-200 font-sans font-normal">{title}</p>

      <div className="w-full h-16 bg-white-200 rounded-2xl border-2 border-gray-50-200 focus:border-secondary flex flex-row items-center overflow-hidden">
        <input
          className="flex-1 text-black-200 font-psemibold text-base h-full z-10 px-4"
          value={value}
          placeholder={placeholder}
          onChange={handleChangeText}
          name={name}
          type={
            name === "password"
              ? (showPassword ? "text" : "password")
              : name
          }
          {...props}
        />

        {title === "Password" && (
          <div className="bg-white-default px-2 h-full flex items-center border-l cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
            <Image
              src={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              alt="eye"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormField;
