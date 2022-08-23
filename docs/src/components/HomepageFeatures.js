import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: '数据开放',
    Svg: require('../../static/img/card-left-top1.url.svg').default,
    description: (
      <>
      数睿大数据平台具有完整的数据接入、分析、交换、融合、治理、服务能力，提供柔性、流动、统一的数据资产。
      </>
    ),
  },
  {
    title: '形式开放',
    Svg: require('../../static/img/card-right-top1.url.svg').default,
    description: (
      <>
       数睿通过对软件形式的深度抽象，基于对页面组件、业务流、逻辑控制、服务编排的装配进行填报、业务流、分析仪、大屏、文档以及应用的设计。
      </>
    ),
  },
  {
    title: '系统集成',
    Svg: require('../../static/img/card-left-bottom1.url.svg').default,
    description: (
      <>
     支持与企业现有应用软件以及各种生态系统的能力集成，以支持企业应用的端到端打通，助力企业架构演进。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
