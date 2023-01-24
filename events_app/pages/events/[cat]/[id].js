import Image from "next/image";

const EventPage = ({ data }) => {
  return (
    <div>
      <Image
        src={data.image}
        width={1000}
        height={1000}
        alt={data.title}
      ></Image>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};

export default EventPage;

export async function getStaticPaths() {
  const { allEvents } = await import("/data/data.json");
  console.log("allPaths", allEvents);
  const allPaths = allEvents.map((ev) => {
    return {
      params: {
        id: ev.id,
        cat: ev.city,
      },
    };
  });
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const { allEvents } = await import("/data/data.json");
  const eventData = allEvents.find((ev) => ev.id === id);
  return { props: { data: eventData } };
}
