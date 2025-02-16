/**
 * About - The "About Us" page component.
 * - Provides a structured layout with profile images, names, emails, and descriptions of each member's responsibilities.
 */
export default function About() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Our Team</h1>
      <div className="max-w-4xl mx-auto py-8">
        {/* Team Members */}
        {[
          {
            name: "Shelly Trifonov",
            email: "Shellytrifonov1@gmail.com",
            image: "/images/shelly.png",
            description:
              "Shelly, 24, from Kiryat Haim, is the team’s Product Manager and a fourth-year software engineering student. She oversees the website’s development process, ensuring that features align with user needs and project goals.",
          },
          {
            name: "Maor Tzur",
            email: "Maortz42@gmail.com",
            image: "/images/maor.jpeg",
            description:
              "Maor, 28, from Nahariya, is the team’s DevOps engineer and a fourth-year software engineering student. He ensures the website operates smoothly and efficiently, focusing on system optimization and high performance.",
          },
          {
            name: "Guy Naeh",
            email: "Guylay12@gmail.com",
            image: "/images/guy.jpeg",
            description:
              "Guy, 27, from Adi, is a skilled backend developer and a fourth-year software engineering student. He focuses on building and maintaining server-side infrastructure, ensuring the website operates efficiently and reliably.",
          },
          {
            name: "Yuval Shahar",
            email: "Yuvals751@gmail.com",
            image: "/images/yuval.png",
            description:
              "Yuval, 27, from Haifa, is the team’s Database Administrator and a third-year software engineering student. He manages and optimizes database systems, ensuring seamless storage, retrieval, and organization of the website’s data.",
          },
          {
            name: "Liroy Ben Shimon",
            email: "Bsliroy178@gmail.com",
            image: "/images/liroy.png",
            description:
              "Liroy, 24, from Kiryat Ata, is the team’s Full Stack Developer and a third-year software engineering student. He works on both front-end and back-end development, ensuring a seamless and efficient user experience across the website.",
          },
        ].map((member, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 mb-12"
          >
            {/* Image (Centered on Mobile, Left on Desktop) */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text Section */}
            <div className="text-center md:text-left flex-grow">
              <h2 className="text-2xl font-bold mb-1">{member.name}</h2>
              <span className="font-bold text-gray-600 dark:text-gray-300 block">
                {member.email}
              </span>
              <p className="text-lg mt-2 text-gray-700 dark:text-gray-300">
                {member.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}