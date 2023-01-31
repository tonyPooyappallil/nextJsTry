import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";

const EventPage = ({ data }) => {
  const inputEmail = useRef();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const emailValue = inputEmail.current.value;
    const eventId = router?.query.id;

    try {
      const response = await fetch("/api/email-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          eventId,
        }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      inputEmail.current.value = "";
    } catch (e) {}
  };
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

      <form onSubmit={onSubmit}>
        <label>get registred for this event</label>
        <input
          ref={inputEmail}
          type="email"
          placeholder="insert your email here"
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default EventPage;

export async function getStaticPaths() {
  const { allEvents } = await import("/data/data.json");
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
