import { GameObject } from '@eva/eva.js';
import { Text } from '@eva/plugin-renderer-text';
import { Render } from '@eva/plugin-renderer-render';

const Footer = () => {
  const go = new GameObject('footer', {
    position: {
      x: 0,
      y: -16,
    },
    origin: {
      x: 0.5,
      y: 1,
    },
    anchor: {
      x: 0.5,
      y: 1,
    },
  });

  go.addComponent(
    new Text({
      text: '地牢冒险玩法说明：有效移动/转身一步：积分+1，击杀敌人：+200，人物死亡：积分-20。可操作动作：左转，右转，上，下，左，右',
      style: {
        fontFamily: 'Arial',
        fontSize: 12,
        fontWeight: 'bold',
        align: 'center',
        fill: ['#ccc'], // gradient
      },
    }),
  );

  go.addComponent(new Render());

  return go;
};

export default Footer;
