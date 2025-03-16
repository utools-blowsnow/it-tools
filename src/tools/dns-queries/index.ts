import { World } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'DNS Queries',
  path: '/dns-queries',
  description: 'Perform DNS Queries',
  keywords: ['dns', 'nslookup'],
  component: () => import('./dns-queries.vue'),
  icon: World,
  createdAt: new Date('2025-03-16'),
  cmds:[
    {
      "type": "regex",
      "label": "DNS Queries",
      "match": "/^((2(5[0-5]|[0-4]\\d))|[0-1]?\\d{1,2})(\\.((2(5[0-5]|[0-4]\\d))|[0-1]?\\d{1,2})){3}$/"
    },
    {
      "type": "regex",
      "label": "DNS Queries",
      "match": "/(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{1,63}(?<!-)\\.)+[a-zA-Z]{2,63}\\.?$)/"
    }
  ]
});
