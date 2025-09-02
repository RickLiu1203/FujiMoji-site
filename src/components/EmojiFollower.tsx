import { useEffect, useMemo, useRef } from "react";

const EMOJIS = [
  "🍎",
  "🤠️",
  "😋️",
  "🤩️",
  "😂️",
  "🤯️",
  "🤗️",
  "🤓️",
  "🍉",
  "🍩",
  "🍕",
  "🍦",
  "🍔",
  "🍿",
  "🍪",
  "🍭",
  "🍔",
  "🍟",
  "🍣",
  "🍤",
  "🍧",
  "🍬",
  "🍫",
  "🍻",
  "🥳",
  "😎",
  "😺",
  "🐶",
  "🐵",
  "🦄",
  "🐸",
  "🐙",
  "🦕",
  "🦩",
  "🌈",
  "🌻",
  "🌞",
  "⭐",
  "🥝",
  "🫐",
  "🥭",
  "🍌",
  "🍐",
  "🍑",
  "🍇",
  "🥰",
  "🥳",
  "😜",
  "😇",
  "🥺",
  "😻",
  "😽",
  "🙈",
  "🙉",
  "🙊",
  "🐰",
  "🐼",
  "🐯",
  "🐨",
  "🐮",
  "🐷",
  "🐸",
  "🐔",
  "🐧",
  "🐦",
  "🦉",
  "🦊",
  "🦁",
  "🐝",
  "🦋",
  "🐢",
  "🐬",
  "🐳",
  "🐋",
  "🦥",
  "🦦",
  "🦨",
  "🦔",
  "🦓",
  "🦒",
  "🦘",
  "🦙",
  "🦚",
  "🦜",
];

function getRandomEmoji(): string {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

function EmojiFollower() {
  const emojiElRef = useRef<HTMLDivElement | null>(null);
  const chosenEmoji = useMemo(() => getRandomEmoji(), []);

  const targetXRef = useRef<number>(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const targetYRef = useRef<number>(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const currentXRef = useRef<number>(targetXRef.current);
  const currentYRef = useRef<number>(targetYRef.current);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const handlePointerMove = (event: MouseEvent | TouchEvent) => {
      if ("touches" in event) {
        const touch = event.touches && event.touches[0];
        if (!touch) return;
        targetXRef.current = touch.clientX;
        targetYRef.current = touch.clientY;
        return;
      }
      const mouseEvent = event as MouseEvent;
      targetXRef.current = mouseEvent.clientX;
      targetYRef.current = mouseEvent.clientY;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    const tick = () => {
      const ease = 0.12;
      const dx = targetXRef.current - currentXRef.current;
      const dy = targetYRef.current - currentYRef.current;
      currentXRef.current += dx * ease;
      currentYRef.current += dy * ease;

      const el = emojiElRef.current;
      if (el) {
        el.style.transform = `translate(${currentXRef.current}px, ${currentYRef.current}px) translate(-50%, -50%)`;
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove as unknown as EventListener);
      window.removeEventListener("touchmove", handlePointerMove as unknown as EventListener);
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <div
      ref={emojiElRef}
      aria-hidden
      style={{
        position: "fixed",
        left: 32,
        top: 32,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 9999,
        fontSize: 28,
        lineHeight: 1,
        willChange: "transform",
        filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.15))",
      }}
    >
      {chosenEmoji}
    </div>
  );
}

export default EmojiFollower;


