import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Send,
  X,
  User,
  Car,
  Calendar,
  Wrench,
  Disc,
  Truck,
  ShieldCheck,
  Headphones,
} from 'lucide-react';

export const CarDaddyAiAssistantModal: React.FC = () => {
  const { modalState, closeModal, vehicles, repairShops, tireDeals } = useApp();
  const initialQuery = modalState.data?.initialQuery || '';

  const [input, setInput] = useState(initialQuery);
  const [messages, setMessages] = useState<
    Array<{ sender: 'advisor' | 'user'; text: string; timestamp: string }>
  >([
    {
      sender: 'advisor',
      text: "Hello! I am your CarDaddy automotive service advisor. I can help look up your vehicle's next due service, oil change intervals, certified repair facilities, tire deals, or emergency towing dispatch.",
      timestamp: 'Just now',
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
  }, []);

  const generateAdvisorResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('oil') || q.includes('service due') || q.includes('next service')) {
      const v = vehicles[0];
      const overdue = vehicles.find((veh) => veh.status === 'Overdue');
      if (overdue) {
        return `⚠️ Immediate attention recommended: Your ${overdue.year} ${overdue.make} ${overdue.model} is currently OVERDUE for ${overdue.nextServiceType} at ${overdue.nextServiceMileage.toLocaleString()} km (Current: ${overdue.currentMileage.toLocaleString()} km). Your ${v.make} ${v.model} is due next on ${v.nextServiceDate} for ${v.nextServiceType}. Would you like to schedule with Apex Precision Auto?`;
      }
      return `Based on your driving history and odometer telemetry, your ${v.year} ${v.make} ${v.model} is due for ${v.nextServiceType} on ${v.nextServiceDate} or at ${v.nextServiceMileage.toLocaleString()} km. That leaves ${Math.max(0, v.nextServiceMileage - v.currentMileage).toLocaleString()} km of safe driving.`;
    }

    if (q.includes('tire') || q.includes('tyre')) {
      const deal = tireDeals[0];
      const disc = deal ? (deal.discountPrice || deal.salePrice || deal.originalPrice) : 740;
      const orig = deal ? deal.originalPrice : 920;
      const brand = deal ? deal.brand : 'Michelin';
      const model = deal ? deal.model : 'CrossClimate 2';
      const size = deal ? deal.size : '225/45R18';
      const shop = deal ? deal.shopName : 'Kal Tire Toronto Central';
      return `We found top-rated tire deals in Canada! The best promotion right now is ${brand} ${model} (${size}) for $${disc} CAD (Regular $${orig}, Save $${orig - disc}). Available with free local mounting at ${shop}.`;
    }

    if (q.includes('tow') || q.includes('breakdown') || q.includes('stuck')) {
      return `🚨 CarDaddy 24/7 Rapid Towing Dispatch is on standby. We can dispatch a flatbed tow truck to your current Canadian location within 15-25 minutes. Average city response rate is 18 minutes. Tap the Emergency Tow button or give our hotline a call.`;
    }

    if (q.includes('detail') || q.includes('wash') || q.includes('clean')) {
      return `CarDaddy Detailing Presto offers flexible doorstep service! Our Executive Interior Steam & Ceramic Foam package is available starting at $180 CAD. Our mobile van comes directly to your home or office.`;
    }

    if (q.includes('shop') || q.includes('mechanic') || q.includes('repair')) {
      const topShop = repairShops[0];
      return `The highest-rated certified Red Seal shop near you is ${topShop.name} (${topShop.rating} ★, ${topShop.city}). They specialize in Brake Overhaul, Diagnostics, and OEM Warranty maintenance with digital invoicing.`;
    }

    if (q.includes('history') || q.includes('records') || q.includes('book')) {
      return `Your CarDaddy Digital Bill Book holds verified service records for ${vehicles.length} vehicle(s). Every log includes odometer certification, invoice number, and workshop stamp—protecting up to 18% higher resale value.`;
    }

    return `Thank you for contacting CarDaddy Support! I can assist you with service intervals, finding certified repair facilities across Canada, comparing national tire stock, or scheduling roadside towing. How can I assist your vehicle today?`;
  };

  const handleSend = (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateAdvisorResponse(messageText);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'advisor',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#181818] border border-neutral-800 rounded-3xl shadow-2xl flex flex-col h-[580px] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#76bc21] to-[#198cd6] flex items-center justify-center text-white shadow">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm text-white flex items-center gap-1.5">
                <span>CarDaddy Service Advisor</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#76bc21]/20 text-[#76bc21] font-bold">
                  ONLINE
                </span>
              </h3>
              <p className="text-[11px] text-neutral-400">
                Connected to your vehicle profiles & Canadian automotive network
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${
                m.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                  m.sender === 'user'
                    ? 'bg-[#198cd6] text-white'
                    : 'bg-[#76bc21]/20 text-[#76bc21]'
                }`}
              >
                {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Headphones className="w-3.5 h-3.5" />}
              </div>
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#198cd6] text-white rounded-tr-none'
                    : 'bg-neutral-800/90 text-neutral-100 rounded-tl-none border border-neutral-700/60'
                }`}
              >
                {m.text}
                <div
                  className={`text-[9px] mt-1 ${
                    m.sender === 'user' ? 'text-sky-200 text-right' : 'text-neutral-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-neutral-400 text-xs italic">
              <Headphones className="w-4 h-4 text-[#76bc21] animate-bounce" />
              <span>Looking up vehicle intervals & shop records...</span>
            </div>
          )}
        </div>

        {/* Quick prompt chips */}
        <div className="px-4 py-2 border-t border-neutral-800/80 bg-neutral-900/50 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          <button
            onClick={() => handleSend('When is my next service due?')}
            className="px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 whitespace-nowrap"
          >
            Next Service Due
          </button>
          <button
            onClick={() => handleSend('Find best tire deals')}
            className="px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 whitespace-nowrap"
          >
            Tire Deals
          </button>
          <button
            onClick={() => handleSend('Tow service near me')}
            className="px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 whitespace-nowrap"
          >
            Emergency Towing
          </button>
          <button
            onClick={() => handleSend('Find certified repair shop')}
            className="px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 whitespace-nowrap"
          >
            Repair Shops
          </button>
        </div>

        {/* Input bar */}
        <div className="p-3 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Search car maintenance, tires, towing..."
            className="flex-1 px-3 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#76bc21]"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white shadow transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
