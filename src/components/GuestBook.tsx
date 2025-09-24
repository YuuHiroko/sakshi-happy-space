import WishCollection from './WishCollection';

const GuestBook = () => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-4">Guest Book</h2>
      <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12">Leave a message for Sakshi and the family!</p>
      <WishCollection storageKey="sakshi-guestbook-messages" />
    </div>
  );
};

export default GuestBook;
