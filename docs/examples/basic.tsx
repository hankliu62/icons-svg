import {
  IconAbilityScore,
  Icon3DRole,
  IconAccountChinese,
  ApiOutlined,
  AccountBookTwoTone,
  AlipayCircleFilled
} from '@hankliu/icons-svg';
import { renderIconDefinitionToSVGElement } from '@hankliu/icons-svg/es/helpers';
import * as React from 'react';

const Icons = [
  IconAbilityScore,
  Icon3DRole,
  IconAccountChinese,
  ApiOutlined,
  AccountBookTwoTone,
  AlipayCircleFilled
];

export default function Base() {
  const iconStrings = React.useMemo(
    () =>
      Icons.map((item) =>
        renderIconDefinitionToSVGElement(item, {
          extraSVGAttrs: { width: '32px', height: '32px', fill: 'currentColor' }
        })
      ),
    []
  );

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {iconStrings.map((item) => (
        <div
          key={item}
          dangerouslySetInnerHTML={{ __html: item }}
          style={{
            width: '40px',
            height: '40px',
            border: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: "10px",
          }}
        />
      ))}
    </div>
  );
}
