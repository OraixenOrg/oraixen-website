import { useState, type FormEvent } from 'react';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };
  return <div className="pt-20 min-h-screen bg-inkblack">
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div>
            <FadeIn>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                Let's build something extraordinary.
              </h1>
              <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                Have a project in mind? We'd love to hear about it. Tell us
                about your goals, and we'll tell you how we can help.
              </p>

              <div className="space-y-6">
                <Card className="p-6 flex items-start border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]">
                  <div className="w-12 h-12 rounded-xl bg-skyblue/10 border border-skyblue/20 flex items-center justify-center mr-4 shrink-0">
                    <Mail className="text-skyblue" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">Email Us</h3>
                    <p className="text-gray-400 text-sm">
                      support@oraixen.com
                    </p>
                  </div>
                </Card>

                <Card className="p-6 flex items-start border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]">
                  <div className="w-12 h-12 rounded-xl bg-skyblue/10 border border-skyblue/20 flex items-center justify-center mr-4 shrink-0">
                    <Phone className="text-skyblue" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">Call Us</h3>
                    <p className="text-gray-400 text-sm mb-1">
                      +13134820813
                    </p>
                    <p className="text-gray-500 text-xs">
                      Mon-Fri, 9am - 6pm EST
                    </p>
                  </div>
                </Card>

                <Card className="p-6 flex items-start border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]">
                  <div className="w-12 h-12 rounded-xl bg-skyblue/10 border border-skyblue/20 flex items-center justify-center mr-4 shrink-0">
                    <MapPin className="text-skyblue" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">Visit Us</h3>
                    <p className="text-gray-400 text-sm">
                      Toronto, ON, Canada, Ontario
                    </p>
                  </div>
                </Card>
              </div>
            </FadeIn>
          </div>

          {/* Form */}
          <div>
            <FadeIn delay={0.2}>
              <Card className="p-8 md:p-10 bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10">
                {submitted ? <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Message Sent!
                    </h3>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                      Thank you for reaching out. Our team will review your
                      inquiry and get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline">
                      Send Another Message
                    </Button>
                  </div> : <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                          Name *
                        </label>
                        <input type="text" id="name" required className="w-full bg-inkblack/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-skyblue focus:ring-2 focus:ring-skyblue/20 transition-all" placeholder="John Doe" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                          Email *
                        </label>
                        <input type="email" id="email" required className="w-full bg-inkblack/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-skyblue focus:ring-2 focus:ring-skyblue/20 transition-all" placeholder="john@company.com" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-gray-300 mb-2">
                        Company
                      </label>
                      <input type="text" id="company" className="w-full bg-inkblack/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-skyblue focus:ring-2 focus:ring-skyblue/20 transition-all" placeholder="Company Name" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="budget" className="block text-sm font-semibold text-gray-300 mb-2">
                          Budget
                        </label>
                        <select id="budget" className="w-full bg-inkblack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-skyblue focus:ring-2 focus:ring-skyblue/20 transition-all appearance-none cursor-pointer">
                          <option value="">Select Range</option>
                          <option value="10-50k">$10k - $50k</option>
                          <option value="50-100k">$50k - $100k</option>
                          <option value="100k+">$100k+</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="timeline" className="block text-sm font-semibold text-gray-300 mb-2">
                          Timeline
                        </label>
                        <select id="timeline" className="w-full bg-inkblack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-skyblue focus:ring-2 focus:ring-skyblue/20 transition-all appearance-none cursor-pointer">
                          <option value="">Select Timeline</option>
                          <option value="asap">ASAP</option>
                          <option value="1-3m">1-3 Months</option>
                          <option value="3-6m">3-6 Months</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea id="message" rows={5} required className="w-full bg-inkblack/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-skyblue focus:ring-2 focus:ring-skyblue/20 transition-all resize-none" placeholder="Tell us about your project..." />
                    </div>

                    <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>}
              </Card>
            </FadeIn>
          </div>
        </div>
      </Section>
    </div>;
}