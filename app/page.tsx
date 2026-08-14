"use client";

import { KeyboardEvent, useState } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const capabilities = [
  {
    title: "AI Chat",
    description:
      "Ask questions, solve problems, plan tasks and get intelligent assistance.",
    icon: "✦",
  },
  {
    title: "Remember",
    description:
      "Keep useful context, preferences and conversations available across sessions.",
    icon: "🧠",
  },
  {
    title: "Voice Assistant",
    description:
      "Interact naturally with ChatOne using voice commands and responses.",
    icon: "🎙",
  },
  {
    title: "Screen Understanding",
    description:
      "Understand what is on your screen when you explicitly grant permission.",
    icon: "👁",
  },
  {
    title: "Automation",
    description:
      "Plan and assist with repetitive tasks and intelligent workflows.",
    icon: "⚙",
  },
  {
    title: "Permissions",
    description:
      "Control exactly what ChatOne can access and when it can access it.",
    icon: "✓",
  },
  {
    title: "Security & Privacy",
    description:
      "Permission-based operation, privacy controls and human override.",
    icon: "🛡",
  },
  {
    title: "Cloud Sync",
    description:
      "Synchronize supported data and services across connected cloud accounts.",
    icon: "☁",
  },
  {
    title: "Analytics",
    description:
      "Understand usage, activity and system performance.",
    icon: "📊",
  },
  {
    title: "Plugins",
    description:
      "Extend ChatOne with new capabilities through a controlled plugin system.",
    icon: "🔌",
  },
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
        "Hello! I'm ChatOne. Your AI Operating Companion is ready. How can I help you?",
    },
  ]);

  const [isThinking, setIsThinking] = useState(false);

  const sendMessage = () => {
    const text = input.trim();

    if (!text || isThinking) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setInput("");
    setIsThinking(true);

    window.setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "I received your request. The ChatOne AI Engine connection is the next integration step. For now, this interface is running in local demo mode.",
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);

      setIsThinking(false);
    }, 700);
  };

  const handleInputKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content:
          "Chat cleared. I'm ready for your next request.",
      },
    ]);
  };

  const openFeature = (feature: string) => {
    setActiveFeature(feature);

    if (feature !== "AI Chat") {
      return;
    }
  };

  return (
    <main className="min-h-screen bg-[#08090d] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">

        {/* Sidebar */}
        <aside className="border-b border-white/10 bg-[#0d0f15] p-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r">

          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-xl font-bold shadow-lg shadow-violet-500/20">
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

        {/* Main */}
        <section className="flex-1 p-4 md:p-8">

          {/* Header */}
          <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="mb-1 text-sm font-medium text-cyan-400">
                ChatOne
              </p>

              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Your Personal AI Operating Companion
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">
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

          {/* AI CHAT */}
          {activeFeature === "AI Chat" ? (
            <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d0f15]">

              {/* Chat Header */}
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
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                  Clear Chat
                </button>
              </div>

              {/* Messages */}
              <div className="min-h-[420px] max-h-[520px] space-y-4 overflow-y-auto p-5">

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
                          ? "bg-violet-500 text-white"
                          : "border border-white/10 bg-white/5 text-white/70"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {isThinking && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/40">
                      ChatOne is thinking...
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-white/10 p-4">
                <div className="flex flex-col gap-3 sm:flex-row">

                  <textarea
                    value={input}
                    onChange={(event) =>
                      setInput(event.target.value)
                    }
                    onKeyDown={handleInputKeyDown}
                    placeholder="Ask ChatOne anything..."
                    rows={2}
                    className="min-h-[54px] flex-1 resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-violet-400/40"
                  />

                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isThinking}
                    className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30 sm:self-end"
                  >
                    Send
                  </button>

                </div>

                <p className="mt-2 text-[11px] text-white/25">
                  Enter to send • Shift + Enter for a new line
                </p>
              </div>

            </section>
          ) : (
            <>
              {/* Hero */}
              <section className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-[#11131b] to-cyan-500/5 p-6 md:p-9">

                <p className="mb-3 text-sm font-semibold text-violet-300">
                  CHATONE COMMAND CENTER
                </p>

                <h3 className="max-w-3xl text-2xl font-bold md:text-4xl">
                  One AI companion for understanding,
                  memory, assistance and automation.
                </h3>

                <p className="mt-4 max-w-3xl text-sm leading-6 text-white/50">
                  ChatOne is designed to work across your digital
                  environment while keeping permissions, privacy
                  and human control at the center.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                  <button
                    onClick={() =>
                      setActiveFeature("AI Chat")
                    }
                    className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                  >
                    Start AI Chat
                  </button>

                  <button
                    onClick={() =>
                      setActiveFeature("Voice Assistant")
                    }
                    className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium transition hover:bg-white/10"
                  >
                    Try Voice Assistant
                  </button>

                </div>
              </section>

              {/* System Status */}
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

              {/* Capabilities */}
              <section>

                <div className="mb-5">
                  <p className="text-sm font-medium text-cyan-400">
                    WHAT CHATONE CAN DO
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    Built as an AI Operating Companion
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm text-white/40">
                    ChatOne combines intelligence, memory, voice,
                    screen understanding, automation and security
                    into one permission-based AI layer.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  {capabilities.map((capability) => (
                    <button
                      key={capability.title}
                      onClick={() =>
                        setActiveFeature(capability.title)
                      }
                      className="group rounded-2xl border border-white/10 bg-[#0d0f15] p-5 text-left transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/5"
                    >
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-lg">
                        {capability.icon}
                      </div>

                      <h4 className="font-semibold">
                        {capability.title}
                      </h4>

                      <p className="mt-2 text-xs leading-5 text-white/40">
                        {capability.description}
                      </p>

                      <div className="mt-4 text-xs text-cyan-400 opacity-70 group-hover:opacity-100">
                        Open →
                      </div>
                    </button>
                  ))}

                </div>
              </section>

              {/* Human Control */}
              <section className="mt-8 rounded-2xl border border-white/10 bg-[#0d0f15] p-6">

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div>
                    <p className="text-sm font-semibold">
                      You stay in control.
                    </p>

                    <p className="mt-2 max-w-2xl text-xs leading-5 text-white/40">
                      ChatOne follows a permission-based approach.
                      Sensitive actions require authorization and
                      human override remains available.
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setActiveFeature("Permissions")
                    }
                    className="w-fit rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-medium hover:bg-white/10"
                  >
                    Manage Permissions
                  </button>

                </div>
              </section>

              {/* Active Area */}
              <section className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-violet-500/5 to-cyan-500/5 p-6">

                <p className="text-xs text-white/35">
                  ACTIVE AREA
                </p>

                <h3 className="mt-2 text-xl font-semibold">
                  {activeFeature}
                </h3>

                <p className="mt-2 text-sm text-white/40">
                  This ChatOne capability is ready to be connected
                  to its corresponding AI module.
                </p>

              </section>
            </>
          )}

          {/* Footer */}
          <footer className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/25">
            ChatOne • Understand. Remember. Assist. Automate.
          </footer>

        </section>
      </div>
    </main>
  );
              }
