import React, { useState, useEffect, useCallback } from "react";
import { LazyLog } from "react-lazylog";
import axios from "axios";
import usePrevious from "./usePrevious";

const Hello = () => {
  const baseUrl = "https://jsonplaceholder.typicode.com/users";
  const [currentText, updateText] = useState("");
  const [reachEnd, updateReachEnd] = useState(false);
  const [updateFrequency, updateTextUpdateFrequency] = useState(1);

  const prevUpdateFrequency = usePrevious(updateFrequency);
  const maxIds = 10;

  const onScroll = e => {
    const { clientHeight, scrollHeight, scrollTop } = e;
    if (!isNaN(scrollHeight)) {
      if (scrollHeight === scrollTop + clientHeight) {
        updateReachEnd(true);
      }
    }
  };

  const onLoad = () => {
    if (updateFrequency > maxIds) {
      updateTextUpdateFrequency(1);
    } else {
      updateTextUpdateFrequency(updateFrequency + 1);
    }
  };

  const getUsers = useCallback(() => {
    const updatedUrl = `${baseUrl}?id=${updateFrequency}`;
    console.log("calling url", updatedUrl);
    axios.get(updatedUrl).then(res => {
      console.log("latest res data", res.data);
      updateText(JSON.stringify(res.data, null, "   "));
    });
  }, [updateFrequency]);

  useEffect(() => {
    if (updateFrequency < 3 && prevUpdateFrequency !== updateFrequency) {
      getUsers();
    }

    if (reachEnd) {
      getUsers();
      updateReachEnd(false);
    }
  }, [reachEnd, currentText, updateFrequency, getUsers, prevUpdateFrequency]);

  return (
    <div>
      {currentText.length === 0 ? (
        <h1>waiting to be fetch </h1>
      ) : (
        <div style={{ height: 500, width: 902 }}>
          <LazyLog
            selectableLines
            onLoad={onLoad}
            text={currentText}
            onScroll={onScroll}
          />
        </div>
      )}
    </div>
  );
};

export default Hello;
