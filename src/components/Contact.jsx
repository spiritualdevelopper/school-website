import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';


const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
   e.preventDefault();

  emailjs.send(
    'service_dd1208b',
    'template_3en9qma',
    form,
    'QISfHJ89LxUgcVM37'
  ).then(() => {
    alert("Message sent successfully!");
    setForm({ name: '', email: '', phone: '', message: '' });
  }).catch((error) => {
    console.error(error);
    alert("Failed to send. Please try again.");
  });
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-blue-50 py-16 px-4 md:px-16 text-gray-800"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-blue-700">
          Contact / Enquiry Form
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 grid gap-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Full Name"
              required
              className="p-3 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="p-3 border rounded-lg"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="p-3 border rounded-lg"
            />
            <input
              type="text"
              name="subject"
              onChange={handleChange}
              placeholder="Subject (Optional)"
              className="p-3 border rounded-lg"
            />
          </div>
          <textarea
            name="message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            className="p-3 border rounded-lg"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default Contact;
