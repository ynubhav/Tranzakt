import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Tag, Smartphone } from "lucide-react";

const MotionLink = motion(Link);
// ---------- Animation Variants ---------- //
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

// ---------- Content Data ---------- //
const features = [
  {
    icon: TrendingUp,
    title: "Instant Tracking",
    desc: "Add expenses & income in seconds and see balances update in real‑time.",
  },
  {
    icon: Tag,
    title: "Smart Categories",
    desc: "Tag transactions your way and filter with one click.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    desc: "Your data is encrypted & never sold. Pinky promise.",
  },
  {
    icon: Smartphone,
    title: "Any Device",
    desc: "Works great on mobile, tablet or desktop — no install needed.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* ----- Hero ----- */}
      <section className="relative isolate pt-24 pb-32 px-4 md:px-10 flex flex-col items-center text-center overflow-hidden">
        {/* Glow Blur */}
        <div className="absolute -z-10 inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.25),transparent_60%)]" />

        <motion.h1
          className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          ✨ Tranzakt — Your Money, <span className="text-indigo-400">Your Rules</span>.
        </motion.h1>
        <motion.p
          className="mt-6 max-w-xl text-lg md:text-2xl text-slate-300"
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Track every cent, smash your savings goals, flex on your past self.
        </motion.p>
        <MotionLink
          to="/signup"
          className="mt-10 inline-block px-8 py-3 rounded-2xl bg-indigo-500 font-semibold hover:bg-indigo-600 active:scale-95 transition"
          variants={fadeUp}
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Get Started Free →
        </MotionLink>

        {/* Hero Mockup Image */}
        <motion.img
          src="dash.jpg" // replace with your screenshot
          alt="Tranzakt Dashboard Screenshot"
          className="mt-16 w-full max-w-4xl rounded-xl shadow-2xl ring-1 ring-white/10 border border-white/10"
          variants={fadeUp}
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.img
          src="history.jpg" // replace with your screenshot
          alt="Tranzakt Dashboard Screenshot"
          className="mt-16 w-full max-w-4xl rounded-xl shadow-2xl ring-1 ring-white/10 border border-white/10"
          variants={fadeUp}
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
      </section>

      {/* ----- Features Grid ----- */}
      <section id="features" className="py-24 px-4 md:px-10">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="backdrop-blur-md bg-white/10 rounded-xl p-6 shadow-md border border-white/20 hover:translate-y-[-4px] hover:shadow-lg transition duration-300"
              variants={fadeUp}
              custom={i}
            >
              <Icon className="w-8 h-8 text-indigo-400 mb-3" />
              <h3 className="text-xl font-semibold mb-1">{title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ----- Testimonial ----- */}
      <section className="py-24 px-4 md:px-10 bg-slate-900/40">
        <motion.blockquote
          className="max-w-3xl mx-auto text-center text-lg md:text-2xl italic text-slate-300"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          “It’s like having a money diary — but smarter and way less cringe.”
        </motion.blockquote>
      </section>

      {/* ----- Coming Soon ----- */}
      <section className="py-24 px-4 md:px-10" id="coming-soon">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            variants={fadeUp}
          >
            🚀 On the Roadmap
          </motion.h2>

          <motion.ul className="space-y-4 text-slate-300 list-disc list-inside" variants={fadeUp}>
            <li>UPI import so you don’t lift a finger</li>
            <li>Group expense splits to keep friendships alive</li>
            <li>Budget goals that high‑five you (metaphorically)</li>
            <li>Dark mode — because obviously 😎</li>
          </motion.ul>
        </motion.div>
      </section>

      {/* ----- Call to Action ----- */}
      <section id="get-started" className="py-24 px-4 md:px-10 bg-indigo-600/20 backdrop-blur-md border-t border-indigo-400/20">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold">Ready to Own Your Money?</h2>
          <p className="mt-4 text-lg text-slate-200">Sign up in seconds, add your first transaction, and watch the clarity roll in.</p>
          <a
            href="/signup"
            className="mt-8 inline-block px-8 py-3 rounded-2xl bg-indigo-500 font-semibold hover:bg-indigo-600 active:scale-95 transition"
          >
            Create Free Account →
          </a>
        </motion.div>
      </section>

      {/* ----- Footer ----- */}
      <footer className="py-12 text-center text-xs text-slate-500 border-t border-white/10">
        © {new Date().getFullYear()} Tranzakt. No data‑selling nonsense. Built with ❤️ in India.
      </footer>
    </div>
  );
}
