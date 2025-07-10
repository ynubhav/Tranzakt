import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const sections = [
  {
    title: '✨ Tranzakt – Your Money, Your Rules.',
    subtitle: '💸 Track. Manage. Stay in Control.',
    content: `Tired of guessing where your money went? Tranzakt lets you log your transactions, see where you're spending, and stay on top of your balance — all in one clean, no-fuss dashboard.`,
  },
  {
    title: '⚡ Why Tranzakt?',
    list: [
      '🔍 Instant Tracking – Add expenses and incomes in seconds.',
      '📊 Smart Summary – Know how much you\'ve spent or saved this month.',
      '🏷️ Tag It, Filter It – Group your transactions with categories that make sense.',
      '📈 Visual Insights – Charts that actually help, not confuse.',
      '☁️ Cloud Sync – Your data, safe and accessible anywhere.',
    ],
  },
  {
    title: '🛠 Built for You, Not Accountants.',
    content: 'Whether you\'re a student splitting chai bills or a freelancer tracking gigs, Tranzakt is designed to be fast, simple, and effective — no learning curve, no bloat.',
  },
  {
    title: '🚀 Get Started Now',
    list: [
      '✅ Sign up in seconds',
      '✅ Add your first transaction',
      '✅ Watch your finances get sorted',
    ],
    quote: '“It’s like a money diary — but smarter.”',
  },
  {
    title: '🔐 Privacy First',
    content: 'We don’t sell your data. Ever.',
  },
  {
    title: '💬 What’s Coming Soon?',
    list: ['UPI import', 'Group expense splits', 'Budget goals', 'Dark mode (yes, we heard you 😎)'],
  },
  {
    title: '📱 Use it on Any Device',
    content: 'Responsive, clean UI – works on mobile, tablet, or desktop. No app needed (yet).',
  },
];

export default function LandingPage() {
  return (
    <div className="space-y-10">
      {sections.map((section, i) => (
        <motion.div
          key={i}
          className="backdrop-blur-md m-5 bg-white/10 rounded-xl p-6 shadow-md border border-white/20 hover:scale-[1.015] hover:shadow-lg transition duration-300"
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
        >
          <h1 className="text-2xl font-bold m-2">{section.title}</h1>
          {section.subtitle && <h2 className="text-lg text-gray-300 mb-2">{section.subtitle}</h2>}
          {section.content && <p className="text-gray-200">{section.content}</p>}
          {section.list && (
            <ul className="list-disc list-inside space-y-1 mt-2 text-gray-200">
              {section.list.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
          {section.quote && (
            <blockquote className="m-4 italic text-sm text-gray-400">
              {section.quote}
            </blockquote>
          )}
        </motion.div>
      ))}
    </div>
  );
}
