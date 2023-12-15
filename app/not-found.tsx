import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col h-screen -mt-16">
      <h2 className="font-bold text-8xl">404 </h2>
      <h2 className="mb-16 text-lg tracking-[.6rem] text-center -mr-2">NOT FOUND</h2>
      <Image src="/404.jpeg" alt="metal gear solit, box, not found, 404" width={468} height={351} />
      <Link href="/" className="mt-8 text-primary hover:underline font-semibold"><span className="underline">&nbsp;&nbsp;</span>return home<span className="underline">&nbsp;&nbsp;</span></Link>
    </div>
  );
}