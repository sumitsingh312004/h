import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Tag,
  Clock,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const DigitalDiaryView: React.FC = () => {
  const { diaryNotes, deleteDiaryNote, openModal } = useApp();
  const [selectedDate, setSelectedDate] = useState('2026-09-20');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const changeDateBy = (days: number) => {
    const current = new Date(selectedDate);
    current.setDate(current.getDate() + days);
    setSelectedDate(current.toISOString().split('T')[0]);
  };

  const dayNotes = diaryNotes.filter((n) => {
    const matchesDate = n.date === selectedDate;
    const matchesCat = categoryFilter === 'all' || n.category === categoryFilter;
    return matchesDate && matchesCat;
  });

  const formatDateDisplay = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-CA', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-3">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Digital Diary</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Operational automotive logbook, shop task manager & client follow-ups
          </p>
        </div>

        <button
          onClick={() => openModal('new-diary-note', { date: selectedDate })}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold shadow transition self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>+ Add Note for This Day</span>
        </button>
      </div>

      {/* Date Navigation matching video */}
      <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => changeDateBy(-1)}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white transition"
            title="Previous Day"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="px-4 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-center">
            <div className="text-base font-black text-white">{formatDateDisplay(selectedDate)}</div>
            <div className="text-[11px] text-[#76bc21] font-mono">{selectedDate}</div>
          </div>
          <button
            onClick={() => changeDateBy(1)}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white transition"
            title="Next Day"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Quick jump to today */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setSelectedDate('2026-09-20')}
            className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 font-semibold"
          >
            Sep 20 (Video Baseline)
          </button>
          <button
            onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
            className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 font-semibold"
          >
            Today's Date
          </button>
        </div>
      </div>

      {/* Notes Display */}
      <div className="space-y-4">
        {dayNotes.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#1c1c1c] border border-neutral-800 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">You have no note for this day</h4>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Record reminders, client parts requests, shop bookings, or technician notes.
            </p>
            <button
              onClick={() => openModal('new-diary-note', { date: selectedDate })}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#198cd6] hover:bg-[#1479bb] text-white text-xs font-bold transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Note</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dayNotes.map((note) => (
              <div
                key={note.id}
                className="p-5 rounded-2xl bg-[#1c1c1c] border border-neutral-800 hover:border-neutral-700 transition flex flex-col justify-between space-y-3 shadow-lg"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-neutral-800 text-sky-400 font-semibold text-[10px] uppercase">
                      {note.category}
                    </span>
                    <span className="text-[11px] text-neutral-500 font-mono">
                      {note.createdTime}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">{note.title}</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">{note.content}</p>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                  <span>Logged in Digital Diary</span>
                  <button
                    onClick={() => {
                      if (confirm('Delete this diary note?')) {
                        deleteDiaryNote(note.id);
                      }
                    }}
                    className="p-1 rounded hover:bg-red-950/60 text-neutral-400 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
