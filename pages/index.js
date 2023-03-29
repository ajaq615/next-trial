import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import Head from 'next/head';

const HomePage = (props) => {
  const isEmpty = JSON.stringify(props.meetups) === '{}';
  console.log(isEmpty);
  return (
    <>
      <Head>
        <title>Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of react meetups'
        ></meta>
      </Head>
      <h1>Home Page</h1>
      {isEmpty ? (
        <h2>No meetups found!</h2>
      ) : (
        <MeetupList meetups={props.meetups} />
      )}
      {/* <MeetupList meetups={props.meetups} /> */}
    </>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://ajquidasol615:AjaBoy615@cluster0.03hsvqo.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

// export const getServerSideProps = (context) => {
//     const req = context.req;
//     const res = context.res;
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export default HomePage;
