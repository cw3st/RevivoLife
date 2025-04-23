import Image from "next/image";
import Link from "next/link";
import Form from "@/app/SignUp-Auth/Components/form";
import style from "@/app/SignUp-Auth/Styles/style.module.css";

export default function SignUp() {
  return (
    <main className={style.background}>
      <Form />
    </main>
  );
}
