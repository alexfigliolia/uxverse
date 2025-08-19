"use client";
import { use } from "react";
import { FullBleedImage } from "Components/FullBleedImage";
import { TabsContext } from "Components/Tabs";
import { Propless } from "Types/React";
import "./styles.scss";

export const ProfileGrid = (_: Propless) => {
  const { panelID } = use(TabsContext);
  return (
    <div id={panelID} role="tabpanel" className="profile-grid">
      <div>
        <FullBleedImage src="/ux-1.webp" alt="photo" />
      </div>
      <div>
        <FullBleedImage src="/ux-1.webp" alt="photo" />
      </div>
      <div>
        <FullBleedImage src="/ux-1.webp" alt="photo" />
      </div>
      <div>
        <FullBleedImage src="/ux-1.webp" alt="photo" />
      </div>
      <div>
        <FullBleedImage src="/ux-1.webp" alt="photo" />
      </div>
      <div>
        <FullBleedImage src="/ux-1.webp" alt="photo" />
      </div>
      <div>
        <FullBleedImage src="/ux-1.webp" alt="photo" />
      </div>
      <div>
        <FullBleedImage src="/ux-1.webp" alt="photo" />
      </div>
      <div>
        <FullBleedImage src="/ux-1.webp" alt="photo" />
      </div>
      <div>
        <FullBleedImage src="/ux-1.webp" alt="photo" />
      </div>
      <div>
        <FullBleedImage src="/ux-1.webp" alt="photo" />
      </div>
      <div>
        <FullBleedImage src="/ux-1.webp" alt="photo" />
      </div>
      <div>
        <FullBleedImage src="/ux-1.webp" alt="photo" />
      </div>
      <div>
        <FullBleedImage src="/ux-1.webp" alt="photo" />
      </div>
      <div>
        <FullBleedImage src="/ux-1.webp" alt="photo" />
      </div>
    </div>
  );
};
