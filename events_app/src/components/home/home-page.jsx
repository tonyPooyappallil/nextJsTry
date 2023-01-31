import Image from "next/image";
import Link from "next/link";

export const HomePage = ({ data }) => (
  <main>
    {data.map((ev) => (
      <Link key={ev.id} href={`events/${ev.id}`}>
        <Image src={ev.image} alt="" width={300} height={300} />
        <h2>{ev.title}</h2>
        <p>{ev.description}</p>
      </Link>
    ))}
  </main>
);
