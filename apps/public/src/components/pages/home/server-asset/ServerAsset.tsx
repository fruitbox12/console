import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./server-asset-animations.css";
import "./server-asset.css";

const BodyShape = styled.div`
  position: absolute;
  top: ${(props: ShadowProps) => props.top + "px"};
  left: 50%;
  width: 140px;
  height: 100px;
  border-radius: 10px;
  transform: rotate(25deg) skewX(-45deg) translateX(-50%);
`;

type ShadowProps = {
  top: number;
};

const Shadow = styled(BodyShape)`
  background-color: black;
`;

const BodyMain = styled(BodyShape)`
  background-image: linear-gradient(
    35deg,
    rgb(250, 250, 250),
    rgb(240, 240, 240) 5%,
    rgb(240, 240, 240) 45%,
    rgb(210, 210, 210) 55%,
    rgb(210, 210, 210) 95%,
    rgb(180, 180, 180) 100%
  );
`;

const ServerAsset = () => {
  const [bigLayers, setBigLayers] = useState<number[]>([]);
  const [smallLayers, setSmallLayers] = useState<number[]>([]);

  useEffect(() => {
    let _bigLayers: number[] = [];
    for (var i = 0; i < 60; i++) _bigLayers.push(i);
    setBigLayers(_bigLayers);

    let _smallLayers: number[] = [];
    for (var j = 0; j < 21; j++) _smallLayers.push(j);
    setSmallLayers(_smallLayers);
  }, []);

  return (
    <div className="services-server__container">
      <div className="server__container">
        {/* Bottom Layer */}
        <div className="bottom-section__container">
          {/* Drop Shadow */}
          <div className="blur">
            {bigLayers.map((layer: number) => (
              <Shadow top={layer} />
            ))}
          </div>

          {/* Signal */}
          <div className="signal__animation1">
            <div className="body__shape signal"></div>
          </div>
          <div className="signal__animation2">
            <div className="body__shape signal"></div>
          </div>
          <div className="signal__animation3">
            <div className="body__shape signal"></div>
          </div>
          <div className="signal__animation4">
            <div className="body__shape signal"></div>
          </div>

          {/* Body */}
          {bigLayers.map((layer: number) => (
            <BodyMain top={layer} />
          ))}
          <div className="body__shape body__top"></div>
          <div className="left__container">
            <div className="extractor-fan extractor-fan__bottom"></div>
          </div>

          {/* Decorations */}
          <div className="right__container">
            <div className="panel__column">
              <div className="panel__row">
                <div className="panel__light"></div>
                <div className="panel__light"></div>
                <div className="panel__light"></div>
                <div className="panel__light light-grey"></div>
                <div className="panel__light light-grey"></div>
                <div className="panel__light light-grey"></div>
                <div className="panel__light"></div>
              </div>
            </div>
            <div className="panel__column">
              <div className="panel__row">
                <div className="panel__light"></div>
                <div className="panel__light"></div>
                <div className="panel__light"></div>
                <div className="panel__light"></div>
                <div className="panel__light"></div>
                <div className="panel__light"></div>
                <div className="panel__light"></div>
              </div>
            </div>
            <div className="panel__column">
              <div className="panel__row">
                <div className="panel__light light-grey"></div>
                <div className="panel__light light-white light-white__animation3"></div>
                <div className="panel__light light-grey"></div>
                <div className="panel__light light-grey"></div>
                <div className="panel__light"></div>
                <div className="panel__light"></div>
                <div className="panel__light light-blue light-blue__animation4"></div>
              </div>
            </div>
            <div className="panel__column">
              <div className="panel__row">
                <div className="panel__light"></div>
                <div className="panel__light light-blue light-blue__animation1"></div>
                <div className="panel__light light-white light-white__animation2"></div>
                <div className="panel__light"></div>
                <div className="panel__light"></div>
                <div className="panel__light light-white light-white__animation5"></div>
                <div className="panel__light"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Third Layer */}
        <div className="third-section__container">
          {/* Drop Shadow */}
          <div className="blur">
            {smallLayers.map((layer: number) => (
              <Shadow top={layer} />
            ))}
          </div>

          {/* Body */}
          {smallLayers.map((layer: number) => (
            <BodyMain top={layer} />
          ))}
          <div className="body__shape body__top"></div>

          {/* Decorations */}
          <div className="right__container less-padding">
            <div className="panel__column">
              <div className="panel__row">
                <div className="panel__light"></div>
                <div className="panel__light light-blue light-blue__animation1"></div>
                <div className="panel__light"></div>
                <div className="panel__light"></div>
                <div className="panel__light"></div>
                <div className="panel__light light-grey"></div>
                <div className="panel__light"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Layer */}
        <div className="second-section__container">
          {/* Drop Shadow */}
          <div className="blur">
            {smallLayers.map((layer: number) => (
              <Shadow top={layer} />
            ))}
          </div>

          {/* Body */}
          {smallLayers.map((layer: number) => (
            <BodyMain top={layer} />
          ))}
          <div className="body__shape body__top"></div>

          {/* Decorations */}
          <div className="right__container less-padding">
            <div className="panel__column">
              <div className="panel__row">
                <div className="panel__light light-white light-white__animation4"></div>
                <div className="panel__light light-grey"></div>
                <div className="panel__light light-blue light-blue__animation5"></div>
                <div className="panel__light light-grey"></div>
                <div className="panel__light"></div>
                <div className="panel__light"></div>
                <div className="panel__light light-grey"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Layer */}
        {/* Drop Shadow */}
        <div className="blur">
          {bigLayers.map((layer: number) => (
            <Shadow top={layer} />
          ))}
        </div>

        {/* Body */}
        {bigLayers.map((layer: number) => (
          <BodyMain top={layer} />
        ))}
        <div className="body__shape body__top"></div>

        {/* Decorations */}
        <div className="left__container">
          <div className="extractor-fan extractor-fan__top"></div>
        </div>
        <div className="right__container">
          <div className="panel__column">
            <div className="panel__row">
              <div className="panel__light light-blue light-blue__animation1"></div>
              <div className="panel__light light-grey"></div>
              <div className="panel__light light-white light-white__animation4"></div>
              <div className="panel__light light-white light-white__animation3"></div>
              <div className="panel__light"></div>
              <div className="panel__light"></div>
              <div className="panel__light light-white light-white__animation2"></div>
            </div>
          </div>
          <div className="panel__column">
            <div className="panel__row">
              <div className="panel__light"></div>
              <div className="panel__light light-grey"></div>
              <div className="panel__light light-grey"></div>
              <div className="panel__light"></div>
              <div className="panel__light"></div>
              <div className="panel__light light-grey"></div>
              <div className="panel__light"></div>
            </div>
          </div>
          <div className="panel__column">
            <div className="panel__row">
              <div className="panel__light"></div>
              <div className="panel__light"></div>
              <div className="panel__light"></div>
              <div className="panel__light"></div>
              <div className="panel__light light-blue light-blue__animation3"></div>
              <div className="panel__light"></div>
              <div className="panel__light"></div>
            </div>
          </div>
          <div className="panel__column">
            <div className="panel__row">
              <div className="panel__light"></div>
              <div className="panel__light"></div>
              <div className="panel__light"></div>
              <div className="panel__light"></div>
              <div className="panel__light"></div>
              <div className="panel__light"></div>
              <div className="panel__light"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerAsset;
