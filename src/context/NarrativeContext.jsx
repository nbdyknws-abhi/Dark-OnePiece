import { createContext, useContext, useState } from 'react';
import { JOURNEYS } from '../data/loreData';

const NarrativeContext = createContext();

export function NarrativeProvider({ children }) {
  const [exploreState, setExploreState] = useState('landing'); // 'landing' | 'exploring' | 'journey'
  const [activeNode, setActiveNode] = useState(null);
  const [nodeHistory, setNodeHistory] = useState([]);
  const [weatherEffect, setWeatherEffect] = useState('calm');

  // Journey Mode States
  const [activeJourney, setActiveJourney] = useState(null); // 'luffy' | 'robin' | 'law' | null
  const [activeWaypointIndex, setActiveWaypointIndex] = useState(0);

  // Codex & Geopolitical States
  const [isCodexOpen, setIsCodexOpen] = useState(false);
  const [activeCodexTab, setActiveCodexTab] = useState('files'); // 'files' | 'poneglyphs' | 'chronology'
  const [isGeopoliticalToggled, setIsGeopoliticalToggled] = useState(false);

  const enterArchive = () => {
    setExploreState('exploring');
  };

  const selectNode = (nodeId) => {
    if (nodeId === null) {
      setActiveNode(null);
      setNodeHistory([]);
      setWeatherEffect('calm');
      return;
    }
    if (activeNode === nodeId) {
      setActiveNode(null);
      setNodeHistory([]);
      setWeatherEffect('calm');
      return;
    }
    if (activeNode) {
      setNodeHistory((prev) => [...prev, activeNode]);
    }
    setActiveNode(nodeId);
    
    // Assign the custom node ID as the weather effect directly
    setWeatherEffect(nodeId);
  };

  const goBack = () => {
    if (nodeHistory.length > 0) {
      const prevNode = nodeHistory[nodeHistory.length - 1];
      setNodeHistory((prev) => prev.slice(0, -1));
      setActiveNode(prevNode);
      setWeatherEffect(prevNode);
    } else {
      setActiveNode(null);
      setWeatherEffect('calm');
    }
  };

  // Journey controls
  const startJourney = (journeyKey) => {
    if (!JOURNEYS[journeyKey]) return;
    setActiveJourney(journeyKey);
    setActiveWaypointIndex(0);
    setExploreState('journey');
    
    // Set initial weather of the journey
    const firstWaypoint = JOURNEYS[journeyKey].waypoints[0];
    if (firstWaypoint) {
      setWeatherEffect(firstWaypoint.weather);
    }
  };

  const nextWaypoint = () => {
    if (!activeJourney) return;
    const waypoints = JOURNEYS[activeJourney].waypoints;
    if (activeWaypointIndex < waypoints.length - 1) {
      const newIndex = activeWaypointIndex + 1;
      setActiveWaypointIndex(newIndex);
      setWeatherEffect(waypoints[newIndex].weather);
    }
  };

  const prevWaypoint = () => {
    if (!activeJourney) return;
    const waypoints = JOURNEYS[activeJourney].waypoints;
    if (activeWaypointIndex > 0) {
      const newIndex = activeWaypointIndex - 1;
      setActiveWaypointIndex(newIndex);
      setWeatherEffect(waypoints[newIndex].weather);
    }
  };

  const jumpToWaypoint = (index) => {
    if (!activeJourney) return;
    const waypoints = JOURNEYS[activeJourney].waypoints;
    if (index >= 0 && index < waypoints.length) {
      setActiveWaypointIndex(index);
      setWeatherEffect(waypoints[index].weather);
    }
  };

  const exitJourney = () => {
    setExploreState('exploring');
    setActiveJourney(null);
    setActiveWaypointIndex(0);
    setWeatherEffect('calm');
  };

  return (
    <NarrativeContext.Provider 
      value={{ 
        exploreState, 
        enterArchive,
        activeNode, 
        selectNode,
        nodeHistory,
        goBack,
        weatherEffect,
        setWeatherEffect,
        
        // Journey state & functions
        activeJourney,
        activeWaypointIndex,
        startJourney,
        nextWaypoint,
        prevWaypoint,
        jumpToWaypoint,
        exitJourney,

        // Codex & Geopolitical states
        isCodexOpen,
        setIsCodexOpen,
        activeCodexTab,
        setActiveCodexTab,
        isGeopoliticalToggled,
        setIsGeopoliticalToggled
      }}
    >
      {children}
    </NarrativeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNarrative() {
  return useContext(NarrativeContext);
}
