import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "What is Schedulr?",
      answer: "Schedulr is a productivity tool that helps you manage tasks, schedules, and deadlines with ease.",
    },
    {
      question: "Is Schedulr free to use?",
      answer: "Yes! Schedulr is completely free and open-source under GSSoC.",
    },
    {
      question: "Can I access Schedulr on mobile?",
      answer: "Absolutely. Schedulr is fully responsive and works on desktops, tablets, and mobile devices.",
    },
    {
      question: "How can I contribute?",
      answer: "Schedulr is community-driven. You can contribute via GitHub issues and pull requests under GSSoC.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-16 mt-16 rounded-2xl shadow-md">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 dark:text-gray-200 font-medium hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
              >
                {faq.question}
                <span className="text-indigo-600 dark:text-indigo-400">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
