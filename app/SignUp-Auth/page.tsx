import Image from "next/image";
import Link from "next/link";
import Form from "@/app/SignUp-Auth/Components/form";
import FormRes from "@/app/SignUp-Auth/Components/formRes"
import style from "@/app/SignUp-Auth/Styles/style.module.css";
import BackgroundRes from "@/app/SignUp-Auth/Assets/BackgroundRes.jpg"

export default function SignUp() {
  return (
    <main className={style.background }>
      <Image src={BackgroundRes} alt="BackgroundImg" className=" h-screen w-[40%] md:block hidden" />
      <div className={style.backgroundForm}>
      <Form />
      </div>
      <div className={style.formRes}>
      <FormRes />
      </div>
    </main>
  );
}
