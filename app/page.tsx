"use client";

import { FormEvent, KeyboardEvent, useState } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const capabilities = [
  ["AI Chat", "Ask questions and get intelligent assistance.", "✦"],
  ["Remember", "Keep useful context across sessions.", "🧠"],
  ["Voice Assistant", "Interact naturally using voice.", "🎙"],
  ["Screen Understanding", "Understand your screen with permission.", "👁"],
  ["Automation", "Plan repetitive tasks and workflows.", "⚙"],
  ["Permissions", "Control what ChatOne can access.", "✓"],
  ["Security & Privacy", "Privacy controls and human override.", "🛡"],
  ["Cloud Sync", "Synchronize supported connected data.", "☁"],
  ["Analytics", "Understand activity and performance.", "📊"],
  ["Plugins", "Extend ChatOne with controlled plugins.", "🔌"],
];

const navigation = [
  "AI Command Center",
  "AI Chat",
  "Voice Assistant",
  "Memory",
  "Screen Understanding",
  "Automation",
  "Permissions",
  "Security",
  "Cloud Sync",
  "Analytics",
  "Settings",
];

export default function ChatOneHome() {
  const [activeFeature, setActiveFeature] =
    useState("AI Command Center");

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello! I’m ChatOne. I’m ready to understand, assist and help you manage your digital environment.",
    },
  ]);

  const [isThinking, setIsThinking] = useState(false);

  const openFeature = (feature: string) => {
    setActiveFeature(feature);
  };

  const sendMessage = async () => {
    const text = input.trim();

    if (!text || isThinking) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsThinking(true);

    /*
     * AI ENGINE INTEGRATION POINT
     *
     * Later this function will connect directly to
     * the existing Universal AI Engine.
     *
     * For now we keep the UI functional without
     * introducing an external API key.
     */

    window.setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "I received your request. The ChatOne interface is working. The next integration step is to connect this conversation layer to the existing AI Engine.",
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);

      setIsThinking(false);
    }, 700);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const renderChat = () => (
    <section className="rounded-3xl border border-white/10 bg-[#0d0f15] overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 p-5">
        <div>
          <p className="text-xs font-medium text-cyan-400">
            CHATONE AI
          </p>

          <h3 className="mt-1 text-xl font-semibold">
            AI Chat
          </h3>
        </div>

        <button
          onClick={clearChat}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60 hover:bg-white/10 hover:text-white"
        >
          Clear Chat
        </button>
      </div>

      <div className="min-h-[360px] max-h-[500px] space-y-4 overflow-y-auto p-5">
        {messages.length === 0 && (
          <div className="flex min-h-[300px] items-center justify-center text-center">
            <div>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-xl">
                C
              </div>

              <p className="mt-4 text-sm font-medium">
                Start a conversation with ChatOne
              </p>

              <p className="mt-2 text-xs text-white/35">
                Ask ChatOne anything.
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                message.role === "user"
                  ? "bg-violet-500/20 text-white"
                  : "bg-white/5 text-white/70"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-white/40">
              ChatOne is thinking...
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-white/10 p-4"
      >
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Ask ChatOne anything..."
            rows={2}
            className="min-w-0 flex-1 resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-cyan-400/40"
          />

          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className="self-end rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Send
          </button>
        </div>

        <p className="mt-2 text-[11px] text-white/25">
          Enter to send • Shift + Enter for a new line
        </p>
      </form>
    </section>
  );

  const renderFeature = () => (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/5 to-cyan-500/5 p-7">
      <p className="text-xs text-white/35">
        ACTIVE AREA
      </p>

      <h3 className="mt-2 text-2xl font-semibold">
        {activeFeature}
      </h3>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
        This ChatOne capability is ready for connection to
        its corresponding AI module.
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#0d0f15] p-5">
        <p className="text-sm font-medium">
          Module Status
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-xs text-emerald-300">
            Interface Ready
          </span>
        </div>
      </div>
    </section>
  );

  return (
    <main className="min-h-screen bg-[#08090d] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">

        <aside className="border-b border-white/10 bg-[#0d0f15] p-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-xl font-bold">
              C
            </div>

            <div>
              <h1 className="text-lg font-bold">
                ChatOne
              </h1>

              <p className="text-xs text-white/40">
                AI Operating Companion
              </p>
            </div>
          </div>

          <nav className="space-y-1">
            {navigation.map((item) => (
              <button
                key={item}
                onClick={() => openFeature(item)}
                className={`w-full rounded-xl px-3 py-3 text-left text-sm transition ${
                  activeFeature === item
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <section className="flex-1 p-4 md:p-8">

          <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-1 text-sm font-medium text-cyan-400">
                ChatOne
              </p>

              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Your Personal AI Operating Companion
              </h2>

              <p className="mt-3 text-sm text-white/45">
                Understand. Remember. Assist. Automate.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <span className="text-xs text-emerald-300">
                System Online
              </span>
            </div>
          </header>

          {activeFeature === "AI Chat" ? (
            renderChat()
          ) : (
            <>
              <section className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-[#11131b] to-cyan-500/5 p-6 md:p-9">
                <p className="mb-3 text-sm font-semibold text-violet-300">
                  CHATONE COMMAND CENTER
                </p>

                <h3 className="max-w-3xl text-2xl font-bold md:text-4xl">
                  One AI companion for understanding,
                  memory, assistance and automation.
                </h3>

                <p className="mt-4 max-w-3xl text-sm leading-6 text-white/50">
                  ChatOne is designed to work across your
                  digital environment while keeping
                  permissions, privacy and human control
                  at the center.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() =>
                      openFeature("AI Chat")
                    }
                    className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90"
                  >
                    Start AI Chat
                  </button>

                  <button
                    onClick={() =>
                      openFeature("Voice Assistant")
                    }
                    className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm hover:bg-white/10"
                  >
                    Try Voice Assistant
                  </button>
                </div>
              </section>

              <section className="mb-9">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    System Status
                  </h3>

                  <span className="text-xs text-white/30">
                    ChatOne Core
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {[
                    ["AI Engine", "Ready"],
                    ["Memory", "Available"],
                    ["Permissions", "Protected"],
                    ["Automation", "Ready"],
                  ].map(([title, status]) => (
                    <div
                      key={title}
                      className="rounded-2xl border border-white/10 bg-[#0d0f15] p-4"
                    >
                      <p className="text-xs text-white/40">
                        {title}
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span className="text-sm font-medium">
                          {status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-8">
                <div className="mb-5">
                  <p className="text-sm font-medium text-cyan-400">
                    WHAT CHATONE CAN DO
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    Built as an AI Operating Companion
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {capabilities.map(
                    ([title, description, icon]) => (
                      <button
                        key={title}
                        onClick={() =>
                          openFeature(title)
                        }
                        className="group rounded-2xl border border-white/10 bg-[#0d0f15] p-5 text-left transition hover:-translate-y-1 hover:bg-white/5"
                      >
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-lg">
                          {icon}
                        </div>

                        <h4 className="font-semibold">
                          {title}
                        </h4>

                        <p className="mt-2 text-xs leading-5 text-white/40">
                          {description}
                        </p>

                        <div className="mt-4 text-xs text-cyan-400">
                          Open →
                        </div>
                      </button>
                    )
                  )}
                </div>
              </section>

              <section className="mb-8 rounded-2xl border border-white/10 bg-[#0d0f15] p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold">
                      You stay in control.
                    </p>

                    <p className="mt-2 max-w-2xl text-xs leading-5 text-white/40">
                      Sensitive actions require authorization
                      and human override remains available.
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      openFeature("Permissions")
                    }
                    className="w-fit rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs hover:bg-white/10"
                  >
                    Manage Permissions
                  </button>
                </div>
              </section>

              {activeFeature !== "AI Command Center" &&
                renderFeature()}
            </>
          )}

          <footer className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/25">
            ChatOne • Understand. Remember. Assist. Automate.
          </footer>
        </section>
      </div>
    </main>
  );
      }
