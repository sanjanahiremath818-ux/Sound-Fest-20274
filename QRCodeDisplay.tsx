"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface Props {
  value: string;
  size?: number;
}

export default function QRCodeDisplay({ value, size = 200 }: Props) {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    QRCode.toDataURL(value, {
      width: size,
      margin: 2,
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
    }).then(setDataUrl);
  }, [value, size]);

  if (!dataUrl) {
    return (
      <div
        className="bg-slate-100 animate-pulse rounded-lg"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <img
      src={dataUrl}
      alt="Ticket QR Code"
      width={size}
      height={size}
      className="rounded-lg border border-slate-200"
    />
  );
}
