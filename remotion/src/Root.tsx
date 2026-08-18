import React from "react";
import { Composition } from "remotion";
import { AgentsRoadmap } from "./AgentsRoadmap";
import { AgentsEcosystem } from "./AgentsEcosystem";
import { AgentHonorarios } from "./AgentHonorarios";
import { AgentTributario } from "./AgentTributario";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AgentHonorarios"
        component={AgentHonorarios}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={900}
      />
      <Composition
        id="AgentTributario"
        component={AgentTributario}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={900}
      />
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
