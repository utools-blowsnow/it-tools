import { translate } from '@/plugins/i18n.plugin';
import { Artboard } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: translate('ASCII Art Text Generator'),
  path: '/ascii-text-drawer',
  description: translate('Create ASCII art text with many fonts and styles.'),
  keywords: ['ascii', 'asciiart', 'text', 'drawer'],
  component: () => import('./ascii-text-drawer.vue'),
  icon: Artboard,
  createdAt: new Date('2024-03-03'),
});
