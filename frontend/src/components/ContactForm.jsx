import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Loader2, ArrowUpRight, CheckCircle2, AlertTriangle } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'}/api`;

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState({ loading: false, ok: false, error: '' });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setState({ loading: true, ok: false, error: '' });
    try {
      await axios.post(`${API}/contact`, form);
      setState({ loading: false, ok: true, error: '' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      const msg =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        'Something went wrong. Please try again.';
      setState({ loading: false, ok: false, error: String(msg) });
    }
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      <div className="md:col-span-1">
        <label className="mono text-[10px] tracking-[0.3em] text-white/50 block mb-2">
          YOUR NAME
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={set('name')}
          className="w-full bg-[#121212]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 outline-none focus:border-[#ff5f19] transition-colors"
          placeholder="Alex Morgan"
        />
      </div>

      <div className="md:col-span-1">
        <label className="mono text-[10px] tracking-[0.3em] text-white/50 block mb-2">
          YOUR EMAIL
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={set('email')}
          className="w-full bg-[#121212]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 outline-none focus:border-[#ff5f19] transition-colors"
          placeholder="alex@company.com"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mono text-[10px] tracking-[0.3em] text-white/50 block mb-2">
          MESSAGE
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={set('message')}
          className="w-full bg-[#121212]/80 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 outline-none focus:border-[#ff5f19] resize-none transition-colors"
          placeholder="Hi Bhanu, let's discuss an analytics opportunity…"
        />
      </div>

      <div className="md:col-span-2 flex items-center justify-between gap-4 mt-4 flex-wrap">
        <button
          type="submit"
          disabled={state.loading}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#ff5f19] hover:bg-[#ff7738] text-black font-semibold text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg cursor-pointer"
        >
          <span>{state.loading ? 'Sending\u2026' : 'Send Inquiry'}</span>
          {state.loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUpRight className="h-4 w-4" />
          )}
        </button>

        <a
          href="mailto:Bhanu.nimmagadda02@gmail.com"
          className="mono text-xs text-white/70 hover:text-white underline underline-offset-4 tracking-wider transition-colors"
        >
          Or email directly: Bhanu.nimmagadda02@gmail.com
        </a>
      </div>

      {(state.ok || state.error) && (
        <div className="md:col-span-2 mono text-xs tracking-wider mt-2">
          {state.ok && (
            <span className="text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Message sent successfully. I'll get back to you soon.
            </span>
          )}
          {state.error && (
            <span className="text-rose-400 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> {state.error}
            </span>
          )}
        </div>
      )}
    </motion.form>
  );
};

export default ContactForm;