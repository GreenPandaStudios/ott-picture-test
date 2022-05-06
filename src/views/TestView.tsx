import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { selectCurLogMAR, selectDistance } from "../reducers/testReducer";
import { selectDPM } from "../reducers/calibrationReducer";
import { Images } from "../Images";
export const TestView = () => {
  const logMAR = useAppSelector(selectCurLogMAR);
  const distance = useAppSelector(selectDistance);
  const DPM = useAppSelector(selectDPM);
  const height = (distance * 30 * DPM * Math.pow(10, logMAR)) / 3438;
  return <img src={Images[0].path} height={height}></img>;
};
