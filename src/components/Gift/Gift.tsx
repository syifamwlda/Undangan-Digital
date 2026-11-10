import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { invitationData } from '../../data/invitationData';
import { VintageDivider } from '../Decorative/GoldOrnaments';
import { Gift, Copy, Check, CreditCard, Home, ChevronDown, ChevronUp } from 'lucide-react';

export const WeddingGift: React.FC = () => {
  const { title, subtitle, accounts, physicalGiftAddress } = invitationData.gift;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

  const handleCopyAccount = (accountNumber: string, bank: string) => {
    // Strip spaces for clean copying
    const cleaned = accountNumber.replace(/\s+/g, '');
    navigator.clipboard.writeText(cleaned);
    setCopiedAccount(bank);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleCopyAddress = () => {
    if (!physicalGiftAddress) return;
    const full = `${physicalGiftAddress.recipient}, ${physicalGiftAddress.address}, ${physicalGiftAddress.city} ${physicalGiftAddress.postalCode} (Tel: ${physicalGiftAddress.phone})`;
    navigator.clipboard.writeText(full);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="gift" className="relative py-24 sm:py-32 bg-obsidian text-ivory-warm overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-burgundy/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 film-grain pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-20 text-center">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold-antique/30 bg-burgundy-deep/30 backdrop-blur-sm mb-3">
            <Gift className="w-3.5 h-3.5 text-gold-champagne" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-gold-champagne font-cinzel font-semibold">
              Token of Love
            </span>
          </div>

          <h2 className="font-italiana text-3xl sm:text-5xl font-normal text-[#FAF6EE] mt-2">
            {title}
          </h2>

          <VintageDivider className="mx-auto w-48 my-4" />

          <p className="font-cormorant italic text-base sm:text-lg text-ivory-muted/80 leading-relaxed">
            "{subtitle}"
          </p>
        </div>

        {/* Unobtrusive Collapsible Toggle Button */}
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-8 py-3.5 rounded-full border border-gold-champagne/60 bg-burgundy-deep/40 hover:bg-burgundy-deep text-gold-champagne hover:text-gold-light text-xs tracking-[0.2em] uppercase font-sans font-semibold transition-all duration-300 shadow-gold-glow inline-flex items-center gap-2.5 focus:outline-none"
          >
            <Gift className="w-4 h-4 text-gold-champagne" />
            <span>{isOpen ? 'Close Wedding Registry' : 'View Wedding Gift Registry'}</span>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded Registry Cards */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -15 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="mt-12 overflow-hidden text-left"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accounts.map((acc) => (
                  <div
                    key={acc.bankName}
                    className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#1d1218] via-[#140b10] to-obsidian border border-gold-antique/40 shadow-vintage-card flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-cormorant text-xl font-bold text-gold-champagne tracking-wide">
                          {acc.bankName}
                        </span>
                        <CreditCard className="w-5 h-5 text-gold-champagne/70" />
                      </div>

                      <p className="text-[10px] uppercase tracking-widest text-ivory-muted/60 font-sans">
                        Account Number
                      </p>
                      <p className="font-sans text-xl sm:text-2xl font-bold text-ivory-warm tracking-wider mt-0.5">
                        {acc.accountNumber}
                      </p>

                      <div className="mt-3 pt-3 border-t border-gold-antique/20">
                        <p className="text-[10px] uppercase tracking-widest text-ivory-muted/60 font-sans">
                          Account Holder
                        </p>
                        <p className="font-cormorant text-lg text-gold-light font-medium mt-0.5">
                          {acc.accountHolder}
                        </p>
                        {acc.note && (
                          <p className="text-[11px] text-ivory-muted/70 font-sans mt-1">
                            {acc.note}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopyAccount(acc.accountNumber, acc.bankName)}
                      className="mt-6 w-full py-2.5 px-4 rounded-xl bg-black/60 hover:bg-black text-gold-champagne border border-gold-antique/40 hover:border-gold-champagne text-xs font-sans uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      {copiedAccount === acc.bankName ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-300">Account Number Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Account Number</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Physical Gift Delivery Address */}
              {physicalGiftAddress && (
                <div className="mt-8 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#1d1218] via-[#140b10] to-obsidian border border-gold-antique/40 shadow-vintage-card">
                  <div className="flex items-center gap-3 mb-3">
                    <Home className="w-5 h-5 text-gold-champagne" />
                    <h4 className="font-cormorant text-2xl font-semibold text-gold-light">
                      Physical Wedding Gift Delivery
                    </h4>
                  </div>
                  <p className="text-sm font-sans text-ivory-warm font-medium">
                    {physicalGiftAddress.recipient} (Phone: {physicalGiftAddress.phone})
                  </p>
                  <p className="text-sm font-sans text-ivory-muted/80 mt-1">
                    {physicalGiftAddress.address}, {physicalGiftAddress.city} {physicalGiftAddress.postalCode}
                  </p>
                  <button
                    onClick={handleCopyAddress}
                    className="mt-4 py-2 px-5 rounded-lg bg-black/60 hover:bg-black text-gold-champagne border border-gold-antique/40 hover:border-gold-champagne text-xs font-sans uppercase tracking-widest inline-flex items-center gap-2 transition-all"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Delivery Address Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Delivery Address</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

