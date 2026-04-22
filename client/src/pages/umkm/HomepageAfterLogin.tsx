export default function HomepageAfterLogin() {
  return (
    <div className=" relative min-h-screen bg-white">
      <main className="relative w-full">
        <img
          src="/homepage.png"
          alt="Gambar Homepage"
          className="w-full h-auto"
        />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 px-15 flex flex-col gap-6">
          <h1 className="max-w-2xl text-neutral-400 text-5xl font-extrabold tracking-wide leading-tight">
            Tumbuh Bersama Talenta Muda Hebat Indonesia
          </h1>
          <p className="max-w-2xl text-neutral-400 text-xl font-medium tracking-wide leading-8">
            Berikan kesempatan proyek nyata bagi first-jobber, dan dapatkan
            bantuan operasional yang efisien untuk memajukan bisnis mikro Anda.
            Jangan khawatir, kolaborasi pasti aman dan progres dapat dipantau.
          </p>
          <button className="bg-neutral-400 text-primary-dark hover:bg-neutral-300 cursor-pointer rounded-full mt-2 p-2 font-bold tracking-wide w-44">Mulai Kolaborasi</button>
        </div>
      </main>
    </div>
  );
}
