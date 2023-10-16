import Image from "next/image";
const Footer = () => {
  return (
    <footer className="bg-slate-400 text-black h-40 flex items-center justify-around pt-10 pb-10 w-full">
      <div className="flex flex-row">
        <Image
          alt="Hakim"
          src="https://cdn.discordapp.com/attachments/911706428576784395/1163565478158016542/image.png?ex=654009cb&is=652d94cb&hm=ce85bf5342c46318ecbade1c9f0f8f1f131b580b664d268621812279af3f148c&"
          width="200"
          height="200"
          className="border-2 border-black rounded-full"
        />
        <div className="text-left pl-2 space-y-1">
          <p className="underline text-2xl">Hakim Livs</p>
          <p>Öppet: 10:00 - 22:00, varje dag!</p>
          <p>Adress: Tomtebodavägen 3A, 171 65 Solna</p>
          <a href="hakimlivs@info.se">hakimlivs@info.se</a>
        </div>
      </div>

      <div className="text-right space-y-1">
        <p className="underline">
          Betalning i online-shopen sker via Swish till:
        </p>
        <p>Telefon: 073-777 777 7</p>
        <p>Eller kontant vid leverans </p>
      </div>
    </footer>
  );
};

export default Footer;
