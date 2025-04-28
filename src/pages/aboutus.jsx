import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import IMAGES from "@/Images/Images";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

export function AboutUs() {
  const teamMembers = [
    {
      name: "Yadnesh Bamne",
      role: "Backend Developer",
      description:
        "Yadnesh expertly managed HOLMES’ backend, ensuring secure, efficient, and scalable systems for a smooth and safe PG accommodation experience.",
      image: IMAGES.image1,
      link: "https://www.linkedin.com/in/atharva-gourshete-b2a66927b/",
    },
    {
      name: "Atharva Gourshete",
      role: "Frontend Developer",
      description:
        "Atharva led the frontend development of HOLMES, creating a seamless, responsive, and user-friendly interface with a focus on performance.",
      image: IMAGES.image2,
      link: "https://www.linkedin.com/in/atharva-gourshete-b2a66927b/",
    },
    {
      name: "Om Date",
      role: "Project Manager",
      description:
        "Om efficiently managed HOLMES’s documentation, ensuring clear, organized, and accessible records that streamlined development, communication, and future updates.",
      image: IMAGES.image3,
      link: "https://www.linkedin.com/in/om-date-552755282/",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />
      <ClickSpark
        sparkColor="#000000"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
      <main className="relative bg-gradient-to-b from-purple-50 to-white dark:from-purple-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 overflow-hidden">
        {/* Decorative Background for Header */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-purple-200 to-purple-100 dark:from-purple-800 dark:to-purple-700 opacity-30 transform -skew-y-6 origin-top-left" />

        <div className="container mx-auto px-4 md:px-12 lg:px-20 py-20 space-y-24 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-gray-900 dark:text-white mb-6 relative">
              About Us
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-purple-500 rounded-full" />
            </h1>
            <p className="text-lg md:text-xl font-poppins text-gray-600 dark:text-gray-300">
              Welcome to HOLMES — Your Trusted Partner for Safe PG
              Accommodations
            </p>
          </motion.div>

          {/* Our Story */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-semibold font-poppins text-gray-900 dark:text-white relative">
              Our Story
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-purple-500 rounded-full" />
            </h2>
            <p className="text-base md:text-lg font-poppins text-gray-600 dark:text-gray-300 leading-relaxed">
              HOLMES was born out of a simple, powerful idea: <br />
              <span className="italic text-purple-500 dark:text-purple-400">
                "What if finding a safe place to live was as easy as feeling at
                home?"
              </span>
              <br />
              <br />
              Frustrated with unverified listings and unsafe living conditions,
              our founders set out to build a platform you can trust — where
              every listing is verified and every stay feels like home.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-semibold font-poppins text-gray-900 dark:text-white relative">
              Our Mission
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-purple-500 rounded-full" />
            </h2>
            <p className="text-base md:text-lg font-poppins text-gray-600 dark:text-gray-300 leading-relaxed">
              We are on a mission to make{" "}
              <span className="font-semibold text-purple-500 dark:text-purple-400">
                safe, comfortable, and reliable PG accommodations
              </span>{" "}
              accessible to everyone. With HOLMES, you can focus on building
              your future — while we handle finding your perfect home.
            </p>
          </motion.div>

          {/* What Makes Us Different */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8 max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-semibold font-poppins text-gray-900 dark:text-white relative">
              What Makes Us Different?
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-purple-500 rounded-full" />
            </h2>
            <ul className="list-none space-y-4 text-base md:text-lg font-poppins text-gray-600 dark:text-gray-300">
              <li className="flex items-start justify-center">
                <span className="text-purple-500 mr-2">•</span>
                <span>
                  <span className="font-medium">Verified Listings Only</span>:
                  Every PG is inspected and verified by our team.
                </span>
              </li>
              <li className="flex items-start justify-center">
                <span className="text-purple-500 mr-2">•</span>
                <span>
                  <span className="font-medium">Safety First</span>: Background
                  checks on property owners and security audits.
                </span>
              </li>
              <li className="flex items-start justify-center">
                <span className="text-purple-500 mr-2">•</span>
                <span>
                  <span className="font-medium">Transparent Pricing</span>: No
                  hidden fees, no surprises.
                </span>
              </li>
              <li className="flex items-start justify-center">
                <span className="text-purple-500 mr-2">•</span>
                <span>
                  <span className="font-medium">User-Driven Reviews</span>: Real
                  reviews from real people who stayed before you.
                </span>
              </li>
              <li className="flex items-start justify-center">
                <span className="text-purple-500 mr-2">•</span>
                <span>
                  <span className="font-medium">24/7 Support</span>: Our
                  customer care team is always ready to assist.
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-8 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-semibold font-poppins text-gray-900 dark:text-white relative max-w-3xl mx-auto">
              Meet the Team Behind HOLMES
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-purple-500 rounded-full" />
            </h2>
            <div className="container mx-auto px-4 py-12">
              <div className="flex flex-col md:flex-row justify-center gap-8 max-w-6xl mx-auto">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="w-full md:w-1/3"
                  >
                    <Card className="max-w-sm mx-auto bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
                      <CardHeader className="flex justify-center bg-gradient-to-b from-purple-100 to-purple-50 dark:from-purple-800 dark:to-purple-700 py-8 relative">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-36 h-36 rounded-full object-cover border-4 border-purple-200 dark:border-purple-600 shadow-md"
                        />
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/subtle-dots.png')]" />
                      </CardHeader>
                      <CardContent className="text-center px-6 py-4">
                        <CardTitle className="text-xl font-semibold font-poppins text-gray-900 dark:text-white">
                          {member.name}
                        </CardTitle>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-poppins mt-2">
                          {member.role}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 font-poppins mt-4 text-sm leading-relaxed h-24 flex items-center justify-center">
                          {member.description}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-center pb-6">
                        <Link
                          to={member.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-poppins text-sm px-6 py-2 rounded-full"
                            aria-label={`Connect with ${member.name} on LinkedIn`}
                          >
                            <Linkedin size={16} />
                            Connect
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
            <p className="text-base md:text-lg font-poppins text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our passionate team brings together real estate experts, security
              advisors, tech enthusiasts, and creative minds. Every member plays
              a role in making sure you find a PG you’ll love to live in.
            </p>
          </motion.div>
        </div>
      </main>
      </ClickSpark>
    </>
  );
}
