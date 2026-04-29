import { useState } from "react";
import { motion } from "motion/react";
import { LampContainer } from "./ui/lamp";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MapPin, Phone, Mail, Send, ArrowRight } from "lucide-react";

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    details: "Office # 805, 8th Floor, Star City Mall, Karachi, Pakistan",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+92 332 5555990",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: "info@factorled.pk",
  },
];

const FAQS = [
  { question: "What are your business hours?", answer: "Our office is open Monday through Friday, 9:00 AM to 6:00 PM. We're closed on weekends and public holidays." },
  { question: "Do you offer consultation services?", answer: "Yes, we provide free consultation for all lighting projects. Our experts help you choose the right solutions for your space." },
  { question: "What areas do you serve?", answer: "We serve all major cities across Pakistan with nationwide distribution and installation services." },
  { question: "How quickly can you deliver?", answer: "Delivery times vary by location and product availability. Typically 2-5 business days for major cities." },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white selection:bg-[#00B0CB] selection:text-[#231F20]">
      <Navbar />
      
      {/* Hero Section with Lamp Background */}
      <LampContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="inline-block px-4 py-2 bg-[#00B0CB]/10 text-[#00B0CB] text-sm font-[Poppins] font-medium rounded-full mb-6"
          >
            // GET IN TOUCH
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-5xl md:text-7xl font-[Poppins] font-bold text-[#231F20] mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-xl text-[#666] font-[Poppins] max-w-2xl mx-auto"
          >
            Ready to transform your space with premium lighting solutions? Our team is here to help you every step of the way.
          </motion.p>
        </motion.div>
      </LampContainer>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CONTACT_INFO.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl border border-[#E8E8E8] hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-[#00B0CB]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <info.icon className="w-8 h-8 text-[#00B0CB]" />
                </div>
                <h3 className="text-xl font-[Poppins] font-semibold text-[#231F20] mb-3">{info.title}</h3>
                <p className="text-[#666] font-[Poppins]">{info.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-[#F9F9F7]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 bg-[#00B0CB]/10 text-[#00B0CB] text-sm font-[Poppins] font-medium rounded-full mb-4">
                // SEND US A MESSAGE
              </span>
              <h2 className="text-4xl font-[Poppins] font-bold text-[#231F20] mb-4">Get in Touch</h2>
              <p className="text-[#666] font-[Poppins] text-lg">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[#231F20] font-[Poppins] font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#E8E8E8] rounded-lg focus:outline-none focus:border-[#00B0CB] transition-colors font-[Poppins]"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-[#231F20] font-[Poppins] font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#E8E8E8] rounded-lg focus:outline-none focus:border-[#00B0CB] transition-colors font-[Poppins]"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[#231F20] font-[Poppins] font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#E8E8E8] rounded-lg focus:outline-none focus:border-[#00B0CB] transition-colors font-[Poppins]"
                    placeholder="+92 XXX XXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-[#231F20] font-[Poppins] font-medium mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#E8E8E8] rounded-lg focus:outline-none focus:border-[#00B0CB] transition-colors font-[Poppins]"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[#231F20] font-[Poppins] font-medium mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-[#E8E8E8] rounded-lg focus:outline-none focus:border-[#00B0CB] transition-colors font-[Poppins] resize-none"
                  placeholder="Tell us about your lighting requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto bg-[#00B0CB] text-[#231F20] px-8 py-4 font-[Poppins] font-semibold rounded-full hover:bg-[#0099B2] hover:shadow-[0_0_20px_rgba(0,176,203,0.3)] transition-all duration-200 flex items-center justify-center gap-2"
              >
                Send Message
                <Send size={18} />
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-[#00B0CB]/10 text-[#00B0CB] text-sm font-[Poppins] font-medium rounded-full mb-4">
              // VISIT US
            </span>
            <h2 className="text-4xl font-[Poppins] font-bold text-[#231F20] mb-4">Find Our Location</h2>
            <p className="text-[#666] font-[Poppins] text-lg">
              Visit our showroom to see our lighting solutions in person.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-xl border border-[#E8E8E8]"
          >
            <div className="aspect-video relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14478.123456789!2d67.0822!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e0b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sStar%20City%20Mall%2C%20Karachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Factor LED Location - Star City Mall Karachi"
              />
            </div>
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
              <p className="text-sm font-[Poppins] font-medium text-[#231F20]">Star City Mall, Karachi</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#F9F9F7]">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-[#00B0CB]/10 text-[#00B0CB] text-sm font-[Poppins] font-medium rounded-full mb-4">
              // FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-4xl font-[Poppins] font-bold text-[#231F20] mb-4">Common Questions</h2>
            <p className="text-[#666] font-[Poppins] text-lg text-center mx-auto">
              Find answers to common questions about our products and services.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {FAQS.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 border border-[#E8E8E8]"
              >
                <h3 className="text-lg font-[Poppins] font-semibold text-[#231F20] mb-3 text-center">{faq.question}</h3>
                <p className="text-[#666] font-[Poppins] leading-relaxed text-center">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
