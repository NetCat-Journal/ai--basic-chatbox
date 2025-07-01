import UserForm from "./components/userForm";
import Image from 'next/image';


export default function Home() {
  return (
    <main className="flex flex-col h-full w-full">
      <div className="mb-2">
        <Image
          src="/img/logo.png"
          alt="User avatar"
          width={120}
          height={120}
          className="rounded-full"
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <UserForm />
      </div>
    </main>
  );
}
