import UserForm from "./components/userForm";
import Image from 'next/image';


export default function Home() {
  return (
    <main className="flex flex-col h-full w-full px-4 py-4 overflow-hidden">
      <div className="mb-2 sticky top-0">
        <Image
          src="/img/logo.png"
          alt="User avatar"
          width={120}
          height={120}
          className="rounded-full"
        />
      </div>
      <div className="flex-1 overflow-hidden h-[60%]">
        <UserForm />
      </div>
    </main>
  );
}
