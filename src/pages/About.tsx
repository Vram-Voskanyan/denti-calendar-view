
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-dentist-primary mb-6">About DentalCare</h1>
      
      <Card className="shadow-md mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At DentalCare, we are committed to providing exceptional dental care in a comfortable 
            and welcoming environment. Our mission is to help our patients achieve optimal oral 
            health through preventive care, education, and state-of-the-art treatments.
          </p>
          <p className="text-gray-700">
            We believe that a healthy smile is essential to overall well-being, and we strive to make 
            quality dental care accessible to all our patients.
          </p>
        </CardContent>
      </Card>
      
      <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          {
            name: "Dr. Sarah White",
            specialty: "Orthodontics",
            bio: "Dr. White specializes in correcting misalignments of teeth and jaws, creating beautiful smiles for patients of all ages."
          },
          {
            name: "Dr. John Lee",
            specialty: "General Dentistry",
            bio: "Dr. Lee focuses on preventive care and comprehensive treatment for patients, ensuring oral health and wellness."
          },
          {
            name: "Dr. Maria Rodriguez",
            specialty: "Pediatric Dentistry",
            bio: "Dr. Rodriguez provides specialized care for children, making dental visits fun and educational for young patients."
          }
        ].map((dentist, index) => (
          <Card key={index} className="shadow-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-medium text-dentist-primary mb-2">{dentist.name}</h3>
              <p className="text-gray-500 mb-3">{dentist.specialty}</p>
              <p className="text-gray-700">{dentist.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Visit Us</h2>
          <p className="text-gray-700 mb-2">
            123 Dental Avenue,<br />
            Smileville, CA 92123
          </p>
          <p className="text-gray-700 mb-4">
            Phone: (555) 123-4567<br />
            Email: info@dentalcare.example
          </p>
          <h3 className="text-lg font-medium mb-2">Hours of Operation</h3>
          <p className="text-gray-700">
            Monday - Friday: 8:00 AM - 5:00 PM<br />
            Saturday: 9:00 AM - 2:00 PM<br />
            Sunday: Closed
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
