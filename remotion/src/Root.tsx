import React from "react";
import { Composition } from "remotion";
import { AgentsRoadmap } from "./AgentsRoadmap";
import { AgentsEcosystem } from "./AgentsEcosystem";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AgentsEcosystem"
        component={AgentsEcosystem}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={760}
      />
      <Composition
        id="AgentsRoadmap"
        component={AgentsRoadmap}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
