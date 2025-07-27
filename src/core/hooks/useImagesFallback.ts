import { useState } from "react";
import { ImageErrorEventData, NativeSyntheticEvent } from "react-native";

export const useImageFallback = (initialUri: string, fallbackUri: string) => {
  const [uri, setUri] = useState(initialUri || fallbackUri);

  const onError = (_e: NativeSyntheticEvent<ImageErrorEventData>) => {
    setUri(fallbackUri);
  };

  return { uri, onError };
};
