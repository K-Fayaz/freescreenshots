import React, { useState } from 'react';

const faqData = [
  {
    question: 'What platforms does Zapshot support?',
    answer:
      'Zapshot works across major social platforms like Twitter (X),Youtube, Peerlist, Reddit and Threads — giving you one tool to capture and render high-quality post screenshots anywhere.'
  },
  {
    question: 'Does Zapshot store my personal data?',
    answer:
      'No. Zapshot does not store or track your personal account credentials. It only processes public post data to render screenshots, without saving any of your private information.'
  },
  // {
  //   question: 'Can I use Zapshot for videos or memes?',
  //   answer:
  //     'Yes — Zapshot supports downloading videos from Twitter and Threads, and includes a meme-maker so you can remix your screenshots creatively.'
  // },
  {
    question: 'Why use Zapshot instead of taking a manual screenshot?',
    answer:
      'Manual screenshots can look inconsistent, cluttered, or low quality. Zapshot generates pixel-perfect, clean, and distraction-free screenshots automatically, giving your posts a professional look in seconds.'
  },
  {
    question: 'Is there a watermark?',
    answer:
      'On the free plan, Zapshot applies a subtle watermark to screenshots. Paid plans remove all watermarks so you get clean, shareable images.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl md:text-5xl font-bold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
              <button
                className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
                onClick={() => handleToggle(idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-answer-${idx}`}
              >
                <span className="text-sm md:text-lg font-medium text-gray-900">{item.question}</span>
                <svg
                  className={`w-5 h-5 ml-4 transform transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === idx && (
                <div
                  id={`faq-answer-${idx}`}
                  className="px-6 pb-6 text-gray-700 text-sm md:text-base animate-fadeIn"
                >
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;