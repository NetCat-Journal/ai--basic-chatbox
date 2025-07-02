import UserForm from "./components/userForm";
import Image from 'next/image';


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full p-4">
      <div className="mb-2">
        <Image
          src="/img/logo.png"
          alt="User avatar"
          width={120}
          height={120}
          className="rounded-full"
        />
      </div>
      <div className="flex-1 overflow-hidden h-[80%]">
        <UserForm />
      </div>
    </main>
  );
}
