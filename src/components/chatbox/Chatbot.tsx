"use client";

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FaImage } from "react-icons/fa6";
import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS, type Product } from "@/constants/products";
import { imageToFeature, l2, type Feature } from "@/lib/vision/extractFeatures";
import HScroll from "@/components/common/HScroll";

/* ===================== Types ===================== */

type BotTextMsg = { id: string; role: "bot"; type: "text"; text: string };
type UserImageMsg = { id: string; role: "user"; type: "image"; previewUrl: string };
type BotResultsMsg = { id: string; role: "bot"; type: "results"; products: Product[] };
type BotTypingMsg = { id: string; role: "bot"; type: "typing" };
type ChatMsg = BotTextMsg | UserImageMsg | BotResultsMsg | BotTypingMsg;

type SearchState = "idle" | "preview" | "loading" | "done" | "error";

/* ===================== Main Chatbot ===================== */

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<SearchState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [results, setResults] = useState<Product[]>([]);
  const [messages, setMessages] = useState<ChatMsg[]>(() => [
    {
      id: crypto.randomUUID(),
      role: "bot",
      type: "text",
      text:
        "Hi! I’m the EZBuy Visual Assistant 👋\n" +
        "Upload a phone image and I’ll suggest the 3 most similar products.",
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Cache computed image features for all products
  const [catalogFeats, setCatalogFeats] = useState<Record<number, Feature>>({});

  const onPick = () => inputRef.current?.click();

  const resetAll = useCallback(() => {
    setFile(null);
    setResults([]);
    setErrorMsg("");
    setState("idle");
    setMessages([
      {
        id: crypto.randomUUID(),
        role: "bot",
        type: "text",
        text:
          "Hi! I’m the EZBuy Visual Assistant 👋\n" +
          "Upload a phone image and I’ll suggest the 3 most similar products.",
      },
    ]);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    resetAll();
  }, [resetAll]);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  }, []);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) {
      setErrorMsg("Please choose an image file (jpg/png/webp…).");
      setState("error");
      return;
    }
    const url = URL.createObjectURL(f);
    setFile(f);
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", type: "image", previewUrl: url },
    ]);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const canSearch = useMemo(() => !!file && state !== "loading", [file, state]);

  // Compute / retrieve feature for a product
  const ensureProductFeature = useCallback(
    async (p: Product): Promise<Feature> => {
      if (catalogFeats[p.id]) return catalogFeats[p.id];
      const feat = await imageToFeature(p.image_url);
      setCatalogFeats((prev) => ({ ...prev, [p.id]: feat }));
      return feat;
    },
    [catalogFeats]
  );

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      chatRef.current?.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  const doSearch = async () => {
    if (!file) return;
    try {
      setState("loading");
      setErrorMsg("");

      // Show typing
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "bot", type: "typing" },
      ]);
      scrollToBottom();

      // 1) Extract query feature
      const q = await imageToFeature(file);

      // 2) Compare with product features
      const scored: Array<{ p: Product; d: number }> = [];
      for (const p of PRODUCTS) {
        const f = await ensureProductFeature(p);
        const d = l2(q, f);
        scored.push({ p, d });
      }

      // 3) Sort ascending and take top 3
      scored.sort((a, b) => a.d - b.d);
      const top3 = scored.slice(0, 3).map((x) => x.p);

      setResults(top3);
      setState("done");

      // Replace typing with result bubble
      setMessages((prev) => {
        const withoutTyping = prev.filter((m) => m.type !== "typing");
        return [
          ...withoutTyping,
          {
            id: crypto.randomUUID(),
            role: "bot",
            type: "results",
            products: top3,
          },
        ];
      });
      scrollToBottom();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(msg);
      setState("error");
      setMessages((prev) => {
        const withoutTyping = prev.filter((m) => m.type !== "typing");
        return [
          ...withoutTyping,
          {
            id: crypto.randomUUID(),
            role: "bot",
            type: "text",
            text:
              "Sorry, something went wrong while processing the image. Please try again.",
          },
        ];
      });
      scrollToBottom();
    }
  };

  return (
    <div className="fixed bottom-8 right-5 z-50">
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="relative w-14 h-14 flex items-center justify-center text-white rounded-full 
                     shadow-[0_0_10px_3px_rgba(59,130,246,0.7)]
                     hover:shadow-[0_0_20px_6px_rgba(59,130,246,0.9)]
                     transition cursor-pointer overflow-hidden bg-primary"
          aria-label="Open EZBuy chatbot"
        >
          <Image alt="chatbot" src="/images/chatbot/chatbot.jpg" fill />
        </button>
      )}

      {/* Chatbot panel */}
      {open && (
        <div className="w-[22rem] sm:w-[32rem] h-[75vh] bg-white shadow-xl rounded-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-primary text-white">
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-full overflow-hidden bg-white/20">
                <Image
                  src="/images/chatbot/chatbot.jpg"
                  alt="bot"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="font-semibold text-sm">EZBuy Chatbot</h2>
            </div>
            <button
              className="cursor-pointer"
              onClick={onClose}
              aria-label="Close"
            >
              <IoClose size={22} />
            </button>
          </div>

          {/* Chat messages */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50"
          >
            {state === "idle" && (
              <UploadBubble
                onDrop={onDrop}
                onDragOver={onDragOver}
                onPick={onPick}
                onChange={onInputChange}
                ref={inputRef}
              />
            )}

            {messages.map((m) => (
              <ChatBubble key={m.id} msg={m} />
            ))}
          </div>

          {/* Footer controls */}
          <div className="border-t bg-white px-3 py-2">
            <div className="flex items-center gap-2 justify-between">
              <div className="text-[11px] text-gray-500 hidden sm:block">
                JPG/PNG/WebP • Processed locally in your browser
              </div>
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onInputChange}
                />
                <button
                  type="button"
                  onClick={onPick}
                  className="px-3 py-2 text-sm rounded-md border hover:bg-gray-100"
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={resetAll}
                  className="px-3 py-2 text-sm rounded-md border hover:bg-gray-100"
                >
                  Reset
                </button>
                <button
                  type="button"
                  disabled={!canSearch}
                  onClick={doSearch}
                  className="px-3 py-2 text-sm rounded-md bg-primary text-white disabled:opacity-50"
                >
                  {state === "loading" ? "Searching..." : "Suggest products"}
                </button>
              </div>
            </div>
            {errorMsg && (
              <div className="mt-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
                {errorMsg}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================== UploadBubble (forwardRef) ===================== */

type UploadBubbleProps = {
  onDrop: React.DragEventHandler<HTMLDivElement>;
  onDragOver: React.DragEventHandler<HTMLDivElement>;
  onPick: () => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const UploadBubble = forwardRef<HTMLInputElement, UploadBubbleProps>(
  ({ onDrop, onDragOver, onPick, onChange }, ref) => (
    <div className="flex items-start gap-2">
      <Avatar />
      <div className="max-w-[80%]">
        <div className="bg-white border rounded-2xl px-3 py-2 shadow-sm">
          <p className="text-sm text-gray-800">
            Drop a phone image here and I’ll find similar products for you 📸
          </p>
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            className="mt-2 border-2 border-dashed rounded-xl p-4 bg-gray-50 flex flex-col items-center justify-center text-center"
          >
            <FaImage className="mb-2" />
            <p className="text-sm text-gray-600">Drag & drop, or</p>
            <div className="mt-3 flex gap-2">
              <input
                ref={ref}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onChange}
              />
              <button
                type="button"
                onClick={onPick}
                className="px-3 py-2 text-sm rounded-md border bg-white hover:bg-gray-100"
              >
                Choose file
              </button>
            </div>
            <p className="mt-2 text-[11px] text-gray-500">Up to ~5MB</p>
          </div>
        </div>
      </div>
    </div>
  )
);
UploadBubble.displayName = "UploadBubble";

/* ===================== ChatBubble ===================== */

function ChatBubble({ msg }: { msg: ChatMsg }) {
  if (msg.type === "text" && msg.role === "bot") {
    return (
      <div className="flex items-start gap-2">
        <Avatar />
        <div className="bg-white border rounded-2xl px-3 py-2 shadow-sm max-w-[80%] whitespace-pre-line text-sm text-gray-800">
          {msg.text}
        </div>
      </div>
    );
  }

  if (msg.type === "typing") {
    return (
      <div className="flex items-start gap-2">
        <Avatar />
        <div className="bg-white border rounded-2xl px-3 py-2 shadow-sm max-w-[70%]">
          <TypingDots />
        </div>
      </div>
    );
  }

  if (msg.type === "image" && msg.role === "user") {
    return (
      <div className="flex items-start gap-2 justify-end">
        <div className="bg-primary text-white rounded-2xl px-3 py-2 shadow-sm max-w-[80%]">
          <div className="rounded-lg overflow-hidden">
            <Image
              src={msg.previewUrl}
              alt="user-upload"
              width={260}
              height={180}
              className="object-contain w-full max-h-56"
            />
          </div>
          <div className="mt-1 text-[11px] text-white/80 text-right">You</div>
        </div>
      </div>
    );
  }

  if (msg.type === "results" && msg.role === "bot") {
    return (
      <div className="flex items-start gap-2">
        <Avatar />
        <div className="bg-white border rounded-2xl px-3 py-2 shadow-sm max-w-full">
          <div className="text-sm text-gray-800 mb-1">Here are my suggestions:</div>
          <div className="w-[18rem] sm:w-[26rem]">
            <HScroll step={300}>
              {msg.products.map((p) => (
                <div key={p.id} className="w-64">
                  <ProductCard {...p} />
                </div>
              ))}
            </HScroll>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

/* ===================== Avatar & TypingDots ===================== */

function Avatar() {
  return (
    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
      <Image src="/images/chatbot/chatbot.jpg" alt="bot" fill className="object-cover" />
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.2s]" />
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.1s]" />
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
    </div>
  );
}
