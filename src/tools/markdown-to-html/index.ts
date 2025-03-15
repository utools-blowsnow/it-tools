import { translate } from '@/plugins/i18n.plugin';
import { Markdown } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: translate('Markdown to HTML'),
  path: '/markdown-to-html',
  description: translate('Convert Markdown to Html and allow to print (as PDF)'),
  keywords: ['markdown', 'html', 'converter', 'pdf'],
  component: () => import('./markdown-to-html.vue'),
  icon: Markdown,
  createdAt: new Date('2024-08-25'),
});
