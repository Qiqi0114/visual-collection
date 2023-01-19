import axios, { CancelToken, CancelTokenSource } from "axios";
import { reactive } from "vue";
import { tryOnBeforeUnmount } from "@vueuse/core";

const DEFAULT_KEY = "__DEFAULT_KEY";

const useCancelToken = (): {
  setCancelToken: (key?: string) => CancelToken;
} => {
  const cancelTokenKeyMap = reactive<{ [x: string]: CancelTokenSource }>({});

  const cancelPreRequest = (key = DEFAULT_KEY) => {
    const mapCancelSource = cancelTokenKeyMap[key];
    mapCancelSource?.cancel();
    delete cancelTokenKeyMap[key];
  };
  const setCancelToken = (key = DEFAULT_KEY) => {
    cancelPreRequest(key);
    const source = axios.CancelToken.source();
    cancelTokenKeyMap[key] = source;
    return source.token;
  };

  tryOnBeforeUnmount(() => {
    Object.keys(cancelTokenKeyMap).forEach((key) => {
      cancelTokenKeyMap[key].cancel();
      delete cancelTokenKeyMap[key];
    });
  });

  return {
    setCancelToken,
  };
};

export default useCancelToken;
