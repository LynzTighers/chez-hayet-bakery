import { formatReceived, type Contact } from "../lib/admin";

export default function MessagesPanel({ contacts }: { contacts: Contact[] }) {
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
        <li key={contact.id} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-petal sm:p-6">
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

          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-petal/70 pt-4 text-sm">
            {/* Opens the baker's own email app for now; step 5 adds replying from here. */}
            <a
              href={`mailto:${contact.email}?subject=${encodeURIComponent("Re: your message to Chez Hayet Bakery")}`}
              className="rounded-full bg-cocoa px-4 py-2 font-medium text-cream transition hover:bg-rose-deep"
            >
              ✉️ Reply to {contact.email}
            </a>
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="rounded-full px-4 py-2 text-cocoa ring-1 ring-petal transition hover:bg-blush"
              >
                📞 {contact.phone}
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
