import React from "react";
import { Composition } from "remotion";
import { AgentsRoadmap } from "./AgentsRoadmap";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AgentsRoadmap"
      component={AgentsRoadmap}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
