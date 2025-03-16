import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Crt query',
  path: '/crt-query',
  description: 'Crt query',
  keywords: ['crt'],
  component: () => import('./crt-query.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2025-03-16'),
  cmds: [
    {
      "type": "regex",
      "label": "证书查询",
      "match": "/(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{1,63}(?<!-)\\.)+[a-zA-Z]{2,63}\\.?$)/"
    },
  ]
});
