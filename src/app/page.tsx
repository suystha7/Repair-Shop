import Link from "next/link";

export default function Home() {
  return (
    <div
      className="bg-black bg-cover bg-center"
      style={{ backgroundImage: "url(/images/home-img.jpg)" }}
    >
      <main className="flex flex-col justify-center text-center max-w-5xl mx-auto h-dvh">
        <div className="flex flex-col gap-6 p-12 rounded-xl bg-black/90 w-4/5 sm:max-w-md mx-auto text-white sm:text-2xl">
          <h1 className="text-4xl font-bold">
            Suyog&apos;s Comuter <br /> Repair Shop
          </h1>
          <address>
            Ganeshchowk 06 <br />
            Buddhanilkantha, Kathmandu <br />
            Nepal
          </address>
          <p>Open Daily: 9am to 5pm</p>
          <Link href="tel: 01-4567823" className="hover:underline">
            01-4567823
          </Link>
        </div>
      </main>
    </div>
  );
}
