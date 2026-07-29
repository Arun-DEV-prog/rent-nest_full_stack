export default function About() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          About Rent Nest
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to <span className="font-semibold">Rent Nest</span>, the
          ultimate platform for finding rental properties in Bangladesh. Our
          system allows you to explore properties by{" "}
          <span className="font-semibold">division, district, thana,</span> and
          even down to the <span className="font-semibold">subarea</span>,
          making it easy to find your perfect rental space.
        </p>
        <p className="text-lg text-gray-700 mb-8">
          Whether you're looking for a{" "}
          <span className="font-semibold">
            house, bachelor room, hostel seat, sublet,
          </span>{" "}
          or a <span className="font-semibold">commercial space</span> like an
          office or shop, Rent Nest simplifies the process. Use our advanced
          search filters to narrow down your options and connect directly with
          property owners or agents.
        </p>
        <p className="text-lg text-gray-700 mb-8">
          With a commitment to user convenience and a wide range of listings,
          Rent Nest is your trusted partner for renting properties across the
          country.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-teal-900 text-white font-semibold rounded-lg hover:bg-teal-800 transition">
            Learn More
          </button>
          <button className="px-6 py-3 border-2 border-teal-900 text-teal-900 font-semibold rounded-lg hover:bg-teal-50 transition">
            Find Properties
          </button>
        </div>
      </div>
    </section>
  );
}
