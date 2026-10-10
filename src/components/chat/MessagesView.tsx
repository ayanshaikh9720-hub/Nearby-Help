import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Mic,
  Camera,
  Phone,
  Shield,
  Clock,
  CheckCheck,
  MapPin,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ChatMessage } from '../../types';

interface MessagesViewProps {
  initialBookingId?: string | null;
  onOpenLiveTracking?: (bookingId: string) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  initialBookingId,
  onOpenLiveTracking
}) => {
  const { chats, sendChatMessage, bookings, profile, userMode } = useApp();

  const [activeConversationId, setActiveConversationId] = useState<string>(
    initialBookingId || (bookings[0]?.id || 'book-801')
  );
  const [inputText, setInputText] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [callingMasked, setCallingMasked] = useState(false);

  // Active booking for this conversation
  const currentBooking = bookings.find(b => b.id === activeConversationId);
  const partnerName = currentBooking
    ? userMode === 'provider' ? currentBooking.customerName : currentBooking.providerName
    : 'Service Partner';

  const partnerAvatar = currentBooking?.providerAvatar || profile.avatar;

  // Filter messages for current conversation
  const currentMessages = chats.filter(c => c.conversationId === activeConversationId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendChatMessage(activeConversationId, inputText.trim());
    setInputText('');
  };

  const handleSimulateVoiceNote = () => {
    setIsRecordingVoice(true);
    setTimeout(() => {
      setIsRecordingVoice(false);
      sendChatMessage(activeConversationId, undefined, 'voice', undefined, 4);
    }, 2000);
  };

  const handleSimulatePhotoShare = () => {
    sendChatMessage(
      activeConversationId,
      'Attached site photo for your reference',
      'image',
      '/src/assets/images/hero_service_electrician_1790560964865.jpg'
    );
  };

  const handleMaskedCall = () => {
    setCallingMasked(true);
    setTimeout(() => {
      setCallingMasked(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-h-[700px] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs pb-2 animate-in fade-in duration-150">
      {/* Chat Top Bar */}
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src={partnerAvatar}
            alt={partnerName}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-xl object-cover border border-slate-200"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-bold text-xs text-slate-900 leading-tight">{partnerName}</h2>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <p className="text-[10px] text-slate-600">
              {currentBooking?.service || 'Service Job'} · Shield Encrypted
            </p>
          </div>
        </div>

        {/* Masked call trigger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleMaskedCall}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            title="Call with masked virtual number"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Call Shield</span>
          </button>
        </div>
      </div>

      {/* Masked Calling Notice Banner */}
      {callingMasked && (
        <div className="p-2.5 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-900 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600 animate-bounce" />
            <span>Connecting masked call via Nearby Shield... (Virtual 080-XXXX-7721)</span>
          </div>
          <button onClick={() => setCallingMasked(false)} className="text-slate-400 hover:text-slate-700">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/40 text-xs">
        {/* Privacy Banner */}
        <div className="p-2 bg-amber-50/80 border border-amber-200 rounded-xl text-center text-[10px] text-amber-900 flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Keep all conversations in Nearby Help to maintain a verified digital service record.</span>
        </div>

        {currentMessages.length === 0 ? (
          <div className="text-center py-10 text-slate-600 space-y-1">
            <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-semibold text-slate-700">Start the conversation</p>
            <p className="text-[11px] text-slate-600">
              Share landmark, gate details, or ask any clarification before arrival.
            </p>
          </div>
        ) : (
          currentMessages.map(msg => {
            const isMe = msg.senderId === profile.id;

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs space-y-1 ${
                    isMe
                      ? 'bg-slate-900 text-white rounded-br-xs'
                      : 'bg-white text-slate-900 border border-slate-200 rounded-bl-xs shadow-xs'
                  }`}
                >
                  {msg.text && <p className="leading-relaxed">{msg.text}</p>}

                  {/* Voice note message */}
                  {msg.mediaType === 'voice' && (
                    <div className="flex items-center gap-2 py-1">
                      <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center">
                        ▶
                      </div>
                      <div className="flex-1">
                        <div className="h-1.5 w-24 bg-slate-300 rounded-full"></div>
                        <span className="text-[9px] opacity-75 font-mono">0:04s voice note</span>
                      </div>
                    </div>
                  )}

                  {/* Photo message */}
                  {msg.mediaType === 'image' && msg.mediaUrl && (
                    <div className="pt-1">
                      <img
                        src={msg.mediaUrl}
                        alt="Shared attachment"
                        referrerPolicy="no-referrer"
                        className="rounded-xl max-h-36 object-cover border border-slate-700/20"
                      />
                    </div>
                  )}

                  <div className={`text-[9px] flex items-center gap-1 ${isMe ? 'text-slate-300 justify-end' : 'text-slate-600'}`}>
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-emerald-400" />}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick preset replies */}
      <div className="px-3 py-1.5 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
        <button
          type="button"
          onClick={() => setInputText('I am waiting at the location gate.')}
          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg whitespace-nowrap"
        >
          “Waiting at gate”
        </button>
        <button
          type="button"
          onClick={() => setInputText('Please call when you reach the landmark.')}
          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg whitespace-nowrap"
        >
          “Call when near”
        </button>
        <button
          type="button"
          onClick={() => setInputText('OTP for job start is verified.')}
          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg whitespace-nowrap"
        >
          “OTP verified”
        </button>
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
        <button
          type="button"
          onClick={handleSimulatePhotoShare}
          className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
          title="Attach photo"
        >
          <Camera className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleSimulateVoiceNote}
          className={`p-2 rounded-xl transition-all ${
            isRecordingVoice ? 'bg-rose-500 text-white animate-pulse' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
          }`}
          title="Send voice note"
        >
          <Mic className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder={isRecordingVoice ? 'Recording audio snippet...' : 'Type a message...'}
          disabled={isRecordingVoice}
          className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl disabled:opacity-40 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
