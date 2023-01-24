import Image from "next/image";
import Link from "next/link";

const EventsPage = ({ data }) => {
  return (
    <div>
      <h1>Events Index Page</h1>
      <div>
        {data.map((ev) => (
          <Link href={`/events/${ev.id}`} key={ev.id}>
            <Image src={ev.image} alt="" width={300} height={300}></Image>
            <h2>{ev.title}</h2>
            <p>{ev.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;

export async function getStaticProps() {
  const { events_categories } = await import("/data/data.json");
  return {
    props: { data: events_categories },
  };
}
