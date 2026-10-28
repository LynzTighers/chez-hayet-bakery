"use client";
import { useState } from "react";
import { ApiError, LoggedOutError, adminApi, formatReceived, type Contact, type ContactReply } from "../lib/admin";

export default function MessagesPanel({
  contacts,
  onReplied,
  onLoggedOut,
}: {
  contacts: Contact[];
  onReplied: (contactId: number, reply: ContactReply) => void;
  onLoggedOut: () => void;
}) {
  if (contacts.length === 0) {
    return (
      <p className="rounded-3xl bg-white/60 p-10 text-center text-latte ring-1 ring-petal">
        No messages yet.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {contacts.map((contact) => (
        <MessageCard key={contact.id} contact={contact} onReplied={onReplied} onLoggedOut={onLoggedOut} />
      ))}
    </ul>
  );
}

function MessageCard({
  contact,
  onReplied,
  onLoggedOut,
}: {
  contact: Contact;
  onReplied: (contactId: number, reply: ContactReply) => void;
  onLoggedOut: () => void;
}) {
  const [replying, setReplying] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string>();
  const [justSent, setJustSent] = useState(false);

  async function send(event: React.FormEvent) {
    event.preventDefault();
    setSending(true);
    setError(undefined);
    try {
      const reply = await adminApi.replyToContact(contact.id, draft);
      onReplied(contact.id, reply);
      setDraft("");
      setReplying(false);
      setJustSent(true);
    } catch (err) {
      if (err instanceof LoggedOutError) return onLoggedOut();
      setError(err instanceof ApiError ? err.message : "Couldn't send. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <li className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-petal sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl font-semibold text-cocoa">{contact.name}</h3>
          <p className="text-xs text-latte">Received {formatReceived(contact.createdAt)}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            contact.status === "new" ? "bg-peach/60 text-cocoa" : "bg-[#dcebd9] text-[#2f5a35]"
          }`}
        >
          {contact.status === "new" ? "New" : "Replied"}
        </span>
      </div>

      <p className="mt-4 whitespace-pre-line leading-7 text-cocoa-deep">{contact.message}</p>

      {/* Replies already sent, oldest first, like a conversation */}
      {contact.replies.length > 0 && (
        <ul className="mt-4 space-y-3">
          {contact.replies.map((reply) => (
            <li key={reply.id} className="ml-6 rounded-2xl bg-blush px-4 py-3 sm:ml-12">
              <p className="mb-1 text-xs text-latte">You replied · {formatReceived(reply.sentAt)}</p>
              <p className="whitespace-pre-line leading-7 text-cocoa-deep">{reply.message}</p>
            </li>
          ))}
        </ul>
      )}

      {justSent && !replying && (
        <p role="status" className="mt-4 rounded-2xl bg-[#dcebd9] px-4 py-2 text-sm text-[#2f5a35]">
          ✓ Reply emailed to {contact.email}
        </p>
      )}

      {replying ? (
        <form onSubmit={send} className="mt-5 space-y-3 border-t border-petal/70 pt-4">
          <label htmlFor={`reply-${contact.id}`} className="block text-sm font-medium text-cocoa">
            Reply to {contact.email}
          </label>
          <textarea
            id={`reply-${contact.id}`}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            rows={5}
            autoFocus
            placeholder={`Hi ${contact.name.split(" ")[0]},`}
            className="w-full resize-y rounded-2xl border border-petal bg-cream/40 px-4 py-3 leading-7 text-cocoa-deep outline-none transition focus:border-rose-deep"
          />
          {error && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={sending || draft.trim().length < 2}
              className="rounded-full bg-rose-deep px-5 py-2.5 text-sm font-medium text-white transition hover:bg-cocoa disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send email"}
            </button>
            <button
              type="button"
              onClick={() => {
                setReplying(false);
                setError(undefined);
              }}
              className="rounded-full px-5 py-2.5 text-sm text-cocoa ring-1 ring-petal transition hover:bg-blush"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-petal/70 pt-4 text-sm">
          <button
            type="button"
            onClick={() => {
              setReplying(true);
              setJustSent(false);
            }}
            className="rounded-full bg-cocoa px-4 py-2 font-medium text-cream transition hover:bg-rose-deep"
          >
            ✉️ {contact.replies.length > 0 ? "Reply again" : "Reply"}
          </button>
          <span className="text-latte">{contact.email}</span>
          {contact.phone && (
            <a
              href={`tel:${contact.phone}`}
              className="rounded-full px-4 py-2 text-cocoa ring-1 ring-petal transition hover:bg-blush"
            >
              📞 {contact.phone}
            </a>
          )}
        </div>
      )}
    </li>
  );
}
